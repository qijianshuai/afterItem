<template>
  <div id="app">
  <router-view v-if="!userInfo"></router-view>
  <div v-else>
      <h1>图书管理系统</h1>
  <el-row class="tac">
  <el-col :span="3">
    <el-card class="left">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      text-color="#333"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>图书管理</span>
        </template>
          <el-menu-item index="1-1" @click="bookView">图书</el-menu-item>
          <el-menu-item index="1-2" @click="authorView">作者管理</el-menu-item>
          <el-menu-item index="1-3" @click="dictionariesView">用户管理</el-menu-item>
      </el-submenu>
    </el-menu>
    </el-card>
  </el-col>
   <el-col :span="21">
     <el-card class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <div v-if="$route.path!=='/home'">
          <div v-show="isShow">
            <el-breadcrumb-item :to="{path:'/book'}" v-if="$route.path.indexOf('/addbook')">图书</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/addbook'}" v-else>新增图书</el-breadcrumb-item>
          </div>
          <div v-show="!isShow">
            <el-breadcrumb-item :to="{path:'/author'}" v-if="$route.path.indexOf('/author')!==-1">作者管理</el-breadcrumb-item>
            <div v-else>
              <el-breadcrumb-item :to="{path:'/dictionaries'}" v-if="!$route.path.indexOf('/dictionaries')">用户管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path:'/addAuthor'}" v-else >添加用户</el-breadcrumb-item>
            </div>
          </div>
        </div>
      </el-breadcrumb>
     </el-card>
    <el-card class="content">
       <router-view></router-view>
    </el-card>
   </el-col>
</el-row>

  </div>
</div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      isShow:true,
      isDic:false,
      userInfo:''
    }
  },
  methods: {
    //图回调
    bookView(){
      this.isShow = true
      this.$router.push('/book')
    },
    //作者管理回调
    authorView(){
      this.isShow = false
      this.$router.push('/author')
    },
    //字典配置回调
    dictionariesView(){
      this.isShow = false
      this.$router.push('/dictionaries')
    }
  },
  mounted() {
    this.userInfo = localStorage.getItem('reader')
    //绑定事件总线
    this.$bus.$on('home',()=>{
      this.userInfo = localStorage.getItem('reader')
    })
  },
}
</script>
<style lang='less' rel='stylesheet/less' scoped>
h1{
  background: hotpink;
  padding-left: 40px;
  font-size: 28px;
  height: 50px;
  line-height: 50px;
  color: #fff;
}
.left{
  // height: 1200px;
  padding: 0 !important;
  .el-menu-vertical-demo{
    font-weight: bold;
    font-size: 26px;
    padding: 0;
  }
}
.nav{
  height: 40px;
  padding-top: 20px;
}
.content{
  margin: 20px;
  padding: 10px;
}
</style>
