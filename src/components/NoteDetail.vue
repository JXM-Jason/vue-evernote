<template>
  <div id="note" class="detail">
    <NoteSidebar />
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span
            class="iconfont icon-fullscreen"
            @click="isShowPreview = !isShowPreview"
          ></span>
        </div>

        <div class="note-title">
          <input
            type="text"
            v-model="curNote.title"
            @input="onUpdateNote"
            @keydown="statusText = `正在输入中....`"
            placeholder="输入标题"
          />
        </div>

        <div class="editor">
          <textarea
            v-show="isShowPreview"
            v-model="curNote.content"
            @input="onUpdateNote"
            @keydown="statusText = `正在输入中....`"
            placeholder="输入内容, 支持 markdown 语法"
          ></textarea>
          <div
            class="preview markdown-body"
            v-html="previewContent"
            v-show="!isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NoteSidebar from "@/components/NoteSidebar.vue";
import Notes from "@/apis/notes";
import Bus from "../helpers/bus";
import MarkdownIt from "markdown-it";
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
let md = new MarkdownIt();

export default {
  components: {
    NoteSidebar,
  },
  data() {
    return {
      statusText: "笔记未修改",
      isShowPreview: true,
    };
  },
  computed: {
    ...mapGetters(["notes", "curNote"]),
    previewContent() {
      return md.render(this.curNote.content || "");
    },
  },
  created() {
    this.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("Login");
      }
    });
  },

  methods: {
    ...mapMutations(["setCurNote"]),
    ...mapActions([
      "addNote",
      "deleteNote",
      "updateNote",
      "getNotes",
      "getInfo",
    ]),

    onUpdateNote: _.debounce(function () {
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content,
      })
        .then((data) => {
          this.statusText = "笔记已保存";
        })
        .catch((error) => {
          console.log(error);
          this.statusText = "保存出错";
        });
    }, 800),

    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id }).then((data) => {
        console.log("onDeleteNote Detail");
        console.log(data);
        this.$router.replace(
          `/NoteDetail?notebookId=${this.$route.query.notebookId}`
        );
      });
    },
  },
  //路由切换的时候才触发
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId });
    next();
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>