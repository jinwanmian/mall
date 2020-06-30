<template>
  <div class="shop-cart-tab-bar">
    <check-box :is-checked="whetherAllChecked" @check-box-click="checkBoxClick" />
    <div class="total-price">合计：
      <span class="price">{{ totalPrice }}</span>
    </div>
    <div class="balance-btn" @click="balanceBtnClick">结算</div>
  </div>
</template>

<script>
import CheckBox from 'components/common/checkbox/CheckBox';
import { mapState } from 'vuex';
export default {
  name: 'ShopCartTabbar',
  components: {
    CheckBox
  },
  computed: {
    ...mapState(['cartList']),
    whetherAllChecked() {
      return this.cartList.every(shop => shop.goodsList.length === shop.checkedIdList.length);
    },
    totalPrice() {
      let tp = 
        this.cartList
        .map(shop => shop.goodsList.filter(goods => shop.checkedIdList.includes(goods.stockId)) )
        .map(goodsList => goodsList.map(goods => goods.price * goods.buyNum))
        .flat()
        .reduce((total, current) => total + current, 0);
      return '￥' + tp.toFixed(2);
    }
  },
  methods: {
    checkBoxClick() {
      this.$store.dispatch({
        type: 'toggleAllCheckBoxState',
        isChecked: this.whetherAllChecked
      })
    },
    balanceBtnClick() {
      this.$toast.show('该功能暂未开放');
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop-cart-tab-bar {
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 50px;
    height: 40px;
    background-image: linear-gradient(to bottom, rgb(0, 225, 255), rgb(129, 240, 255) 20%, rgb(0, 158, 179));
    display: flex;
    align-items: center;

    .total-price {
      flex: 1;
    }
    .balance-btn {
      margin: 0 5px;
      padding: 5px 10px;
      background-color: rgb(0, 140, 255);
      border-radius: 3px;
      border: 1px solid rgb(0, 134, 158);
    }
  }
</style>