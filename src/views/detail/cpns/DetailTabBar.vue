<template>
  <div class="detail-tab-bar">
    <div class="service" @click="noneOpenBtn">
      <span class="icon"></span>
      <span class="title">客服</span>
    </div>
    <div class="shop" @click="noneOpenBtn">
      <span class="icon"></span>
      <span class="title">店铺</span>
    </div>
    <div class="collect" @click="noneOpenBtn">
      <span class="icon"></span>
      <span class="title">收藏</span>
    </div>
    <div class="add-shopcart" @click="$emit('add-shopcart-click')">加入购物车</div>
    <div class="buy" @click="noneOpenBtn">购买</div>
  </div>
</template>

<script>
export default {
  name: 'DetailTabBar',
  methods: {
    noneOpenBtn() {
      this.$toast.show('该功能暂未开放');
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-tab-bar {
    height: 50px;
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f8f8f8;
    border-top: 1px solid #eee;
    display: flex;

    .buy, .add-shopcart {
      line-height: 49px;
    }
    .add-shopcart {
      width: 30vw;
      color: #2b2b2b;
      background-color: rgb(250, 140, 0);
    }
    .buy {
      width: 20vw;
      color: white;
      background-color: rgb(160, 0, 255);
    }
    .service, .shop, .collect {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding-top: 5px;
      font-size: 14px;

      .icon {
        width: 24px;
        height: 24px;
        background: {
          image: url('./imgs/detail_tabbar.png');
          repeat: no-repeat;
          size: cover;
        }
      }
    }
    .service .icon { background-position-y: -24px; }
    .shop .icon { background-position-y: -48px; }
  }
</style>