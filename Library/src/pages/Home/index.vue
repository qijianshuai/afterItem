<template>
  <div>
    <el-row>
      <el-col :span="18">
        <div class="item-left">
          <h2>最新图书</h2>
          <ul>
            <li v-for="book in bookList" :key="book._id">
              <img :src="book.imgUrl" :alt="book.bookName">
              <div class="book-wrap">
                <p>{{book.bookName}}</p>
                <span>{{book.authorName}}</span>
              </div>
              <el-tag class="tag" type="success">{{getDicCategory(book.dicCategory)}}</el-tag>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="item-right">
          <h2>作品量排行</h2>
          <div class="author-wrap" v-for="au in authorList" :key="au._id">
            <img :src="au.headImgUrl" alt="">
            <p>{{au.name}}({{getAuthorBookNum(au.id)}})</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState({
      channelList:state =>state.channelList.channelList,
      categoryList:state =>state.categoryList.categoryList,
      authorList:state =>state.authorList.authorList,
      bookList:state =>state.bookList.bookList,
    }),

  },
  mounted() {
    this.getchannelListAction()
    this.getcategoryListListAction()
    this.getauthorListAction()
    this.getbookListAction()
  },
  methods: {
    ...mapActions({
      getchannelListAction:'getchannelListAction',
      getcategoryListListAction:'getcategoryListListAction',
      getauthorListAction:'getauthorListAction',
      getbookListAction:'getbookListAction'
    }),
    //获取对应的分类
    getDicCategory(num){
    switch(num) {
      case '1':
        return "都市小说"
      case '2':
        return "东方玄幻"
      case '3':
        return "武侠仙侠"
      case '4':
        return "悬疑惊悚"
      case '5':
        return "西方玄幻"
      case '6':
        return "网游竞技"
      case '7':
        return "科幻未来"
      case '8':
        return "历史穿越"
      case '333':
        return "英语阅读"
      default:
        return "其他" 
      } 
    },
    //获取对应作者的书的数量
    getAuthorBookNum(id){
    let re = this.bookList.reduce((pre,item)=>{
        // console.log(pre,item,id)
        if(item.authorId == id){
          return pre+=1
        }
        return pre+=0
      },0)
      return re
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.item-left{
  // background: hotpink;
  padding-right: 20px;
  h2{
    font-weight: bold;
    margin: 5px 0;
  }
    ul{
    li{
      position: relative;
      margin-bottom: 10px;
      display: flex;
      img{
        width: 80px;
        height: 100px;
      }
      .book-wrap{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
        padding: 5px 0;
        span{
          color: skyblue;
        }
      }
      .tag{
        position: absolute;
        left: auto;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
.item-right{
  // background: gold;
  margin-left:40px;
  h2{
    font-weight: bold;
    margin: 5px 0;
  }
  .author-wrap{
    display: flex;
    height: 60px;
    line-height: 60px;
    img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    p{
      padding-left: 10px;
    }
  }

}
</style>
