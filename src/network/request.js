import axios from 'axios'
// import Store from '../store'
import { getLocal } from '@/assets/js/localStorage.js'
export function request(config) {
  const instance = axios.create({
    baseURL: '/',
    timeout: 5000,
    // headers: {}
  })

  instance.interceptors.request.use(
    //处理config和添加加载动画
    config => {
      if (getLocal("token")) {
        config.headers.authorization = "qiuxiaobin " + getLocal('token')
      }
      return config
    }
  );
  return instance(config)
}



