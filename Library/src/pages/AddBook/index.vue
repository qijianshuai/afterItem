<template>
  <el-form
    :model="newBook"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="书籍名称" prop="bookName">
    <el-input v-model="newBook.bookName" ></el-input>
    </el-form-item>
    <el-form-item label="所属分类" prop="dicCategory">
      <el-select v-model="newBook.dicCategory" placeholder="请选择分类">
        <el-option :value="cate.id" v-for="cate in categoryList" :key="cate._id" :label="cate.text"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="上架状态" prop="delivery">
      <el-switch v-model="newBook.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="所属频道" prop="dicChannel">
      <el-radio-group v-model="newBook.dicChannel">
        <el-radio :label="cann.id" v-for="cann in channelList" :key="cann.id">{{cann.text}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="连载状态" prop="bookState">
      <el-radio-group v-model="newBook.bookState">
        <el-radio label=1>连载</el-radio>
        <el-radio label=2>暂更</el-radio>
        <el-radio label=3>完结</el-radio>
        <el-radio label=4>玄幻</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="作者" prop="authorId">
      <el-select v-model="newBook.authorId" placeholder="请选择分类">
        <el-option :label="au.name" :value="au.id" v-for="au in authorList" :key="au._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="BookID" prop="bookId">
    <el-input v-model="newBook.bookId"></el-input>
    </el-form-item>
    <el-form-item label="封面地址" prop="imgUrl">
        <el-upload
        class="avatar-uploader"
        action="/dev-api/admin/product/fileUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="newBook.imgUrl" :src="newBook.imgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="简介" prop="content">
      <el-input type="textarea" v-model="newBook.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="unpdateOneBook" v-if="book.name">立即更新</el-button>
      <el-button type="primary" @click="addOneBook" v-else>立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {uploadImgPost} from '../../api/index'
export default {
  name: "AddBook",
  data() {
    return {
        //表单数据对象
        newBook: {
        bookName: '',//书名
        authorId: '',//作者id
        dicCategory: '',//分类id
        dicChannel: '1',//频道id
        bookState:'1',//图书连载状态
        delivery: true,//上架状态
        bookId: '',//图书id
        imgUrl: '',//封面地址
        content:''//图书简介
        },
        // 校验规则
        rules: {
            bookName: [
            { required: true, message: '请输入书籍名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            authorId: [
            { required: true, message: '请选择作者', trigger: 'change' }
            ],
            dicCategory: [
            { required: true, message: '请选择分类', trigger: 'change' }
            ],
            dicChannel: [
            { required: true, message: '请至少选择一个频道', trigger: 'change' }
            ],
            delivery: [
            { required: true, message: '请选择上架状态', trigger: 'change' }
            ],
            bookId: [
            { required: true, message: '请填写BookID', trigger: 'blur' }
            ]
        },
        file:{},//图片对象
    }
  },
  props:['book'],
  mounted() {
    console.log(this.book)
    if(this.book.authorId){
      this.newBook = this.book
    }
  },
  computed: {
    ...mapState({
        channelList:state =>state.channelList.channelList,
        categoryList:state =>state.categoryList.categoryList,
        authorList:state =>state.authorList.authorList,
    }),
  },
  methods: {
    //图片上传成功回调
    handleAvatarSuccess(res, file) {
      this.newBook.imgUrl = res.data;
      this.$refs.ruleForm.clearValidate('logoUrl')
    },
    //上传之前的钩子
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //自定义上传
    uploadImg(){
      let index = this.file.name.lastIndexOf(".");
      let suffix = this.file.name.substr(index + 1);
       // 创建表单对象
      let formData = new FormData();
      // 后端接受参数 ，可以接受多个参数
      formData.append("file", this.file);
      formData.append("uploadFileName","git");
      formData.append("uploadFileContentType", suffix);
      formData.file = this.file;
      formData.uploadFileName = "git";
      formData.uploadFileContentType = suffix;
      console.log('formData',formData)
      uploadImgPost(formData).then((response) =>{
        console.log('res=>', response);
        var res = response.data;
        if (res.succ == "ok") {
            this.editForm.qualificationScan = res.msg;
            this.dialogFormVisible2 = false;
            this.styleObj1 = {
                display: 'inline'
            };
            this.styleObj2 = {
                display: 'none'
            };
            this.$message({
                message: this.$t('common.uploadSucess'),
                type: 'success',
                duration: '2000'
            });
        } else {
            this.$message({
                message: this.$t('common.uploadFail'),
                type: 'error',
                duration: '2000'
            });
        }
    })
    },
    //获取文件流
    handleFileChange(file) {
        console.log(file);
        this.file = file.raw
    },
    //添加图书
    addOneBook(){
      this.addbookListAction(this.newBook)
      this.$message.success('图书添加成功')
      this.$router.replace('/book')
    },
    //更新图书
    unpdateOneBook(){
      console.log('更新了',this.newBook)
      let {bookId,bookName} = this.newBook
      this.$message.success('图书更新成功')
      this.$router.replace('/book')
      this.updatebookListAction({bookId,bookName})
    },
    ...mapActions({
      addbookListAction:'addbookListAction',
      updatebookListAction:'updatebookListAction'
    })
  },
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
  .el-input{
    width: 200px;
  }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
