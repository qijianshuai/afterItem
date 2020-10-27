const mongoose = require('mongoose')
// 创建约束
const categorySchema = mongoose.Schema({
    id:{
        type:String,
        require:true,
        unique:true
    },
    text:{
        type:String,
        require:true,
    }
})
//创建文档对象
const bookcategoryList = new mongoose.model('bookcategory',categorySchema)
module.exports = bookcategoryList