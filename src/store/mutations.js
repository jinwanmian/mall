export default {
  newShop(state, { shop }) {
    state.cartList.push(shop);
  },
  newGoods(_, { shop, newGoods }) {
    let goods = shop.goodsList.find(goods => goods.stockId === newGoods.stockId);
    // 商品存在则仅追加数量
    if (goods) {
      goods.buyNum += newGoods.buyNum;
    }
    else {
      shop.goodsList.push(newGoods);
    }
  },
  goodsCheckBoxSetAsChecked(_, { shop, stockId }) {
    shop.checkedIdList.push(stockId);
  },
  goodsCheckBoxSetAsUnChecked(_, { shop, stockId }) {
    shop.checkedIdList = shop.checkedIdList.filter(_stockId => _stockId !== stockId);
  },
  shopCheckBoxSetAsChecked(_, { shop }) {
    let checkedIdList = shop.goodsList.map(goods => goods.stockId);
    shop.checkedIdList = checkedIdList;
  },
  shopCheckBoxSetAsUnChecked(_, { shop }) {
    shop.checkedIdList = [];
  },
  allCheckBoxSetAsChecked(state) {
    state.cartList.forEach(shop => {
      shop.checkedIdList = shop.goodsList.map(goods => goods.stockId);
    });
  },
  allCheckBoxSetAsUnChecked(state) {
    state.cartList.forEach(shop => {
      shop.checkedIdList = [];
    });
  }
}
