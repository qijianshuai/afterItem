import {getChannelList,postAddChannel,postUpdateChannel,deleteChannel} from '../../api'
export default {
    state:{
        channelList:[]
    },
    mutations:{
    //获取
    getchannelListMutatins(state,data){
        state.channelList = data
    },
    //修改
    updatechannelListMutatins(state,data){
        
    },
    //删除
    deletechannelListMutatins(state,data){
        
    },
    //增加
    addchannelListMutatins(state,data){
        
    }
    },
    actions:{
    //获取
    async getchannelListAction({commit}){
        let result = await getChannelList()
        commit('getchannelListMutatins',result)
    },
    //修改
    async updatechannelListAction({commit},data){

    },
    //删除
    async deletechannelListAction({commit},data){
        console.log('data',data)
        let result = await deleteChannel(data)
        //重新获取
        commit('getchannelListMutatins')
        
    },
    //增加
    async addchannelListAction({commit},data){

    },
    }
}