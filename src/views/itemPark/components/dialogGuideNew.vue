<template>
  <section>
    <el-dialog class="main-dialog-line main-table-border" title="New" :visible.sync="dialogShow" :before-close="dialogClose" @open="dialogOpen"  :modal-append-to-body='true' :close-on-click-modal="false">
      <el-form class="d-flex flex-wrap" :model="formData" :rules="rules" ref="formNode">
        <el-form-item label="Parent:" prop="parentId" class="main-dialog-line-form w">
          <el-cascader class="w" v-model="formData.parentId" change-on-select :options="typesAll" 
          :props="{
          value: '_id',
          label: 'name',
          children: 'subArticles'
        }" :clearable="true"
        @change="changeSelect">
          </el-cascader>
        </el-form-item>

        <el-form-item label="Name:" prop="name" class="main-dialog-line-form w">
          <el-input placeholder="Name" v-model.trim="formData.name"></el-input>
        </el-form-item>

        <el-form-item label="Set as a Catalog:" prop="isCatelog" class="main-dialog-line-form w" v-if = "showIsCatalog">
          <el-radio-group class="main-radio" v-model="formData.isCatelog">
            <el-radio :label="0">No</el-radio>
            <el-radio :label="1">Yes</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose" class="el-button main-btn-normal el-button--default">Cancel</el-button>
        <el-button type="primary" @click="submit()" class="el-button main-btn-normal main-btn-blue el-button--primary" v-loading="submitLoading" element-loading-spinner="el-icon-loading">OK</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
// import { messageRule } from "@/utils/message";
import { postCatelog , getCatelogList } from '@/api/article.js';

export default {
  props: {
    dialogShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let that = this;  
    return {
      formData: {
        // content: '',
        isCatelog: 0,
        name: '',
        parentId: [],
      },
      showIsCatalog: true,//是否显示选择是否为目录单选框
      submitLoading: false,
      typesAll: [{//所有的type,默认一个顶层
        _id: '0',
        name: 'Top',
        subArticles: []
      }],
      rules: {//表单验证
      },
    }
  },
  async created() {
    await this.getParentListData();
  },
  methods: {
    getParentListData(){
      getCatelogList({}).then(res => {
        if(res){
          this.typesAll[0].subArticles = res.data;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    dialogClose() {
      this.clearFrom();
      this.$emit('dialog-close');
    },
    dialogOpen() {
      this.getParentListData();
      this.showIsCatalog = true; //是否显示选择是否为目录单选框      
    },
    submit() {
      if (this.submitLoading) { //防抖
        return;
      }
      let submitData = JSON.parse(JSON.stringify(this.formData));
      // console.log(submitData);
      if(submitData.parentId && submitData.parentId.length > 0){
          submitData.parentId = submitData.parentId[submitData.parentId.length - 1].toString();
      }else{
          submitData.parentId = '';
      }
      // if(this.isUserGuide){
      //     submitData.type = 1;
      // }else{
      //     submitData.type = 2;        
      // }
      this.$refs.formNode.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true;
           postCatelog({ data: submitData }).then(res => {
            this.submitLoading = false;
            this.$emit('dialog-close');
            if(submitData.isCatelog == 0){ //如果新增的为文章
            let id = res.data;
            this.$emit('init-data',id);                
            }else{ //如果新增的为目录
                this.$emit('init-data');                
            }
            // console.log(res);
            this.clearFrom();
          }).catch(err => {
            console.log(err);
          })

        }
      });
    },
    changeSelect(val){
      if(val && val.length > 1){
        this.formData.isCatelog = 0;
        this.showIsCatalog = false;
      }else{
        this.showIsCatalog = true;        
      }
    },
    clearFrom() {//清空表单为原始值
      this.$refs['formNode'].resetFields();
    },
  },
  watch: {
   
  },
  computed: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/deep/.main-dialog-line {
  .el-dialog {
    min-height: auto;
  }
}
</style>
