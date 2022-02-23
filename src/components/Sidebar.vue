<template>
  <div id="sidebar">
    <Avatar />
    <div class="icons">
      <router-link to="/NotebookList" title="笔记本"
        ><i class="iconfont icon-notebook"></i
      ></router-link>
      <router-link to="/NoteDetail" title="笔记"
        ><i class="iconfont icon-note"></i
      ></router-link>

      <router-link to="/TrashDetail" title="回收站"
        ><i class="iconfont icon-trash"></i
      ></router-link>
    </div>
    <div class="logout" @click="Logout">
      <i class="iconfont icon-logout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar";
import Auth from "@/apis/auth";
import Bus from "@/helpers/bus";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    Avatar,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([" register", "logout", "getInfo"]),
    Logout() {
      this.logout().then(() => {
        this.$router.push("/Login");
      });
    },
  },
};
</script>

<style lang="less" scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;

  .icons {
    margin-top: 15px;

    a {
      padding: 6px 0;
      display: block;
    }

    .router-link-active {
      background-color: #5e6266;
    }
  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
  .iconfont {
    color: #fff;
  }
}
</style>