import request from './request';

export function getCategoryTitle() {
  return request({
    url: '/category',
    method: 'GET'
  })
  .then(res => res.data.data);
}

export function getCategorySubCg(maitKey) {
  return request({
    url: '/subcategory',
    method: 'GET',
    params: {
      maitKey
    },
    timeout: 1200000
  })
  .then(res => res.data.data);
}

export function getCategoryGoodsList(miniWallkey) {
  return request({
    url: '/subcategory/detail',
    method: 'GET',
    params: {
      miniWallkey,
      type: 'pop'
    },
    timeout: 1200000
  })
  .then(res => res.data);
}
