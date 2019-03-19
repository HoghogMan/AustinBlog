<template>
  <section class="item">
    <!--<el-button type="primary" @click="getBasicInfo" v-show="showBtn">To Item Park</el-button>-->

    <div class="item-box" v-for="item in itemDatas" :key="item._id">
      <p>Title:{{item.title}}</p>
      <p>Author:{{item.author}}</p>
      <p>Content:{{item.content}}</p>
      <el-button @click="deleteItem(item._id)">Delete</el-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      BasicInfo: {
        name: '',
        age: '',
      },
      itemDatas: [],
      showBtn: true,
    }
  },
  activated() {
    this.getItemList();
  },
  methods: {
    getBasicInfo() {
      this.axios.get('/api/v1/information')
        .then(res => {
          // 成功回调
          if (res) {
            this.BasicInfo = res.data;
            // this.$router.push('/itemPark');
            // this.showBtn = false;            
          }
        }, res => {
          // 错误回调
          console.log(err);
        })
    },
    getItemList() {//获取文章详情
      this.axios.get('/api/v1/item')
        .then(res => {
          // 成功回调
          if (res) {
            this.itemDatas = res.data;
            console.log(this.itemDatas);
          }
        }, res => {
          // 错误回调
          console.log(err);
        })
    },
    deleteItem(id) {
      let itemId = id;
      console.log(itemId);
      this.axios.delete(`/api/v1/item?_id=${itemId}`)
        .then(res => {
          // 成功回调
          // console.log(res);
          this.getItemList();
        }, res => {
          // 错误回调
          console.log(err);
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  display: flex;
  flex-direction: column;
}

.item-box {
  height: 80px;
  width: 100%;
  background-color: #FFF;
  opacity: 0.9;
  margin: 10px 10px 0 10px;
  padding: 5px;
  text-align: left;
}
</style>
