<template>
    <div class="sidebar" id="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.list">
                    <el-submenu :index="item.nurl" :key="item.nurl">
                        <template slot="title">
                            <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.list" :key="i" :index="subItem.nurl">
                            <i :class="subItem.icon"></i><span slot="title">{{subItem.mname}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.nurl" :key="item.nurl">
                        <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import bus from "../common/bus";
import { httpGetCreditMenuList } from "@/api/http";
export default {
  data() {
    return {
      collapse: false,
      items: []
    };
  },
  // computed: {
  //   items() {
  //     return JSON.parse(localStorage.getItem("chbM"));
  //   }
  // },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    ...mapGetters([
      "menu"
      // ...
    ])
  },
  methods: {
    getHttpGetCreditMenuList() {
      let _this = this;
      httpGetCreditMenuList()
        .then(res => {
          let data = res.data;
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.items = JSON.parse(localStorage.getItem("chbM"));
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
<style>
#sidebar .el-submenu__title,
.el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
}
#sidebar .el-submenu .el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  padding-left: 20px;
  min-width: 160px;
}
#sidebar .el-upload--text {
  height: 36px;
}
</style>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 185px;
}
.sidebar > ul {
  height: 100%;
}

.iconfont {
  margin-right: 5px;
}
</style>

