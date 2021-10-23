<template>
  <div class="draft">
    <p class="title">我的草稿</p>
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
import { getDraft } from "@/network/draft.js";
import { deleteArticle } from "@/network/article.js";
import Table from "@/components/back/component/Table";
import PageControl from "../component/PageControl.vue";
import AlertBox from "@/components/back/component/AlertBox";


export default {
  name: "Draft",
  components: {
    Table,
    PageControl,
    AlertBox
  },
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
    };
  },
  component:{
    Table,
    PageControl,
  },
  computed: {},
  mounted() {
    this._getDraft({ page: 1 })
  },
  methods: {
    eidt(item){
      this.$store.commit('addDraft',item)
      this.$store.commit('removeArticle')
      this.$router.push('/Create')
    },
    deleteAlert(article) {
      this.currentArticle = article;
      this.alertData = {
        message: '确定删除 "' + this.currentArticle.title + '" 这篇草稿吗？',
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
          setTimeout(() => {
            this.$toast.show('删除 "' + this.currentArticle['title'] + '" 草稿成功')
          }, 1000);
        }
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
            this.$toast.show('删除 "' + this.currentArticle['title'] + '" 草稿失败')
          }, 1000);
      })
    },
    lastpage() {
      this.pageControl["page"] -= 1;
      this._getDraft({ page: this.pageControl["page"] });
    },
    nextpage() {
      this.pageControl["page"] += 1;
      this._getDraft({ page: this.pageControl["page"] });
    },
    _getDraft(payload) {
      getDraft(payload).then((res) => {
        let editedData = []
        res.data.articles.forEach((article) => {
          article.date = article.date.slice(0, 19).replace("T", " ");
          editedData.push(article) 
        });
        this.pageControl["pageCount"] = res.data.pageCount;
        this.tableData = editedData
      });
    }
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