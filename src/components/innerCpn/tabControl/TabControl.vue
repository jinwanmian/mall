<template>
  <div class="tab-control" v-if="tabNameList">
    <span 
      v-for="(item, index) in tabNameList" 
      :key="item"
      :class="{ active: currentIndex === index }"
      @click="$emit('tab-item-click', index)"
    >{{ item }}</span>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    tabNameList: {
      type: Array,
      required: true
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-control {
    width: 100vw;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    text-align: center;
    background-color: #f8f8f8;
    box-shadow: 0 -1px 1px #999, 0 1px 1px #999;
    position: sticky;
    z-index: 1;
    top: 0;
    display: flex;

    span {
      flex: 1;
      position: relative;

      &::before, &::after {
        content: '';
        position: absolute;
      }
      &::before {
        width: 1px;
        height: 70%;
        top: 15%;
        right: 0;
        background-color: #aaa;
      }
      &:last-child::before {
        display: none;
      }
      &.active::after {
        width: 60%;
        height: 3px;
        bottom: 0;
        left: 20%;
        background-image: linear-gradient(to bottom, rgb(123, 255, 233), rgb(0, 255, 213));
      }
    }
  }
</style>