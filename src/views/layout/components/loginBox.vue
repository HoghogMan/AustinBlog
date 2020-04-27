<template>
            <section class="log-center">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
                    <el-form-item label="" prop="username">
                        <el-input placeholder="用户名" prefix-icon="el-icon-user" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input placeholder="密码" prefix-icon="el-icon-lock" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="email" v-if="isRegister">
                        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <!--<div class="register">
                  <span v-show="!isRegister" @click="registerUser">注册</span>
                </div>-->
                    <el-form-item>
                        <el-button v-if="!isRegister" @click="loginBlog('ruleForm')">登录</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" v-else>Submit</el-button>
                    </el-form-item>
                    <el-form-item>
          </el-form-item>
                </el-form>
            </section>
</template>


<script>
import { postRegisterUser, postLoginUser } from '@/api/user.js';

export default {
    data() {

        return {
            ruleForm: {
                username: '',
                password: '',
                email: ''
            },
            isRegister: false,//是否注册,默认否
            rules: {
                // pass: [
                //     { validator: validatePass, trigger: 'blur' }
                // ],
                // checkPass: [
                //     { validator: validatePass2, trigger: 'blur' }
                // ],
            }
        };
    },
    activated() {
    },
    methods: {
        submitForm(formName) { //点击登录
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    postRegisterUser({
                        data: this.ruleForm,
                    }).then(res => {
                        // console.log(res);
                        if (res.data == 1) {
                            this.isRegister = false;
                            this.resetForm(formName);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        loginBlog(formName) {
            let submitData = {
                username: this.ruleForm.username,
                password: this.ruleForm.password
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('Login', submitData).then(() => {
                        this.$emit('dialog-login');
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        resetLoginBox() {
            this.isRegister = false;
        },
        registerUser() {
            this.isRegister = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.ruleForm {
    /deep/ .el-form-item {
        .el-form-item__content {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 0 !important;
        }
    }
    .register {
        text-align: right;
        padding: 0 20px;
        margin-bottom: 20px;
        cursor: pointer;
        span {
            color: orange;
            text-decoration: underline;
            font-style: italic;
        }
    }
}
</style>
