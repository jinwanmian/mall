<template>
  <div class="tabbar">
    <tabbar-item path="/home">
      <img src="~assets/images/tabbar/home.svg" />
      <div class="text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category">
      <img src="~assets/images/tabbar/category.svg" />
      <div class="text">分类</div>
    </tabbar-item>
    <tabbar-item path="/shopcart">
      <img src="~assets/images/tabbar/shopcart.svg" />
      <div class="text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile">
      <img src="~assets/images/tabbar/profile.svg" />
      <div class="text">我的</div>
    </tabbar-item>
  </div>
</template>

<script>
import TabbarItem from './TabbarItem';

export default {
  name: 'Tabbar',
  components: {
    TabbarItem
  }
}
</script>

<style lang="scss" scoped>
  .tabbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 50px;
    background-color: rgb(255, 193, 100); 
    box-shadow: 0 -1px 2px rgb(255, 166, 0);
    display: flex; 
    z-index: 1;
  }
</style>