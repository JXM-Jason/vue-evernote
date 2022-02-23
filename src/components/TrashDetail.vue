<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/TrashDetail?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span> 创建日期: {{ curTrashNote.createdAtFriendly }}</span>
        <span> | </span>
        <span> 更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
        <span> | </span>
        <span> 所属笔记本: {{ belongTo }}</span>
        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import { mapGetters, mapMutations, mapActions } from "vuex";

let md = new MarkdownIt();
export default {
  data() {
    return {};
  },
  created() {
    this.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("Login");
      }
    });

    this.getTrashNotes().then((notes) => {
      console.log("getTrash notes");
      console.log(notes);
    });
  },

  computed: {
    ...mapGetters(["trashNotes", "curTrashNote", "belongTo"]),
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || "");
    },
  },
  methods: {
    ...mapMutations(["setCurTrashNote"]),
    ...mapActions([
      "getTrashNotes",
      "deleteTrashNote",
      "revertTrashNote",
      "getInfo",
    ]),
    onRevert() {
      this.revertTrashNote({ noteId: this.curTrashNote.id });
    },
    onDelete() {
      this.$confirm("是否彻底删除当前笔记?", "删除笔记", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteTrashNote({ noteId: this.curTrashNote.id });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({ curTrashNoteId: to.query.noteId });
    next();
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
  .note-sidebar {
    overflow: auto;
    overflow-x: none;
  }

  .note-sidebar::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .note-sidebar::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  .note-sidebar::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;
    }
  }
}
</style>