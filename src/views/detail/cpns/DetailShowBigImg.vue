<template>
  <transition name="t-detail-big-img">
    <div class="detail-big-img" v-show="isShow">
      <img :src="imgSrc" />
      <span class="close" @click="hide">X</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DetailShowBigImg',
  data() {
    return {
      imgSrc: '',
      isShow: false
    }
  },
  methods: {
    show(imgSrc) {
      this.imgSrc = imgSrc;
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-big-img {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80vw;
    }
    .close {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
      padding: 3vw;
      font-size: 16px;
      color: black;
      background-color: rgba(255, 0, 0, .9);
      border-bottom-left-radius: 5px;
    }
  }
  .t-detail-big-img-enter-active, .t-detail-big-img-leave-active {
    transition: opacity .3s;
  }
  .t-detail-big-img-enter, .t-detail-big-img-leave-to {
    opacity: 0;
  }
</style>