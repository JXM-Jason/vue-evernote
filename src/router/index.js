import Vue from "vue";
import Router from "vue-router";

//处理重复路由定向的问题
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/Login",
      name: "Login",
      component: () => import("../components/Login.vue")
    },
    {
      path: "/NotebookList",
      alias: "/NotebookList",
      name: "NotebookList",
      component: () => import("../components/NotebookList.vue")
    },
    {
      path: "/NoteDetail",
      name: "NoteDetail",
      component: () => import("../components/NoteDetail.vue")
    },
    {
      path: "/TrashDetail",
      name: "TrashDetail",
      component: () => import("../components/TrashDetail.vue")
    },
    {
      path: "*",
      name: "NotFound",
      component: () => import("../components/NotFound.vue")
    }
  ]
});
