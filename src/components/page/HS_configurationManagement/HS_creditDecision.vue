<template>
    <div class="container">
        <el-row >
            <el-table  :data="tableData" border style="width: 100%" v-loading="loading">
                <el-table-column  sortable label="编号">
                    <template slot-scope="scope">
                        <el-row>
                            <span style="margin-left: 10px">编号:{{ scope.row.id }}</span>
                        </el-row>
                        <el-row>
                            <span style="margin-left: 10px">{{ scope.row.executeName}}</span>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="executeNameCn" label="描述"></el-table-column>
                <el-table-column  label="操作">
                   <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleConfiguration(scope.$index, scope.row)">配置</el-button>
                       <el-switch
                        @change="handleUpdateCreditStatus(scope.row)"
                       style="margin-left:20px"
                        v-model="scope.row.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"                                            
                        active-text="ON"
                        inactive-text="OFF">
                        </el-switch>
                   </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="margin-top:20px" v-if="total>0">
             <div style="float:right">
                 <el-pagination
                   @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                   :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                   background
                   layout="total,sizes,prev, pager, next,jumper"
                   :total="total">
                 </el-pagination>   
             </div>
         </el-row>  
        <!-- 编辑弹出框 --> 
         <el-dialog  
            title="决策配置"
            :visible.sync="editVisible" 
            center
            width="50%">
            <el-row style="margin-bottom:20px">
                <el-col :span="12" :offset="2">
                    风险决策
                </el-col>
                <el-col :span="8">
                    拒绝
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :offset="2">
                    条件
                </el-col>
                <el-col :span="3" style="line-height:32px">
                    {{configUser.executeParaHelp}}
                </el-col>
                <el-col :span="5">
                    <el-input
                    placeholder=""
                    v-model="configUser.executePara">
                    </el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer" >
                <el-button type="primary" @click="handleUpdateCreditPara(configUser.id,configUser.executePara)">确 定</el-button>
            </span>     
         </el-dialog>
    </div>
</template>

<script>
import { httpUpdateCreditStatus, httpGetExecutor } from "@/api/http";
export default {
  data() {
    return {
      editVisible: false,
      total: 0,
      pageSize: 20,
      currentPage: 1,
      type: 1,
      tableData: [],
      index: 0,
      configUser: {},
      loading: true
    };
  },
  methods: {
    handleConfiguration(index, row) {
      this.index = index;
      this.editVisible = true;

      this.configUser = row;
    },
    //获得数据
    getTableData(npage, pagesize, type = 1) {
      let _this = this;
      _this.loading = true;
      httpGetExecutor(npage, pagesize, type)
        .then(data => {
          console.log(data);
          _this.pageSize = parseInt(data.data.pagesize);
          _this.currentPage = parseInt(data.data.npage);
          _this.total = parseInt(data.data.allsize);
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
    //当前页显示数据
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getTableData(val, this.pageSize, this.type);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(this.currentPage, this.pageSize);
    },
    //更改执行器适度开启
    handleUpdateCreditStatus(row) {
      httpUpdateCreditStatus(row.id, row.status ? 1 : 0)
        .then(data => {
          console.log(data);
        })
        .catch(() => {
          console.log(row.id, row.status);
        });
    },
    //credit 风控配置管理 执行器参数修改
    handleUpdateCreditPara(id, executePara) {
      this.editVisible = false;
      httpUpdateCreditStatus(id, executePara)
        .then(data => {
          console.log(data);
        })
        .catch(() => {
          console.log(id, executePara);
        });
    }
  },
  beforeMount() {
    this.getTableData(this.currentPage, this.pageSize, this.type);
  }
};
</script>

<style>
</style>

