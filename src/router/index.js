import Vue from 'vue'
import Store from '../store'
import VueRouter from 'vue-router'

const Home = () => import('@/components/front/HomePage.vue')
const Me = () => import('@/components/front/Me.vue')
const Link = () => import('@/components/front/Link.vue')
const Blog = () => import('@/components/front/Blog.vue')
const Board = () => import('@/components/front/Board.vue')
const MoreTags = () => import('@/components/front/MoreTags.vue')
const TagArticle = () => import('@/components/front/TagArticle.vue')
const Article = () => import('@/components/front/Article.vue')
const Login = () => import('@/components/front/Login.vue')

const Admin = () => import('@/components/back/Admin.vue')
const Account = () => import('@/components/back/views/Account.vue')
const Articles = () => import('@/components/back/views/Articles.vue')
const Create = () => import('@/components/back/views/Create.vue')
const Draft = () => import('@/components/back/views/Draft.vue')
const Search = () => import('@/components/back/views/Search.vue')
const FriendLink = ()=> import('@/components/back/views/FriendLink.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'hash',
  routes:[
    {
      path:'/',
      redirect:'/Home'
    },
    {
      path:'/Home',
      component:Home,
      children:[
        {path:'/Me',component:Me,meta:{title:'Me'}},
        {path:'/Blog',component:Blog,meta:{title:'Blog'}},
        {path:'/Link',component:Link,meta:{title:'Link'}},
        {path:'/Board',component:Board,meta:{title:'Board'}},
        {path:'/MoreTags/',component:MoreTags,meta:{title:'MoreTags'}},
        {path:'/TagArticle/:tag',component:TagArticle,meta:{title:'TagArticle'}},
        {path:'/Article/:id',component:Article,meta:{title:'Article'}},
        {
          path:'/Login',
          component:Login,
          meta:{
            title:'影沉寒水'
          },
        }
      ],
      meta:{
        title:'影沉寒水'
      },
    },
    {
      path:'/Admin',
      redirect:'Articles',
      component:Admin,
      children:[
        {path:'/Articles',component:Articles,meta:{title:'Articles',requireAuth: true,}},
        {path:'/Account',component:Account,meta:{title:'Account',requireAuth: true}},
        {path:'/Create',component:Create,meta:{title:'Create',requireAuth: true}},
        {path:'/Draft',component:Draft,meta:{title:'Draft',requireAuth: true}},
        {path:'/Search',component:Search,meta:{title:'Search',requireAuth: true}},
        {path:'/FriendLink',component:FriendLink,meta:{title:'FriendLink',requireAuth: true}}
      ]
    },
    
    
 
  ],
  scrollBehavior (to, from,savedPosition) {
    if(to.path == '/Home'){
      return {x:0,y:0}
    }
    if(savedPosition){
      return savedPosition
    }else{
      if(from.meta.keepAlive){
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x:0,y:to.meta.savedPosition || 0}
    }
  }
})
router.beforeEach((to,from,next)=>{
	//有嵌套路由的情况下，会获取不到`meta`的值
  // document.title = to.matched[0].meta.title
  // console.log(to)
  if(to.meta.title!=='Article'){
    document.title = to.meta.title
  }else{
    next()
  }
  if(Store.state.user.token && to.path == '/Login'){
    next({path:'/Articles'})
  }
  if(!Store.state.user.token && to.meta.requireAuth == true){
     next({path:'/Login'})
  }
  next()
})
export default router


