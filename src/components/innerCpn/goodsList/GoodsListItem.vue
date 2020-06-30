<template>
  <div class="goods-list-item" v-if="itemData">
    <img v-lazy="getImgSrc" />
    <div class="gl-item-title">{{ itemData.title }}</div>
    <div class="gl-item-other">
      <span class="price">￥{{ itemData.price }}</span>
      <span class="cfav">{{ itemData.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: ['itemData'],
  computed: {
    getImgSrc() {
      let item = this.itemData;
      return item.img || item.image || item.show.img;
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods-list-item {
    width: 100%;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 10px;
    position: relative;

    img {
      width: 100%;
      display: block;
      border-radius: 3px;
    }
    .gl-item-title {
      width: 90%;
      margin: 0 auto;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .gl-item-other {
      text-align: center;

      .price {
        color: rgb(43, 216, 173);
      }
      .cfav {
        position: relative;
        margin-left: 20px;

        &::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          top: 3px;
          left: -12px;
          background: {
            image: url('./imgs/collect.svg');
            size: contain;
          }
        }
      }
    }
  }
</style>