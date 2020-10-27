<template>
  <div class="wrap">
    <el-row type="flex" justify="end" align="middle" class="box-row">
        <el-col :span="6" class="box" :pull="4">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" width="360px">
                <el-form-item label="账户" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import {toLogin} from '../../api'
export default {
  name: 'Login',
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入您的账户', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入您的密码', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      async submitForm() {
          //登录请求
        let result = await toLogin(this.ruleForm)
        //登录成功
        if(result.data.code===200){
            //将用户信息存入本地
            localStorage.setItem('reader',JSON.stringify(result.data.userInfo))
            //提示登录成功
            this.$message.success('登录成功')
            // 分发事件
            this.$bus.$emit('home')
            this.$router.replace('/home')
        }else if(result.data.code===203){
          //提示登录成功
            this.$message.warning('当前账户被锁定，请找管理员解冻')
        }else if(result.data.code===502){
            this.$message.warning('密码不正确')
        }else{
            this.$message.warning('登陆失败')
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.wrap{
    width: 100%;
    height: 721px;
    padding-top: 1px;
    background-color: green;
    background-image: url('http://bookstore.zealon.cn/0-6.png');
    .box-row{
        margin-top: 160px;
        height: 300px;
    }
    .box{
        background: #fff;
        height: 100%;
        text-align: center;
    }
    .el-form.demo-ruleForm{
        width: 360px;
        text-align: center;
        position: relative;
        top: 50%;
        left: -10px;
        transform: translateY(-50%);
    }
}
</style>
