const mongoose = require('mongoose')
//建立链接 创建集合
mongoose.connect("mongodb://localhost/users",{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true})

//监听数据是否链接
mongoose.connection.once('open',(err)=>{
    if(err){
        console.log('数据库链接失败');
        console.log(err);
        return
    }
    console.log('数据库链接成功');
})