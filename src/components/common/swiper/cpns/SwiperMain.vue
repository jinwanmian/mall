<template>
  <!-- 图片，前后各加一张替补图 -->
  <ul class="swiper-main">
    <li v-if="imgList.length > 1" @click="$emit('img-click', imgList.length - 1)">
      <img :src="imgList[imgList.length - 1]" />
    </li>
    <li v-for="(url, index) in imgList" :key="url" @click="$emit('img-click', index)">
      <img :src="url" @load="$emit('img-load', $event)" />
    </li>    
    <li v-if="imgList.length > 1" @click="$emit('img-click', 0)">
      <img :src="imgList[0]" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SwiperMain',
  props: ['imgList']
}
</script>

<style lang="scss" scoped>
  .swiper-main {
    display: flex;

    li {
      flex: none;

      img {
        width: 100vw;
        display: block;
      }
    }
  }
</style>