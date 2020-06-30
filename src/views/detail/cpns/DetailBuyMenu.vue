<template>
  <transition name="t-detail-buy-menu">
    <div class="detail-buy-menu" v-if="info" v-show="isShow">

      <transition name="t-menu">
        <div class="menu" v-show="isShow">
          <img class="close" src="~assets/images/detail/close_menu.png" @click="closeMenu" />

          <!-- 库存信息 -->
          <div class="m-top">
            <div class="show-img">
              <img :src="showImgSrc" />
            </div>
            <div class="stock-info">
              <div class="price">{{ getShowPrice }}</div>
              <div class="stock-num">库存 {{ getShowStockNum }} 件</div>
              <div class="none-select">请选择 {{ getNoneSelects }}</div>
            </div>
          </div>

          <!-- 参数选项 -->
          <div class="m-main">
            <div class="params" v-for="(params, paramsIndex) in info.props" :key="params.label">
              <div class="name">{{ params.label }}</div>
              <div class="items">
                <span 
                  v-for="(item, itemIndex) in params.list" 
                  :key="item.name" 
                  :class="{ active: selecteds[paramsIndex] === itemIndex }"
                  @click="paramsItemClick(paramsIndex, itemIndex)"
                >{{ item.name }}</span>
              </div>
            </div>
            <div class="buy-num-controller">
              <div class="name">购买数量</div>
              <div class="controller">
                <div class="btn" :class="{ disabled: buyNumControllerBlocks[0] }" @click="buyNumIncrement">+</div>
                <div class="num">{{ buyNum }}</div>
                <div class="btn" :class="{ disabled: buyNumControllerBlocks[1] }" @click="buyNumDecrement">-</div>
              </div>
            </div>
          </div>

          <!-- 确定按钮 -->
          <div class="m-bottom">
            <div class="confirm" @click="confirmClick">确定</div>
          </div>
        </div>
      </transition>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'DetailBuyMenu',
  props: ['info'],
  data() {
    return {
      isShow: false,
      isSelectedAll: false,
      showImgSrc: '',
      showPrice: '',
      showStockNum: '',
      noneSelects: [],
      selecteds: [],
      buyNum: 1,
      buyNumControllerBlocks: [true, true],
      otherInfo: {}
    }
  },
  methods: {
    showMenu() {
      this.isShow = true;
    },
    closeMenu() {
      this.isShow = false;
    },
    paramsItemClick(paramsIndex, itemIndex) {
      if (this.selecteds[paramsIndex] === itemIndex) {
        this.$set(this.selecteds, paramsIndex, undefined);
      } 
      else {
        this.$set(this.selecteds, paramsIndex, itemIndex);
      }
    },
    buyNumIncrement() {
      if (this.buyNumControllerBlocks[0]) return;

      this.buyNum += 1;
    },
    buyNumDecrement() {
      if (this.buyNumControllerBlocks[1]) return;

      this.buyNum -= 1;
    },
    confirmClick() {
      if (!this.isSelectedAll) {
        this.$toast.show('请选择参数：' + this.getNoneSelects);
      }
      else if (this.showStockNum === 0) {
        this.$toast.show('该商品暂无存货，请联系客服！');
      }
      else if(this.buyNum === 0) {
        this.$toast.show('购买数量不能为0');
      }
      else {
        this.$toast.show('加入购物车成功！');
        this.closeMenu();
        this.$emit('menu-confirm-click', {
          buyNum: this.buyNum,
          goodsInfo: {
            price: this.showPrice,
            imgSrc: this.showImgSrc,
            ...this.otherInfo
          }
        });
      }
    }
  },
  computed: {
    getShowPrice() {
      return this.isSelectedAll 
        ? '￥' + this.showPrice.toFixed(2) 
        : this.info.priceRange;
    },
    getShowStockNum() {
      return this.isSelectedAll ? this.showStockNum : '-';
    },
    getNoneSelects() {
      return this.noneSelects.filter((v, i) => this.selecteds[i] === undefined).toString();
    }
  },
  watch: {
    info(newV, oldV) {
      // 在这做一些初始化的事
      this.showImgSrc = newV.skus[0].img;
      this.noneSelects = newV.props.map(item => item.label.replace(':', ''));
      this.selecteds = new Array(newV.props.length).fill(undefined);
    },
    selecteds(newV) {
      // 只要有值为undefined，就是还有参数未选
      if (newV.findIndex(v => v === undefined) !== -1) {
        this.isSelectedAll = false;        
        
        // 参数未选完，若已选择样式，则切换到对应图片
        let len = newV.length;
        for (let i = 0; i < len; i ++) {
          if (newV[i] !== undefined) {
            let param = this.info.props[i].list[newV[i]];
            if (param.type === 'style') {
              this.showImgSrc = this.info.skus.find(item => item.styleId === param.styleId).img;
            }
          }
        }
      }
      else {
        // 创建查询对象，存储参数索引
        let queryObj = {};
        newV.forEach((itemIndex, paramsIndex) => {
          let item = this.info.props[paramsIndex].list[itemIndex];
          let key = item.type;
          let value = item.index;
          queryObj[key] = value;
        });
        // 找到对应库存信息
        let stockInfo = this.info.skus.find(item => Object.keys(queryObj).every(key => item[key + 'Id'] === queryObj[key]) );
        // 展示对应信息
        this.showImgSrc = stockInfo.img;
        this.showPrice = stockInfo.nowprice / 100;
        this.showStockNum = stockInfo.stock;
        this.isSelectedAll = true;
        // 保存其它信息
        this.otherInfo = {
          selectedParamsStr: Object.keys(queryObj).map(key => stockInfo[key]).join(' + '),
          stockId: stockInfo.stockId
        }
      }

      isSelectedAllChange(this);
    },
    buyNum(newV) {
      this.buyNumControllerBlocks = [newV >= this.showStockNum, newV <= 1];
    }
  }
}
function isSelectedAllChange(_this) {
    if (_this.isSelectedAll) {
      _this.buyNum = _this.buyNum > _this.showStockNum ? _this.showStockNum : _this.buyNum;
      _this.buyNumControllerBlocks = [_this.buyNum >= _this.showStockNum, _this.buyNum <= 1];
    }
    else {
      _this.buyNumControllerBlocks = [true, true];
    }
}
</script>

