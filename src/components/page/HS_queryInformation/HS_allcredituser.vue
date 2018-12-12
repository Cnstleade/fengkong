<template>
    <div class="container allcredituser">
        <el-row>
            <el-alert
              title="客户列表展示"
              :closable="false"
              type="info">
            </el-alert>           
        </el-row> 
        <el-row class="m20">
             <el-button  type="primary" @click="addUser">新增用户</el-button>
        </el-row>
        <el-table
            :data="tableData"  
            border  
            tooltip-effect="dark"
            style="width: 100%;font-weight:bold"
            class="m20"
            v-loading="loading"
              highlight-current-row 
            id="eleTable"
          >
              <el-table-column prop="id" label="ID" align="center" width="80" sortable>
              </el-table-column>
              <el-table-column prop="username" label="用户名" align="center" width="100" >
              </el-table-column>
              <el-table-column prop="perContact" label="公司联系人" align="center" width="120" >
              </el-table-column>
              <el-table-column prop="perContactPhone" label="电话号码" align="center" width="180" >
              </el-table-column>
              <el-table-column prop="companyname" label="公司名" align="center" width="180" >
              </el-table-column>
              <el-table-column prop="carrierCallUrl" label="回调地址" align="center"  width="300" >
              </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="140" sortable>
                <template slot-scope="scope">
                    {{scope.row.createTime|dateServer}}
                </template>
            </el-table-column>
              <el-table-column prop="partnerKey" label="partnerKey" align="center" width="180" >
              </el-table-column> 
              <el-table-column prop="partnerCode" label="partnerCode" align="center" width="180" >
              </el-table-column>      
                <el-table-column prop="cz"  align="center" label="操作"  width="120" >
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleAllocation(scope.$index, scope.row)"
                       >编辑</el-button>
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
        <el-dialog
          title="新增用户"
          :visible.sync="dialogVisible"
          center
          width="30%"
          >
            <el-form :rules="rules" :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" ></el-input>
              </el-form-item>
              <el-form-item label="用户密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" ></el-input>
              </el-form-item> 
              <el-form-item label="公司联系人" prop="perContact">
                <el-input v-model="ruleForm.perContact" ></el-input>
              </el-form-item>                
              <el-form-item label="电话号码" prop="perContactPhone">
                <el-input v-model="ruleForm.perContactPhone" ></el-input>
              </el-form-item> 
              <el-form-item label="公司名" prop="companyname">
                <el-input v-model="ruleForm.companyname" ></el-input>
              </el-form-item>
              <el-form-item label="回调地址" prop="carrierCallUrl">
                <el-input type="textarea" v-model="ruleForm.carrierCallUrl" ></el-input>
              </el-form-item> 
              <el-form-item label="partnerKey" prop="partnerKey">
                <el-input v-model="ruleForm.partnerKey" ></el-input>
              </el-form-item> 
              <el-form-item label="partnerCode" prop="partnerCode">
                <el-input v-model="ruleForm.partnerCode" ></el-input>
              </el-form-item>                                                          

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>       
        </el-dialog>       
        <el-dialog
          title="修改用户"
          :visible.sync="dialogVisibles"
          center
          width="30%"
          >
            <el-form :rules="rules" :model="ruleForms" status-icon  ref="ruleForms" label-width="100px" >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForms.username" ></el-input>
              </el-form-item>
              <el-form-item label="用户密码" prop="password">
                <el-input v-model="ruleForms.password" type="password" ></el-input>
              </el-form-item> 
              <el-form-item label="公司联系人" prop="perContact">
                <el-input v-model="ruleForms.perContact" ></el-input>
              </el-form-item>                
              <el-form-item label="电话号码" prop="perContactPhone">
                <el-input v-model="ruleForms.perContactPhone" ></el-input>
              </el-form-item> 
              <el-form-item label="公司名" prop="companyname">
                <el-input v-model="ruleForms.companyname" ></el-input>
              </el-form-item>
              <el-form-item label="回调地址" prop="carrierCallUrl">
                <el-input type="textarea" v-model="ruleForms.carrierCallUrl" ></el-input>
              </el-form-item> 
              <el-form-item label="partnerKey" prop="partnerKey">
                <el-input v-model="ruleForms.partnerKey" ></el-input>
              </el-form-item> 
              <el-form-item label="partnerCode" prop="partnerCode">
                <el-input v-model="ruleForms.partnerCode" ></el-input>
              </el-form-item>                                                          

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForms')">提交</el-button>
                  <el-button @click="resetForm('ruleForms')">重置</el-button>
                </el-form-item>
            </el-form>       
        </el-dialog>               
    </div>
</template>

<script>
import {
  httpGetallcredituser,
  httpUpdatesysuser,
  httpCreatesysuser
} from "@/api/http";
export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      if (value != null && value != "") {
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入正确手机号码！"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("请输入正确手机号码！"));
      }
    };
    return {
      tableData: [],
      npage: 1,
      pagesize: 10,
      total: 0,
      loading: false,
      dialogVisible: false,
      dialogVisibles: false,
      ruleForm: {},
      ruleForms: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ],
        perContact: [
          { required: true, message: "请输入公司联系人", trigger: "blur" }
        ],
        companyname: [
          { required: true, message: "请输入公司名", trigger: "blur" }
        ],
        carrierCallUrl: [
          { required: true, message: "请输入回调地址", trigger: "blur" }
        ],
        partnerKey: [
          { required: true, message: "请输入partnerKey", trigger: "blur" }
        ],
        partnerCode: [
          { required: true, message: "请输入partnerCode", trigger: "blur" }
        ],
        perContactPhone: [
          { require: true, validator: validateMobile, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    _initTable() {
      this.loading = true;
      httpGetallcredituser()
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.tableData = data.data;
            this.loading = false;
          } else {
            this.loading = false;
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
        });
    },
    //新增用户
    addUser() {
      this.ruleForm = {};
      this.dialogVisible = true;
    },
    handleAllocation(index, row) {
      this.ruleForms = JSON.parse(JSON.stringify(row));
      this.dialogVisibles = true;
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "ruleForm") {
            httpCreatesysuser(
              this.ruleForm.username,
              this.ruleForm.password,
              this.ruleForm.perContact,
              this.ruleForm.perContactPhone,
              this.ruleForm.companyname,
              this.ruleForm.carrierCallUrl,
              this.ruleForm.partnerKey,
              this.ruleForm.partnerCode
            )
              .then(res => {
                let data = res.data;
                if (data.code == 200) {
                  this.$message({
                    message: data.msg,
                    type: "success"
                  });
                  this.dialogVisible = false;
                  this._initTable();
                } else {
                  this.$message({
                    message: data.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                this.$message({
                  message: "网络错误,请联系管理员",
                  type: "error"
                });
              });
          } else {
            httpUpdatesysuser(
              this.ruleForms.username,
              this.ruleForms.password,
              this.ruleForms.perContact,
              this.ruleForms.perContactPhone,
              this.ruleForms.companyname,
              this.ruleForms.carrierCallUrl,
              this.ruleForms.partnerKey,
              this.ruleForms.partnerCode,
              this.ruleForms.id
            )
              .then(res => {
                let data = res.data;
                if (data.code == 200) {
                  this.$message({
                    message: data.msg,
                    type: "success"
                  });
                   this.dialogVisibles = false;
                  this._initTable();
                } else {
                  this.$message({
                    message: data.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                this.$message({
                  message: "网络错误,请联系管理员",
                  type: "error"
                });
              });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this._initTable();
  }
};
</script>
<style scoped>
</style>

