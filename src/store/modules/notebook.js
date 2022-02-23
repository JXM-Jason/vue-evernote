import Notebook from "../../apis/notebooks";
import { Message } from "element-ui";

const state = {
  notebookList: [],
  curBookId: null
};

const getters = {
  notebooks: state => state.notebookList,
  // curBook: state => { }
  curBook: state => {
    if (!Array.isArray(state.notebookList)) return {};
    if (!state.curBookId) return state.notebookList[0] || {};
    return (
      state.notebookList.find(notebook => notebook.id == state.curBookId) || {}
    );
  }
};

const mutations = {
  setNotebook(state, payload) {
    state.notebookList = payload.notebookList;
  },
  addNotebook(state, payload) {
    state.notebookList.push(payload.notebook);
  },
  updateNotebook(state, payload) {
    let indexId;
    state.notebookList.find((notebook, index) => {
      if ((notebook.id = payload.notebookId)) {
        indexId = index;
      }
    });
    let notebook = state.notebookList[indexId] || [];
    // console.log("mutation里面的notebook");

    notebook.title = payload.title;
    // console.log(notebook);
  },
  deleteNotebook(state, payload) {
    //该过滤无效
    let indexId;
    state.notebookList.find((notebook, index) => {
      if ((notebook.id = payload.notebookId)) {
        indexId = index;
      }
    });
    state.notebookList.splice(indexId, 1);
    // console.log("mutation里面的deleteNotebook");
    // console.log(
    //   state.notebookList.filter(notebook => {
    //     notebook.id != payload.notebookId;
    //   })
    // );
    // console.log("state.notebookList变化了嘛");
    // console.log(state.notebookList);
  },
  setCurBook(state, payload) {
    state.curBookId = payload.curBookId;
    console.log("mutation的setCurBook");
    console.log(state.curBookId);
  }
};

const actions = {
  getNotebooks({ commit }) {
    return Notebook.getAll().then(res => {
      commit("setNotebook", { notebookList: res.data });
    });
  },
  addNotebook({ commit }, payload) {
    return Notebook.addNotebook({ title: payload.title }).then(res => {
      commit("addNotebook", { notebook: res.data });
    });
  },
  updateNotebook({ commit }, payload) {
    return Notebook.updateNotebook(payload.id, {
      title: payload.title
    }).then(res => {
      commit("updateNotebook", {
        notebookId: payload.id,
        title: payload.title
      });
      Message.success(res.msg);
    });
  },
  deleteNotebook({ commit }, payload) {
    return Notebook.deleteNotebook(payload.id).then(res => {
      commit("deleteNotebook", { notebookId: payload.id });
      Message.success(res.msg);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
