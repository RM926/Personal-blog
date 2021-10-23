<template>
  <div class="table">
    <table>
      <thead>
        <tr ref="tr">
          <th>网名</th>
          <th>签名</th>
          <th>网址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in data" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.mottom}}</td>
          <td>{{item.weblink}}</td>
          <td>
            <span class="edit" @click="edit(index,$event)">编辑</span>&nbsp;&nbsp;<span class="delete" @click="deleteLink(index)"
              >删除</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    // AlertBox,
  },
  methods: {
    edit(index,event){
      const scrollPosition = event.pageY - 40
      this.$emit('editClick',{index,scrollPosition})
    },
    deleteLink(index){
      this.$emit('deleteClick',index)
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
th,
td {
  flex: 1;
  border-bottom: 1px solid #727070;
  text-align: center;
  padding: 0.5rem 0;
  font-size: 0.9rem;
}
th {
  color: #727070;
}
tr {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
tr:hover td {
  font-weight: 600;
}
td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.edit,
.delete {
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease,
    opacity 0.2s ease;
}
.edit:hover {
  color: #7decc2;
}
.delete:hover {
  color: red;
}
</style>