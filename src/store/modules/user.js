import Auth from "../../apis/auth";

const state = {
  user: null
};

const getters = {
  username: state => (state.user === null ? "未登录" : state.user.username),
  slug: state => (state.user === null ? "未" : state.user.username.charAt(0))
};

const mutations = {
  register(state, payload) {
    state.user = payload;
  },
  login(state, payload) {
    state.user = payload;
  },
  logout() {
    state.user = null;
  },
  getInfo(state, payload) {
    state.user = payload.data;
  }
};

const actions = {
  Register({ commit }, payload) {
    return Auth.register({
      username: payload.username,
      password: payload.password
    }).then(() => {
      console.log("registerkkkkkk");
      commit("register", {
        username: payload.username,
        password: payload.password
      });
    });
  },
  Login({ commit }, payload) {
    return Auth.login({
      username: payload.username,
      password: payload.password
    }).then(() => {
      commit("login", {
        username: payload.username,
        password: payload.password
      });
    });
  },
  logout({ commit }) {
    return Auth.logout().then(() => {
      commit("logout");
    });
  },
  getInfo({ commit }) {
    return Auth.getInfo().then(res => {
      // console.log("commit getInfo");
      // console.log(res);
      if (res.isLogin) {
        // console.log("isLogin");
        commit("getInfo", { data: res.data });
        // console.log(state);
      }
      return res;
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
