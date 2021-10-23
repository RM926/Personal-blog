<template>
  <div class="search">
    <p class="title">友联</p>
    <span v-if="isEdit" class="state">修改"{{ currentLink.name }}"中...</span>
    <form action="">
      <input type="text" placeholder="name" v-model="name" />
      <input type="text" placeholder="mottom" v-model="mottom" />
      <input type="text" placeholder="weblink" v-model="weblink" />
    </form>
    <div class="operating-button">
      <span v-if="isEdit" @click="cancelEdit">取消修改</span>
      <span v-if="isEdit" @click="confirmEdit">确定修改</span>
      <span v-if="!isEdit" class="addLink" @click="addLink">添加</span>
    </div>
    <link-table
      :data="tableData"
      @editClick="edit"
      @deleteClick="deleteLink"
    ></link-table>
  </div>
</template>

<script>
import { createLink, getLinks, deleteLink, patchLink } from "@/network/link.js";
import LinkTable from "../component/LinkTable.vue";
export default {
  name: "FriendLink",
  data() {
    return {
      name: "",
      mottom: "",
      weblink: "",
      currentLink: {},
      tableData: [],
      Yposition: 0,
    };
  },
  computed: {
    isEdit() {
      return this.currentLink._id ? true : false;
    },
  },
  components: {
    LinkTable,
  },
  mounted() {
    getLinks().then((res) => {
      this.tableData = res.data;
    });
  },
  methods: {
    addLink() {
      if (
        this.name.trim() == "" ||
        this.weblink.trim() == "" ||
        this.mottom.trim() == ""
      ) {
        this.$toast.show("还有内容没有输入");
        return;
      }
      const link = {
        name: this.name,
        mottom: this.mottom,
        weblink: this.weblink,
      };
      createLink(link)
        .then((res) => {
          if (res.status == 200) {
            this.$toast.show("添加成功");
            (this.name = ""), (this.mottom = ""), (this.weblink = "");
            this.tableData.unshift(res.data.link);
          }
        })
        .catch(() => {
          this.$toast.show("添加失败！");
        });
    },
    edit({ index, scrollPosition }) {
      window.scrollTo(0, 0);
      this.Yposition = scrollPosition;
      this.currentLink = this.tableData[index];
      this.name = this.currentLink.name;
      this.mottom = this.currentLink.mottom;
      this.weblink = this.currentLink.weblink;
    },
    deleteLink(index) {
      console.log(index);
      console.log(this.tableData[index]);
      deleteLink(this.tableData[index]._id).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.tableData.splice(index, 1);
        }
      });
    },
    cancelEdit() {
      window.scrollTo(0, this.Yposition);
      this.currentLink = {};
      (this.name = ""), (this.mottom = ""), (this.weblink = "");
    },
    confirmEdit() {
      const link = {
        name: this.name,
        mottom: this.mottom,
        weblink: this.weblink,
      };
      new Promise((resolve) => {
        patchLink(this.currentLink._id, link).then((res) => {
          if (res.status == 200) {
            const message = '修改"' + this.currentLink['name'] + '"成功'
            this.$toast.show(message)
            this.currentLink = {};
            (this.name = ""), (this.mottom = ""), (this.weblink = "");
            resolve();
          }
        });
      }).then(() => {
        getLinks().then((res) => {
          this.tableData = res.data;
        });
      });
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
}
.state {
  padding: 0 0.6rem;
  margin-top: 1rem;
}
form {
  display: flex;
  justify-content: space-around;
  margin-top: 2.5rem;
}
form input {
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
  width: 30%;
  text-align: center;
  outline: none;
  border: none;
  border-bottom: 1px dashed cadetblue;
}
span {
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
}
.operating-button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1.3rem 0;
  padding: 0 3rem;
}
.addLink {
  font-size: 1.3rem;
}
.operating-button span {
  padding: 0 0.5rem;
}
</style>