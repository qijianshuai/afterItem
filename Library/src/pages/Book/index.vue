<template>
  <div>
    <!-- 头部查询条件区域 -->
      <div class="search">
        <span>关键字</span>
        <el-input
          placeholder="书籍名称/关键字"
          v-model="searchCont">
        </el-input>
        <span>分类</span>
              <el-select v-model="cateId">
                <el-option value="" label="请选择分类"></el-option>
                <el-option :value="cate.id" v-for="cate in categoryList" :key="cate._id" :label="cate.text">
                </el-option>
              </el-select>
        <span>频道</span>
              <el-select v-model="chanId">
                <el-option value="" label="请选择频道"></el-option>
                <el-option :value="chan.id" v-for="chan in channelList" :key="chan._id" :label="chan.text">
                </el-option>
              </el-select>
        <div class="but">
          <el-button type="primary" size="small" @click="searchBut">查询</el-button>
          <el-button type="primary" size="small" @click="addBook">新增</el-button>
        </div>
      </div>
      <!-- 图书列表展示区域 -->
      <el-table
      v-if="searchBookList.length<1"
      :data="bookList"
      border
      style="width: 100%">
        <el-table-column
          label="封面"
          width="180" class="img">
          <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" alt="" width="80px">
          </template>
        </el-table-column>
        <el-table-column
          prop="keyWord"
          label="图书关键字"
          width="180">
        </el-table-column>
        <el-table-column
          prop="bookName"
          label="图书名称">
        </el-table-column>
        <el-table-column
          prop="authorName"
          label="作者">
        </el-table-column>
        <el-table-column
          prop="introduction"
          label="标签">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="{row,$index}">
            <el-button
              size="mini"
              type="success"
              @click="updatedBook(row)"
              >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteBook(row.bookId)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 按条件查询区域 -->
        <el-table
      v-else
      :data="searchBookList"
      border
      style="width: 100%">
        <el-table-column
          label="封面"
          width="180" class="img">
          <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" alt="" width="80px">
          </template>
        </el-table-column>
        <el-table-column
          prop="keyWord"
          label="图书关键字"
          width="180">
        </el-table-column>
        <el-table-column
          prop="bookName"
          label="图书名称">
        </el-table-column>
        <el-table-column
          prop="authorName"
          label="作者">
        </el-table-column>
        <el-table-column
          prop="introduction"
          label="标签">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="{row,$index}">
            <el-button
              size="mini"
              type="success"
              @click="updatedBook(row)"
              >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteBook(row.bookId)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: 'Book',
  data() {
    return {
      searchCont:'',//搜索的关键字
      cateId:'',//分类ID
      chanId:'',//频道ID
      searchBookList:[],//查询的图书列表
    }
  },
  computed: {
    //获取vuex状态数据
    ...mapState({
      channelList:state =>state.channelList.channelList,
      categoryList:state =>state.categoryList.categoryList,
      authorList:state =>state.authorList.authorList,
      bookList:state =>state.bookList.bookList,
    }),
  },
  mounted() {
    //分发action
    this.getchannelListAction()
    this.getcategoryListListAction()
    this.getauthorListAction()
    this.getbookListAction()
  },
  methods: {
    ...mapActions({
      // 获取
      getchannelListAction:'getchannelListAction',
      getcategoryListListAction:'getcategoryListListAction',
      getauthorListAction:'getauthorListAction',
      getbookListAction:'getbookListAction',
      //删除
      deletebookListAction:'deletebookListAction'
    }),
    //查询
    searchBut(){
      this.searchCont.trim()
      let {searchCont,cateId,chanId,bookList} = this
      //三个条件都存在
      if(cateId && chanId && searchCont){
        this.searchBookList = bookList.filter((book)=>{
          if(book.dicCategory == cateId && book.dicChannel ==chanId && (book.keyWord.indexOf(searchCont)!==-1||book.bookName==searchCont)){
            return book
          }
        })
        if(this.searchBookList.length>0){
          return this.$message.success('查询成功')
        }else{
          return this.$message.warning('没有查询到或者请选择条件查询')
        }
      }
      //三个有一个满足
      if(cateId || chanId || searchCont){
        this.searchBookList = bookList.filter((book)=>{
          if(book.dicCategory == cateId){
            return book
          }
          if(book.dicChannel ==chanId){
            return book
          }
          if(searchCont!=='' && book.keyWord &&(book.keyWord.indexOf(searchCont)!==-1||book.bookName==searchCont)){
            return book
          }
        })
        if(this.searchBookList.length>0){
          return this.$message.success('查询成功')
        }else{
          return this.$message.warning('没有查询到或者请选择条件查询')
        }
      }
      if(cateId || chanId || searchCont){

      } else{
        //当没有查询条件应该显示全部图书
        this.searchBookList =[]
        this.$message.warning('没有查询到或者请选择条件查询')
      }
    },
    //新增图书
    addBook(){
      this.$router.push('/addbook')
    },
    //编辑图书，将被编辑的图书对象传递
    updatedBook(book){
      this.$router.push({
        path:'/addbook',
        query:book
      })
    },
    //删除图书
    deleteBook(bookId){
      this.deletebookListAction(bookId)
      this.$message.success('删除成功')
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.search{
  display: flex;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  .el-input{
    width: 200px;
  }
  span{
    margin: 0 10px;
  }
  .but{
    margin-left: 20px;
  }
}
.cell{
  img{
    margin: 0 auto;
  }
}
</style>
