import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import NotebookList from "@/components/NotebookList";
import NoteDetail from "@/components/NoteDetail";
import TrashDetail from "@/components/TrashDetail";
import NotFound from "@/components/NotFound";
import hello from "@/components/Hello";
//处理重复路由定向的问题
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

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
      path: "/NoteDetail",
      name: "NoteDetail",
      component: NoteDetail
    },
    {
      path: "/TrashDetail",
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
