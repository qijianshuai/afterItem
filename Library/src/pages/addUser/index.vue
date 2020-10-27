<template>
  <div>
    <!-- 新增 -->
    <el-form
    v-if="!userInfo._id"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="部门" prop="team">
        <el-input v-model="ruleForm.team"></el-input>
      </el-form-item>
      <el-form-item label="登录名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="chinaName">
        <el-input v-model="ruleForm.chinaName"></el-input>
      </el-form-item>
      <el-form-item label="冻结" prop="freeze">
        <el-switch v-model="ruleForm.freeze"></el-switch>
      </el-form-item>
      <el-form-item label="角色" prop="common">
        <el-checkbox-group v-model="ruleForm.common">
          <el-checkbox label=0 name="type">用户</el-checkbox>
          <el-checkbox label=1 name="type">管理员</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input type="textarea" v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 修改 -->
    <el-form
      v-else
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="部门" prop="team">
        <el-input v-model="ruleForm.team"></el-input>
      </el-form-item>
      <el-form-item label="登录名" prop="username">
        {{userInfo.username}}
      </el-form-item>
      <el-form-item label="名称" prop="chinaName">
        <el-input v-model="ruleForm.chinaName"></el-input>
      </el-form-item>
      <el-form-item label="冻结" prop="freeze">
        <el-switch v-model="ruleForm.freeze"></el-switch>
      </el-form-item>
      <el-form-item label="角色" prop="common">
        <el-checkbox-group v-model="ruleForm.common">
          <el-checkbox label=0 name="type">用户</el-checkbox>
          <el-checkbox label=1 name="type">管理员</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input type="textarea" v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo"
          >立即修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getUpdateUser} from '../../api'
export default {
  name: "addUser",
  data() {
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    return {
      ruleForm: {
        team:'', //部门
        chinaName: "", // 名称
        username: "", // 登录名
        freeze: true, // 冻结
        common: [], // 角色
        phone: "", // 联系电话
        password: "" // 密码hb
      },
      rules: {
        team:
        [
          { required: true, message: "请输入部门", trigger: "blur" },
          { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" }
        ],
        chinaName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
          ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        common: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请填写联系电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度不少于11位", trigger: "blur" }
          ]
      }

      
    };
  },
  props:['userInfo'],
  methods: {
    //添加用户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('adduserInfo',this.ruleForm)
          this.$message.success('添加成功')
          this.$router.push('/dictionaries')

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //更新用户信息
  async  updateInfo(){
    this.ruleForm.username = this.userInfo.username
    this.ruleForm._id = this.userInfo._id
    this.ruleForm.password = this.userInfo.password
    let result = await getUpdateUser(this.ruleForm)
    this.$message.success('更新用户成功')
    this.$router.push('/dictionaries')
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
</style>