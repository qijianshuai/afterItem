const express = require('express')
//建立数据库链接
require('./mongoDB/db')
//引入集合
const userModle = require('./mongoDB/cellctions/user')
const book = require('./mongoDB/cellctions/book')
const author = require('./mongoDB/cellctions/author')
const channel = require('./mongoDB/cellctions/channel')
const bookCategory = require('./mongoDB/cellctions/bookCategory')
const app = new express()
app.use(express.json())
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Credentials': true, //允许后端发送cookie
    'Access-Control-Allow-Origin':  '*', //任意域名都可以访问,或者基于我请求头里面的域
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
    'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
  })
  next();
})
//登录请求
app.post('/login',(req,res)=>{
    //数据库存在的数据{username:'cat',password:123}
    let {username,password} = req.body;
    (async (username)=>{
      try{
        let userInfo = await userModle.findOne({username})
            if(userInfo){
                if(userInfo.password != password){
                    res.send({
                        data:{
                          code:502,
                          message:'密码错误'
                        }
                    })
                    }else if(userInfo.freeze === 0){
                        res.send({
                          data:{
                            code:200,
                            message:'登录成功',
                            userInfo:userInfo
                          }
                        })
                    }else{
                      res.send({
                        data:{
                          code:203,
                          message:'该账户已冻结，请找管理员解冻',
                        }
                      })
                  }        
            }else{
                res.send({
                    code:400,
                    message:'账户不存在'
                })
            }
      }catch(e){
        res.send({
            code:400,
            message:'用户名不存在'
        })
      }
    })(username)
})
//注册请求
app.post('/register',async(req,res)=>{
    let {username,password} = req.body;
        try {
            let userInfo = await userModle.findOne({username})
            if(userInfo){
                res.send({
                    code:402,
                    data:'用户已经存在'
                })
            }else{
                let userInfo = await userModle.create({username,password})
                res.send({
                    data:{
                      code:200,
                      message:'成功注册',
                      userInfo
                    }
                })
            }
        } catch (error) {
            res.send({
                code:500,
                data:'暂时无法注册，稍后重试'
            })
            
        }
    })

//获取图书列表
app.get('/bookList',async (req,res)=>{
  let bookLists = await book.find()
  res.send(bookLists)
})
// 添加图书
app.post('/addbook',async (req,res)=>{
  //需要 书名、作者ID、分类id、频道id、图片地址、书本id
  let {bookName,authorId,dicCategory,dicChannel,imgUrl,bookId} = req.body.bookName
  let result = await book.create({bookName,authorId,dicCategory,dicChannel,imgUrl,bookId})
  if(result){
    res.send({
      code:200,
      message:'添加成功'
    })
  }else{
    res.send({
      code:402,
      message:'添加失败，尝试换个图书id'
    })
  }

})
// 修改图书
app.get('/updatebook',async (req,res)=>{
let {bookId,bookName} = req.query
  await book.updateOne({bookId},{$set:{bookName}},(error, document) => {
    if (error) {
        res.json({
            code: '403',
            message: error.message,
            result: 'err'
        })
    } else {
        res.json({
            status: '200',
            message: '',
            result: 'suc'
        })
    }
  })
})
// 删除图书
app.get('/deletebook',async (req,res)=>{
  let {bookId} = req.query
  let result = await book.deleteOne({bookId})
  res.send({
    code:200,
    data:'删除成功'
  })
})
//获取上传图片地址
app.post('/bookImg',async (req,res)=>{
})


//获取作者列表
app.get('/authorList',async (req,res)=>{
  let authorList = await author.find()
  res.send(authorList)
})
//增加作者
app.post('/addauthor',async (req,res)=>{
  //需要 作者ID、名字、介绍、图片
  let {id,name,introduction,headImgUrl} = req.body
  let result = await author.create({id,name,introduction,headImgUrl})
  if(result){
    res.send({
      code:200,
      message:'添加成功'
    })
  }else{
    res.send({
      code:402,
      message:'添加失败，尝试换个图书id'
    })
  }
})
//修改作者
app.get('/updateAuthor',async (req,res)=>{
  //作者id
  let {id,name,introduction,headImgUrl} = req.query
    await author.updateOne({id},{$set:{name,introduction,headImgUrl}},(error, document) => {
      if (error) {
          res.json({
              code: '403',
              message: error.message,
              result: 'err'
          })
      } else {
          res.json({
              status: '200',
              message: '',
              result: 'suc'
          })
      }
    })
  })
