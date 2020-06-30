<template>
  <div class="swiper-indicators">
    <span v-for="index in imgNumber" :key="index" :class="{ show: currentIndex === (index - 1) }"></span>
  </div>
</template>

<script>
export default {
  name: 'SwiperIndicators',
  props: ['imgNumber', 'currentIndex']
}
</script>

<style lang="scss" scoped>
  .swiper-indicators {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1.2vw;
    display: flex;
    justify-content: center;

    span {
      width: 10px;
      height: 10px;
      margin: 0 5px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, .8);
      transition: background-color .3s;
      &.show {
        background-color: rgba(255, 255, 255, .8);
      }
    }
  }
</style>