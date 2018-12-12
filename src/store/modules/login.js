const login = {
  state: {
    username: sessionStorage.getItem('USERNAME'),
    role: sessionStorage.getItem('ROLE'),
    introduce: '',
    isLogin: false,
    newrouter: [],
    loginId: sessionStorage.getItem('LOGINID'),
    timer: null,
    app: 4,
    key: ''
  },
  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_ROLE: (state, role) => {
      state.role = role;
    },

    SET_KEY: (state, key) => {
      state.key = key;
    },


    SET_LOGINID: (state, loginId) => {
      state.loginId = loginId;
    },
    SET_INTRODUCE: (state, introduce) => {
      state.introduce = introduce;
    },
    SET_NEWROUER: (state, newrouter) => {
      state.newrouter = newrouter;
    },
    SET_ISLOGIN: (state, type = true) => {
      clearInterval(state.timer);
      if (type) {
        state.timer = setTimeout(() => {
          state.isLogin = false;
          state.role = '';
          clearInterval(state.timer);
        }, 18000000000)
      }
      state.isLogin = type;
    },
  },
  actions: {
    SETLogin({
      commit
    }, type) {
      return new Promise((resolve, reject) => {
        commit('SET_ISLOGIN', type); //存储最新路由
        resolve();
      }).catch(error => {
        reject(error);
      });
    },
    Logins({
      commit
    }, info) {
      return new Promise((resolve, reject) => {
        let data = {};
        // loginByUserInfo.map(function (item) { //获取所以用户信息
        // 	if(info.username === item.username || info.pew === item.pew){
        // 		commit('SET_USERNAME',item.username);  //将username和role进行存储
        // 				sessionStorage.setItem('USERNAME', item.username); //存入 session 
        // 				console.log(item.role);
        // 		commit('SET_ROLE',item.role);
        // 		sessionStorage.setItem('ROLE', item.role);
        // 		return data={username:item.username,introduce:item.introduce};
        // 	}else{
        // 		return data;
        // 	}
        // });  

        if (info.creditMenus || info.permissionStringList) {
          commit('SET_USERNAME', info.creditMenus); //将username和role进行存储
          sessionStorage.setItem('USERNAME', info.username); //存入 session 
          commit('SET_ROLE', info.role);
          sessionStorage.setItem('ROLE', info.role);
          commit('SET_LOGINID', info.loginId);
          sessionStorage.setItem('LOGINID', info.loginId);
          commit('SET_KEY', info.key);
          return data = {
            username: info.username,
            // introduce: info.introduce
          };
        } else {
          return data;
        }
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    },
    Roles({
      commit
    }, newrouter) {
      return new Promise((resolve, reject) => {
        commit('SET_NEWROUER', newrouter); //存储最新路由
        resolve(newrouter);
      }).catch(error => {
        reject(error);
      });
    },
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {

        commit('SET_USERNAME', '');
        commit('SET_ROLE', '');
        commit('SET_LOGINID', '');
        commit('SET_NEWROUER', []);
        location.reload();
        sessionStorage.removeItem('USERNAME');
        sessionStorage.removeItem('ROLE');
        sessionStorage.removeItem('LOGINID');
        resolve();
      }).catch(error => {
        reject(error);
      });
    },

  }
}
export default login;
