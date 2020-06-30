<template>
  <div class="category-detail">
    <div class="content" v-if="subCgList && goodsList">
      <div class="sub-cg-list">
        <div class="item" v-for="item in subCgList" :key="item.title" @click="subCgItemClick">
          <img v-lazy="item.image" />
          <span class="name">{{ item.title }}</span>
        </div>
      </div>
      <goods-list :goods-list="goodsList" @item-click="goodsItemClick" />
    </div>
    <loading v-if="!(subCgList && goodsList)" />
  </div>
</template>

<script>
import GoodsList from 'components/innerCpn/goodsList/GoodsList';
import Loading from './Loading';
export default {
  name: 'CategoryDetail',
  components: {
    GoodsList,
    Loading
  },
  props: ['subCgList', 'goodsList'],
  methods: {
    subCgItemClick() {
      this.$toast.show('该功能暂未开放');
    },
    goodsItemClick(iid) {
      this.$router.push({ name: 'detail', params: { iid } });
    }
  }
}
</script>

<style lang="scss" scoped>
  .category-detail {
    position: relative;
    flex: 1;
    overflow-y: auto;
    
    .sub-cg-list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 5px;      

      .item {
        width: 30%;
        text-align: center;
        margin-left: 2.5%;
        margin-bottom: 5px;

        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
</style>