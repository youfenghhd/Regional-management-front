<template>
  <div>
    <el-row>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <h3>当前:城市信息：列表</h3>
        </div></el-col
      >
    </el-row>
    <el-divider></el-divider>
    <el-dialog title="添加城市" :visible.sync="addDialog" width="14%" center>
      <input style="align: center" v-model="addCity" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="insert()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑城市" :visible.sync="bianjiDialog" width="14%" center>
      <input style="align: center" v-model="bianjiCity" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="bianjiDialog = false">取 消</el-button>
        <el-button type="primary" @click="bianji1()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除城市" :visible.sync="delDialog" width="14%" center>
      <span>将删除该城市及记录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false">取 消</el-button>
        <el-button type="primary" @click="del1()">确 定</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-col :span="2"
        ><div class="grid-content bg-purple">
          <el-button @click="addDialog = true">添加</el-button>
        </div></el-col
      >
    </el-row>
    <el-table :data="tableData" style="width: 35%; text-align: center">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column label="城市名">
        <template slot-scope="scope">
          {{ scope.row }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="bianji(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="del(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DemoCitys",

  data() {
    return {
      tableData: [],
      addDialog: false,
      bianjiDialog: false,
      delDialog: false,
      addCity: "",
      oldbianjiCity: "",
      bianjiCity: "",
      delCity: "",
    };
  },

  mounted() {
    this.getCity();
  },

  methods: {
    getCity() {
      this.axios.get("/citys").then((res) => {
        this.tableData = res.data.data.citys;
        console.log(this.tableData);
      });
    },
    insert() {
      let citys = { cityName: this.addCity };
      this.axios.post("/citys", citys).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.getCity();
        }
        this.addDialog = false;
      });
    },
    bianji(item) {
      this.bianjiDialog = true;
      this.bianjiCity = item;
      this.oldbianjiCity = item;
    },
    bianji1() {
      let citys = { cityName: this.bianjiCity };
      this.axios
        .put("/citys?oldCityName=" + this.oldbianjiCity, citys)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("编辑成功");
            this.getCity();
          }
        });
      this.bianjiDialog = false;
    },
    del(item) {
      this.delDialog = true;
      this.delCity = item;
    },
    del1() {
      this.axios.delete("/citys?cityName=" + this.delCity).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          this.$message.success("删除成功");
          this.getCity();
        }
        this, (this.delDialog = false);
      });
    },
  },
};
</script>

<style scoped>
</style>