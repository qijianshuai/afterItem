import {getCategoryList,postAddCategory,postUpdateCategory,deleteCategory} from '../../api'
export default {
    state:{
        categoryList:[]
    },
    mutations:{
        //获取
        getcategoryListMutatins(state,data){
            state.categoryList = data
        },
        //修改
        updatecategoryListMutatins(state,data){
            
        },
        //删除
        deletecategoryListMutatins(state,data){
            
        },
        //增加
        addcategoryListMutatins(state,data){
            
        }    
    },
    actions:{
        //获取
        async getcategoryListListAction({commit}){
            let result = await getCategoryList()
            commit('getcategoryListMutatins',result)
        },
        //修改
        async updatecategoryListListAction({commit},data){
    
        },
        //删除
        async deletecategoryListListAction({commit},data){
    
        },
        //增加
        async addcategoryListListAction({commit},data){
    
        },    
    }
}