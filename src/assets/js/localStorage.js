export function setLocal(key,value){
  return window.localStorage.setItem(key,value)
}

export function getLocal(key){
  return window.localStorage.getItem(key)
}

export function removeLocal(key){
  return window.localStorage.removeItem(key)
}