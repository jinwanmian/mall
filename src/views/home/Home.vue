<template>
  <div id="home">
    <nav-bar>
      <template #center>欢迎光临</template>
    </nav-bar>
    <main ref="main" @scroll="mainScroll">
      <swiper @img-click="noneLink" :img-list="getImgUrlList" @inited="swiperInited" />
      <recommend @item-click="noneLink" :recommend-list="getRecommendList" @inited="recommendInited" />
      <tab-control @tab-item-click="tabItemClick" :tabNameList="goodsDataTitles" :current-index="tabIndex" />
      <!-- 商品列表 -->
      <template>
        <goods-list 
          v-for="(item, index) in goodsDatas"
          :key="item.type"
          v-show="tabIndex === index" 
          :goods-list="item.list" 
          @item-click="goodsItemClick" />
      </template>
      <transition name="t-back-top">
        <back-top @click.native="backTopClick" v-show="backTopIsShow" />
      </transition>
    </main>
  </div>
</template>

<script>
import { getMultiData, getGoodsData } from 'network/api_home';
import { debounce } from '@/common/utiles';
import resetBeforePosition from '@/mixins/resetBeforePosition';

import NavBar from 'NavBar';
import Swiper from 'components/common/swiper/Swiper';
import TabControl from 'components/innerCpn/tabControl/TabControl';
import GoodsList from 'components/innerCpn/goodsList/GoodsList';
import BackTop from 'components/innerCpn/backTop/BackTop';

import Recommend from './cpns/HomeRecommend';

export default {
  name: 'Home',
  mixins: [resetBeforePosition],
  components: {
    NavBar,
    Swiper,
    TabControl,
    GoodsList,
    BackTop,
    Recommend
  },
  data() {
    return {
      multiData: {},
      goodsDataTitles: ['流行', '新款', '精选'],
      goodsDatas: [
        { type: 'pop', page: 0, list: [] },
        { type: 'new', page: 0, list: [] },
        { type: 'sell', page: 0, list: [] }
      ],
      tabIndex: 0,
      goodsListLeavePosition: [0, 0, 0],
      // tabControl发生点击时，滚动位置最小Top值
      tabControlDistanceTop: 0,
      swiperHeight: '',
      recommendHeight: '',
      refreshLock: false,
      backTopIsShow: false
    }
  },
  mounted() {
    // 请求轮播与推荐数据
    getMultiData().then(res => {
      this.multiData = res;
    });

    // 请求商品展示数据
    this.goodsDatas.forEach((item) => {
      this.getGoodsData(item);
    });

    // 建立一个滚动事件触发的防抖函数
    this.scrollDebounceFoo = debounce((scrollTop, scrollHeight) => {
      // 返回顶部按钮是否显示
      this.backTopIsShow = scrollTop >= 1000;

      // 简易的下拉刷新
      if (this.refreshLock) return;
      // -100 是navbar和tabbar的合计高度
      if (scrollTop > (scrollHeight - 200 - (window.innerHeight - 100))) {
        // 触发刷新首先上锁，再走下一步
        this.refreshLock = true;
        this.getGoodsData(this.goodsDatas[this.tabIndex]);
      }
    })
  },
  methods: {
    noneLink(index) {
      this.$toast.show(`${index + 1}:暂无链接`);
    },
    tabItemClick(nextIndex) {
      const preIndex = this.tabIndex;
      if (nextIndex === preIndex) return;

      // 记录离开位置
      this.goodsListLeavePosition[preIndex] = this.$refs.main.scrollTop;

      // 算出目标位置
      const minTop = this.tabControlDistanceTop;
      let yTarget = this.goodsListLeavePosition[nextIndex];
      yTarget = yTarget > minTop ? yTarget : minTop;
      this.$refs.main.scrollTo(0, yTarget);
      this.tabIndex = nextIndex;
    },    
    // 监听滚动
    mainScroll(ev) {
      let scrollTop = ev.target.scrollTop;
      let scrollHeight = ev.target.scrollHeight;
      
      this.scrollDebounceFoo(scrollTop, scrollHeight);
    },
    scrollDebounceFoo: undefined,
    backTopClick() {
      this.$refs.main.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    goodsItemClick(iid) {
      this.$router.push({ name: 'detail', params: { iid } });
    },

    // 封装请求方法
    getGoodsData(item) {
      getGoodsData({
        type: item.type,
        page: item.page += 1       
      }).then(res => {
        item.list = item.list.concat(res);

        // 数据请求到之后等至少三秒才可以触发下一次请求
        setTimeout(() => {
          this.refreshLock = false;
        }, 3000)
      });
    },
    // 因为tabControl是粘性定位，所以无法动态获取值，若是想一开始直接获取的话又得保证前面的元素高度固定
    // 因此写了以下这几个方法，只是为了得出tabControl的初始offsetTop值
    updatetabControlDistanceTop() {
      if (this.swiperHeight && this.recommendHeight) {
        this.tabControlDistanceTop = this.swiperHeight + this.recommendHeight;
      }
    },
    swiperInited(height) {
      this.swiperHeight = parseInt(height);
      this.updatetabControlDistanceTop();
    },
    recommendInited(height) {
      this.recommendHeight = parseInt(height);
      this.updatetabControlDistanceTop();
    }
  },
  computed: {
    getImgUrlList() {
      return this.multiData.banner 
        ? this.multiData.banner.list.map(item => item.image)
        : [];
    },
    getRecommendList() {
      return this.multiData.recommend
        ? this.multiData.recommend.list
        : [];
    }
  }
}
</script>

<style scoped>
  .t-back-top-enter, .t-back-top-leave-to {
    opacity: 0;
  }
  .t-back-top-enter-active, .t-back-top-leave-active {
    transition: opacity .3s;
  }
</style>