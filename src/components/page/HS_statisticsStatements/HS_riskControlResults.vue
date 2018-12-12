<template>
    <div class="container">
        <el-row>
            <el-col :span="6">
                <el-button  icon="el-icon-plus" @click="export2Excel">导出excel</el-button>
            </el-col>
            <el-col :span="18" >
                <el-row>
                    <el-col :span="12">
                       <el-date-picker
                           v-model="select_time"
                        type="daterange"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           value-format="yyyy-MM-dd">
                       </el-date-picker>   
                    </el-col>
                    <el-col :span="12" >
                        <el-row>
                            <el-col :span="8">
                                <el-input v-model="select_phone" @keyup.enter.native="handleSearch" placeholder="请输入手机号搜索" ></el-input>
                            </el-col>
                            <el-col :span="8" class="l20" >
                                <el-input v-model="userName" @keyup.enter.native="handleSearch" placeholder="请输入姓名" ></el-input>
                            </el-col>                            
                            <el-col :span="4" class="l20">
                                 <el-button type="primary" icon="search" @click="handleSearch">搜索</el-button> 
                            </el-col>    
                        </el-row>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        
        <el-row style="margin-top:20px" id="elCard">
            <el-table
                :data="tableData"
                v-loading="loading"
                border
                style="width: 100%">
                <el-table-column
                    prop="id"
                    sortable
                    label="序号"
                     width="100">
                </el-table-column>
                 <el-table-column
                  v-if="companyName"
                    prop="companyName"
                    label="公司名称"
                    width="120">
                 </el-table-column>                
                 <el-table-column
                    prop="realname"
                    label="姓名"
                    width="100">
                 </el-table-column>
                <el-table-column
                    prop="idCard"
                    width="180"
                    label="身份证">
                </el-table-column>
                <el-table-column
                    prop="phonenume"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    label="时间" width="200">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.applytime |dateServer }}</span>
                    </template>                      
                </el-table-column> 
                <el-table-column
                prop="status"
                :filters="[{ text: '完成', value: '1' }, { text: '进行中', value: '0' }]" :filter-method="filterStatus" filter-placement="bottom-end"
                    label="状态">
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.status ===1?'success':''">{{ scope.row.status ===1?'完成':'进行中' }}</el-tag>
                    </template>   
                </el-table-column>
                <el-table-column
                prop="result"
                :filters="[{ text: '通过', value: '1' }, { text: '人工', value: '2' }, { text: '拒绝', value: '0' }]" :filter-method="filterResult" filter-placement="bottom-end"
                    label="结果">
                   <template slot-scope="scope">
                        <el-button
                         size="mini"
                         :type="scope.row.result ===1?'success':(scope.row.result ===2?'primary':'danger') "
                         :disabled="scope.row.result ===1||scope.row.status ===0"
                         @click="handleShow(scope.$index, scope.row)">
                         {{ scope.row.status ===0?'未完成':scope.row.result ===1?'通过':(scope.row.result ===2?'人工':'拒绝') }}
                         </el-button>
                    </template>                      
                </el-table-column>                                                                   
            </el-table>
        </el-row>        
        <el-row style="margin-top:20px" v-if="allpage>0">
            <div style="float:right">
                <el-pagination
                  @current-change="handleCurrentChange"
                  
                   @size-change="handleSizeChange"
                  :current-page="currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                  background
                  layout="total,sizes,prev, pager, next,jumper"
                  :total="allpage">
                </el-pagination>   
            </div>
        </el-row> 
        <!-- 报告弹窗 -->
        <el-dialog  :visible.sync="showVisiable" width="35%" title="结果详情">
            <el-row>
              <el-col :span="12" :offset="2">
                <el-tag>执行器编号</el-tag>
              </el-col>
              <el-col :span="6">
                  <el-tag type="info">{{getriskpoint.executeName}}</el-tag>
              </el-col>              
            </el-row>   
            <el-row style="margin-top:20px">
              <el-col :span="12" :offset="2">
                <el-tag>执行器名称</el-tag>
              </el-col>
              <el-col :span="6">
                  <el-tag type="warning">{{getriskpoint.executeNameCn}}</el-tag>
              </el-col>    
            </el-row>       
        </el-dialog>  
                         
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { httpGetCreditResultByuser, httpGetRiskpoint } from "@/api/http";
import { timeFormat } from "../../../../static/js/time";
export default {
  data() {
    return {
      select_time: [],
      tableData: [],
      select_phone: "",
      currentPage: 1,
      pageSize: 20,
      allpage: 0,
      showVisiable: false,
      getriskpoint: {},
      loading: true,
      userName: ""
    };
  },
  computed: {
    ...mapGetters([
      "role"
      // ...
    ]),
    companyName: () => {
      return localStorage.getItem("chbR") == null
        ? false
        : JSON.parse(localStorage.getItem("chbR")).indexOf("view_admin") != -1;
    }
  },
  methods: {
    export2Excel() {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../vendor/Export2Excel");
        const tHeader = [
          "序号",
          "姓名",
          "身份证",
          "手机号",
          "时间",
          "状态",
          "结果"
        ];
        const filterVal = [
          "id",
          "realname",
          "idCard",
          "phonenume",
          "applytime",
          "status",
          "result"
        ];
        let list = JSON.parse(JSON.stringify(this.tableData));

        for (var i = 0; i < list.length; i++) {
          console.log(list[i].status);
          list[i].status = list[i].status === 1 ? "完成" : "进行中";
          list[i].result =
            list[i].result === 1
              ? "通过"
              : list[i].result === 2 ? "人工" : "拒绝";
          list[i].applytime = timeFormat(list[i].applytime);
        }
        console.log(list);
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "列表excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    getCreditResultByuser(npage, pagesize, phoneNume, begain, end, userName) {
      let _this = this;
      _this.loading = true;
      httpGetCreditResultByuser(
        npage,
        pagesize,
        phoneNume,
        begain,
        end,
        userName
      )
        .then(res => {
          let data = res.data;
          _this.allpage = data.allpage * pagesize;
          _this.tableData = data.list;
          _this.loading = false;
          setTimeout(() => {
            _this.loading = false;
          }, 5000);
        })
        .catch(() => {
          _this.loading = false;
        });
    },

    handleShow(index, row) {
      this.showVisiable = true;
      let id = row.id;
      let _this = this;
      httpGetRiskpoint(id)
        .then(res => {
          let data = res.data;
          this.getriskpoint = data;
        })
        .catch();
    },
    handleSearch() {
      // this.currentPage = 1;
      if (this.select_time.length === 0) {
        this.getCreditResultByuser(
          this.currentPage,
          this.pageSize,
          this.select_phone,
          "",
          "",
          this.userName
        );
      } else {
        this.getCreditResultByuser(
          this.currentPage,
          this.pageSize,
          this.select_phone,
          ...this.select_time,
          this.userName
        );
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handleSearch();
      // this.getCreditResultByuser(
      //   val,
      //   this.pageSize,
      //   this.select_phone,
      //   ...this.select_time
      // );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleSearch();
      // this.getCreditResultByuser(
      //   this.currentPage,
      //   this.pageSize,
      //   this.select_phone,
      //   ...this.select_time
      // );
    },
    filterStatus(value, row, column) {
      return row.status == value;
    },
    filterResult(value, row) {
      console.log(row.result, value);
      return row.result == value;
    }
  },
  created() {
    this.getCreditResultByuser(this.currentPage, this.pageSize);
  }
};
</script>
<style>
#elCard .el-tag {
  width: 54px;
  text-align: center;
}
</style>
<style scoped>
</style>

