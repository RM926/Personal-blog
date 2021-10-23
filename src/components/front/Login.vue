<template>
  <div class="login">
    <div class="form-area">
      
      <input
        type="text"
        class="change"
        name="name"
        v-model="name"
        placeholder="name"
        @blur="inputBlur(input1)"
        @focus="inputFocus(input1)"
        ref="input1"
      />
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
        @blur="inputBlur(input2)"
        @focus="inputFocus(input2)"
        ref="input2"
        @keydown.enter="submit"
      />
      <div>
        <input
          type="submit"
          class="submit-button"
          value="登录"
          @click="submit"
        />
       
      </div>
       <span class="iconfont icon-zhuye" @click="toHome"></span
        >
      <Footer class="Footer-bottom"></Footer>
     
    </div>
    
  </div>
</template>

<script>
import Footer from '@/components/front/component/Footer'
import { login } from "@/network/login.js";
export default {
  name: "Login",
  mounted() {
    this.input1 = this.$refs.input1;
    this.input2 = this.$refs.input2;
  },
  data() {
    return {
      input1: null,
      input2: null,
      name: "",
      password: "",
    };
  },
  components:{
    Footer
  },
  methods: {
    inputFocus(value) {
      value.classList.add("change-input");
    },
    inputBlur(value) {
      value.classList.remove("change-input");
    },
    submit() {
      if (this.name.trim() == "" || this.password.trim() == "") {
        this.$toast.show("请输入账号或密码");
        return;
      }
      const data = {
        name: this.name,
        password: this.password,
      };
      login(data).then((res) => {
        // console.log(res.data)
          this.$store.commit("setUser", res.data);
          this.$router.push("/Articles");
      }).catch(()=>{
        this.$toast.show('账号或密码输入错误！')
      });
    }, 
    toHome(){
      this.$router.push('/Home')
    }
  },
 
};
</script>

<style scoped>
.login {
  width: 100%;
  /* height: 100vh; */
  /* position: relative; */
}
.form-area {
  /* overflow: hidden; */
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  display: flex;
  flex-direction: column;
}
input {
  
  margin:1.6rem 1.8rem 0;
  text-align: center;
  padding: 0.4rem 0.2rem 0.1rem;
  outline-style: none;
  border: none;
  transition: 0.5s;
  background: transparent;
  border-bottom: 1px dashed #666666;
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
}
.change-input {
  border-bottom: 1px dashed rgb(57, 209, 43);
}
.submit-button {
  padding: .5rem .7rem;
  margin: 1.3rem;
  margin-top:1.7rem;
  border: 0.1rem solid rgb(84, 240, 149);
  cursor: pointer;
  font-size: 1rem;
}
.form-area div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-zhuye {
  margin:auto;
  margin-top:2rem;
  font-size: 1.9rem;
  color: rgb(84, 240, 149);
}
.Footer-bottom{
  margin-top:0
}
@media screen and (max-width: 400px) {
  .form-area {
    width: 60%;
  }
}
</style>