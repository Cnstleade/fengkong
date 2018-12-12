<template>
    <div class="login-wrap">
        <div class="ms-title">
            烈焰云
        </div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rule="rules" ref="ruleForm" label-width="0px" class="demp-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        登录
                    </el-button>
                    <p style="font-size:12px;line-height:30px;color:#999">
                        Tips: 账户不存在或密码错误请联系管理员。
                    </p>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { httpLogin } from "@/api/http";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    _httpLogin(username, password) {
      httpLogin(username, password)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            localStorage.setItem("lyy_username", this.ruleForm.username);
            this.$router.push("/riskTrend");
            // this.$store
            //   .dispatch("SETMENU", data.data.creditMenus)
            //   .then(re => {})
            //   .catch(err => {});
            // this.$store
            //   .dispatch("SET_ROLE", data.data.permissionStringList)
            //   .then(re => {})
            //   .catch(err => {});
            console.log(data.data.creditMenus);
            this.$store
              .dispatch("SETMENU", data.data.creditMenus)
              .then(re => {})
              .catch(err => {});
            localStorage.setItem("chbM", JSON.stringify(data.data.creditMenus));
            this.$store
              .dispatch("SETROLE", data.data.permissionStringList)
              .then(re => {})
              .catch(err => {});
            this.$message({
              message: "登录成功",
              type: "success"
            });
             localStorage.setItem("chbR", JSON.stringify(data.data.permissionStringList));
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          this.$message.error("网络错误请联系管理员");
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._httpLogin(this.ruleForm.username, this.ruleForm.password);
          // localStorage.setItem("fk_username", this.ruleForm.username);
          // this.$router.push("/home");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scope>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #324157;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>

