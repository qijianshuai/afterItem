import ajax from './ajax.js'
//获取登录接口
export const toLogin = ({username,password})=>ajax.post('/login',{username,password})
//获取注册接口
export const toRegister = (username,password)=>ajax.post('/register',{username,password})


// 获取图书列表
export const getBookList = ()=>ajax.get('/bookList')
// 添加图书 /addbook
export const postAddBook = (bookName,authorId,dicCategory,dicChannel,imgUrl,bookId)=>ajax.post('/addbook',{bookName,authorId,dicCategory,dicChannel,imgUrl,bookId})
// 修改图书
export const postUpdateBook = (bookId,bookName)=>ajax.get(`/updatebook?bookId=${bookId}&bookName=${bookName}`)
// 删除图书
export const deleteBook = (bookId)=>ajax.get('/deletebook?bookId='+ bookId)


//获取作者列表
export const getAuthorList = ()=>ajax.get('/authorList')
// 添加作者
export const postAddAuthor = ()=>(id,name,introduction,headImgUrl)=>ajax.post('/addauthor',{id,name,introduction,headImgUrl})
// 修改作者
export const postUpdateAuthor = (bid,name,introduction,headImgUr)=>ajax.get(`/updateAuthor?bid=${bid}&name=${name}&introduction=${introduction}&headImgUr=${headImgUr}`)
// 删除作者
export const deleteAuthor = (id)=>ajax.get('/deleteauthor?id='+ id)

//获取分类列表
export const getCategoryList = ()=>ajax.get('/categoryList')
// 添加分类
export const postAddCategory = ()=>(id,text)=>ajax.post('/addcategory',{id,text})
// 修改分类
export const postUpdateCategory = (id,text)=>ajax.get(`/updatecategory?id=${id}&text=${text}`)
// 删除分类
export const deleteCategory = (id)=>ajax.get('/deletecategory?id='+ id)

//获取频道列表
export const getChannelList = ()=>ajax.get('/channelList')
// 添加分类
export const postAddChannel = ()=>(id,text)=>ajax.post('/addchannel',{id,text})
// 修改分类
export const postUpdateChannel = (id,text)=>ajax.get(`/updatechannel?id=${id}&text=${text}`)
// 删除分类
export const deleteChannel = (id)=>ajax.get('/deletechannel?id='+ id)

//图片上传

export const uploadImgPost = (data)=>ajax.post('/bookImg',data)

// 添加人员
export const addUser = ({username,password,chinaName,team,phone,common,freeze})=>ajax.post('/addcUser',{username,password,chinaName,team,phone,common,freeze})
////获取用户信息列表
export const getUserList = ()=> ajax.get(`/userList`)
//增加用户
export const getAddUser = ()=>({username,password,chinaName,team,phone,common,freeze})=>ajax.post('/addUser',{username,password,chinaName,team,phone,common,freeze})
//修改用户
export const getUpdateUser = ({_id,chinaName,team,phone,freeze,common,username,password})=>ajax.get(`/updateUser?_id=${_id}&chinaName=${chinaName}&team=${team}&phone=${phone}&freeze=${freeze}&common=${common}&username=${username}&password=${password}`)
//删除用户
export const getDeleteUser = (_id)=>ajax.get('/deleteUser?_id='+ _id)