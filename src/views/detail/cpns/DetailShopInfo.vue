<template>
  <div class="detail-shop-info" v-if="info">
    <div class="si-top">
      <img :src="info.shopLogo" />
      <span>{{ info.name }}</span>
    </div>
    <div class="si-main">
      <div class="si-main-left">
        <div class="sales">
          <p class="num">{{ info.cSells }}</p>
          <p class="title">总销量</p>
        </div>
        <div class="all-goods">
          <p class="num">{{ info.cGoods }}</p>
          <p class="title">全部宝贝</p>
        </div>
      </div>
      <div class="si-main-right">
        <div class="eval-item" v-for="item in info.score" :key="item.name">
          <span class="name">{{ item.name }}</span>
          <span class="score" :style="{ color: getScoreColor(item.score) }">{{ item.score }} {{ item.score | getScoreEval }}</span>
        </div>
      </div>
    </div>
    <div class="si-bottom">
      <div @click="enterShop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: ['info'],
  methods: {
    getScoreColor(score) {
      return score >= 4.8 ? '#DC143C' : '#2E8B57';
    },
    enterShop() {
      this.$toast.show('该功能暂未开放');
    }
  },
  filters: {
    getScoreEval(score) {
      return score >= 4.8 ? '高' : '低';
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-shop-info {
    padding: 18px 9px;
    font-size: 14px;
    border-bottom: 5px solid #aaa;

    .si-top {
      display: flex;
      align-items: center;

      img {
        height: 54px;
        border: 1px solid #eee;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
    .si-main {
      display: flex;
      position: relative;
      padding: 5vw 0;

      &::after {
        content: '';
        position: absolute;
        top: 5vw;
        left: 50%;
        width: 1px;
        height: calc(100% - 10vw);
        background-color: #ddd;
      }
      .si-main-left {
        flex: 1;
        padding-left: 3vw;
        display: flex;
        justify-content: space-around;
        align-items: center;

        > .sales, > .all-goods {
          text-align: center;

          .num {
            font-weight: bold;
            font-size: 16px;
            line-height: 24px;
          }
        }
      }
      .si-main-right {
        flex: 1;
        padding: 0 4vw;

        .eval-item {
          display: flex;
          padding: 3px 0;

          span {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
    .si-bottom {
      text-align: center;
      div {
        width: 36vw;
        height: 8vw;
        line-height: 7.5vw;
        border-radius: 3px;
        border: 1px solid #eee;
        background-color: #f8f8f8;
        margin: 0 auto;
      }
    }
  }
</style>