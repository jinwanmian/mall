import axios from 'axios';
import request from './request';

export function getDetailData(iid) {
  return axios.all([
    request({
      url: '/detail',
      params: {
        iid
      }
    }),
    request({ url: '/recommend' })
  ]).then(([detail, recommend]) => {
    detail.result.recommendList = recommend.data.list;
    return formatData(detail.result);
  })
}

function formatData(d) {
  d.itemInfo = { 
    ...d.itemInfo, 
    columns: d.columns, 
    services: d.shopInfo.services 
  };

  return d;
}
