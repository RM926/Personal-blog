<template>
  <div class="article">
    <!-- <button @click="hhh">button</button> -->
    <my-header />
    <h1 class="article-title">{{ article.title }}</h1>
    <span class="article-date">{{ article.date }}</span>
    <div class="article-content">
      <div v-html="HLarticleHtml"></div>
    </div>
    <!-- <div class="lastArticle" v-if="getArticleLength">
      上一篇:
      <span v-if="articleList[Index - 1]" @click="lastArticle(articleList[Index-1])">{{
        articleList[Index - 1].title 
      }}</span>
      <span v-else>数据库读不出来</span>
    </div>
    <div class="nextArticle" v-if="getArticleLength">
      下一篇:
      <span v-if="articleList[Index + 1]" @click="nextArticle(articleList[Index + 1])">{{
        articleList[Index + 1].title
      }}</span>
      <span v-else>还在构思中...</span>
    </div> -->
    <div class="back">
        <span @click='back'>&nbsp; 返 回 &nbsp;</span>
    </div>
    <h1 class="comments">留言</h1>
    <div id="vcomments"></div>
  </div>
  
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getArticle } from "@/network/article.js";
import marked from "marked";
import hljs from "highlight.js";
import Valine from 'valine'
// import 'highlight.js/styles/androidstudio.css'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});

export default {
  name: "Article",
  data() {
    return {
      aid: null,
      Index: 0,
      page:1,
      article: {},
      HLarticleHtml: null,
    };
  },
  computed: {
    ...mapGetters(["getArticleLength", "findArticleIndex"]),
    ...mapState(["articleList"]),
  },
  
  created() {
    // console.log(this.$route.path)
    this.aid = this.$route.params.id;
    if (this.getArticleLength) {
      this.Index = this.findArticleIndex(this.aid);
    }
    getArticle(this.aid).then((res) => {
      window.title = res.data.title;
      document.title = res.data.title + " - 影沉寒水 | 勇敢、乐观、还愿意相信"
      this.article.title = res.data.title;
      this.article.date = res.data.date.replace("T", " ").slice(0, -5);
      this.HLarticleHtml = res.data.content;
      this.HLarticleHtml = this.marked(this.HLarticleHtml);
    });
   this.$nextTick(() => {
      this.valine = new Valine({
        el: '#vcomments',
        appId: '91VCVME7VvReW6GiQi0NBt4o-gzGzoHsz',
        appKey: 'jz56sd3sljVEb8KXAr0t5KT8',
        avatar:'hide',
        placeholder:'',
        path:this.$route.path
      })
    })
    //判断
  },
  methods: {
    marked,
    back(){
      this.$router.back()
    },
    hhh(){
      console.log('hhh')
      console.log(this.$route)
    },
    lastArticle(article) {
      console.log('hhhh')
      this.$router.push('/Article/' + article.aid)
    },
    nextArticle() {
      
    },
  }
}
</script>

<style scoped>
.blank-div {
  width: 100%;
  height: 3.5rem;
}
.article {
  width: 100%;
}
h1 {
  margin: 0;
}
.article-title {
  margin-top: 2rem;
  font-size: 1.3rem;
}
.article-date {
  margin-left: 0.3rem;
  font-size: 0.4rem;
  color: #868686;
  font-family: FangSong,_GB2312 FangSong_GB2312,STSong，STFangsong;
}
.article-title,
.article-date,
.article-content {
  margin-top: 1.7rem;
  /* padding: 0 0.4rem; */
}
.back{
  display: flex;
  justify-content: flex-end;
  /* font-weight:600; */
  margin:3rem 0;
  cursor: pointer;
}
.back span{
  position:relative;
  margin-right:2rem;
}
.back span::before {
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
.comments{
  border-left: 0.3rem solid rgba(125,236,194,.6);
  margin-bottom: 2rem;
  padding: 0.3rem 0.6rem;
  font-weight:400;
  font-family: Microsoft YaHei, SimHei, Microsoft JhengHei;
  font-size: 1.2rem;
}
/* .article-content{
  display:flex;
  flex-direction: columns;
  align-items: center;
} */
@media screen and (max-width:400px) {
  .article-date{
    font-size:0.8rem;   
  }
  
}
</style>
