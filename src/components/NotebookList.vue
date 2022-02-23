<template>
  <div class="detail" id="notebook-list">
    <header>
      <span href="#" class="btn" @click="onCreate"
        ><i class="iconfont icon-plus"></i>新建笔记本</span
      >
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表（{{ this.notebooks.length }}）</h3>
        <div class="book-list">
          <router-link
            :to="`/NoteDetail?notebookId=${item.id}`"
            class="notebook"
            v-for="(item, index) in notebooks"
            :key="item"
          >
            <div>
              <span class="iconfont icon-notebook"></span>
              {{ item.title }}
              <!-- <span>{{ item.noteCounts }}</span> -->
              <span class="action" @click.prevent="onEdit(item)">编辑</span
              ><span class="action" @click.prevent="onDelete(item, index)"
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
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      random: Math.random(),
    };
  },
  created() {
    this.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("Login");
      }
    });
    // console.log("created notebooks");
    // console.log(
    //   this.notebooks.forEach((element) => {
    //     console.log(element);
    //   })
    // );
    this.$store.dispatch("getNotebooks");
  },
  computed: {
    ...mapGetters(["notebooks"]),
  },
  methods: {
    ...mapActions([
      "getNotebooks",
      "addNotebook",
      "updateNotebook",
      "deleteNotebook",
      "getInfo",
    ]),

    onCreate() {
      this.$prompt("输入新笔记本标题", "创建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,30}$/,
        inputErrorMessage: "标题不能为空或空格，且不超过30个字符",
      })
        .then(({ value }) => {
          this.$store.dispatch("addNotebook", { title: value });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onDelete(notebook, index) {
      this.$confirm("是否删除当前笔记?", "删除笔记", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: notebook.title,
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("deleteNotebook", notebook);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onEdit(notebook) {
      let title = "";
      this.$prompt("请输入新笔记本的标题", "修改笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: notebook.title,
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]{1,30}$/,
        inputErrorMessage: "标题不能为空或空格，且内容不超过30个字符",
      })
        .then((value) => {
          //value 包含更改后的title
          title = value;
          //更改当前笔记的title
          notebook.title = title.value;
          this.$store.dispatch("updateNotebook", notebook);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less"  scoped>
@import url(../assets/css/notebook-list.less);
</style>