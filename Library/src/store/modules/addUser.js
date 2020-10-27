import { addUser } from "@/api";

export default {
    state:{
        user:[]
    },
    mutations:{
        ADD_USER_INFO(state,data){
            
        }
    },
    actions:{
        //增加
        async adduserInfo({commit},data){
            let result = await addUser(data)
            commit('ADD_USER_INFO',result)
        },    
    }
}