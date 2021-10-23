<template>
  <div class="tag_div" v-if="show">
    <input
      type="text"
      class="newInput"
      placeholder="标签"
      v-model="tagContent"
      onfocus="this.placeholder=''"
      @blur="isRepeated"
      @keydown.enter="addTag"
    />
    <i class="el-icon-close delTag" @click="delTag" ></i>
    <i
      class="el-icon-circle-plus-outline addTag"
      @click="addTag"
      v-if="index === tags.length - 1"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  props: {
    tags: Array,
    index: Number,
  },
  methods: {
    delTag() {
      this.tags.splice(this.index, 1); // 通过操作数组来删除标签
      console.log(this.tags);
    },
    addTag() {
      this.tags.push(""); // 通过操作数组来增加空标签
      setTimeout(() => {
        document.getElementsByClassName("newInput")[this.index + 1].focus(); // 新生成的空标签获得焦点
      }, 0);
    },
    isRepeated() {
      let currentIndex = this.index;
      let currentValue = this.tags[currentIndex];
      while (currentIndex) {
        if (
          currentValue.toLowerCase() ===
          this.tags[currentIndex - 1].toLowerCase()
        ) {
          // 标签去重
          console.log('hhh')
          this.tags.splice(this.index, 1, "");
          break;
        } else {
          currentIndex--;
        }
      }
    },
  },
  computed: {
    tagContent: {
      get() {
        return this.tags[this.index]; // 获取标签数组元素值
      },
      set(value) {
        this.tags[this.index] = value.trim(); // 改变标签数组
      },
    },
  },
};
</script>

<style scoped>
tag_div {
  position: relative;
}
.tag_div:hover .delTag{
  color:red;
}
input {
  /* position:relative; */
  width: 3.5rem;
  padding: 0 0.2rem;
  outline-style:none; 
  font-size: 0.8rem;
  font-family: FangSong, _GB2312 FangSong_GB2312, STSong，STFangsong;
  border: none;
  /* border-bottom: 0.01rem solid rgb(82, 81, 81); */
}
.delTag{
  position: absolute;
  transform: translate(-60%,-20%); 
  color:transparent;
  transition:.5s;
  width: 1rem;
  height: 1rem;
}
.addTag {
 margin-left: .7rem;
 font-size:1.2rem;
}
</style>