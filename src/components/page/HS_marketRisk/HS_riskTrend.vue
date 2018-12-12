<template>
    <div class="container"   >
      <div v-if="show" >
				<div id="preloader">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>        
      </div>
      <div v-if="!show">
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,i) in todayEventList" :key="i">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div :class="'grid-content grid-con-'+i">
                        <div class="grid-con-default grid-con-icon">{{item.count}}</div>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{item.percent}}</div>
                            <div>{{item.title}}</div>
                        </div>                        
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row style=" margin-top:20px;padding-top:20px;    border-top: 2px solid #ccc">
            <el-row>
              <el-col :span="8" >
                <el-button-group >
                    <el-button type="primary" icon="delete" @click="setTime(0,0)">今天</el-button>
                    <el-button type="primary" icon="delete" @click="setTime(1,1)">昨天</el-button>
                    <el-button type="primary" icon="delete" @click="setTime(7,0)">最近七天</el-button>
                    <el-button type="primary" icon="delete" @click="setTime(30,0)">最近三十天</el-button>
                </el-button-group>
              </el-col>              
              <el-col :span="2" :offset="3">
                <div class="container-text">统计时间</div>
              </el-col>

              <el-col :span="7">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    @change="a"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
              </el-col>
              <el-col :span="2">
                <el-select v-model="select_cate" placeholder="事件类型" class="handle-select mr10">
                    <template v-for="(val, key, index) in comboBox" >
                       <el-option :key= "index"  :label="val" :value="key">
                       </el-option>
                    </template>
                </el-select> 
              </el-col>
              <el-col :span="2" style="padding-left:10px">
                <el-button type="primary" icon="delete" @click="handleSearch">搜索</el-button>
              </el-col>
            </el-row>
            <el-row class="table">
                <el-col :span="10">
                 风险事件统计
                   <el-tag>{{getMyDate(time[0])}}</el-tag>  
                   -
                   <el-tag>{{getMyDate(time[1])}}</el-tag> 
                </el-col>
                <!-- <el-col :span="2">
                    <el-button >导出数据</el-button>          
                </el-col> -->
                <el-col :span="6" v-if="allEventList.length>0">
                  <el-tag type="success">   {{allEventList[3].title}}:
                    {{allEventList[3].count}}</el-tag>
                </el-col>
                
            </el-row>
            <el-row class="table-data" >
                <el-col :span="16">
                  <el-col :span="24" class="schart">
                    	<div id="myChart" :style="{width: '700px', height: '400px'}"></div>
                  </el-col>
                </el-col>
                <el-col :span="8" v-if="allEventList.length>0">
                  <el-col :span="24" v-for="(item,i) in allEventList" :key="i">
                    <div >
                      <div :class="'grid-content grid-con-'+i">
                          <el-progress v-if="item.percent !== -1 "   type="circle" :width="80" :percentage="item.percent===-1? 0:item.percent" :color="item.color"></el-progress>
                          <div class="grid-cont-right"  v-if="item.percent !== -1 " >
                              <div class="grid-num">{{item.count}}</div>
                             <div>{{item.title}}</div>
                          </div>                        
                      </div>
                    </div>
                  </el-col>
                </el-col>                
            </el-row>
        </el-row>
      </div>
    </div>    
</template>

