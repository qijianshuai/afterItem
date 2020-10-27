const mongoose = require('mongoose')
// 创建约束
const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:Number,
        require:true,
    },
    chinaName:{
        type:String,
    },
    team:{
        type:String,
    },
    phone:{
        type:String,
    },
    freeze:{//冻结 0未冻结/1冻结
        type:Number,
    },
    common:{//账户等级 0读者/1管理员
        type:Number,
    }
})
//创建文档对象
const userModle = new mongoose.model('administrator',userSchema)
module.exports = userModle