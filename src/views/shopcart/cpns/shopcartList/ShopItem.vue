<template>
  <div class="shop-item" v-if="info">
    <div class="top">
      <check-box :is-checked="isChecked" @check-box-click="checkBoxClick" />
      <div class="shop-name">{{ info.name }}</div>
      <div class="show-control" :class="{ hide: isHide }" @click="showControlClick"></div>
    </div>
    <div class="goods-list" :style="{ marginTop: goodsListMT }" ref="goodsList">
      <slot />
    </div>
  </div>
</template>

<script>
import CheckBox from 'components/common/checkbox/CheckBox';
export default {
  name: 'ShopItem',
  components: {
    CheckBox
  },
  props: ['info'],
  data() {
    return {
      isHide: false,
      goodsListMT: ''
    }
  },
  computed: {
    isChecked() {
      return this.info.goodsList.length === this.info.checkedIdList.length;
    }
  },
  methods: {
    checkBoxClick() {
      this.$store.dispatch({
        type: 'toggleShopCheckBoxState',
        isChecked: this.isChecked,
        shopId: this.info.id
      });
    },
    showControlClick() {
      this.isHide = !this.isHide;
      if (this.isHide) {
        this.goodsListMT = -this.$refs.goodsList.offsetHeight + 'px';
      } else {
        this.goodsListMT = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop-item {  
    overflow: hidden;
    .top {
      height: 30px;
      background-color: rgb(0, 140, 255);
      border-radius: 5px;
      border: 1px solid rgb(0, 74, 134);
      display: flex;
      align-items: center;
      position: relative;
      z-index: 1;

      .shop-name {
        flex: 1;
      }
      .show-control {
        width: 24px;
        height: 24px;
        margin: 0 5px;
        background: {
          image: url('./imgs/show_control.png');
          size: contain;
        }
        transition: transform .3s;
        &.hide {
          transform: rotate(-180deg);
        }
      }
    }
    .goods-list {
      padding-top: 3px;
      margin-top: -5px;
      border-radius: 0 0 5px 5px;
      border: 1px solid rgb(0, 74, 134);
      transition: margin .3s;
    }
  }
</style>