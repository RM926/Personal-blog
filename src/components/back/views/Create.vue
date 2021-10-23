<template>
  <div class="create">
    <input type="text" placeholder="文章标题" v-model="currentArticle.title"/>
    <div class="change-view">
      <span :class="{ active: !isActive }" @click="changeView">预览</span>
      <div></div>
      <span :class="{ active: isActive }" @click="changeView">原文</span>
    </div>
    <textarea v-show="isActive " name="" id="" cols="30" rows="20" v-model="currentArticle.content"></textarea>
    <div v-show="!isActive" class="original-view" v-html='ArticleContent'></div>
    <div class="footer-contain">
      <div class="tag-area">
        <tag-input class="tag-input" v-for="(item,index) in currentArticle['tags']" 
          :key='index'
          :tags=currentArticle.tags
          :index='index'
        />
      </div>
      <div><span class="delete-contain" @click="deleteAll">清除内容</span><span class="save-draft" @click="saveDraft">存为草稿</span></div>
      <span class="post-button" @click="postArticle">发布</span>
    </div>
  <alert-box :alert="alertData"></alert-box>
  </div>
</template>

<script>
import { createArticle,patchArticle,deleteArticle } from '@/network/article.js'
import { patchDraft,createDraft } from '@/network/draft.js'
import {mapGetters,mapState,mapMutations} from 'vuex'
import TagInput from '../component/TagInput.vue'
import AlertBox from '../component/AlertBox.vue'
import marked from 'marked'
 import hljs from 'highlight.js'
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
});

export default {
  name: "Create",
  data(){
    return{
      currentArticle:{
        title:'',
        tags:[''],
        content:''
      },
      isActive:true,
      alertData:{
        message:'',
        show:false
      }
    }
  },
  computed:{
    ...mapState(['article','draft']),
    ...mapGetters(['hasArticle','hasDraft']),
    ArticleContent(){
        return this.marked(this.currentArticle.content)
    },
    hasContent(){
      return this.currentArticle.content.trim().length == 0
    }
  },
  components:{
    TagInput,
    AlertBox
  },
  mounted() {
    // console.log("mounted");
  },
  activated() {
    if(this.hasArticle){
      this.currentArticle = this.article
      if(this.currentArticle.tags.length == 0){
        this.currentArticle.tags = ['']
      }
    }else if(this.hasDraft){
      this.currentArticle = this.draft
      if(this.currentArticle.tags.length == 0){
        this.currentArticle.tags = ['']
      }
    }
  },
  methods:{
    ...mapMutations(['removeArticle','removeDraft','changeArticleView']),
    marked,
    changeView(){
      this.isActive = !this.isActive
    },
    saveDraft(){
      if(this.hasContent){
        this.$toast.show('请输入内容再上传！')
        return
      }
      //如果有draft,拿到它的aid，调用接口patch
      if(this.hasDraft){
        patchDraft(this.draft.aid,this.currentArticle).then(res => {
          if(res.status == 200){
            this.deleteAll()
            this.$toast.show('修改草稿成功！！')
            this.$router.replace('/Draft')
          }else{
            this.$toast.show('存为草稿出错！！')
          }
        })
      }else if(this.hasArticle){
        //删除文章，添加草稿，删除所有记录，跳转到Draft
        Promise.all([deleteArticle(this.article.aid),createDraft(this.currentArticle)])
        .then(res=> {
          const situation = res.every(item => {
            return item.status == 200
          })
          if(situation){
            this.$toast.show('成功将文章 "' + this.currentArticle.title + '" 转换为草稿。') 
            this.deleteAll()
            this.changeArticleView()
            this.$router.replace('/Draft')
          }else{
            this.$toast.show('文章 "' + this.currentArticle.title + '" 转换为草稿失败！！')
          }
        })
        .catch(err => {
          console.log(err)
        })
      }else{
      //如果没有，postArticle,删除this.$store.draft
        createDraft(this.currentArticle).then(res => {
          if(res.status == 200){
            this.deleteAll()
            this.$toast.show('存为草稿成功！！')
            this.$router.replace('/Draft')
          }
        })
      }
    },
    postArticle(){
     
      if(this.hasContent){
        this.$toast.show('请输入内容再上传！')
        return
      }
       //有article
      if(this.hasArticle){
        // patchArticle()
        patchArticle(this.article.aid,this.currentArticle).then(res =>{
          if(res.status == 200){
            this.$toast.show('修改文章成功')
            this.changeArticleView()
            this.deleteAll()
            this.$router.replace('/Articles')
          }else{
            this.$toast.show('修改文章失败')
          }
        })
        
      //有草稿 postArticle,deleteDraft
      }else if(this.hasDraft){
        //删除草稿，添加文章，清除记录
        Promise.all([deleteArticle(this.draft.aid),createArticle(this.currentArticle)])
        .then(res => {
           const situation = res.every(item => {
            return item.status == 200
          })
          if(situation){
            this.$toast.show('成功将草稿 "' + this.currentArticle.title + '" 转换为文章。')
          }else{
            this.$toast.show('草稿 "' + this.currentArticle.title + '" 转换为文章失败！！')
          }
          this.deleteAll()
          this.changeArticleView()
          this.$router.replace('/Articles')
        })
        .catch(err => {
          console.log(err)
        })
        
      }else{
       //都没有，postArticle,删除this.$store.article
       createArticle(this.currentArticle).then(res => {
         if(res.status == 200){
            this.$toast.show('发布文章成功')
            this.deleteAll()
            this.changeArticleView()
            this.$router.replace('/Articles')
         }else{
           this.$toast.show('发布文章失败')
         }
       })
      }
    },
    deleteAll(){
      this.currentArticle = {
        title:'',
        tags:[''],
        content:''
      }
      this.removeArticle()
      this.removeDraft()
    }

  },
};
</script>

