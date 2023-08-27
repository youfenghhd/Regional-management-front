<template>
  <div class="text-wrapper">
    <el-row>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <h3>当前:区域管理>列表</h3>
        </div></el-col
      >
    </el-row>
    <el-divider></el-divider>
    <el-dialog title="编辑区域" :visible.sync="bianjiDialog">
      <el-dialog
        width="30%"
        title="新增区域城市"
        :visible.sync="insertCity"
        append-to-body
      >
        <el-select v-model="firstMaintain" placeholder="请选择">
          <el-option
            v-for="(item, index) in maintainOption"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div v-for="(insertNewAddr, index) in insertNewAddr" :key="index">
          <h5>地址{{ index + 1 }}</h5>
          <el-input v-model="insertNewAddr.addr"></el-input>
        </div>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small "
          @click="addInsertAddr"
        ></el-button>
        <span slot="footer" class="dialog-footer">
          <el-button @click="insertCity = false">取 消</el-button>
          <el-button type="primary" @click="insertNewCitys()">确 定</el-button>
        </span>
      </el-dialog>

      区域名称：
      <input
        style="align: center"
        v-model="bianjiDate.regionName"
        placeholder="修改区域名称"
      /><el-button type="primary" @click="insertCity = true"
        >新增区域城市</el-button
      >

      <el-button @click="bianjiDialog = false">取 消</el-button>
      <el-button type="primary" @click="insert()">确 定</el-button>
    </el-dialog>

    <el-dialog title="是否确认删除" :visible.sync="delDialog" width="30%">
      <span>是否确认删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false">取 消</el-button>
        <el-button type="primary" @click="del()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加区域" :visible.sync="addDialog" width="40%" center>
      <input
        style="align: center"
        v-model="addRegion"
        placeholder="请输入区域名称"
      />

      <el-select v-model="firstMaintain" placeholder="请选择">
        <el-option
          v-for="(item, index) in maintainOption"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div v-for="(input, index) in inputs" :key="index">
        <h5>地区{{ index + 1 }}</h5>
        <el-input v-model="input.value"></el-input>
      </div>
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small "
        @click="addInput"
      ></el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="insert()">确 定</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-col :span="5">
        <el-input v-model="regionName" placeholder="请输入区域名称"></el-input>
      </el-col>
      <el-col :span="5">
        <el-input v-model="cityName" placeholder="请输入区域城市"></el-input>
      </el-col>
      <el-col :span="5"
        ><el-input v-model="addr" placeholder="请输入地址"></el-input
      ></el-col>
      <el-col :span="7">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="2"><el-button @click="getLike()">搜索</el-button></el-col>
    </el-row>

    <el-row>
      <el-col :span="2"
        ><div class="grid-content bg-purple">
          <el-button @click="addDialog = true">添加</el-button>
        </div></el-col
      >
      <el-col :span="2"
        ><div class="grid-content bg-purple">
          <el-button @click="getRegion()">查看</el-button>
        </div></el-col
      >
    </el-row>
    <el-table :data="ListDate" style="width: 100%; text-align: center">
      <el-table-column type="index" label="区域名称"> </el-table-column>
      <el-table-column prop="regionName" label="区域名称"> </el-table-column>
      <el-table-column prop="cityName" label="区域城市"></el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <el-card shadow="never" v-if="scope.row.addr != ''">
            <div
              v-for="(item, index) in scope.row.addr"
              :key="item"
              class="text item"
            >
              {{ index + 1 }}.{{ item }}
            </div>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="bianji(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="del1(scope.row.rid)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 4, 8]"
        :page-size="PageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "DemoCitys",

  data() {
    return {
      bianjiInsertAddr: "",
      inputs: [{ value: "" }],
      insertCity: false,
      bianjiDialog: false,
      delrid: "",
      delDialog: false,
      PageSize: 2,
      currentPage: 1,
      totalCount: 1,
      addDialog: false,
      addRegion: "",
      ListDate: [],
      firstMaintain: "",
      maintainOption: [],
      tableDate: {
        regionName: "",
        cityName: "",
        addr: [],
        createTime: "",
      },
      bianjiDate: {
        regionName: "",
        cityName: "",
        addr: [],
      },
      insertNewCity: "",
      insertNewAddr: [{ addr: "" }],
      value1: "",
      regionName: "",
      cityName: "",
      addr: "",
    };
  },

  mounted() {
    this.getRegion();
    this.getCity();
  },

  methods: {
    insertNewCitys() {
      let insert_citys = [];
      this.insertNewAddr.forEach((element) => {
        insert_citys.push({ rid: this.bianjiInsertAddr, addr: element.addr });
      });
      this.axios.post("/citys/list", insert_citys).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.insertCity = false;
          this.getRegion();
        }
      });
      this.getRegion();
      this.firstMaintain = "";
      this.insertNewAddr = [{ addr: "" }];
    },
    addInsertAddr() {
      this.insertNewAddr.push({ addr: "" });
    },
    addInput() {
      this.inputs.push({ value: "" });
    },
    getCity() {
      this.axios.get("/citys").then((res) => {
        let data1 = res.data.data.citys;
        data1.forEach((element) => {
          this.maintainOption.push({
            value: element,
            label: element,
          });
        });
      });
    },
    bianji(item) {
      this.bianjiInsertAddr = item.rid;
      this.bianjiDialog = true;
      this.axios.get("/regions/getOne?rid=" + item.rid).then((res) => {
        console.log(res.data.data.one);
        let data = res.data.data.one;
        this.bianjiDate.regionName = data.regionName;
        let newCityName = [];
        let oldName = data.citys
        oldName.forEach(element => {
          if(!newCityName.includes(element.cityName)){
            newCityName.push(element.cityName)
          }
          console.log(newCityName)
        });

        //根据城市名称搜索地址，分配卡片呈现


      });
    },
    getLike() {
      let date1 = "";
      if (this.value1 != "") {
        let date = this.value1;
        date.forEach((element) => {
          var moment = require("moment");
          let Ndate = moment(element).format("YYYY-MM-DD HH:mm:ss");
          date1 == "" ? (date1 += Ndate) : (date1 += "," + Ndate);
        });
      }
      let data = {
        regionName: this.regionName,
        citys: [
          {
            addr: this.addr,
            cityName: this.cityName,
          },
        ],
        createTime: date1,
      };
      this.ListDate = [];
      this.axios
        .post(
          "/regions/getLike?pageNum=" +
            this.currentPage +
            "&pageSize=" +
            this.PageSize,
          data
        )
        .then((res) => {
          let data = res.data.data.like.records;
          this.totalCount = res.data.data.like.total;
          data.forEach((element) => {
            this.tableDate = element;
            this.tableDate.cityName = "";
            let citys = element.citys;
            this.tableDate.addr = "";
            citys.forEach((element1) => {
              const aaa = this.tableDate.cityName;
              if (!aaa.includes(element1.cityName)) {
                this.tableDate.cityName == ""
                  ? (this.tableDate.cityName += element1.cityName + "")
                  : (this.tableDate.cityName += "," + element1.cityName);
              }
              this.tableDate.addr.push(element1.addr);
            }, this.ListDate.push(this.tableDate));
          });
        });
    },
    async del1(item) {
      this.delrid = item;
      this.delDialog = true;
    },
    del() {
      this.axios.delete("/regions?rid=" + this.delrid).then((res) => {
        if (res.data.success) {
          this.$message.success("删除成功");
          this.delDialog = false;
          this.getRegion();
        }
      });
    },
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
      this.getRegion();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRegion();
    },
    insert() {
      let end_citys = [];
      this.inputs.forEach((element) => {
        end_citys.push({ cityName: this.firstMaintain, addr: element.value });
      });
      let data = {
        regionName: this.addRegion,
        citys: end_citys,
      };
      console.log(data);
      this.axios.post("/regions", data).then((res) => {
        if (res.data.success) {
          this.$message.success("添加成功");
          this.addDialog = false;
          this.getRegion();
        }
      });
      this.getRegion();
      this.addRegion = "";
      this.firstMaintain = "";
      this.inputs = [{ value: "" }];
    },
    async getRegion() {
      this.ListDate = [];
      this.axios
        .get(
          "/regions?pageNum=" + this.currentPage + "&pageSize=" + this.PageSize
        )
        .then((res) => {
          let data = res.data.data.all.records;
          this.totalCount = res.data.data.all.total;
          data.forEach((element) => {
            this.tableDate = element;
            this.tableDate.cityName = "";
            let citys = element.citys;
            this.tableDate.addr = [];
            citys.forEach((element1) => {
              const aaa = this.tableDate.cityName;
              if (!aaa.includes(element1.cityName)) {
                this.tableDate.cityName == ""
                  ? (this.tableDate.cityName += element1.cityName + "")
                  : (this.tableDate.cityName += "," + element1.cityName);
              }
              this.tableDate.addr.push(element1.addr);
            }, this.ListDate.push(this.tableDate));
          });
        });
      // },    async getRegion() {
      //   this.ListDate = [];
      //   this.axios
      //     .get(
      //       "/regions?pageNum=" + this.currentPage + "&pageSize=" + this.PageSize
      //     )
      //     .then((res) => {
      //       let data = res.data.data.all.records;
      //       this.totalCount = res.data.data.all.total;
      //       data.forEach((element) => {
      //         this.tableDate = element;
      //         this.tableDate.cityName = "";
      //         let citys = element.citys;
      //         this.tableDate.addr = "";
      //         citys.forEach((element1, index) => {
      //           const aaa = this.tableDate.cityName;
      //           if (!aaa.includes(element1.cityName)) {
      //             this.tableDate.cityName == ""
      //               ? (this.tableDate.cityName += element1.cityName + "")
      //               : (this.tableDate.cityName += "," + element1.cityName);
      //           }
      //           this.tableDate.addr +=
      //             index +
      //             1 +
      //             "." +
      //             element1.cityName +
      //             "-" +
      //             element1.addr +
      //             "\n";
      //         }, this.ListDate.push(this.tableDate));
      //       });
      //     });
    },
  },
};
</script>
  
  <style scoped>
.text-wrapper {
  white-space: pre-wrap;
}
</style>
