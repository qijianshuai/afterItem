<template>
  <div>
      <el-button type="primary" size="small" @click="addAuthor">新增</el-button>
      <!-- 作者展示区域 -->
      <el-table
      :data="authorData"
      border
      style="width: 100%">
        <el-table-column
          label="头像"
          width="180" class="img">
          <template slot-scope="{row,$index}">
            <img :src="row.headImgUrl" alt="" width="80px">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="作者名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="introduction"
          label="简介">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="{row,$index}">
            <el-button
              size="mini"
              type="success"
              @click="updatedAuthor(row)"
              >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAuthor(row.bookId)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size='10'
        @next-click="goPage"
        @prev-click="fromPage"
        @current-change="goCurrentPage"
        :total="authorList.length">
      </el-pagination>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Author',
  data() {
    return {
      authorData:[]
    }
  },
  mounted() {
    this.authorData=this.currentPage.firstPage
  },
  //获取作者列表
  computed: {
    ...mapState({
      authorList:state =>state.authorList.authorList,
    }),
    currentPage(){
      let firstPage = this.authorList.slice(0,10)
      let lastPage = this.authorList.slice(10)
      return {firstPage,lastPage}
    }
  },
  methods: {
    //新增作者
    addAuthor(){
      this.$message.warning('您的操作权限不够')
    },
    //更新作者信息
    updatedAuthor(author){
      this.$message.warning('您的操作权限不够')
    },
    //删除作者
    deleteAuthor(id){
      this.$message.warning('您的操作权限不够')
    },
    //分页组件相关回调
    //下一页
    goPage(){
      this.authorData=this.currentPage.lastPage
    },
    //上一页
    fromPage(){
      this.authorData=this.currentPage.firstPage
    },
    //当前页发生改变
    goCurrentPage(currPage){
      if(currPage===1){
        this.authorData=this.currentPage.firstPage
      }else{
        this.authorData=this.currentPage.lastPage
      }
    }
    
  },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
img{
  border-radius: 50%;
}
</style>