<style lang="scss" scoped>
  .detail-buy-menu {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);

    .menu {      
      position: absolute;
      height: 70vh;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      border-radius: 5px 5px 0 0;
      display: flex;
      flex-direction: column;
      
      .close {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 1vw;
        right: 1vw;
      }
      .m-top {
        padding: 3vw;
        overflow: hidden;

        > div { float: left; }
        .show-img img {
          height: 18vh;
          display: block;
          border-radius: 5px;
        }
        .stock-info {
          padding: 3vw;
          line-height: 24px;

          .price {
            font-weight: bold;
            color: orangered;
          }
        }
      }
      .m-main {
        flex: 1;
        overflow-y: auto;
        padding: 0 3vw;

        .params {
          margin-top: 8px;

          .name { padding: 5px 0; }
          .items {
            display: flex;
            flex-wrap: wrap;
            padding-top: 5px;
            border: 1px solid #eee;
            border-left: none;
            border-right: none;

            span {
              padding: 8px;
              min-width: 40px;
              border-radius: 3px;
              border: 1px solid #eee;
              margin: 0 5px 5px 0;
              text-align: center;
              font-size: 14px;

              &.active {
                color: rgb(111, 0, 255);
                border-color: rgb(111, 0, 255);
              }
            }
          }
        }
        .buy-num-controller {
          margin-top: 8px;
          padding: 5px 0;
          display: flex;
          justify-content: space-between;
          
          .controller {
            div {
              float: left;
              color: #2b2b2b;
              width: 30px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              border-radius: 3px;
              border: 1px solid #eee;
              background-color: #f8f8f8;

              &.disabled { color: #ccc; }
            }
          }
        }
      }
      .m-bottom {
        padding: 3vw 0;
        border-top: 1px solid #aaa;

        .confirm {
          margin: 0 auto;
          width: 90vw;
          height: 6vh;
          line-height: 6vh;
          border: 1px solid orange;
          border-radius: 10vh;
          text-align: center;          
          font-size: 2.7vh;
          font-weight: bold;
          color: orangered;
          background-image: linear-gradient(to bottom, orange, rgb(255, 207, 118), rgb(250, 186, 67), orange);
        }
      }
    }
  }
  
  .t-detail-buy-menu-enter-active, .t-detail-buy-menu-leave-active, .t-menu-enter-active, .t-menu-leave-active {
    transition: transform .3s;
  }
  .t-detail-buy-menu-enter, .t-detail-buy-menu-leave-to {
    transform: translateX(100%);
  }
  .t-menu-enter, .t-menu-leave-to {
    transform: translateY(100%);
  }
</style>