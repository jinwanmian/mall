<template>
  <div class="goods-item" v-if="info">
    <check-box class="check-box" :is-checked="isChecked" @check-box-click="checkBoxClick" />
    <div class="img" :style="getImgStyle"></div>
    <div class="goods-info">
      <div class="name">{{ info.name }}</div>
      <div class="params">{{ info.selectedParamsStr }}</div>
      <div class="other">
        <span class="price">{{ getPrice }}</span>
        <span class="buy-num">x{{ info.buyNum }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from 'components/common/checkbox/CheckBox';
export default {
  name: 'GoodsItem',
  components: {
    CheckBox
  },
  props: ['info', 'isChecked', 'shopId'],
  computed: {
    getPrice() {
      return '￥' + this.info.price.toFixed(2);
    },
    getImgStyle() {
      return `background-image: url('http:${ this.info.imgSrc }')`;
    }
  },
  methods: {
    checkBoxClick() {
      this.$store.dispatch({
        type: 'toggleGoodsCheckBoxState',
        isChecked: this.isChecked,
        shopId: this.shopId,
        stockId: this.info.stockId
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods-item {
    padding: 5px 0;
    display: flex;
    background-image: linear-gradient(to bottom, rgb(94, 181, 252), rgb(4, 139, 250), rgb(40, 137, 216));

    .check-box {
      align-self: center;
    }
    .img {
      width: 66px;
      height: 100px;
      border-radius: 5px;
      background: {
        repeat: no-repeat;
        size: cover;
        position: center;
        color: rgba(255, 255, 255, .5);
      }
    }
    .goods-info {
      flex: 1;
      overflow: hidden;
      padding: 0 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .params {
        font-size: 14px;
      }
      .other {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>