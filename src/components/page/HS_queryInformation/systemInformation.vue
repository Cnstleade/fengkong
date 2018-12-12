<template>
    <div class="container">
        <el-row>
            <el-alert
              :title="title"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row>  
        <el-row class="m20" >
            <el-col   class="col-flex-end">
                    <!-- <el-button-group>
                      <el-button :type="execeedtimeType==0?'info':''" @click="changeExeceedtimeType(0)">重置</el-button>
                      <el-button :type="execeedtimeType==1?'primary':''" @click="changeExeceedtimeType(1)">M1</el-button>
                      <el-button :type="execeedtimeType==2?'success':''" @click="changeExeceedtimeType(2)">M2</el-button>
                      <el-button :type="execeedtimeType==3?'warning':''" @click="changeExeceedtimeType(3)">M3</el-button>
                      <el-button :type="execeedtimeType==4?'danger':''" @click="changeExeceedtimeType(4)">M3+</el-button>
                    </el-button-group>     -->
                    <el-button  type="primary" @click="reset">重置</el-button>
                    <div class="l20">
                        <el-input
                        style="padding:0px 10px 0px 0px"
                          placeholder="请输入手机号码"
                          v-model="search.input"
                          clearable>
                        </el-input> 
                    </div>                                  
                    <el-date-picker
                    style="width:340px"
                    class="l20"
                      v-model="search.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>                
                    <el-button @click="handleSearch" class="l20" style="margin-left:20px" icon="el-icon-search"  type="success" circle></el-button>                                                                  
            </el-col>             
        </el-row> 
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
            style="width: 100%"
            class="m20"
            @selection-change="handleSelectionChange"
            v-loading="loading"
            id="eleTable"
          >
              <el-table-column prop="id" label="ID" align="center" width="80" sortable>
              </el-table-column>
              <el-table-column prop="username" label="用户名" align="center" width="180" >
              </el-table-column>
              <el-table-column prop="phoneNumber" label="手机号" align="center" min-width="180" >
              </el-table-column>
              <el-table-column prop="idcard" label="银行卡" align="center" min-width="180" >
              </el-table-column>                                          
            <el-table-column prop="creatime" label="创建时间" align="center" min-width="180" sortable>
                <template slot-scope="scope">
                    {{scope.row.creatime|dateServer}}
                </template>
            </el-table-column>

                <el-table-column prop="cz"  align="center" label="操作"  width="120" >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >重发</el-button>
                    </template> 
                </el-table-column>            
        </el-table>     
        <el-row class="m20" v-if="total>0">
             <div style="float:right">
                 <el-pagination
                   @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                   :current-page="npage"
                    :page-sizes="[10, 20, 30, 40]"
                     :page-size="pagesize"
                   background
                   layout="total,sizes,prev, pager, next,jumper"
                   :total="total">
                 </el-pagination>   
             </div>
        </el-row>                               
    </div>
</template>

<script>
import { httpRecallbacklist, httpRecallback } from "@/api/http";
import { timeFormat } from "../../../../static/js/time";
export default {
  data() {
    return {
      title: "信息查询",
      search: {
        input: "",
        time: ""
      },
      tableData: [],
      loading: true,
      npage: 1,
      pagesize: 10,
      total: 0,
      multipleSelection: [] //全部选中嘛
    };
  },
  methods: {
    _httpRecallback(id) {
      httpRecallback(id)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.getData(this.npage, this.pagesize);
          } else {
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
        })
        .catch();
    },
    _httpRecallbacklist(
      npage,
      pagesize,
      phonenumber,
      begainTimeString,
      endTimeString
    ) {
      this.loading = true;
      httpRecallbacklist(
        npage,
        pagesize,
        phonenumber,
        begainTimeString,
        endTimeString
      )
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: "查询成功",
              type: "success"
            });
            this.tableData = data.data.list;
            this.total = data.data.allsize;
          }
          this.loading = false;
        })
        .catch();
    },
    getData(npage, pagesize, phonenumber, begainTimeString, endTimeString) {
      let _this = this;
      this._httpRecallbacklist(
        npage,
        pagesize,
        phonenumber,
        begainTimeString,
        endTimeString
      );
    },
    handleSearch() {
      if (this.search.time && this.search.time.length) {
        this.getData(
          this.npage,
          this.pagesize,
          this.search.input,
          this.search.time[0] + " 00:00:00",
          timeFormat(this.search.time[1], 1) + " 00:00:00"
        );
      } else {
        this.getData(this.npage, this.pagesize, this.search.input, "", "");
      }
    },
    handleAllocation(index, row) {
      let id = row.id;
      this.$confirm("此操作将重发, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this._httpRecallback(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch();
    },
    reset() {
      this.search = {};
      this.getData(this.npage, this.pagesize);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted() {
    this.getData(this.npage, this.pagesize);
  }
};
</script>

<style>
</style>
