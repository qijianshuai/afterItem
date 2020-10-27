import {getAuthorList,postAddAuthor,postUpdateAuthor,deleteAuthor} from '../../api/index'
export default {
    state:{
        authorList:[]
    },
    mutations:{
        //获取
        getauthorListMutatins(state,data){
            state.authorList = data
        },
        //修改
        updateauthorListMutatins(state,data){
            
        },
        //删除
        deleteauthorListMutatins(state,data){
            
        },
        //增加
        addauthorListMutatins(state,data){
            
        }    
    },
    actions:{
        //获取
        async getauthorListAction({commit}){
            let result = await getAuthorList()
            commit('getauthorListMutatins',result)
        },
        //修改
        async updateauthorListAction({commit},data){
    
        },
        //删除
        async deleteauthorListAction({commit},data){
    
        },
        //增加
        async addauthorListAction({commit},data){
    
        },    
    }
}