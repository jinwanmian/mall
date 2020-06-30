<template>
  <div class="detail-goods-commend" v-if="list">
    <div class="title">商品推荐</div>
    <goods-list :goods-list="list" @item-click="itemClick" />
  </div>
</template>

<script>
import GoodsList from 'components/innerCpn/goodsList/GoodsList';
export default {
  name: 'DetailGoodsCommend',
  components: {
    GoodsList
  },
  props: ['list'],
  methods: {
    itemClick(iid) {
      this.$toast.show('该功能暂未开放');
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-goods-commend .title {
    padding: 3vw;
  }
</style>