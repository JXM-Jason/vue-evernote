<template>
  <div>
    <div>我是笔记本详情页面</div>
    {{ this.$route.params.noteId }}
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