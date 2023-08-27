<template>
  <div>
    <el-row style="background-color: #bdbdbd; color: #333; text-align: center">
      <el-col :span="3"><span>区域管理功能</span></el-col>
      <el-col :span="5"> &nbsp; </el-col> <el-col :span="8"> &nbsp; </el-col>
      <el-col :span="5"> &nbsp; </el-col>
      <el-col :span="3">
        <el-header style="text-align: right; height: 30px; font-size: 3px"
          ><span>>退出</span>
        </el-header></el-col
      >
    </el-row>
    <el-container>
      <!--左菜单栏-->
      <el-aside width="150px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
            >
              <el-menu-item index="/">
                <span slot="title">区域管理</span>
              </el-menu-item>

              <el-menu-item index="/Citys">
                <span slot="title">城市管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-main>
          <router-view :key="$route.path" ref="routerView"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.el-container {
  height: 1000px;
}

.el-header,
.el-footer {
  background-color: #bdbdbd;
  color: #333;
  text-align: center;
  line-height: 30px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 280px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 3px;
}
</style>