//删除作者
app.get('/deleteauthor',async (req,res)=>{
  let {id} = req.query
  await author.deleteOne({id})
  res.send({
    code:200,
    data:'删除成功'
  })
})


//获取书籍分类列表
app.get('/categoryList',async (req,res)=>{
  let categoryList = await bookCategory.find()
  res.send(categoryList)
})
//添加书籍分类
app.post('/addcategory',async (req,res)=>{
  //需要 ID、分类文本
  let {id,text} = req.body
  let result = await bookCategory.create({id,text})
  if(result){
    res.send({
      code:200,
      message:'添加成功'
    })
  }else{
    res.send({
      code:402,
      message:'添加失败，尝试换个分类id'
    })
  }
})
//修改书籍分类
app.get('/updatecategory',async (req,res)=>{
  //作者id
  let {id,text} = req.query
    await bookCategory.updateOne({id},{$set:{text}},(error, document) => {
      if (error) {
          res.json({
              code: '403',
              message: error.message,
              result: 'err'
          })
      } else {
          res.json({
              status: '200',
              message: '',
              result: 'suc'
          })
      }
    })
  })
//删除书籍分类
app.get('/deletecategory',async (req,res)=>{
  let {id} = req.query
  await bookCategory.deleteOne({id})
  res.send({
    code:200,
    data:'删除成功'
  })
})


//获取频道分类
app.get('/channelList',async (req,res)=>{
  let channelList = await channel.find()
  res.send(channelList)
})
//添加频道分类
app.post('/addchannel',async (req,res)=>{
  //需要 ID、分类文本
  let {id,text} = req.body
  let result = await channel.create({id,text})
  if(result){
    res.send({
      code:200,
      message:'添加成功'
    })
  }else{
    res.send({
      code:402,
      message:'添加失败，尝试换个频道id'
    })
  }
})
//修改频道分类
app.get('/updatechannel',async (req,res)=>{
  //作者id
  let {id,text} = req.query
    await channel.updateOne({id},{$set:{text}},(error, document) => {
      if (error) {
          res.json({
              code: '403',
              message: error.message,
              result: 'err'
          })
      } else {
          res.json({
              status: '200',
              message: '',
              result: 'suc'
          })
      }
    })
  })
//删除频道分类
app.get('/deletechannel',async (req,res)=>{
  let {id} = req.query
  await channel.deleteOne({id})
  res.send({
    code:200,
    data:'删除成功'
  })
})



//获取用户信息列表
app.get('/userList',async (req,res)=>{
  let channelList = await userModle.find()
  res.send({
    code:200,
    data:channelList
  })
})
//增加
app.post('/addcUser',async (req,res)=>{
  //需要 ID、分类文本
  let {username,password,chinaName,team,phone,common,freeze} = req.body 
  common = common[0]
  let result = await userModle.create({username,password,chinaName,team,phone,common,freeze})
  if(result){
    res.send({
      code:200,
      message:'添加成功'
    })
  }else{
    res.send({
      code:402,
      message:'添加失败，尝试换个频道id'
    })
  }
})
//修改
app.get('/updateUser',async (req,res)=>{
  let {_id,chinaName,team,phone,freeze,common,username,password} = req.query
  freeze = Boolean(freeze)
  common = common*1
    await userModle.updateOne({_id},{$set:{chinaName,team,phone,freeze,common,username,password}},(error, document) => {
    if (error) {
        res.json({
            code: '403',
            message: error.message,
            result: 'err'
        })
    } else {
        res.json({
            status: '200',
            message: '',
            result: 'suc'
        })
    }
})
})
//删除
app.get('/deleteUser',async (req,res)=>{
  let {_id} = req.query
  await userModle.deleteOne({_id})
  res.send({
    code:200,
    data:'删除成功'
  })
})
//重置密码
app.get('/resetPassword',async (req,res)=>{
  let {_id} = req.query
  await userModle.updateOne({_id},{$set:{password:123456}},(error, document) => {
    if (error) {
        res.json({
            code: '403',
            message: error.message,
            result: 'err'
        })
    } else {
        res.json({
            status: '200',
            message: '重置密码成功，新密码为123456',
            result: 'suc'
        })
    }
})
})
app.listen('3000',()=>{
  console.log('服务以启动');
})
