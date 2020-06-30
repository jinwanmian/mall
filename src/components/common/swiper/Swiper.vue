<template>
  <div v-if="imgList" id="j-swiper" :style="{ height }">
    <swiper-main 
      :style="{ height, transform: getTranslateX }"
      :img-list="imgList"
      @img-load="imgLoad($event)" 
      @img-click="$emit('img-click', $event)" />

    <swiper-indicators :img-number="imgList.length" :current-index="currentIndex" />
  </div>
</template>

<script>
import SwiperMain from './cpns/SwiperMain';
import SwiperIndicators from './cpns/SwiperIndicators';

export default {
  name: 'Swiper',
  components: {
    SwiperMain,
    SwiperIndicators
  },
  props: {
    imgList: {
      type: Array,
      required: true
    },
    toggleTime: {
      type: [Number, String],
      default: 3000
    },
    placeVicinity: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      height: '56.25vw',
      ul_translateX: '0',
      isImgLoaded: false,
      isInit: false,
      currentIndex: 0
    }
  },
  computed: {
    getTranslateX() {
      return `translateX(${ this.ul_translateX })`;
    }
  },
  methods: {
    imgLoad(ev) {
      if (!this.isImgLoaded) {
        this.isImgLoaded = true;
        this.height = ev.target.offsetHeight + 'px';
        this.$emit('inited', this.height);
      } else if (!this.isInit) {
        this.isInit = true;
        this.ul_translateX = -1 * window.innerWidth + 'px';
        swiperInit(this);
      }
    }
  }
}

// 初始化轮播图各种事件（核心逻辑全在这）
function swiperInit(_this) {
  let     
    // 获取视口宽度（图片的宽度等于它）
    iW = window.innerWidth,
    // 轮播图右边界（也就是倒数第二个img左边缘的偏移量）
    rightBorder = -iW * _this.imgList.length,
    // 记录手指摁下时的坐标
    startX = 0, 
    // 记录手指摁下时轮播容器的偏移量
    start_ul_translateX = 0,
    // 轮播定时器标识
    timer = null,
    // 锁住touchstart，保证所有手指松开前，不会被后续摁下重置初始数据
    startLock = false,
    // 锁住touchmove与touchend，避免过渡正在执行或初始值未更新，这两（就）又触发了
    // 该值在touchend触发时会被置为true
    aLock = true,
    // 终止过渡（仅在touchstart时会置为true）    
    stopTransition = false;

  startTimer();  

  // 获取图片容器（ul），用来添加事件
  let imgBox = document.querySelector('#j-swiper .swiper-main');
  imgBox.addEventListener('touchstart', (ev) => {
    if (startLock) return;

    startLock = true;
    // 手指摁下生效则终止过渡
    // 顺便取消一下定时器，也就是：正在执行就停下，还未执行就取消
    stopTransition = true;
    clearTimeout(timer);
    // 每次都得重新拿该值，因为视口宽度变化时偏移量会被更新
    start_ul_translateX = parseInt(_this.ul_translateX);
    // 摁下时初始坐标是必须每次都重新拿的
    startX = ev.targetTouches[0].clientX;
    // 以上执行完才开放此锁，否则可能会猛一下滑一大段，因为数据还未更新完手指就开始移动了，touchmove拿到的值都是错的
    aLock = false;
  });
  imgBox.addEventListener('touchmove', (ev) => {
    if (aLock) return;

    let offsetX = ev.targetTouches[0].clientX - startX + start_ul_translateX;
    _this.ul_translateX = checkOffset(offsetX) + 'px';
  });
  imgBox.addEventListener('touchend', (ev) => {
    // 只有全部手指松开了并且没被锁住才会执行后面的
    if (ev.targetTouches.length !== 0 || aLock) return;
    
    // 首先将其锁住，避免后续又触发
    aLock = true;
    // 确保过渡的锁是打开的
    stopTransition = false;
    // 为摁下解锁，保证用户随时可以滑动
    startLock = false;


    // 获取当前轮播容器的偏移量
    let origin = parseInt(_this.ul_translateX);
    // 没变化则开启定时器完事
    if (origin === start_ul_translateX) {
      startTimer();
      return;
    }

    // 计算得出目标偏移量（要停靠的位置）
    let target;
    // 先判断模式
    if (_this.placeVicinity) {
      target = Math.round(origin / iW) * iW;
    }
    else {
      // 前两个判断处理的是边界情况
      // 第一个if为true只会发生在从右往左滑向第一张时
      // 第二个if为true只会发生在从左往右滑向最后一张时
      if (origin > -iW) {
        target = -iW;
      } 
      else if (origin < _this.imgList.length * -iW) {
        target = _this.imgList.length * -iW;
      }
      else if (origin > start_ul_translateX) {
        target = Math.ceil(origin / iW) * iW;
      }
      else {
        target = Math.floor(origin / iW) * iW;
      }
    }
    // 更新指示器索引
    updateIndicatorIndex(target);
    // 将当前偏移量过渡到目标偏移量
    transition(origin, target);
  });

  // 将当前偏移量过渡到目标偏移量
  function transition(origin, target) {
    let result = origin + (target - origin) / 24;
    // 判断目标与当前结果差值是否小于1，小于就可以结束了
    let flag = Math.abs(target - result) < 1;

    requestAnimationFrame(() => {
      if (stopTransition) return;

      if (flag) {
        _this.ul_translateX = target + 'px';

        // 过渡完开启定时器
        startTimer();
      } else {
        _this.ul_translateX = result + 'px';
        transition(result, target);
      }
    });
  }
  // 更新指示器索引
  function updateIndicatorIndex(target) {
    if (target > -iW) {
      _this.currentIndex = _this.imgList.length - 1;
    }
    else if (target < -iW * _this.imgList.length) {
      _this.currentIndex = 0;
    }
    else {
      _this.currentIndex = (target / -iW) - 1;
    }
  }
  // 检查偏移量（手指滑动时，无缝连接轮播图边界情况）
  function checkOffset(offsetX) {
    // 如遇到边界情况会改变偏移量
    if (offsetX > -iW) {
      offsetX += rightBorder;
    }
    else if (offsetX < rightBorder) {
      offsetX -= rightBorder;
    }
    return offsetX;
  }
  // 开始定时器
  function startTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let origin = parseInt(_this.ul_translateX);
      if (origin <= rightBorder) {
        origin -= rightBorder;
        _this.ul_translateX = origin + 'px';
      }
      let target = Math.floor((origin - 1) / iW) * iW;

      // 更新指示器索引
      updateIndicatorIndex(target);
      transition(origin, target);
    }, Number(_this.toggleTime));
  }
}
</script>

<style lang="scss" scoped>
  #j-swiper {
    width: 100vw;
    max-height: 56.25vw;
    background: rgba(162, 162, 255, .1);
    will-change: transform;
    overflow: hidden;
    position: relative;
  }
</style>