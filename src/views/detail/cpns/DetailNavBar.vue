<template>
  <div class="detail-nav-bar">
    <span 
      v-for="(name, index) in names" 
      :key="name" 
      :class="{ active: currentIndex === index }"
      @click="itemClick(index)"
    >{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'DetailNavBar',
  props: ['names'],
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('item-click', index);
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-nav-bar {
    position: sticky;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #f8f8f8d8;
    border-radius: 0 0 5px 5px;
    width: 100vw;
    display: flex;
    
    span {
      flex: 1;
      text-align: center;
      font-size: 14px;
      line-height: 30px;
      color: rgb(68, 0, 255);
      
      &.active {
        color: rgb(255, 60, 0);
      }
    }
  }
</style>