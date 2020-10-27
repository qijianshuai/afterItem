const mongoose = require('mongoose')
// 创建约束
const authorSchema = mongoose.Schema({
    id:{
        type:String,
        require:true,
        unique:true
    },
    creater:{
        type:String,
        require:true,
    },    
    createTime:{
        type:String,
    },
    updater:{
        type:String,
    },
    updateTime:{
        type:String,
    },
    name:{
        type:String,
    },
    introduction:{
        type:String,
    },
    headImgUrl:{
        type:String,
    }
})
//创建文档对象
const authorList = new mongoose.model('author',authorSchema)
module.exports = authorList