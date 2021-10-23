import Vue from 'vue'
import vueX from 'vuex'
import {setLocal,removeLocal} from "@/assets/js/localStorage.js"

Vue.use(vueX)
const state = {
  ArticlesViewUpdata:false,
  user:{},
  tags:[],
  article:{},
  draft:{},
  articleList:[],
}
const store = new vueX.Store({
  state,
  actions:{},
  getters:{
    getArticleLength(state){
      return state.articleList.length
    },
    findArticleIndex(state){
      return function(articleIndex){
        return state.articleList.findIndex(article => {
          return articleIndex == article.aid
        })
      }
    },
    hasArticle(state){
      return state.article.title
    },
    hasDraft(state){
      return state.draft.title
    }

  },
  mutations:{
    changeArticleView(state){
      state.ArticlesViewUpdata = !state.ArticlesViewUpdata
    },
    setUser(state,user){
      // console.log(user)
      setLocal('token',user.token)
      setLocal('user',user.name)
      state.user = user
    },
    removeUser(state){
      removeLocal("token")
      removeLocal("user")
      state.user = {}
    },
    changeTags(state,payload){
      // console.log(payload.data)
      state.tags = payload.data
    },
    MoveArticle(state,articles){
      console.log(articles)
      state.articleList = articles
    },
    addArticle(state,article){
      state.article = article
    },
    addDraft(state,draft){
      state.draft = draft
    },
    removeArticle(state){
      state.article = {}
    },
    removeDraft(state){
      state.draft = {}
    }
  },
})


export default store