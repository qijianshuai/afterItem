const mongoose = require('mongoose')
//图书列表
const bookListSchema = mongoose.Schema({
    id:{
        type:Number,
    },
    authorId:{
        type:String,
    },
    dicCategory:{
        type:String,
    },
    dicChannel:{
        type:String,
    },
    dicSerialStatus:{
        type:String,
    },
    onlineStatus:{
        type:Boolean,
    },
    bookId:{
        type:Number,
        require:true,
        unique:true
    },
    bookName:{
        type:String,
    },
    bookScore:{
        type:Number,
    },
    keyWord:{
        type:String,
    },
    imgUrl:{
        type:String,
    },
    authorName:{
        type:String,
    },
    introduction:{
        type:String,
    },
    isbn:{
        type:String,
    },
    wordCount:{
        type:Number,
    },
    creater:{
        type:String,
    },
    createTime:{
        type:String,
    },
    updateTime:{
        type:String,
    },
    updater:{
        type:String,
    }
})


//创建文档对象
const bookList = new mongoose.model('books',bookListSchema)
module.exports = bookList