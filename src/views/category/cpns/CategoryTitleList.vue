<template>
  <div class="category-title-list" v-if="list">
    <div 
      class="title" 
      v-for="(item, index) in list" 
      :key="item.title"
      :class="{ active: index === currentIndex }"
      @click="$emit('item-click', index)"
    >{{ item.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'CategoryTitleList',
  props: ['list', 'currentIndex']
}
</script>

<style lang="scss" scoped>
  .category-title-list {
    width: 7em;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: rgb(255, 210, 128);

    .title {
      height: 3em;
      line-height: 3em;
      text-align: center;
      &.active {
        font-weight: bold;
        color: rgb(195, 0, 255);        
        border-left: 4px solid rgb(195, 0, 255);
        background-color: white;
      }
    }
  }
</style>