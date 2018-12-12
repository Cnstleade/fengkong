const getters = {
  username: state => state.login.username,
  role: state => state.login.role,
  newrouter: state => state.login.newrouter,
  loginId: state => state.login.loginId,
  isLogin: state => state.login.isLogin,
  app: state => state.login.app,
  key: state => state.login.key,
};
export default getters
