export default {
  joinCart({ state, commit }, { buyInfo: { shopInfo, goodsInfo, buyNum } }) {
    // 查找店铺，不存在则创建
    let shop = findShop(state, shopInfo.id);
    if (!shop) {
      shop = {
        ...shopInfo,
        goodsList: [],
        checkedIdList: []
      };
      commit({
        type: 'newShop',
        shop
      });
    }
    
    // 新建商品
    let goods = {
      buyNum,
      ...goodsInfo
    }
    commit({
      type: 'newGoods',
      shop,
      newGoods: goods
    });
    // 保证新加入购物车的商品是选中状态
    if (!shop.checkedIdList.includes(goods.stockId)) {
      commit({
        type: 'goodsCheckBoxSetAsChecked',
        shop,
        stockId: goods.stockId
      });
    }

    return true;
  },
  toggleShopCheckBoxState({ state, commit }, { isChecked, shopId }) {
    let shop = findShop(state, shopId);
    let type = isChecked ? 'shopCheckBoxSetAsUnChecked' : 'shopCheckBoxSetAsChecked';
    commit({
      type,
      shop
    });
  },
  toggleGoodsCheckBoxState({ state, commit }, { isChecked, shopId, stockId }) {
    let shop = findShop(state, shopId);
    let type = isChecked ? 'goodsCheckBoxSetAsUnChecked' : 'goodsCheckBoxSetAsChecked';
    commit({
      type,
      shop,
      stockId
    });
  },
  toggleAllCheckBoxState({ commit }, { isChecked }) {
    let type = isChecked ? 'allCheckBoxSetAsUnChecked' : 'allCheckBoxSetAsChecked';
    commit(type);
  }
}
function findShop(state, id) {
  return state.cartList.find(shop => shop.id === id);
}
