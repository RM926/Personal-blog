import {request} from './request'

export function getLinks(){
  return request({
    url:'/api/links'
  })
}

export function createLink(data){
  return request({
    method:'post',
    url:'/api/link',
    data,
  })
}

export function patchLink(id,data){
  return request({
    method:'patch',
    url:'/api/link/'+id,
    data,
  })
}
export function deleteLink(id){
  return request({
    method:'delete',
    url:'/api/link/' + id,
  })
}