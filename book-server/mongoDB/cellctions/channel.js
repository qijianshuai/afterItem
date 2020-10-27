const mongoose = require('mongoose')
// 创建约束
const channelSchema = mongoose.Schema({
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
const channelList = new mongoose.model('channel',channelSchema)
module.exports = channelList