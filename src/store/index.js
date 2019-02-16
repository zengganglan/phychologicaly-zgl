import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

Vue.use(Vuex);
 const store = new Vuex.Store({
    // ...
    state: {
        uid: Cookies.get('userId'),
        token: Cookies.get('userToken'),
        userInfo:null,
    
      },
      mutations: {//同步操作
        // 点击登陆设置uid标识
        setuid: (state, uid) => {
            state.uid = uid;
            console.log(state.uid)

          },            
        //确定cookie放到状态管理数据中
        getuid(state){
            console.log(1,state.uid)
        },
        loginout: (state, uid) => {
        //    localStorage.removeItem('token');
        //     state.token = null
          },           
    
        // 全局搜索功能
        

      
         
    },
    //时时检测uid是否实际改变
    getters:{
        uid: state => state.uid,     //用户id//模块化的原因user模块
        token: state => state.token, //用户令牌
        userInfo: state =>state.userInfo,//用户所有信息
     
    }
    
})
export default store