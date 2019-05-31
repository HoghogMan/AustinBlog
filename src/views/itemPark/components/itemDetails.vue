<template>
    <section class="item-content" v-loading = "articleLoading">
        <el-form :rules="rules" :model="ItemData" ref="form_node" v-if="isEdit">
            <el-form-item label="" prop="title" class="item-content-edit-title">
                <el-input placeholder="Title" v-model.trim="ItemData.name"></el-input>
            </el-form-item>
            <el-form-item label="" prop="content" class="main-dialog-line-form w">
                <quill-editor v-model="ItemData.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
                </quill-editor>
            </el-form-item>
        </el-form>

        <div v-else>
            <h2 class="item-content-title">{{ItemData.name}}</h2>
            <ul class="item-content-statistics">
                <li>
                    <i class="main-icon el-icon-date"></i>&nbsp;&nbsp;日期: {{ItemData.date | parseTime}}</li>
                <li>
                    <i class="main-icon el-icon-view"></i>
                    <span>&nbsp;&nbsp;访问量: </span>{{ItemData.visits}}</li>
            </ul>
            <div class="item-content-detail m-editor-default" v-highlight v-html="ItemData.content">
            </div>
        </div>
        <section class="item-btn">
            <div v-if="isEdit">
                <el-button class="main-btn-normal" v-if="isLoginStatus" @click="cancelEdit">取消</el-button>
                <el-button type="primary" v-if="isLoginStatus" class="main-btn-normal main-btn-green" @click="submitItem">提交</el-button>
            </div>
            <div v-else>
                <el-button class="main-btn-normal" v-if="isLoginStatus" @click="deleteItem">删除</el-button>
                <el-button type="primary" v-if="isLoginStatus" class="main-btn-normal main-btn-blue" @click="editItem">编辑</el-button>
            </div>
        </section>
    </section>
</template>

<script>
import { putArticle, getArticleById, deleteArticle } from '@/api/article.js';


export default {
    props: {
    },
    data() {
        return {
            rules: {},
            ItemData: {},
            isEdit: false,
            editorOption: {},
            articleLoading: false,
        }
    },
    //查询参数改变，再次执行数据获取方法
    created() {
        this.getArticleDetail();
    },
    mounted() { },
    methods: {
        getArticleDetail() {
            this.articleLoading = true;
            let id = this.$route.params.id;
            getArticleById({
                params: {
                    _id: id
                }
            }).then(res => {
                if (res) {
                    this.ItemData = res.data;
                    if(this.$parent.getActiveName){
                        this.$emit('active-name',this.ItemData.parentId);                                
                    }
                    this.articleLoading = false;                    
                }
            }).catch(err => {
                    console.log(err);
                    this.articleLoading = false;                                    
            })
        },
         submitItem() {
      //提交文章
      let submitData = {
        name: this.ItemData.name,
        content: this.ItemData.content
      }
      putArticle({
        data: submitData,
        params: {
          _id: this.$route.params.id
        },
        custom: {// 自定义注入参数
          messageShow: true // 是否显示接口提示框，true显示，false不显示
        }
      })
        .then(res => {
          // 成功回调
          if (res) {
            this.getArticleDetail();
            this.isEdit = false;
            this.$emit('reget-catelog');            
          }
        }).catch(err => {
          console.log(err);
        })
    },
    editItem() { //点击编辑按钮
      this.isEdit = true;
    },
    deleteItem() {//删除文章
      let name = this.ItemData.name;
      this.$alert(`确认删除 ${name} ?`, '删除', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        showClose: false,
        showCancelButton: true,
      }).then((res) => {
        deleteArticle({
          params: {
            _id: this.$route.params.id
          }
        }).then(res => {
          this.$message({
            showClose: true,
            message: 'Success!',
            type: 'success',
          });
        this.$emit('reget-catelog');                      
          // console.log(res);
        }).catch(err => {
          console.log(err);
        })
      })
    },
    cancelEdit() { //取消编辑
      this.isEdit = false;
    },
    onEditorReady(editor) { // 准备编辑器
    },
    onEditorBlur() { }, // 失去焦点事件
    onEditorFocus() { }, // 获得焦点事件
    onEditorChange() { }, // 内容改变事件
    saveHtml: function(event) {
      alert(this.content);
    }
    },
    watch: {},
    computed: {
        isLoginStatus() {
            return this.$store.getters.getUser.username;
        },
    },
    components: {},
}
</script>
<style lang="scss" scoped>
.item-btn {
    margin-top: 20px;
    text-align: right;
}

.item-content {
    margin-left: 270px;
    padding: 15px 30px;
}

.item-content-title {
    display: flex;
    align-items: center;
    min-height: 49px;
    font-weight: normal;
    font-size: 28px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    word-break: normal;
}

.item-content-statistics {
    height: 30px;
    line-height: 30px;
    display: flex;
    li {
        margin-right: 40px;
        i {
            position: relative;
            top: 1px;
        }
    }
}

.item-content-detail {
    // padding: 10px 0 0 0;
    // word-break: break-word;
    // p {
    //   line-height: 22px;
    // }
}

/deep/ .item-content-edit-title {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    .el-form-item__label {
        padding: 0;
    }
    .el-form-item__content {
        width: 100%;
        .el-input__inner {
            padding: 0 4px;
            border: 0 none;
        }
    }
}
</style>