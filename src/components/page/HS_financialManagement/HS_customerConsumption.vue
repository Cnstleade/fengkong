<template>
    <div class="container">
        <el-row>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> 客户消费列表展示</span>
                    <el-row>
                    <el-col :span="24">
                        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
                            <el-table-column
                                sortable
                                prop="applyid"
                                width="290"
                                label="序号">
                            </el-table-column>
                            <el-table-column
                                prop="creditSysuser.username"
                                label="用户名">
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
                    </el-col>
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
                </el-tab-pane>
                <el-tab-pane label="图表展示">
                    <el-row>
                        <el-col :span="6">
                            <div>
                                <el-radio v-model="type" label="date" border>按照日期</el-radio>
                                <el-radio v-model="type" label="month" border>按照月份</el-radio>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="block" v-if="type==='date'">
                                   <el-date-picker
                                     v-model="date"
                                     type="date"
                                     placeholder="选择日期">
                                   </el-date-picker>
                                   <el-button type="primary" icon="el-icon-search" @click="getChartInfobyDate">搜索</el-button>
                            </div>
                            <div class="block" v-if="type==='month'">
                                   <el-date-picker
                                     v-model="month"
                                     type="month"
                                     placeholder="选择月">
                                   </el-date-picker>
                                   <el-button type="primary" icon="el-icon-search" @click="getChartInfobyMonth">搜索</el-button>
                            </div>
                        </el-col>

                    </el-row>
                    <el-row style="margin-top:40px">
	                    <div id="myChart" :style="{width: '800px', height: '500px'}"></div>
                    </el-row>
                </el-tab-pane>
            </el-tabs>                      
        </el-row>
    </div>
</template>

<script>
import {
  httpGetAllCus,
  httpGetChartInfobyMonth,
  httpGetChartInfobyDate
} from "@/api/http";
export default {
  data() {
    return {
      tableData: [],
      pageSize: 20,
      currentPage: 1,
      allpage: 0,
      date: new Date(),
      month: new Date(),
      type: "month",
      loading: true
    };
  },
  computed: {
    // 计算属性的 getter
    Month: function() {
      // `this` 指向 vm 实例
      return new Date(this.month).getMonth() + 1;
    },
    Dates: function() {
      // `this` 指向 vm 实例
      return (
        new Date(this.date).getFullYear() +
        "-" +
        (new Date(this.date).getMonth() + 1 > 10
          ? new Date(this.date).getMonth() + 1
          : "0" + (new Date(this.date).getMonth() + 1)) +
        "-" +
        new Date(this.date).getDate()
      );
    }
  },
  methods: {
    getTableData(npage, pagesize) {
      let _this = this;
      _this.loading = true;
      httpGetAllCus(npage, pagesize)
        .then(data => {
          _this.allpage = data.data.allpage * data.data.pagesize;
          _this.currentPage = data.npage;
          _this.tableData = data.data.list;
          _this.loading = false;
          setTimeout(() => {
            _this.loading = false;
          }, 5000);
        })
        .catch(data => {
          console.log("这是错误的" + data);
          _this.loading = false;
        });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getTableData(val, this.pageSize);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(this.currentPage, this.pageSize);
    },
    getChartInfobyDate() {
      httpGetChartInfobyDate(this.Dates)
        .then(data => {
          this.drawLine(data.data, false);
        })
        .catch(console.log(this.Dates));
    },
    getChartInfobyMonth() {
      httpGetChartInfobyMonth(this.Month)
        .then(data => {
          this.drawLine(data.data, true);
        })
        .catch(console.log(this.Month));
    },
    //echart 画表格
    drawLine(data, type) {
      // 基于准备好的dom，初始化echarts实例
      let companyname = [];
      for (var i = 0; i < data.length; i++) {
        companyname.push(data[i].companyname);
      }
      let consumemoney = [];
      for (var i = 0; i < data.length; i++) {
        consumemoney.push(data[i].consumemoney);
      }
      let callsize = [];
      for (var i = 0; i < data.length; i++) {
        callsize.push(data[i].callsize);
      }

      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let labelOption = {
        normal: {
          show: true,
          rotate: 90,
          align: "left",
          verticalAlign: "middle",
          position: "insideBottom",
          distance: 15,
          formatter: "{c}  {name|{a}}",
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: "#fff"
            }
          }
        }
      };
      if (type) {
        // 绘制图表
        myChart.setOption({
          color: ["#4cabce", "#e5323e"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: ["总消费", "消费次数"]
          },
          title: { text: "客户消费详情" },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ["line", "bar", "stack", "tiled"]
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              axisTick: { show: false },
              data: companyname
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "总消费",
              type: "bar",
              barGap: 0,
              label: labelOption,
              data: consumemoney
            },
            {
              name: "消费次数",
              type: "bar",
              label: labelOption,
              data: callsize
            }
          ]
        });
      } else {
        myChart.setOption({
          color: ["#4cabce"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: ["总消费"]
          },
          title: { text: "客户消费详情" },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ["line", "bar", "stack", "tiled"]
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              axisTick: { show: false },
              data: companyname
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "总消费",
              type: "bar",
              barGap: 0,
              label: labelOption,
              data: consumemoney
            }
          ]
        });
      }
    }
  },
  created() {
    this.getTableData(this.currentPage, this.pageSize);
    this.getChartInfobyMonth();
  },
  mounted() {}
};
</script>

<style>
</style>
