<template>
  <div>
    <div>我是笔记本详情页面</div>
    <span>我是noteId</span>
    {{ this.$route.query.noteId }}
    <span>我是notebookId</span>
    {{ $route.query.notebookId }}
  </div>
</template>

<script>
import Auth from "@/apis/auth";
export default {
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push("/Login");
      }
    });
  },
};
</script>

<style  scoped>
</style>