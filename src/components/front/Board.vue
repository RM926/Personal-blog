<template>
  <div class="board">
    <h1>留言板</h1>
    <p>如果有什么见解，请指教！</p>
    <p>我知道你点进来只是想看看而已</p>
    <p>那就看看吧</p>
    <div id="vcomments"></div>
    <!-- <form action="">
      <div class='input-area'>
        <div>
          <table>
            昵称
          </table>
          <input type="text" />
        </div>
        <div>
          <table>
            QQ邮箱
          </table>
          <input type="text" />
        </div>s
        <div>
          <table>
            网址
          </table>
          <input type="text" />
        </div>
      </div>
      <textarea name="" id="" cols="30" rows="7" placeholder="来都来了，留个言吧..."></textarea>
      <input class ='submit-input' type="submit" value="提交" />
    </form> -->
  </div>
</template>
<script>

import Valine from 'valine';
export default {
  name: "Board",
  data(){
    return{
      valine:null
    }
  },
   watch: {
    $route (to, from) {
      if (from.path != to.path) {
        this.valine && this.valine.setPath(to.path)
      }
    }
  },
  created(){
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
  },
};
</script>

<style scoped>
.board {
  height:100vh;
  width: 100%;
}
h1 {
  border-left: 0.3rem solid #727070;
  margin-bottom: 2rem;
  padding: 0.3rem 0.6rem;
  color: #727070;
  font-family: Microsoft YaHei, SimHei, Microsoft JhengHei;
  font-size: 1.2rem;
}
#vcomments{
  margin-top:2rem;
}
/* form {
  display: flex;
  flex-direction: column;
  padding:0 1rem 0 .6rem;
}
table {
  color:rgb(104, 103, 102);
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
  font-size: 0.7rem;
}
textarea,
input {
  padding:.4rem .2rem .1rem;
  outline-style: none;
  border: none;
  background: transparent;
  border-bottom: 1px solid #666666;
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
}
.input-area{
  display:flex;
  justify-content:space-between
}
.input-area div{
    margin-top:1rem
  }
textarea {
  margin-top:1.5rem;
  font-size: .6rem;
}
.submit-input {
  border: none;
  align-self: flex-end;
}

@media screen and (max-width:700px) {
  .input-area{
    display:block;
  }
  input{
    width:65%;
  }
}
@media screen and (max-width:500px) {
  .input-area{
    display:block;
  }
  input{
    width:80%;
  }
} */
</style>