import {getBookList,postAddBook,postUpdateBook,deleteBook} from '../../api/index'
export default {
    state:{
        bookList:[]
    },
    mutations:{
        //获取
        getbookListMutatins(state,data){
            state.bookList = data
        },
        //修改
        updatebookListMutatins(state,data){
            
        },
        //删除
        deletebookListMutatins(state,data){
            
        },
        //增加
        addbookListMutatins(state,data){
            
        }    
    },
    actions:{
        //获取
        async getbookListAction({commit}){
            let result = await getBookList()
            commit('getbookListMutatins',result)
        },
        //修改
        async updatebookListAction({commit},{bookId,bookName}){
            await postUpdateBook(bookId,bookName)
            // //重新获取图书列表
            let result = await getBookList()
            commit('getbookListMutatins',result)
        },
        //删除
        async deletebookListAction({commit},data){
            //删除图书
            await deleteBook(data)
            // //重新获取图书列表
            let result = await getBookList()
            commit('getbookListMutatins',result)
        },
        //增加
        async addbookListAction({commit},data){
            await postAddBook(data)
            // //重新获取图书列表
            let result = await getBookList()
            commit('getbookListMutatins',result)
        },    
    }
}