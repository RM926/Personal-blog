import {request} from './request'

export function getArticles(payload){
  payload.limit = 8
  return request({
    url:'api/articles',
    params:{payload}
  })
}

export function getSomeArticles(payload){
  payload.limit = 12
  return request({
    url:'/api/someArticles',
    params:{payload}
  })
}

export function getArticle(id){
  return request({
    url:"/api/article/" + id,
  })
}

export function deleteArticle(id){
  return request({
    method:'delete',
    url:"/api/article/" + id
  })
}

export function patchArticle(id,data){
  return request({
    method:'patch',
    url:'/api/article/' + id,
    data,
  })
}

export function createArticle(data){
  return request({
    method:'post',
    url:'/api/article',
    data,
  })
}