<style scoped>
input{
  text-align:center;
  font-size:1.1rem;
  font-weight: 600;
  padding:.3rem 1rem .2rem;
  width: 15rem;
  align-self: center;
  border:none;
  border-bottom:.07rem dashed #3d3c3c
}
input,textarea{
  outline-style: none;
  font-family:FangSong,_GB2312 FangSong_GB2312,STSong，STFangsong;
}
textarea{
  width: 100%;
  height: 23rem;
  padding:.5rem .7rem;
}
.create{
  display: flex;
  flex-direction:column;
}
.change-view{
  position:relative;
  margin-top:.3rem;
  height: 1.3rem;
}
.active{
  color:rgb(19, 175, 45)
}
.change-view span{
  cursor: pointer;
  float:right;
  margin:0 0.5rem
}
.change-view div{
  height:90%;
  float:right;
  width: .05rem;
  background-color:rgb(97, 95, 95)
}
.tag-area{
  display:flex;
  flex:1
}
.tag-input{
  margin-right: .4rem;
  border-bottom:1px solid #4e4d4d;
  height:1.3rem;
}
.original-view{
  width: 41.5rem;
  height: 23rem;
  overflow-x: scroll;
  padding: .3rem 0 0 .3rem;
}
.footer-contain{
  margin-top:1rem;
  display:flex;
  justify-content:flex-end;
  align-items: center;
}
.post-button{
  font-size:1.3rem;
  color:rgb(19, 175, 45);
  margin:0 1.5rem 0 1rem;
}
.save-draft{
  margin-left: .5rem;
}
.delete-contain,.save-draft,.post-button{
  cursor: pointer;
}
.delete-contain,.save-draft,.change-view span{
  font-family:FangSong,_GB2312 FangSong_GB2312,STSong，STFangsong
}
.delete-contain{
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease,
    opacity 0.2s ease;
}
.delete-contain:hover{
  color:red;
}
</style>