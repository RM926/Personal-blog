<template>
  <div class="blog" ref="blogscroll">
    <!-- <scroll class="wrapper" ref="scroll"> -->
    <!-- <div class="blank-div"></div> -->
    <my-header ref="myHeader" />
    <article-list :articleList="articles" />
    <div v-if="page !== PageCount" class="getMore" @click="showArticle('all')">
      加载更多
    </div>
    <div v-else class="notMore">就先到这里吧</div>
    <!-- </scroll> -->
  </div>
</template>

<script>
// import Scroll from "@/components/share/Scroll.vue";
import ArticleList from "./component/ArticleList.vue";
import { getArticles } from "@/network/article.js";
export default {
  name: "Blog",
  data() {
    return {
      articles: [],
      page: 0,
      PageCount: 0,
    };
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    // getMoreShow() {
    //   return this.pushArticle.length;
    // },
  },
  components: {
    ArticleList,
  },
  created() {
    this._getArticle("all");
  },
  methods: {
    // handleScroll() {
    //   return document.documentElement.scrollTop;
    // },
    showArticle(value) {
      this._getArticle(value);
    },
    _getArticle(value) {
      this.page += 1;
      getArticles({ value, page: this.page }).then((res) => {
        // console.log(res)
        this.PageCount = res.data.pageCount;
        this.articles.push(...res.data.articles);
      });
    },
  },
    
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* padding:; */
  background: darkgray;
}
.blog {
  width: 100%;
  /* background:rgb(231, 167, 167); */
}
.getMore,
.notMore {
  position: relative;
  left: 50%;
  transform: translateX(-100%);

  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
  display: inline-block;
  font-size: 1.1rem !important;
  margin: 2.3rem;
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
