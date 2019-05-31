<template>
  <section class="item-wrap">
    <div class="item-left">
      <div class="item-left-inner">
        <section class="item-title">
          <div>
            <span class="item-title-img"></span>
            <span>目录</span>
          </div>
          <el-tooltip class="item" effect="dark" content="添加目录或文章" placement="top">
            <a v-if="isLoginStatus" href="javascript:;" class="el-icon-plus" @click="dialogShow = true"></a>
          </el-tooltip>
        </section>
        <el-collapse v-model="activeName" v-loading="treeLoding">
          <el-collapse-item v-for="item in articleTypeData" :key="item._id" :name="item.name" :class="{ 'has-no-children': item.subArticles.length === 0 }">
            <template slot="title">
              <div class="item" :class="{current: item._id == currentId, 'waves-effect': item._id == currentId}" @click="clickDetail(item)">
                <span>{{ item.name }}</span>
              </div>
            </template>
            <div v-for="child in item.subArticles" :key="child._id" v-if="item.subArticles.length > 0" class="item" :class="{current: child._id == currentId, 'waves-effect': child._id == currentId}" @click="clickDetail(child)">
              <span>{{ child.name }}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
        <!--<section class="nodata" v-show="!navData">
                          <div>No Data</div>
                        </section>-->
        <!--<router-link to="/" class="item-back-home" :style="{ bottom: isEdit ? '116px' : '60px', 'margin-left': -600+diffMarginVal/2+'px'}" v-press>
                          <i class="icon iconfont icon-shouye-"></i>Back To Dashboard {{diffMargin()}}
                        </router-link>-->
      </div>
    </div>
    <!--<keep-alive>-->
    <router-view v-if="reInitData" @reget-catelog = "getCatelog" @active-name="getActiveName"></router-view>
    <!--</keep-alive>-->

    <dialog-add-guide :dialogShow="dialogShow" @init-data="getCatelog" @dialog-close="dialogShow = false;"></dialog-add-guide>
  </section>
</template>

<script>
import { putArticle, getCatelogTree, getArticleById, deleteArticle } from '@/api/article.js';
import dialogAddGuide from './components/dialogGuideNew.vue'
import itemDetail from './components/itemDetails.vue'

export default {
  props: {},
  data() {
    return {
      ItemData: {
        name: '',
        content: '',
      },
      currentId: '',
      activeName: '',
      articleTypeData: [],
      dialogShow: false,//是否显示新增弹框,默认不显示
      isEdit: false, //是否是编辑状态
      treeLoding: false, //目录树加载动画
      reInitData: false, //是否重新加载数据
    }
  },
  activated() {
    if(this.$route.params.id){
      this.getCatelog(this.$route.params.id);
    }else{
      this.getCatelog();      
    }
  },
  mounted() { },
  methods: {
    getCatelog(id) {  //获取左侧目录
      this.treeLoding = true;
      if (!id) {
        getCatelogTree({}).then(res => {
          if (res) {
            this.articleTypeData = res.data;
            let firstRender = this.articleTypeData.find(item => item.subArticles.length > 0);
            this.activeName = firstRender.name;
            this.clickDetail(firstRender.subArticles[0]);
            this.treeLoding = false;
          }
        }).catch(err => {
          console.log(err);
          this.treeLoding = false;
        })
      } else {
        getCatelogTree({}).then(res => {
          if (res) {
            this.articleTypeData = res.data;
            this.currentId = id;          
            this.clickDetail({_id:this.currentId});            
            this.treeLoding = false;
          }
        }).catch(err => {
          console.log(err);
          this.treeLoding = false;
        })
      }
    },
    clickDetail(child) {//获取文章详情
      if (this.isLoginStatus) { 
         //如果已经登录
        this.reInitData = false; //销毁路由视图        
      }else{
        if(child.isCatelog == 1){ //未登录,且点击了目录,则不销毁视图
             this.reInitData = true;        
        }else{  //反之,销毁
             this.reInitData = false;        
        }
      }
      return new Promise((resolve, reject) => {
        let id = child._id;
        if (this.isLoginStatus) { //如果已经登录
          this.currentId = id;
          this.$router.push(`/itemPark/itemDetail/${id}`)
          resolve();
        } else { //未登录
          if (child.isCatelog == 1) { //如果点击的是目录的话
            resolve();
          } else { //点击的非目录,高亮当前节点,并获取详情
            this.currentId = id;
            // this.$router.push(`/itemPark/itemDetail/${id}`)
            this.$router.push(`/itemPark/itemDetail/${id}`)
            resolve();
          }
        }
      }).then(() => {
          this.reInitData = true; //重构路由视图        
      }).catch(err => {
        console.log(err);
      })

    },
    getActiveName(id){
      let data = this.articleTypeData;
      let renderCatelog = data.find(item => item._id == id);
      this.activeName = renderCatelog.name;
    }
  },
  watch: {},
  computed: {
    isLoginStatus() {
      return this.$store.getters.getUser.username;
    },
  },
  components: {
    dialogAddGuide,
    itemDetail
  },
}
</script>
<style scoped lang="scss">
.item-wrap {
  width: 100%;
  margin: 110px 0 60px;
  overflow-y: auto;
  overflow-x: hidden;
}

/deep/ .item-left {
  flex: none;
  width: 288px;
  border-right: 1px solid #e6eaed;
  padding-bottom: 50px;
  position: fixed;
  overflow-y: hidden;
  overflow-x: hidden;
  top: 110px;
  left: 0;
  bottom: 0;
  &:hover {
    width: 288px;
    transition: width 1s;
    overflow-y: auto;
  }
  .item-left-inner {
    height: 2000px;
  }
  .has-no-children {
    .el-collapse-item__wrap,
    .el-collapse-item__arrow {
      display: none !important;
    }
  }
  .el-collapse-item__content {
    padding: 0;
    font-size: 14px;
  }
  .el-collapse-item__wrap {
    border-color: transparent;
  }
  .el-collapse-item__header {
    position: relative;
    padding: 0;
    border-color: transparent;
    font-size: 14px;
    background: none;
    .el-collapse-item__arrow {
      position: absolute;
      z-index: 2;
      right: 20px;
      transform: rotate(-90deg);
      font-size: 12px;
      font-weight: bold;
      &.is-active {
        transform: rotate(90deg); // color: gray;  
      }
    }
  }
  .el-collapse {
    .waves-effect {
      display: block;
    }
    border-color: transparent;
    .item {
      display: flex;
      height: 40px;
      padding: 0 20px;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
      &.current {
        background-color: #e6f7ff;
        color: #1890ff;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          display: block;
          height: 40px;
          width: 3px;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: #1890ff;
        }
      }
      span {
        display: inline-block;
        width: 230px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .el-collapse-item__content {
    .item {
      padding-left: 40px;
    }
  }
}


.item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 20px;
  font-weight: normal;
  font-size: 20px;
  border-bottom: 1px solid #e6eaed;
  div {
    width: 180px;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      height: 30px;
      margin-right: 10px;
    }
  }
  .item-title-img {
    width: 30px; //   @include bg('document.png');
    background: url("../../assets/document.png") no-repeat;
  }
  .el-icon-plus {
    color: orange;
    font-weight: 400;
    font-size: 24px;
    text-decoration: none;
  }
}

.nodata {
  position: absolute;
  left: 50%;
  top: 100px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #6f7180
}
</style>