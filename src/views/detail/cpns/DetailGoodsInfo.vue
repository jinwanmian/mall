<template>
  <div class="detail-goods-info" v-if="info">
    <div class="gi-main">
      <p class="gi-main-title">{{ info.title }}</p>
      <div class="gi-main-price">
        <span class="nowprice">{{ info.price }}</span>
        <span class="oldprice">{{ info.oldPrice }}</span>
        <span class="discount" :style="{ backgroundColor: info.discountBgColor }">{{ info.discountDesc }}</span>
      </div>
      <div class="gi-main-columns">
        <span v-for="item in info.columns" :key="item">{{ item }}</span>
      </div>
    </div>
    <div class="gi-services">
      <span v-for="item in info.services" :key="item.name"><img :src="item.icon" />{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: ['info']
}
</script>

<style lang="scss" scoped>
  .detail-goods-info {
    padding: 10px;
    font-size: 12px;
    border-bottom: 5px solid #aaa;

    .gi-main-title {
      font-size: 16px;
      color: #2b2b2b;
    }
    .gi-main-price {
      span {
        margin-right: 5px;
      }
      .nowprice {
        font-size: 18px;
        font-weight: bold;
        line-height: 28px;
        color: rgb(98, 179, 32);
      }
      .oldprice {
        text-decoration: line-through;
      }
      .discount {
        color: white;
        padding: 3px;
        border-radius: 3px;
      }
    }
    .gi-main-columns {
      padding: 5px 0;
      border-bottom: 1px solid #aaa;
    }
    .gi-main-columns, .gi-services {
      display: flex;
      justify-content: space-between;
    }
    .gi-services {
      padding: 15px 0;
      flex-wrap: wrap;
      
      img {
        height: 14px;
        vertical-align: bottom;
      }
    }
  }
</style>