import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import NotebookList from "@/components/NotebookList";
import NoteDetail from "@/components/NoteDetail";
import TrashDetail from "@/components/TrashDetail";
import NotFound from "@/components/NotFound";
import hello from "@/components/Hello";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "hello",
      component: hello
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/NotebookList",
      name: "NotebookList",
      component: NotebookList
    },
    {
      path: "/NoteDetail/:noteId",
      name: "NoteDetail",
      component: NoteDetail
    },
    {
      path: "/TrashDetail/:noteId",
      name: "TrashDetail",
      component: TrashDetail
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});
