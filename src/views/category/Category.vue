<template>
  <div id="category">
    <nav-bar>
      <template #center>分类</template>
    </nav-bar>
    <main>
      <category-title-list :list="titleDataList" :current-index="currentIndex" @item-click="titleItemClick" ref="titleList" />
      <category-detail 
        :key="currentIndex"
        v-bind="detailData"
        ref="detail" />
    </main>
  </div>
</template>

<script>
import {
  getCategoryTitle,
  getCategorySubCg,
  getCategoryGoodsList
} from 'network/api_category';

import NavBar from 'NavBar';
import CategoryTitleList from './cpns/CategoryTitleList';
import CategoryDetail from './cpns/CategoryDetail';
export default {
  name: 'Category',
  components: {
    NavBar,
    CategoryTitleList,
    CategoryDetail
  },
  data() {
    return {
      titleDataList: [],
      detailDataList: [],
      currentIndex: 0,
      leavePositions: [0, 0]
    }
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index;
      this.requestDetailData(index);
    },
    requestDetailData(index) {
      // 已经请求过的不再请求
      if (this.detailDataList[index]) return;

      let item = this.titleDataList[index];
      Promise.all([getCategorySubCg(item.maitKey), getCategoryGoodsList(item.miniWallkey)])
      .then(res => {
        this.$set(this.detailDataList, index, {
          subCgList: res[0].list,
          goodsList: res[1]
        });
      });
    }
  },
  computed: {
    detailData() {
      return this.detailDataList[this.currentIndex] || {};
    }
  },
  mounted() {
    // 请求首先要展示的数据
    getCategoryTitle().then(res => {
      this.titleDataList = res.category.list;
      this.requestDetailData(0);
    });

    this.$router.beforeEach((to, from, next) => {
      if (from.name === this.$options.name.toLowerCase()) {
        this.leavePositions = [
          this.$refs.titleList.$el.scrollTop, 
          this.$refs.detail.$el.scrollTop
        ];
      }
      next();
    })
  },
  activated() {
    if (this.$refs.titleList && this.$refs.detail) {
      this.$refs.titleList.$el.scrollTo(0, this.leavePositions[0]);
      this.$refs.detail.$el.scrollTo(0, this.leavePositions[1]);
    }
  }
}
</script>

<style scoped>
  main {
    display: flex;
  }
</style>