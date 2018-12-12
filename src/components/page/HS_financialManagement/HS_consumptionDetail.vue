<template>
    <div class="container">
        <el-row>
            <el-button type="primary">账户余额:{{moneyNow}}元</el-button>
        </el-row>
        
        <el-row style="margin-top:20px">
            <el-table 
                :data="tableData" 
                border 
                style="width: 100%"
                v-loading="loading"
            >
                <el-table-column
                    sortable
                    prop="applyid"
                    label="序号"
                     width="290">
                </el-table-column>
                <el-table-column
                    prop="creditSysuser.username"
                    label="用户名"
                     width="180">
                </el-table-column>
                <el-table-column
                    prop="creditSysuser.companyname"
                    label="公司名称">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="interfaceCallPrice"
                    label="变动金额">
                </el-table-column>
                <el-table-column
                    prop="interfaceCallName"
                    label="描述">
                </el-table-column>
                <el-table-column
                    sortable
                    label="时间">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.applytime |dateServer }}</span>
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
    </div>
</template>

<script>
import { httpGetConsumeDetail, httpGetMoneyNow } from "@/api/http";

export default {
  data() {
    return {
      tableData: [],
      pageSize: 20,
      currentPage: 1,
      allpage: 0,
      moneyNow: 0,
      loading: true
    };
  },
  methods: {
    getTableData(npage, pagesize) {
      let _this = this;
      _this.loading = true;
      httpGetConsumeDetail(npage, pagesize)
        .then(data => {
          _this.allpage = data.data.allpage * data.data.pagesize;
          _this.currentPage = data.data.npage;
          _this.tableData = data.data.list;
          _this.loading = false;
          setTimeout(() => {
            _this.loading = false;
          }, 5000);
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    GetMoneyNow() {
      let _this = this;
      httpGetMoneyNow()
        .then(data => {
          _this.moneyNow = data.data;
        })
        .catch();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData(this.currentPage, this.pageSize);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(this.currentPage, this.pageSize);
    }
  },
  created() {
    this.getTableData(this.currentPage, this.pageSize);
    this.GetMoneyNow();
  }
};
</script>

<style>
</style>

