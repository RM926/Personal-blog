<template>
  <div class="tagarticle">
    <my-header/>
    <div class="tag-name"># {{tag}}</div>
    <article-list :articleList="articleList" />
    <div v-if="page !== pageCount" class="getMore" @click="moreArticle(payload)">
        加载更多
    </div>
  </div>
</template>

<script>
import { getSomeArticles } from '@/network/article.js'
import ArticleList from './component/ArticleList.vue'
export default {
  name:'TagArticle',
  data(){
    return {
      tag:'',
      articleList:[],
      page:0,
      pageCount:0
    }
  },
  components:{
    ArticleList
  },
  created(){
  },
  mounted(){
    //发送请求
    this.tag = this.$route.params.tag
    this.moreArticle()
  },
  methods:{
    moreArticle(){
      this.page += 1
      this._getTagArticles({key:'tags',value:this.tag,page:this.page})
    },
    _getTagArticles(payload){
      console.log(payload)
      getSomeArticles(payload).then(res => {
        console.log(res)
        this.articleList.push(...res.data.articles)
        this.pageCount = res.data.pageCount
      })
    }
  }
 
}
</script>

<style scoped>
.tagarticle{
  width:100%;
}
.tag-name{
  display:inline-block;
  font-size:1.1rem;
  padding-left: .5rem;
  margin-top:1.8rem;
}
.getMore{
  position: relative;
  left: 50%;
  transform: translateX(-85%);

  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
  display: inline-block;
  font-size: 1.1rem !important;
  margin: 1.6rem;
  color: #777777;
}
.getMore {
  cursor: pointer;
}
.getMore::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;

  transform: skew(-35deg);
  height: 0.4rem;
  width: 100%;
  background: #7decc2;
  opacity: 0.6;
}
</style>