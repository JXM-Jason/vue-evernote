<template>
  <div class="note-sidebar">
    <span v-if="curBook.id" class="btn add-note" @click="onAddNote(curBook.id)"
      >添加笔记</span
    >

    <span v-if="!curBook.id" class="notebook-title">无笔记本</span>
    <el-dropdown
      v-if="curBook.id"
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ this.curBook.title }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :command="notebook.id"
          v-for="notebook in notebooks"
          :key="notebook.id"
          >{{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站 </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>

    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link
          :to="`/NoteDetail?notebookId=${curBook.id}&noteId=${note.id}`"
        >
          <span>{{ note.updatedAtFriendly }}</span>
          <span>{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Notebooks from "@/apis/notebooks";
import Notes from "@/apis/notes";
import Bus from "../helpers/bus";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  created() {
    //需要判断路由如果有notebookId则curBook用id去查询，如果没有就默认是列表第一个
    //getNotebooks确保下拉列表框有当前所有的笔记本
    this.getNotebooks().then(() => {
      //防止刷新时重新定位当前笔记本
      this.setCurBook({
        curBookId: this.$route.query.notebookId,
      });
      //获取当前笔记本的所有笔记
      if (this.curBook.id) {
        this.getNotes({ notebookId: this.curBook.id });
      }

      // this.setCurNote({ curNoteId: this.$route.query.noteId });
    });
  },
  computed: {
    ...mapGetters(["notebooks", "notes", "curBook"]),
  },
  methods: {
    ...mapMutations(["setCurNote", "setCurBook"]),
    ...mapActions(["addNote", "getNotebooks", "getNotes"]),

    handleCommand(command) {
      if (command == "trash") {
        return this.$router.push("/TrashDetail");
      } else {
        this.setCurBook({
          curBookId: command,
        });
        this.getNotes({ notebookId: this.curBook.id });
        this.$router.push(`/NoteDetail?notebookId=${command}`);
      }
    },

    onAddNote(notebookId) {
      if (notebookId) {
        this.addNote({ notebookId }, { title: "", content: "" }).then(() => {
          this.getNotes({ notebookId });
        });
      } else {
        this.$message({
          showClose: true,
          message: "请创建笔记本后再添加笔记否则添加无效！",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="less">
@import url(../assets/css/note-sidebar.less);
</style>