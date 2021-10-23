import { request } from "./request";

export function patchUser(data){
  return request({
    method:'post',
    url:'/api/user',
    data,
  })
}