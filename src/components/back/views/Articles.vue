<template>
  <div class="articles">
    <p class="title">所有文章</p>
    <Table
      :data="tableData"
      @editClick="eidt"
      @tagArticle="deleteAlert"
    />
    <page-control
      :pageData="pageControl"
      @lastClick="lastpage"
      @nextClick="nextpage"
    />
    <alert-box :alert="alertData" @comfirmClick="comfirmDelete" />
  </div>
</template>

<script>
import { getArticles, deleteArticle } from "@/network/article.js";
import Table from "@/components/back/component/Table";
import PageControl from "../component/PageControl.vue";
import AlertBox from "@/components/back/component/AlertBox";
export default {
  name: "Articles",
  data() {
    return {
      pageCount: 1,
      tableData: [],
      pageControl: {
        page: 1,
        pageCount: 0,
        nextDisable: false,
      },
      alertData: {
        message: "",
        show: false,
      },
      currentArticle: {},
      isActivated:false
    };
  },
  components: {
    Table,
    PageControl,
    AlertBox,
  },
  computed: {

  },
  mounted() {
    this._getArticles({ page: 1 });
  },
  activated(){
    const situation = this.$store.state.ArticlesViewUpdata
    if(this.isActivated && situation){
      this._getArticles({ page: 1 })
      this.pageControl.page = 1
      this.$store.commit('changeArticleView')
    }
    this.isActivated = true
  },
  methods: {
    eidt(item){
      this.$store.commit('removeDraft')
      this.$store.commit('addArticle',item)
      this.$router.push('/Create')
    },
    deleteAlert(article) {
      this.currentArticle = article;
      this.alertData = {
        message: '确定删除 "' + this.currentArticle.title + '"这篇文章吗？',
        show: true,
      };
    },
    comfirmDelete() {
      //发送请求，删除文章，如果成功，tableData移除对应的文章，alertBox消除，toast出现
      //如果失败，alertBox消除，toast出现
      deleteArticle(this.currentArticle["aid"]).then((res) => {
        this.alertData.show = false;
        if (res.status == 200) {
          //找到下标值
          const tagIndex = this.tableData.findIndex((article) => {
            return article.aid == this.currentArticle['aid']
          });
          //移除对应文章
          this.tableData.splice(tagIndex,1);
          this.$toast.show("删除' " + this.currentArticle['title'] + " '文章成功")
        }
      }).catch(err => {
        console.log(err)
            this.$toast.show("删除' " + this.currentArticle['title'] + " '文章失败")
      })
    },
    lastpage() {
      this.pageControl["page"] -= 1;
      return this._getArticles({ page: this.pageControl["page"] });
    },
    nextpage() {
      this.pageControl["page"] += 1;
      return this._getArticles({ page: this.pageControl["page"] });
    },
    _getArticles(payload) {
      return getArticles(payload).then((res) => {
        let editedData = [];
        res.data.articles.forEach((article) => {
          article.date = article.date.slice(0, 19).replace("T", " ");
          editedData.push(article);
        });
        this.pageControl["pageCount"] = res.data.pageCount;
        this.tableData = editedData;
      });
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
}
</style>