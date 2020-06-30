import request from './request';

export function getMultiData() {
  return request({
    url: '/home/multidata',
    method: 'GET'
  })
  .then(res => res.data.data)
  .catch(err => {
    console.warn('getMultiData()请求数据出错:', err);
    return {}
  })
}

// 调用该函数时，传入参数对象，包含对应类型type与页码page，返回对应商品数据（数组）
export function getGoodsData(params) {
  return request({
    url: '/home/data',
    method: 'GET',
    params
  })
  .then(res => res.data.data.list)
  .catch(err => {
    console.warn('getGoodsData(params)请求数据出错:', err);
    return [];
  })
}