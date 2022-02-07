<template>
  <div id="sidebar">
    <Avatar />
    <div class="icons">
      <router-link to="/NotebookList" title="笔记本"
        ><i class="iconfont icon-notebook"></i
      ></router-link>
      <router-link to="/NoteDetail/1" title="笔记"
        ><i class="iconfont icon-note"></i
      ></router-link>

      <router-link to="/TrashDetail/2" title="回收站"
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
export default {
  components: {
    Avatar,
  },
  data() {
    return {
      username: "未登录",
    };
  },
  methods: {
    Logout() {
      Auth.logout().then((data) => {
        Bus.$emit("userInfo", { username: this.username });
        this.$router.push("/Login");
        console.log(data);
      });

      console.log("我是注销");
    },
  },
};
</script>

<style lang="less" scoped>
// #sidebar {
//   position: relative;
//   width: 56px;
//   text-align: center;
//   background-color: #2c333c;
// }

// .icons {
//   margin-top: 15px;
// }

// .icons a {
//   padding: 6px 0;
//   display: block;
// }

// .icons .router-link-active {
//   background-color: #5e6266;
// }

// .logout {
//   position: absolute;
//   bottom: 20px;
//   width: 100%;
//   text-align: center;
//   cursor: pointer;
// }

// .iconfont {
//   color: #fff;
// }
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