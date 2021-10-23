import {request} from './request'

export function getDraft(payload){
  return request({
    url:'/api/drafts',
    params:{
      payload
    }
  })
}

export function patchDraft(id,data){
  return request({
    method:'patch',
    url:'/api/draft/' + id,
    data,
  })
}

export function createDraft(data){
  return request({
    method:'post',
    url:'/api/draft',
    data,
  })
}