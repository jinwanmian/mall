import axios from 'axios';

const instance = axios.create({
  baseURL: '需要接口请加王红元老师微信：coderwhy003',
  timeout: 30000,
  responseType: 'json'
});

instance.interceptors.response.use(
  res => res.data,
  error => Promise.reject(error)
);

export default instance;
