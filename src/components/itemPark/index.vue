<template>
    <section class="wrapper">
        <section class="wrapper-content">
            <el-form :model="ItemData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="Title" prop="title">
                    <el-input v-model="ItemData.title" placeholder="Title"></el-input>
                </el-form-item>
                <el-form-item label="Author" prop="region">
                    <el-input v-model="ItemData.author" placeholder="Author"></el-input>
                </el-form-item>
                <el-form-item label="Content" prop="region">
                    <el-input type="textarea" v-model="ItemData.content" placeholder="Content"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                </el-form-item>
            </el-form>
        </section>
        <!--<a-button @click="$router.push('/')">
                                back to home
                            </a-button>-->
    </section>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            ItemData: {
                title: '',
                author: '',
                content: '',
                // date: {
                //     type: Date,
                //     default: Date.now
                // },
            },
            rules: {

            }
        }
    },
    activated() {

    },
    mounted() { },
    methods: {
        submitForm() { 
            //提交文章
            console.log(this.ItemData);
            this.axios.post('/api/v1/item',this.ItemData)
                .then(res => {
                    // 成功回调
                    console.log(res);
                    if (res) {
                        console.log(res);
                        this.$router.push('/');             
                    }
                }, res => {
                    // 错误回调
                    console.log(err);
                })
        }
    },
    watch: {},
    computed: {},
    components: {},
}
</script>
<style scoped>
.wrapper {
    padding: 10px;
}

.wrapper-content {
    width: 100%;
    height: 520px;
    background-color: #FFF;
    opacity: 0.9;
    border-radius: 4px;
}
</style>