<script>
import {
  httpGetSummary,
  httpGetComboBox,
  httpGetSummaryBydateandType
} from "@/api/http";
import { timeFormat } from "../../../../static/js/time";
import { toPercentS, toPercentN } from "../../../../static/js/number";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      todayEventList: [],
      allEventList: [],
      comboBox: [],
      time: [],
      crossTime: [timeFormat(new Date()), timeFormat(new Date(new Date()), 1)],
      showTime: [],
      select_cate: "",
      options2: {
        title: "风险事件统计",
        bgColor: "#ddd",
        titleColor: "#000",
        legendColor: "#000"
      },
      show: true,
      count: 0
    };
  },
  watch: {
    time(curVal, oldVal) {
      this.crossTime = [
        timeFormat(new Date(curVal[0])) ,
        timeFormat(new Date(curVal[1]), 1) 
      ];
    }
  },
  methods: {
    setTime(a, b) {
      this.time = [
        new Date(
          new Date(new Date().setDate(new Date().getDate() - a)).setHours(
            0,
            0,
            0,
            0
          )
        ).getTime(),
        new Date(
          new Date(new Date().setDate(new Date().getDate() - b)).setHours(
            0,
            0,
            0,
            0
          )
        ).getTime()
      ];

      setTimeout(() => {
        this.handleSearch();
      }, 100);
    },
    //转成2017-01-01
    getMyDate(str, number = 0) {
      return timeFormat(str, number);
    },
    //得到上面的4个点点
    getSummary() {
      let _this = this;
      httpGetSummary()
        .then(response => {
          let data = response.data;
          _this.todayEventList = [
            {
              title: "今日拒绝事件",
              count: data.affair_refuse,
              percent: toPercentS(data.affair_refuse, data.affair_allnume),
              color: "#ff6c5c"
            },
            {
              title: "今日人工审核事件",
              count: data.affair_artif,
              percent: toPercentS(data.affair_artif, data.affair_allnume),
              color: "#f8d436"
            },
            {
              title: "今日通过事件",
              count: data.affair_through,
              percent: toPercentS(data.affair_through, data.affair_allnume),
              color: "#a7db65"
            },
            {
              title: "今日事件总数",
              count: data.affair_allnume,
              color: "#7a8c99"
            }
          ];
          _this.count++;
          if (_this.count == 2) {
            _this.show = false;
            _this.handleSearch();
          }
        })
        .catch();
    },
    //得到下拉框
    getComboBox() {
      let _this = this;
      httpGetComboBox()
        .then(res => {
          let data = res.data;
          _this.comboBox = data;
          _this.count++;
          if (_this.count == 2) {
            _this.show = false;
            _this.handleSearch();
          }
        })
        .catch();
    },
    //点击搜索
    handleSearch() {
      let _this = this;
      let type = 1;
      this.select_cate ? (type = Number(this.select_cate)) : (type = 1);
      httpGetSummaryBydateandType(...this.crossTime, type)
        .then(res => {
          let data = res.data;
          _this.drawLine(
            data.affair_through,
            data.affair_refuse,
            data.affair_artif
          );
          _this.allEventList = [
            {
              title: "拒绝事件",
              count: data.affair_refuse,
              percent: toPercentN(data.affair_refuse, data.affair_allnume),
              color: "#ff6c5c"
            },
            {
              title: "人工审核事件",
              count: data.affair_artif,
              percent: toPercentN(data.affair_artif, data.affair_allnume),
              color: "#f8d436"
            },
            {
              title: "直接通过事件",
              count: data.affair_through,
              percent: toPercentN(data.affair_through, data.affair_allnume),
              color: "#a7db65"
            },
            {
              title: "事件总数",
              percent: -1,
              count: data.affair_allnume,
              color: "#7a8c99"
            }
          ];
        })
        .catch();
    },
    //画图
    drawLine(a, b, c) {
      // 基于准备好的dom，初始化echarts实例
      setTimeout(() => {
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption({
          title: {
            text: "风险事件统计",
            // subtext: "纯属虚构",
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["直接通过事件", "拒绝事件", "人工审核事件"]
          },
          series: [
            {
              name: "百分率",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: [
                { value: a, name: "直接通过事件" },
                { value: b, name: "拒绝事件" },
                { value: c, name: "人工审核事件" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
      }, 200);
    },
    a() {
      setTimeout(() => {
        this.handleSearch();
      }, 100);
    }
  },
  mounted() {

    this.setTime(0, 0);
    this.getSummary();
    this.getComboBox();


  },
  created() {}
};
</script>

<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
  font-weight: bold;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.grid-con-default {
  flex: 1;
  text-align: center;
  font-size: 26px;
  line-height: 100px;
  color: #fff;
}
.grid-con-0 .grid-con-icon {
  background: #ff6c5c;
}

.grid-con-0 .grid-num {
  color: #ff6c5c;
}
.grid-con-1 .grid-con-icon {
  background: #f8d436;
}

.grid-con-1 .grid-num {
  color: #f8d436;
}
.grid-con-2 .grid-con-icon {
  background: #a7db65;
}

.grid-con-2 .grid-num {
  color: #a7db65;
}
.grid-con-3 .grid-con-icon {
  background: #7a8c99;
}

.grid-con-3 .grid-num {
  color: #7a8c99;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.container {
  overflow: hidden;
}
.container-text {
  line-height: 32px;
  font-size: 14px;
  color: #7a8c99;
}
.table {
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #cccccc38;
  line-height: 32px;
  font-size: 14px;
  color: #7a8c99;
}
.table-data {
  padding: 20px;
}
</style>

