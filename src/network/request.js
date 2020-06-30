import axios from 'axios';

export default axios.create({
  baseURL: '需要接口请加王红元老师微信：coderwhy003',
  timeout: 30000,
  responseType: 'json'
});