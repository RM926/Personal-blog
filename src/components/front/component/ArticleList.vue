<template>
  <div class="articlelist">
    <ul>
      <li v-for="(item) in articleList" :key="item.date">
        <div class='article-title' @click="toDetail(item)">{{ item.title }}</div>
        <div class='detail-info'><span>{{ item.date | date}}</span></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {};
  },
  filters:{
    date(value){
      let result = value.replace('T',' ').slice(0,19)
      return result
    }
  },
  props: {
    articleList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods:{
    contentFresh(){
      console.log(1)
    },
    toDetail(item){
      this.$router.push('/Article/' + item.aid)
    }
  }
};
</script>

<style scoped>
.articlelist ul{
  display:flex;
  flex-direction: column;
  margin-top:1rem;
  padding:0;
}
.articlelist ul li{
  margin:0;
  display:flex;
  flex-direction: column;
  padding:0 .4rem;
  border-bottom:1px dashed #969393;
}
.article-title{
  align-self: flex-start;
  margin:1.8rem 0 0;
  font-size:1.2rem;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, opacity 0.2s ease;
}
.article-title:hover{
  /* color:#08865C; */
  color:#7DECC2;
}
.articlelist ul li .detail-info{
  display:flex;
  justify-content: flex-end;
  margin-bottom:.2rem;
  font-size:.9rem;
}
@media screen and (max-width:700px) {
  .created-date{
    margin-top:1rem;
  }
}
</style>