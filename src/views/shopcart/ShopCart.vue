<template>
  <div id="shop-cart">
    <nav-bar>
      <template #center>购物车</template>
    </nav-bar>
    <main ref="main">
      <shop-cart-list />
      <shop-cart-tabbar />
    </main>
  </div>
</template>

<script>
import resetBeforePosition from '@/mixins/resetBeforePosition';

import NavBar from 'NavBar';
import ShopCartList from './cpns/shopcartList/ShopCartList';
import ShopCartTabbar from './cpns/shopcartTabbar/ShopCartTabbar';

export default {
  name: 'ShopCart',
  mixins: [resetBeforePosition],
  components: {
    NavBar,
    ShopCartList,
    ShopCartTabbar
  }
}
</script>

<style lang="scss">
  #shop-cart {
    color: white;
    main {    
      background-color: rgb(81, 189, 252);
    }
  }  
</style>