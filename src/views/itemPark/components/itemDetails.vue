<template>
    <section class="item-content" v-loading="articleLoading">
        <el-form :rules="rules" :model="ItemData" ref="form_node" v-if="isEdit">
            <el-form-item label="" prop="title" class="item-content-edit-title">
                <el-input placeholder="Title" v-model.trim="ItemData.name"></el-input>
            </el-form-item>
            <el-form-item label="" prop="content" class="main-dialog-line-form w">
                <!--<el-upload action="http://localhost:8080/api/v1/upload" multiple :limit="3">
                                            <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>-->
                <div id="toolbar">
                    <!-- 利用label标签可以美化上传按钮 -->
                    <!--<label for="fileBtn" class="uploadFile">上传文件</label>                    -->
                    <input type="file" id="fileBtn" style="display: none" @change="uploadImage($event)">
                </div>
                <!--<img src="http://localhost:3000/public/01.gif" alt="" />
                                        </img>-->
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
import { uploadFile } from '@/api/upload.js';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link'],
    ['clean'],
    ['image']
]
const handlers = {
    'image': function image(){     //添加工具方法
        let fileInput = document.querySelector('input[type=file]');
        fileInput.click();
}
};
export default {
    props: {
    },

    data() {
        return {
            rules: {},
            ItemData: {},
            isEdit: false,
            articleLoading: false,
            editorOption: {
                modules: {
                    toolbar: {
                        container: toolbarOptions,
                        handlers: handlers  // 事件重写
                    }
                }
            },
            selectionIndex: '', //光标所在的位置
        }
    },
    //查询参数改变，再次执行数据获取方法
    created() {
        this.getArticleDetail();
    },
    mounted() {

    },
    methods: {
        // initButton() {      //在使用的页面中初始化按钮样式
        //     console.log(document);
        //     const sourceEditorButton = document.querySelector('.ql-toolbar');
        //     console.log(sourceEditorButton);
        //     let spanElement = document.createElement("span");
        //     spanElement.innerText = "上传图片";
        //     spanElement.classList.add("ql-formats");
        //     spanElement.style.cssText = "width:80px; border:1px solid #ccc; border-radius:5px;";
        //     sourceEditorButton.appendChild(spanElement);
        // },
        uploadImage(e) {
            let file = e.target.files[0];
            let formData = new FormData();
            if (file.length != 0) {//文件存在
                formData.append('file', file);
            }
            uploadFile({
                data: formData,
            }).then(res => {
                console.log(res);
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                let length = this.selectionIndex;
                // 插入图片  res.info为服务器返回的图片地址
                quill.insertEmbed(length, 'image', res.data.path)
                // 调整光标到最后
                quill.setSelection(length + 1)
            }).catch(err => {
                console.log(err);
            });
        },
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
                    if (this.$parent.getActiveName) {
                        this.$emit('active-name', this.ItemData.parentId);
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
            // this.$nextTick(() => {
            //     this.initButton();
            // })
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
        onEditorFocus(e) {
            this.selectionIndex = this.$refs.myQuillEditor.quill.selection.savedRange.index;
        }, // 获得焦点事件
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
    height: 100%;
    min-height: 600px;
    margin-left: 289px;
    padding: 15px 100px;
    margin-top: 80px;
    color: #FFF;
}

.item-content-title {
    display: flex;
    align-items: center;
    min-height: 49px;
    font-weight: normal;
    font-size: 28px;
    border-bottom: 1px solid #FFF;
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

.item-content-detail{
    margin-bottom: 100px;
}
</style>