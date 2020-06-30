<template>
  <div class="shop-cart-list">
    <shop-item v-for="shop in cartList" :key="shop.id" :info="shop">
      <goods-item
        v-for="goods in shop.goodsList" 
        :key="goods.stockId" 
        :info="goods" 
        :is-checked="whetherItIsChecked(shop, goods.stockId)"
        :shop-id="shop.id" />
    </shop-item>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ShopItem from './ShopItem';
import GoodsItem from './GoodsItem';
export default {
  name: 'ShopCartList',
  components: {
    ShopItem,
    GoodsItem
  },
  computed: {
    ...mapState(['cartList'])
  },
  methods: {    
    whetherItIsChecked(shop, stockId) {
      return shop.checkedIdList.includes(stockId);
    }
  }
}
</script>

<style scoped>
  .shop-cart-list {
    padding-bottom: 40px;
  }
</style>