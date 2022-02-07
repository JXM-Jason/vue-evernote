<template>
  <div>
    <div>回收站笔记详情页面</div>
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