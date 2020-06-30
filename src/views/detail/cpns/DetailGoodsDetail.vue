<template>
  <div class="detail-goods-detail" v-if="info">
    <div class="gd-desc">{{ info.desc }}</div>
    <div class="gd-img">
      <div class="list" v-for="list in info.detailImage" :key="list.key">
        <div class="name">{{ list.key }}</div>
        <img v-for="src in list.list" :key="src" v-lazy="src" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsDetail',
  props: ['info']
}
</script>

<style lang="scss" scoped>
  .detail-goods-detail {
    border-bottom: 5px solid #aaa;
    
    .gd-desc {
      padding: 6vw 3vw;
      white-space: pre-wrap;
      text-align: justify;
      position: relative;

      &::before, &::after {
        content: '';
        position: absolute;
        width: 50%;
        height: 3px;
        border: {
          left: 4px solid rgb(162, 0, 255);
          bottom: 1px solid rgb(162, 0, 255);
        }
      }
      &::before {
        top: 1vw;
        left: 1vw;
      }
      &::after {
        right: 1vw;
        bottom: 1vw;
        transform: rotate(180deg);
      }
    }
    .gd-img {
      .list {
        margin-top: 3vw;

        .name {
          border-top: 1px solid #aaa;
          padding: 3vw;
        }
        img {
          display: block;
          width: 100vw;
        }
      }
    }
  }
</style>