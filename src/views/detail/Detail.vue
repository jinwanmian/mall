<template>
  <div id="detail">
    <nav-bar>
      <template #left>
        <img class="back-up" @click="backUp" src="~assets/images/common/back_up.png" />
      </template>
      <template #center>商品详情</template>
    </nav-bar>
    <main ref="main">
      <detail-nav-bar :names="['商品', '店铺', '详情', '评论']" @item-click="navBarClick" />
      <swiper :img-list="getSwiperImgList" @img-click="swiperImgClick" ref="goods" />
      <goods-info :info="detailData.itemInfo" />
      <shop-info :info="detailData.shopInfo" ref="shop" />
      <goods-detail :info="detailData.detailInfo" ref="detail" />
      <goods-params :info="detailData.itemParams" />
      <goods-comment :info="detailData.rate" ref="comment" @img-click="commentImgClick" />
      <goods-commend :list="detailData.recommendList" />

      <buy-menu :info="detailData.skuInfo" ref="pMenu" @menu-confirm-click="menuConfirmClick" />      
      <show-big-img ref="showBigImg" />
    </main>
    <tab-bar @add-shopcart-click="showParamsMenu" />
  </div>
</template>

<script>
import { getDetailData } from 'network/api_detail';

import NavBar from 'NavBar';
import Swiper from 'components/common/swiper/Swiper';

import DetailNavBar from './cpns/DetailNavBar';
import GoodsInfo from './cpns/DetailGoodsInfo';
import ShopInfo from './cpns/DetailShopInfo';
import GoodsDetail from './cpns/DetailGoodsDetail';
import GoodsParams from './cpns/DetailGoodsParams';
import GoodsComment from './cpns/DetailGoodsComment';
import GoodsCommend from './cpns/DetailGoodsCommend';
import TabBar from './cpns/DetailTabBar';
import BuyMenu from './cpns/DetailBuyMenu';
import ShowBigImg from './cpns/DetailShowBigImg';

export default {
  name: 'Detail',
  components: {
    NavBar,
    DetailNavBar,
    Swiper,
    GoodsInfo,
    ShopInfo,
    GoodsDetail,
    GoodsParams,
    GoodsComment,
    GoodsCommend,
    TabBar,
    BuyMenu,
    ShowBigImg
  },
  props: ['iid'],
  data() {
    return {
      detailData: {},
      navBarMap: ['goods', 'shop', 'detail', 'comment']
    }
  },
  methods: {
    backUp() {
      this.$router.go(-1);
    },
    swiperImgClick(index) {
      this.$refs.showBigImg.show(this.detailData.itemInfo.topImages[index]);
    },
    commentImgClick(src) {
      this.$refs.showBigImg.show(src);
    },
    navBarClick(index) {
      // -30 是因为DetailNavBar占高30
      let top = this.$refs[this.navBarMap[index]].$el.offsetTop - 30;
      this.$refs.main.scrollTo({
        top,
        behavior: 'smooth'
      })
    },
    showParamsMenu() {
      this.$refs.pMenu.showMenu();
    },
    menuConfirmClick(buyInfo) {
      buyInfo.shopInfo = {
        name: this.detailData.shopInfo.name,
        id: this.detailData.shopInfo.shopId
      };
      buyInfo.goodsInfo.name = this.detailData.itemInfo.title;
      buyInfo.goodsInfo.id = this.detailData.itemInfo.iid;
      this.$store.dispatch({
        type: 'joinCart',
        buyInfo
      });
    }
  },
  computed: {
    getSwiperImgList() {
      return this.detailData.itemInfo 
        ? this.detailData.itemInfo.topImages
        : [];
    }
  },
  mounted() {
    getDetailData(this.iid).then(res => {
      console.log('dpage', res)
      this.detailData = res;
    })
  }
}
</script>

<style lang="scss">
  #detail {
    width: 100vw;
    height: 100vh;
    padding-top: 50px;
    background-color: white;
    color: #aaa;
    position: relative;
    z-index: 2;

    .back-up {
      vertical-align: middle;
    }
  }
</style>