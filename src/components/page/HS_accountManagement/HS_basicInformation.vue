<template>
    <div class="container">
        <el-row>
            <el-col :span="12" :offset="5">
                <el-form 
                    :model="form" 
                    ref="form" 
                    label-position="left"
                    label-width="150px">
                        <el-form-item label="用户名" prop="username" >
                            <el-input type="text" v-model="form.username" :disabled="true" ></el-input>
                        </el-form-item>
                        <el-form-item label="公司名称" prop="companyname" >
                            <el-input type="text" v-model="form.companyname" :disabled="true" ></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="perContact">
                            <el-input type="text" v-model="form.perContact" ></el-input>
                        </el-form-item> 
                        <el-form-item label="联系电话" prop="perContactPhone">
                            <el-input type="text" v-model="form.perContactPhone" ></el-input>
                        </el-form-item>
                        <el-form-item label="运行商报告获取成功异步通知地址:" prop="carrierCallUrl">
                            <el-input type="text" v-model="form.carrierCallUrl" ></el-input>
                        </el-form-item>
                        <el-form-item label="信贷报告获取成功异步通知地址:" prop="creditCallUrl">
                            <el-input type="text" v-model="form.creditCallUrl" ></el-input>
                        </el-form-item>  
                        <el-form-item>
                          <el-button type="primary" @click="submitForm(form)">提交</el-button>
                        </el-form-item>                                                                               
                </el-form>                
            </el-col>            
        </el-row>

    </div>
</template>

<script>
import { httpGetCustuserInfo, httpPostCustuserInfo } from "@/api/http";
export default {
  data() {
    return {
      form: {}
    };
  },
  methods: {
    submitForm(data) {
      httpPostCustuserInfo(data)
        .then(res => {
          console.log(res);
          //   this.$confirm("您确定要删除吗？", "提示", {
          //     confirmButtonText: "确定",
          //     cancelButtonText: "取消",
          //     type: "warning"
          //   })
          //     .then(() => {
          //       this.$message({
          //         type: "success",
          //         message: "删除成功!"
          //       });
          //     })
          //     .catch(() => {
          //       this.$message({
          //         type: "info",
          //         message: "已取消删除"
          //       });
          //     });
        })
        .catch();
      console.log(data);
    },
    getCustuserInfo() {
      let _this = this;
      httpGetCustuserInfo()
        .then(res => {
          let data = res.data;
          _this.form = data;
          console.log(data);
          localStorage.setItem("flly_username", data.username);
        })
        .catch();
    }
  },
  mounted: function() {
    this.getCustuserInfo();
  }
};
</script>

<style>
</style>
