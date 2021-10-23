import {request} from "./request.js"

export function login(data){
  return request({
    timeout:1500,
    method:'post',
    url:'/api/login',
    data,
  })
}