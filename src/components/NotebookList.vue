<template>
  <div>
    <div>我是笔记本列表页面</div>
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