<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onCreate"
        ><i class="iconfont icon-plus"></i>新建笔记本</a
      >
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表（{{ this.notebookList.length }}）</h3>
        <div class="book-list">
          <router-link
            to="/NoteDetail/2"
            href="#"
            class="notebook"
            v-for="(item, index) in notebookList"
            :key="index"
          >
            <div>
              <span class="iconfont icon-notebook"></span>
              {{ item.title }}
              <span>{{ item.noteCounts }}</span>
              <span class="action" @click.stop="onEdit(item)">编辑</span
              ><span class="action" @click.stop="onDelete(item, index)"
                >删除</span
              >
              <span class="date">{{ item.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import notebooks from "@/apis/notebooks";
import { friendlyDate } from "../helpers/util";

// window.notebook = notebook;
export default {
  data() {
    return {
      notebookList: [],
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("/Login");
      }
    });
    notebooks.getAll().then((res) => {
      console.log("我是res");
      console.log(res);
      this.notebookList = res.data;
    });
  },

  methods: {
    onCreate() {
      let titleContent = prompt("请输入标题");
      if (titleContent !== null || titleContent !== "") {
        notebooks.addNotebook({ title: titleContent }).then((res) => {
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
          this.notebookList.unshift(res.data);
        });
      }
    },
    onDelete(notebook, index) {
      console.log("我是删除");
      let isconfirm = confirm("你确定要删除吗？");
      if (isconfirm) {
        notebooks.deleteNotebook(notebook.id).then((res) => {
          this.notebookList.splice(index, 1);
        });
      }
    },
    onEdit(notebook) {
      console.log("我是编辑");
      let title = "";
      this.$prompt("请输入新的标题", "修改笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: "标题不能为空且内容不超过30个字符",
      })
        .then(({ value }) => {
          title = value;
          return notebooks.updateNotebook(notebook.id, { title });
        })
        .then((res) => {
          notebook.title = title;
          this.$message({
            type: "success",
            message: res.msg,
          });
        })
        .catch((res) => {
          this.$message({
            type: "info",
            message: res.msg,
          });
        });

      // let content = prompt("请输入内容");
      // console.log("我是content");
      // console.log(content);
      // if (content !== null || content !== "") {
      //   notebooks
      //     .updateNotebook(notebook.id, { title: content })
      //     .then((res) => {
      //       alert(res.msg);
      //       notebook.title = content;
      //     });
      // }
    },
  },
};
</script>

<style lang="less"  scoped>
@import url(../assets/css/notebook-list.less);
// .detail {
//   border: 1px solid blue;
//   width: 100%;
//   header {
//     border-bottom: 1px solid rgb(181, 181, 187);
//     .btn {
//       // border: 1px solid red;
//       margin: 10px;
//       .iconfont {
//         padding: 4px;
//       }
//     }
//   }

//   .layout {
//     border: 1px solid red;
//     margin: 20px auto;
//   }
// }
</style>