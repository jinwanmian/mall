<template>
  <div class="home-recommend" :style="{ height }">
    <p v-if="!recommendList.length">暂无推荐</p>
    <div 
      class="item"
      v-for="(item, index) in recommendList"
      :key="item.image"
      @click="$emit('item-click', index)"
      ref="box"
    >
      <img :src="item.image" @load="imgLoad(index)" />
      <span>{{ item.title }}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommendList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false,
      height: 'auto'
    }
  },
  methods: {
    imgLoad(i) {
      if (!this.isLoad) {
        this.isLoad = true;
        this.height = this.$refs.box[i].offsetHeight + 5 + 'px';
        this.$emit('inited', this.height);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-recommend {
    width: 100vw;
    border-bottom: 5px solid #aaa;
    background-color: white;
    overflow: hidden;
    display: flex;
    justify-content: space-around;

    p {
      text-align: center;
      line-height: 100px;
    }
    .item {
      box-sizing: content-box;
      padding: 10px 0;
      text-align: center;
      font-size: 12px;
      line-height: 16px;
      img {
        display: block;
        height: 22.4vw;
      }
    }
  }
</style>