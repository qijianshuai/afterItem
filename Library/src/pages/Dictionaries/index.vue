<template>
 <div>

       <!-- 第一个卡片 -->
      <el-card>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <!-- 第一个表单项 -->
           <el-form-item label="关键字">
              <el-input v-model="form.keyWord" placeholder="用户名/ID" style="width:100px"></el-input>
          </el-form-item>
          <!-- 频道 -->
          <el-form-item>
            <el-button type="primary" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="isShowAdd" >新增</el-button>
         </el-form-item>
        </el-form>

      </el-card>
      <!-- 字典配置展示区域 -->
      <el-table
      :data="userList"
      border
      style="width: 100%">
         <el-table-column
          type="index"
          label="序"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="chinaName"
          label="中文名">
        </el-table-column>
         <el-table-column
          prop="team"
          label="组织">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
         <el-table-column
          prop="common"
          label="角色">
        </el-table-column>
        <el-table-column
          label="冻结" prop="freeze">
          <template slot-scope="{row,$index}">
          <el-switch
           v-model="row.freeze"
           disabled
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
          </template>  
        </el-table-column>
        <el-table-column
          prop="id"
          label="重置">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300px"
          >
          <template slot-scope="{row,$index}">
            <el-button
              size="mini"
              type="success"
              @click="isShowUpdate(row)"
              >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteInfo(row.bookId)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

  </div>
</template>

<script>
import {getUserList} from '../../api/index.js'
export default {
  name: 'Dictionaries',
    data() {
        return {
          arr:[],
          //表示当前是修改还是添加
          updateTag:false,
          //用户类表
          userList:[],
          //组织的类
          teamList:[],
          form:{
            //keyword
            keyWord:'',
          },
          //设置表单项前文字的宽度
          formLabelWidth:'120px',
          isShowDialog:false,
       }
      },
  mounted(){
    //获取用户类表
    this.getUserList()
  },
  methods: {
    //点击添加按钮显示增加品牌的对话框
    isShowAdd(){
        this.$router.push('/addAuthor')
    },
    
    //获取用户类表
    async getUserList(){
      const result = await getUserList()
        this.userList = result.data.map((item)=>{
          if(item.freeze==0){
              item.freeze = false
          }else{
            item.freeze = true
          }
          return item
      })
    },
    //修改用户数据
    isShowUpdate(row){
        this.$router.push({
          path:'/addAuthor',
          query:row
        })
    }
}
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
</style>
