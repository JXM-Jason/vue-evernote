import notes from "../../apis/notes";
import { Message } from "element-ui";

const state = {
  notes: [],
  curNoteId: null
};

const getters = {
  notes: state => state.notes,
  curNote: state => {
    if (!Array.isArray(state.notes)) return {};
    if (!state.curNoteId) {
      console.log(state.notes);
      return state.notes[0] || {};
    }
    return state.notes.find(note => note.id == state.curNoteId) || {};
  }
};

const mutations = {
  addNote(state, payload) {
    state.notes.push(payload.note);
  },
  deleteNote(state, payload) {
    state.notes = state.notes.filter(note => note.id !== payload.noteId);
  },
  updateNote(state, payload) {
    let note = state.notes.find(note => note.id === payload.noteId) || {};
    note.title = payload.title;
    note.content = payload.content;
  },
  getNotes(state, payload) {
    state.notes = payload.notes;
  },
  setCurNote(state, payload) {
    state.curNoteId = payload.curNoteId;
  }
};

const actions = {
  addNote({ commit }, payload) {
    return notes
      .addNote(
        { notebookId: payload.notebookId },
        { title: payload.title, content: payload.content }
      )
      .then(res => {
        commit("addNote", { note: res.data });
      });
  },
  deleteNote({ commit }, payload) {
    return notes.deleteNote({ noteId: payload.noteId }).then(res => {
      commit("deleteNote", { noteId: payload.noteId });
      Message.success(res.msg);
    });
  },
  updateNote({ commit }, { noteId, title, content }) {
    return notes.updateNote({ noteId }, { title, content }).then(() => {
      commit("updateNote", { noteId, title, content });
    });
  },
  getNotes({ commit }, payload) {
    return notes.getAll({ notebookId: payload.notebookId }).then(res => {
      commit("getNotes", { notes: res.data });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
