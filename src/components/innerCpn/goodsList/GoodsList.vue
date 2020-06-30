<template>
  <div class="goods-list" v-if="goodsList">
    <div class="gl-left-col">
      <goods-list-item v-for="item in getLeftList" :key="item.title" :item-data="item" @click.native="$emit('item-click', item.iid)" />
    </div>
    <div class="gl-right-col">
      <goods-list-item v-for="item in getRightList" :key="item.title" :item-data="item" @click.native="$emit('item-click', item.iid)" />
    </div>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goodsList: {
      type: Array,
      required: true
    }
  },
  computed: {
    getLeftList() {
      return this.goodsList.filter((item, index) => index % 2 === 0);
    },
    getRightList() {
      return this.goodsList.filter((item, index) => index % 2 === 1);
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods-list {
    width: 100%;
    padding-top: 10px;
    display: flex;
    justify-content: space-evenly;
    color: #2b2b2b;

    > div {
      width: 47.5%;
    }
  }
</style>