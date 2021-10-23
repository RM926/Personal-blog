<template>
  <div class='mytabbar'>
    <router-link class='tabbar-item' to='/Blog'>BLOG</router-link>
    <router-link class='tabbar-item' to='/Board'>BOARD</router-link>
    <router-link class='tabbar-item' to='/Link'>LINK</router-link>
    <router-link class='tabbar-item' to='/Me'>ME</router-link>
  </div>
</template>

<script>
export default{
  name:'MyTabbar',
}
</script>

<style scoped>
.mytabbar{
  margin:2rem 0;
}
.tabbar-item{
  margin:0 1rem;
  padding:0 0.5rem;
  font-family:Helvetica,Arial, sans-serif;
  font-weight: 600;
  text-decoration:none;
}
.tabbar-item:hover {
  cursor: pointer;
  border-bottom:0.2rem solid #993333;
}
/* .router-link-active{
  color:black;
} */
@media screen and (max-width:400px) {
  .tabbar-item{
  margin:0 0.8rem;
  padding:0 0.3rem;
  }
}
</style>
