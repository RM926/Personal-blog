<template>
  <div class="link">
    <h1 class="title">友链</h1>
    <ul>
      <li v-for="(item, index) in tableData" :key="index">
        <div class="name">
          <a :href="item.weblink">{{ item.name }}</a>
        </div>
        <p class="mottom">{{ item.mottom }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getLinks } from "@/network/link.js";

export default {
  name: "Link",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    getLinks().then((res) => {
      if (res.status == 200) {
        this.tableData = res.data;
      }
    });
  },
};
</script>

<style scoped>
p{
  margin:0;
  margin-top:.3rem;
}
.link {
  width: 100%;
}
.title {
  border-left: 0.3rem solid #727070;
  margin-bottom: 2rem;
  padding: 0.3rem 0.6rem;
  color: #727070;
  font-family: Microsoft YaHei, SimHei, Microsoft JhengHei;
  font-size: 1.2rem;
}
ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
li {
  width: 40%;
  margin-top: 1.5rem;
  padding-left: 0.3rem;
  border-bottom: 1px dashed rgb(70, 71, 70);
}
ul li:nth-of-type(odd) a {
  color: rgb(8, 110, 194);
}
ul li:nth-of-type(even) a {
  color: rgb(172, 100, 7);
}
@media screen and (max-width: 430px) {
  .link ul {
    display: block;
    flex-wrap: wrap;
  }
  .link ul li {
    width: 70%;
  }
}
</style>