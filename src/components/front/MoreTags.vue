<template>
  <div class="moretags">
    <my-header/>
    <h3 class="title">标签</h3>
    <ul>
      <li v-for="item in tags" :key="item" @click='tagClick(item)'>#{{item}}</li>
    </ul>
      <div class="back">
        <span @click='back'>&nbsp; 返 回 &nbsp;</span>
    </div>
  </div>
</template>

<script>
import { getTags } from '@/network/tags'
export default {
  name:'MoreTags',
  data(){
    return {
      tags:[]
    }
  },
  mounted(){
     if (!this.$store.state.tags.length) {
      getTags().then((tags) => {
        this.$store.commit("changeTags", tags);
        this.tags = this.$store.state.tags;
      });
    }else{
      this.tags = this.$store.state.tags
    }
  },
  methods:{
    back(){
      this.$router.back()
    },
    tagClick(tag){
     this.$router.push('/tagArticle/' + tag)
    }
  }
}
</script>

<style scoped>
.moretags{
  width:100%;
}
h3{
  font-size:1.2rem;
}
.title{
  position:relative;
  left: 50%;
  transform: translateX(-50%);
  display:inline-block;
  margin-bottom:1rem;
  padding:0.3rem 0.7rem;
  border-bottom:1px solid #666;
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
}
.moretags ul{
  display:flex;
  flex-flow: wrap;
  margin-bottom:3rem;
}
.moretags ul li{
  margin:1.5rem 1.2rem 0;
  padding:0 1rem;
  cursor: pointer;
}
li:hover{
  color:rgb(10, 184, 126);
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
</style>