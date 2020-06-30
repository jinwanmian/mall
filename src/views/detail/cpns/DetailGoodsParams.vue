<template>
  <div class="detail-goods-params" v-if="info">
    <div class="gp-info">
      <div class="name">{{ getInfo.key }}</div>
      <div class="item" v-for="item in getInfo.set" :key="item.key">
        <span class="key">{{ item.key }}</span>
        <span class="value">{{ item.value }}</span>
      </div>
    </div>
    <div class="gp-rule">
      <div class="name">{{ getRule.key }}</div>
      <div class="item" v-for="item in getRule.tables[0]" :key="item[0]">
        <span v-for="(value, i) in item" :key="i">{{ value }}</span>
      </div>
      <span class="disclaimer">{{ getRule.disclaimer }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsParams',
  props: ['info'],
  computed: {
    getInfo() {
      return this.info.info;
    },
    getRule() {
      return this.info.rule;
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-goods-params {
    padding: 3vw;
    border-bottom: 5px solid #aaa;
    
    > div {
      .item {
        border-bottom: 1px solid #eee;
        padding: 2vw 0;
        display: flex;
      }
      .name {
        text-align: center;
        padding-bottom: 3vw;
        font-weight: bold;
      }
    }
    .gp-info {
      margin-bottom: 3vw;

      .item {
        align-items: center;

        .key {
          width: 20%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .value {
          flex: 1;
          color: rgb(204, 0, 255);
          text-align: justify;  
        }
      }
    }
    .gp-rule .item span {
      flex: 1;
    }
  }
</style>