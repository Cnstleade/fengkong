<template>
    <div class="container">
        <el-form :model="form"  :rules="rules"  ref="form" label-width="100px"
 >
            <el-row >
                <el-col :span="6">
                      <el-form-item label="姓名" >
                        <el-input type="text" v-model="form.name" ></el-input>
                      </el-form-item>                
                </el-col>
                <el-col :span="6" >
                      <el-form-item label="手机号"  prop="phone">
                        <el-input type="text" v-model.number="form.phone" ></el-input>
                      </el-form-item>                
                </el-col>
                <el-col :span="6">
                      <el-form-item label="身份证" >
                        <el-input type="text" v-model="form.idCard" ></el-input>
                      </el-form-item>                
                </el-col>
                <el-col :span="6">
                      <el-form-item  >
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                      </el-form-item>                
                </el-col>                                                
            </el-row>

        </el-form>
        <el-row>
            <el-table  :data="tableData" border style="width: 100%" v-loading="loading">
                <el-table-column prop="id" sortable label="序号" width="80"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="phonenumber" label="手机号"></el-table-column>
                <el-table-column prop="idno" label="身份证"></el-table-column>
                <el-table-column prop="reason" label="被拒原因">
                    <template slot-scope="scope">
                        <el-tag type="danger">{{scope.row.reason}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column   width="200" sortable label="拉黑时间">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.createtime |dateServer }}</span>
                    </template>                     
                </el-table-column>
                <el-table-column  label="操作">
                   <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleConfiguration(scope.$index, scope.row)">查看报告</el-button>
                   </template>
                </el-table-column>
            </el-table>            
        </el-row>
        <el-row style="margin-top:20px" v-if="allsize>0">
            <div style="float:right">
                <el-pagination
                  @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"
                  :current-page="nPage"
                   :page-sizes="[10, 20,30, 40]"
                    :page-size="pagesize"
                  background
                  layout="total,sizes,prev, pager, next,jumper"
                  :total="allsize">
                </el-pagination>   
            </div>
        </el-row>
        <el-dialog
          :visible.sync="showVisible"   title="报告详情" width="80%"
          >
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="芝麻信用报告" name="first" v-if="false">芝麻信用报告</el-tab-pane>
              <el-tab-pane label="同盾信用报告" name="second" v-if="row.tongdunReportId" >
                <el-row v-if="JSON.stringify(baseInfo) !== '{}'">
            <el-row class="flx">
                <div class="fl">
                    贷前审核报告报告编号: <span>{{baseInfo.baseInfo.reportNum}}</span>
                </div>
                <div class="fr">
                    报告时间:<span>{{new Date() |dateServer}}</span>
                </div>
            </el-row>
            <el-row >
                <el-card>
                    <el-col :span="6" :offset="2">
                        <div >
                            <div class="progress-text">
                                <strong>{{baseInfo.baseInfo.score}}</strong>
                                <p >{{baseInfo.baseInfo.suggestion == 1?'建议拒绝':(baseInfo.baseInfo.suggestion == 2?'建议人工审核':'建议通过')}}</p>
                            </div>
                                <!-- <el-progress type="circle" :percentage="baseInfo.baseInfo.score>100 ?99 : baseInfo.baseInfo.score" color="red" :show-text="showText">aaaaa</el-progress> -->
                                <el-progress type="circle" :percentage="baseInfo.baseInfo.score>100 ?99 : baseInfo.baseInfo.score" color="red" :show-text="showText">aaaaa</el-progress>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-row style="text-align:center;padding-top:30px">
                           <strong style="font-size:20px">
                               {{baseInfo.baseInfo.suggestion == 1?'申请用户测出高危风险建议拒绝':(baseInfo.baseInfo.suggestion == 2?'申请用户测出风险建议人工审核':'申请用户建议通过')}}
                              </strong>
                        <br/><span>
                            <!-- 共发现15条异常信息 -->
                           </span>
                        </el-row>
                    </el-col>
                </el-card>
            </el-row> 
            <el-row style="margin-top:20px" v-if="baseInfo.contactInfo.length>0">
                <el-card>
                    <el-row>
                        <h3>个人基本信息</h3>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5">
                                    姓名：
                                </el-col>
                                <el-col :span="6">
                                    {{baseInfo.baseInfo.realName}}
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5">
                                    身份证号：
                                </el-col>
                                <el-col :span="6">
                                     {{baseInfo.baseInfo.idNum}}
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5">
                                    手机号码：
                                </el-col>
                                <el-col :span="6">
                                   {{baseInfo.baseInfo.phoneNum}}
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:20px" v-if="baseInfo.contactInfo.length==2">
                        <el-col :span="8">
                            <el-row>
                                <h3>第一个联系人</h3>
                            </el-row>
                            <el-row style="margin-top:20px">
                                <el-col :span="8">
                                    姓名：
                                </el-col>
                               <el-col :span="12">
                                    {{baseInfo.contactInfo[0].contactName}}
                                </el-col>                                
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    手机号码：
                                </el-col>
                               <el-col :span="12">
                                    {{baseInfo.contactInfo[0].contactPhone}}
                                </el-col>                                
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                   社会关系：
                                </el-col>
                               <el-col :span="12">
                                   {{baseInfo.contactInfo[0].relationShip==1?'直系':(baseInfo.contactInfo[0].relationShip==2?'非直系':'社会')}}
                                </el-col>                                
                            </el-row>                                                        
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                                <h3>第二个联系人</h3>
                            </el-row>
                            <el-row style="margin-top:20px">
                                <el-col :span="8">
                                    姓名：
                                </el-col>
                               <el-col :span="12">
                                    {{baseInfo.contactInfo[1].contactName}}
                                </el-col>                                
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    手机号码：
                                </el-col>
                               <el-col :span="12">
                                    {{baseInfo.contactInfo[1].contactPhone}}
                                </el-col>                                
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                   社会关系：
                                </el-col>
                               <el-col :span="12">
                                   {{baseInfo.contactInfo[1].relationShip==1?'直系':(baseInfo.contactInfo[1].relationShip==2?'非直系':'社会')}}
                                </el-col>                                
                            </el-row>                                                        
                        </el-col>                       
                    </el-row>
                </el-card>
            </el-row>  
            <el-row style="margin-top:20px">
                <el-card>
                    <el-row>
                        <h3>归属地解析</h3>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col :span="5">
                            身份证所属地地址:
                        </el-col>
                        <el-col :span="12">
                            {{baseInfo.baseInfo.idCardAddress}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            手机所属地地址:
                        </el-col>
                        <el-col :span="12">
                           {{baseInfo.baseInfo.phoneAddress}}
                        </el-col>
                    </el-row>                    
                </el-card>
            </el-row>
            <el-row style="margin-top:20px">
                <el-card>
                        <table class="check-table" style="border-collapse: collapse" >
                            <thead style="text-align:center">
                            <tr>
                                <th style="width: 15%;">&nbsp;</th>
                                <th class="row1" style="width: 37%;">检查项目</th>
                                <th class="row2 " style="width: 9%;">风险等级</th>
                                <th class="row3" style="width: 37%;">备注</th>
                            </tr>
                            </thead>
                            <tbody style="text-align:center">
                            <template v-for="(temp,index) in baseInfo.actionInfo" >
                                <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index != baseInfo.actionInfo.length-1,borderBottom2: index == baseInfo.actionInfo.length-1 }">
                                
                                    <td :rowspan="baseInfo.actionInfo.length" v-if="index==0">客户行为检测</td>
                                    <td class="risk-item-name">{{temp.riskName}}</td>
                                    <td class="risk-item-level">
                                        {{temp.riskLevel==1?'低':(temp.riskLevel==2?'中':'高')}}  
                                    </td>
                                    <td v-if="temp.reportDetail.length>0">
                                        <span><a href="javascript:void(0)" style="color: #2ea5ff;text-decoration: blink;">频度规则详情</a></span>
                                        <ul class="risk-detail-list" >
                                            <span v-if="temp.reportDetail[0].detail != undefined">{{temp.reportDetail[0].detail}}</span>
                                            <li>
                                                <span>{{temp.reportDetail[0].data}}</span>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </template>
                            <template v-for="(temp,index1) in baseInfo.platFormInfo" >
                                <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index1 != baseInfo.platFormInfo.length-1,borderBottom2: index1 == baseInfo.platFormInfo.length-1 }">
                                    <td :rowspan="baseInfo.platFormInfo.length" v-if="index1==0">多平台借贷申请检测</td>
                                    <td class="risk-item-name">{{temp.riskName}}</td>
                                    <td class="risk-item-level">
                                        {{temp.riskLevel==1?'低':(temp.riskLevel==2?'中':'高')}}  
                                    </td>
                                    <td>
                                        <span>总数{{temp.dimenonReports.length}}</span><br/>
                                        <span><a href="javascript:void(0)" style="color: #2ea5ff;text-decoration: blink;">频度规则详情</a></span>
                                        <ul class="risk-detail-list">
                                            <li v-for="(tem ) in temp.dimenonReports" :key="tem.id">
                                                <span>{{tem.dimension}}</span>
                                                <ul>
                                                    <li v-for="(te) in tem.displayReportDOS" :key="te.displayName" style="margin-left:20px">
                                                        {{te.dimension}}
                                                        {{te.displayName}}&nbsp;&nbsp;{{te.count}}
                                                    </li>
                                                </ul>                                                
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </template>   
                            <template v-for="(temp,index1) in baseInfo.badInfo" >
                                <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index1 != baseInfo.platFormInfo.length-1,borderBottom2: index1 == baseInfo.platFormInfo.length-1 }">
                                    <td :rowspan="baseInfo.platFormInfo.length" v-if="index1==0">不良信息扫描</td>
                                    <td class="risk-item-name">{{temp.riskName}}</td>
                                    <td class="risk-item-level">
                                        {{temp.riskLevel==1?'低':(temp.riskLevel==2?'中':'高')}}  
                                    </td>
                                    <td>
                                        <span style="color:red">风险类型：{{temp.riskContent}}</span>
                                    </td>
                                </tr>
                            </template>                                                        

                             </tbody>
                        </table>                
                </el-card>
            </el-row>  
               
                  <!-- <el-row class="flx" >
                      <div class="fl">
                          贷前审核报告报告编号: <span>{{baseInfo.baseInfo.reportNum}}</span>
                      </div>
                      <div class="fr">
                          报告时间:<span>{{new Date() |dateServer}}</span>
                      </div>
                  </el-row>
                  <el-row >
                      <el-card>
                          <el-col :span="6" :offset="2">
                              <div >
                                  <div class="progress-text">
                                      <strong>{{baseInfo.baseInfo.score}}</strong>
                                      <p >{{baseInfo.baseInfo.suggestion == 1?'建议拒绝':(baseInfo.baseInfo.suggestion == 2?'建议人工审核':'建议通过')}}</p>
                                  </div>
                                      <el-progress type="circle" :percentage="baseInfo.baseInfo.score" color="red" :show-text="showText">aaaaa</el-progress>
                              </div>
                          </el-col>
                          <el-col :span="12">
                              <el-row style="text-align:center;padding-top:30px">
                                 <strong style="font-size:20px">
                                     {{baseInfo.baseInfo.suggestion == 1?'申请用户测出高危风险建议拒绝':(baseInfo.baseInfo.suggestion == 2?'申请用户测出风险建议人工审核':'申请用户建议通过')}}
                                    </strong>
                              <br/><span>
                                  共发现15条异常信息
                                 </span>
                              </el-row>
                          </el-col>
                      </el-card>
                  </el-row> 
                  <el-row style="margin-top:20px" v-if="baseInfo.contactInfo.length>0">
                      <el-card>
                          <el-row>
                              <h3>个人基本信息</h3>
                          </el-row>
                          <el-row style="margin-top:20px">
                              <el-col :span="12">
                                  <el-row>
                                      <el-col :span="5">
                                          姓名：
                                      </el-col>
                                      <el-col :span="6">
                                          {{baseInfo.baseInfo.realName}}
                                      </el-col>
                                  </el-row>
                              </el-col>
                              <el-col :span="12">
                                  <el-row>
                                      <el-col :span="5">
                                          身份证号：
                                      </el-col>
                                      <el-col :span="6">
                                           {{baseInfo.baseInfo.idNum}}
                                      </el-col>
                                  </el-row>
                              </el-col>
                          </el-row>
                          <el-row>
                              <el-col :span="12">
                                  <el-row>
                                      <el-col :span="5">
                                          手机号码：
                                      </el-col>
                                      <el-col :span="6">
                                         {{baseInfo.baseInfo.phoneNum}}
                                      </el-col>
                                  </el-row>
                              </el-col>
                          </el-row>
                          <el-row style="margin-top:20px" v-if="baseInfo.contactInfo.length==2">
                              <el-col :span="8">
                                  <el-row>
                                      <h3>第一个联系人</h3>
                                  </el-row>
                                  <el-row style="margin-top:20px">
                                      <el-col :span="8">
                                          姓名：
                                      </el-col>
                                     <el-col :span="12">
                                          {{baseInfo.contactInfo[0].contactName}}
                                      </el-col>                                
                                  </el-row>
                                  <el-row>
                                      <el-col :span="8">
                                          手机号码：
                                      </el-col>
                                     <el-col :span="12">
                                          {{baseInfo.contactInfo[0].contactPhone}}
                                      </el-col>                                
                                  </el-row>
                                  <el-row>
                                      <el-col :span="8">
                                         社会关系：
                                      </el-col>
                                     <el-col :span="12">
                                         {{baseInfo.contactInfo[0].relationShip==1?'直系':(baseInfo.contactInfo[0].relationShip==2?'非直系':'社会')}}
                                      </el-col>                                
                                  </el-row>                                                        
                              </el-col>
                              <el-col :span="8">
                                  <el-row>
                                      <h3>第二个联系人</h3>
                                  </el-row>
                                  <el-row style="margin-top:20px">
                                      <el-col :span="8">
                                          姓名：
                                      </el-col>
                                     <el-col :span="12">
                                          {{baseInfo.contactInfo[1].contactName}}
                                      </el-col>                                
                                  </el-row>
                                  <el-row>
                                      <el-col :span="8">
                                          手机号码：
                                      </el-col>
                                     <el-col :span="12">
                                          {{baseInfo.contactInfo[1].contactPhone}}
                                      </el-col>                                
                                  </el-row>
                                  <el-row>
                                      <el-col :span="8">
                                         社会关系：
                                      </el-col>
                                     <el-col :span="12">
                                         {{baseInfo.contactInfo[1].relationShip==1?'直系':(baseInfo.contactInfo[1].relationShip==2?'非直系':'社会')}}
                                      </el-col>                                
                                  </el-row>                                                        
                              </el-col>                       
                          </el-row>
                      </el-card>
                  </el-row>  
                  <el-row style="margin-top:20px">
                      <el-card>
                          <el-row>
                              <h3>归属地解析</h3>
                          </el-row>
                          <el-row style="margin-top:20px">
                              <el-col :span="5">
                                  身份证所属地地址:
                              </el-col>
                              <el-col :span="12">
                                  {{baseInfo.baseInfo.idCardAddress}}
                              </el-col>
                          </el-row>
                          <el-row>
                              <el-col :span="5">
                                  手机所属地地址:
                              </el-col>
                              <el-col :span="12">
                                 {{baseInfo.baseInfo.phoneAddress}}
                              </el-col>
                          </el-row>                    
                      </el-card>
                  </el-row>
                  <el-row style="margin-top:20px">
                      <el-card>
   
                              <table class="check-table" style="border-collapse: collapse">
                                  <thead>
                                  <tr>
                                      <th style="width:100px">&nbsp;</th>
                                      <th class="row1">检查项目</th>
                                      <th class="row2">风险等级</th>
                                      <th class="row3">备注</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <template v-for="(temp,index) in baseInfo.actionInfo" >
                                      <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index != baseInfo.actionInfo.length-1,borderBottom2: index == baseInfo.actionInfo.length-1 }">
                                      
                                          <td :rowspan="baseInfo.actionInfo.length" v-if="index==0">客户行为检测</td>
                                          <td class="risk-item-name">{{temp.riskName}}</td>
                                          <td class="risk-item-level">低</td>
                                          <td v-if="temp.reportDetail.length>0">
                                              <span><a href="javascript:void(0)" style="color: #2ea5ff;text-decoration: blink;">频度规则详情</a></span>
                                              <ul class="risk-detail-list" >
                                                  <span v-if="temp.reportDetail[0].detail != undefined">{{temp.reportDetail[0].detail}}</span>
                                                  <li>
                                                      <span>{{temp.reportDetail[0].data}}</span>
                                                  </li>
                                              </ul>
                                          </td>
                                      </tr>
                                  </template>
                                  <template v-for="(temp,index1) in baseInfo.platFormInfo" >
                                      <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index1 != baseInfo.platFormInfo.length-1,borderBottom2: index1 == baseInfo.platFormInfo.length-1 }">
                                          <td :rowspan="baseInfo.platFormInfo.length" v-if="index1==0">多平台借贷申请检测</td>
                                          <td class="risk-item-name">{{temp.riskName}}</td>
                                          <td class="risk-item-level">低</td>
                                          <td>
                                              <span>总数{{temp.dimenonReports.length}}</span><br/>
                                              <span><a href="javascript:void(0)" style="color: #2ea5ff;text-decoration: blink;">频度规则详情</a></span>
                                              <ul class="risk-detail-list">
                                                  <li v-for="(tem ) in temp.dimenonReports" :key="tem.id">
                                                      <span>{{temp.dimension}}</span>
                                                      <ul>
                                                          <li v-for="(te) in tem.displayReportDOS" :key="te.displayName">
                                                              {{te.displayName}}&nbsp;&nbsp;{{te.count}}
                                                          </li>
                                                      </ul>                                                
                                                  </li>
                                              </ul>
                                          </td>
                                      </tr>
                                  </template>   
                                  <template v-for="(temp,index1) in baseInfo.badInfo" >
                                      <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index1 != baseInfo.platFormInfo.length-1,borderBottom2: index1 == baseInfo.platFormInfo.length-1 }">
                                          <td :rowspan="baseInfo.platFormInfo.length" v-if="index1==0">不良信息扫描</td>
                                          <td class="risk-item-name">{{temp.riskName}}</td>
                                          <td class="risk-item-level">低</td>
                                          <td>
                                              <span style="color:red">风险类型：{{temp.riskContent}}</span>
                                          </td>
                                      </tr>
                                  </template>                                                        

                                   </tbody>
                              </table>                
                      </el-card>
                  </el-row>    -->
                </el-row>               
              </el-tab-pane>
              <el-tab-pane label="运行商信用报告" name="third" v-if="row.mifengReportId" >
                <el-row v-if="userBasicInformation">
                <el-main  id="subOutputRank-print"  >
                <el-row v-show="false">
                    <canvas id="myCanvas" width="200" height="230" >
                    </canvas>
                </el-row> 
                <el-row    style="padding-top:0;position:relative;">
                  <el-row id="bg" style="width:100%;height:100%;position:absolute;top:0;left:0;zIndex:9999" :style ="note" >
                    <div >

                    </div>
                  </el-row>
                  <el-row class="report_t">
                    <div class="el-main-info l">
                      <span>报告编号：201805241119371288237</span>
                    </div>
                    <div class="el-main-info r">
                      <span>报告生成时间：2018-05-24 11:19:37</span>
                    </div>

                  </el-row>
                  <el-row >
                    <h1 style="text-align:center">
                      互联网资信报告
                    </h1>
                  </el-row>
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>用户基本信息</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <table cellpadding="0" cellspacing="0" class="table">
                      <tbody>
                        <tr>
                          <td>
                            <span class="item">姓名</span>
                            <span>{{userBasicInformation.name}}</span>
                            <span>{{userBasicInformation.gender?'男':'女'}}</span>
                            <span>{{userBasicInformation.age}}</span>
                            <span>{{userBasicInformation.province}}</span>
                            <span>{{userBasicInformation.city}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item">身份证</span>
                            <span>{{userBasicInformation.idcard}}</span>
                            <el-tag :type="userBasicInformation.financialBlacklist?'danger':'success'">{{userBasicInformation.financialBlacklist?'在金融机构黑名单':'不在金融机构黑名单'}}</el-tag>
                            <el-tag :type="userBasicInformation.courtBlacklist?'danger':'success'">{{userBasicInformation.courtBlacklist?'在法院黑名单':'不在法院黑名单'}}</el-tag>
                            <!-- <span class="tip_y"></span> -->
 
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item">手机号</span>
                            <span>1231412412</span>
                            <span >{{userBasicInformation.cellLoc}}</span>
                            <span>注册时间：</span>
                            <span>{{userBasicInformation.regTime |  dateServer}}</span>
                            <!-- <span class="tip_y"></span> -->
                            <!-- <span class="remarks">用户姓名与运营商提供的姓名[张国军]匹配成功</span> -->
                            <!-- <span class="remarks"></span> -->
                          </td>
                        </tr>
                      </tbody>
                    </table>                                       
                  </el-card>
                  <!-- 亲属联系人信息 -->
                  <el-card class="el-card"  v-if="kinsfolkTableData.length>0">
                    <!--  -->
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>亲属联系人信息</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="kinsfolkTableData">
                        <el-table-column prop="relationshipType" label="关系" width="140">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ scope.row.relationshipType ==1?'直系':'非直系' }}</span>
                            </template> 
                        </el-table-column>
                        <el-table-column prop="phonenume" label="手机号">
                        </el-table-column>
                        <el-table-column prop="callMessage" label="说明">
                        </el-table-column>      
                    </el-table>                    
                  </el-card>
                  <!-- 用户信息检测 -->
                  <el-card class="el-card" v-if="userInfo.id">
                    <!-- v-if="userInfo.id" -->
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>用户信息检测</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                  <table cellpadding="0" cellspacing="0" class="table">
                      <tbody>
                        <tr >
                          <th width="100" rowspan="9"> 用户信息查询</th>    
                          <td width="220"> 查询过该用户的相关企业数量 </td>
                          <td><span>{{userInfo.searchedOrgCnt}}</span></td>
                        </tr>
                        <tr>
                          <td> 查询过该用户的相关企业类型 </td>
                          <td> 
                            {{userInfo.searchedOrgType}}
                          </td>
                        </tr>
                        <tr>
                          <td> 身份证组合过的其他姓名 </td>
                          <td>
                            {{userInfo.phoneWithOtherNames}}
                            
                          </td>
                        </tr>
                        <tr>
                          <td>  身份证组合过其他电话  </td>
                          <td>
                            {{userInfo.idcardWithOtherPhones}}
                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码组合过其他姓名  </td>
                          <td>
                            {{userInfo.idcardWithOtherNames}}
                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码组合过其他身份证  </td>
                          <td>
                            {{userInfo.phoneWithOtherIdcards}}
                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码注册过的相关企业数量  </td>
                          <td>
                            {{userInfo.registerOrgCnt}}
                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码注册过的相关企业类型  </td>
                          <td>
                            {{userInfo.registerOrgType}}
                          </td>
                        </tr> 
                        <tr>
                          <td>  电话号码出现过的公开网站  </td>
                          <td>
                            {{userInfo.arisedOpenWeb}}
                          </td>
                        </tr>                                                                                                                                                
                      </tbody>
                      <tbody>
                        <tr>
                          <th width="100" rowspan="6">黑名单信息</th>
                          <td>黑中介分数</td>
                          <td>
                            <span>{{userInfo.phoneGrayScore}}</span>
                            （分数范围0-100，参考分为10，分数越低关系越紧密）
                          </td>
                        </tr>
                        <tr>
                          <td> 直接联系人中黑名单数  </td>
                          <td>
                            <span>{{userInfo.contactsClass1BlacklistCnt}}</span>
                            (直接联系人：和被查询号码有通话记录)
                          </td>
                        </tr>  
                        <tr>
                          <td> 间接联系人中黑名单人数  </td>
                          <td>
                            <span>{{userInfo.contactsClass2BlacklistCnt}}</span>
                            (间接联系人：和被查询号码的直接联系人有通话记录)
                          </td>
                        </tr>  
                        <tr>
                          <td> 直接联系人人数  </td>
                          <td>
                            <span>{{userInfo.contactsClass1Cnt}}</span>
                            (直接联系人：和被查询号码有通话记录)
                          </td>
                        </tr>  
                        <tr>
                          <td> 引起黑名单的直接联系人数量  </td>
                          <td>
                            <span>{{userInfo.contactsRouterCnt}}</span>
                             (直接联系人有和黑名单用户的通讯记录的号码数量)
                          </td>
                        </tr>  
                        <tr>
                          <td> 直接联系人中引起间接黑名单占比  </td>
                          <td>
                              <span>{{userInfo.contactsRouterRatio}}</span>
                              (直接联系人有和黑名单用户的通讯记录的号码数量在直接联系人数量中的百分比)
                          </td>
                        </tr>                                                                                                                         
                      </tbody>  
                  </table>
                  </el-card> 
                  <!-- 用户行为检测 -->
                  <el-card class="el-card" v-if="testTableData.length>0">
                    <!-- v-if="testTableData.length>0" -->
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>用户行为检测</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="testTableData">
                        <el-table-column prop="checkPointCn" label="检测项目"  >
                        </el-table-column>
                        <el-table-column prop="result" label="结果" >
                        </el-table-column>
                        <el-table-column prop="evidence" label="依据" >
                        </el-table-column>
                    </el-table>                     
                  </el-card>   
                  <!-- 运营商消费数据               -->
                  <el-card class="el-card" v-if="operatorTableData.length>0">
                    <!--  -->
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>运营商消费数据</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="operatorTableData">
                        <el-table-column prop="cellOperatorZh" label="运行商" >
                        </el-table-column>
                        <el-table-column prop="cellPhoneNum" label="号码" >
                        </el-table-column>
                        <el-table-column prop="cellLoc" label="归属地">
                        </el-table-column>
                        <el-table-column prop="cellMth" label="月份">
                        </el-table-column>
                        <el-table-column prop="callOutCnt" label="主叫次数">
                        </el-table-column>
                        <el-table-column prop="callOutTime" label="主叫时间">
                        </el-table-column>  
                        <el-table-column prop="callInCnt" label="被叫次数">
                        </el-table-column>  
                        <el-table-column prop="callInTime" label="被叫时间">
                        </el-table-column>  
                        <el-table-column prop="netFlow" label="流量消费">
                        </el-table-column>
                        <el-table-column prop="totalAmount" label="话费消费">
                        </el-table-column>                                                                                                                                                
                    </el-table>                     
                  </el-card>  
                  <!-- 联系人区域汇总                  -->
                  <el-card class="el-card" v-if="linkmanTableData.length>0">
                    <!--  -->
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>联系人区域汇总 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="linkmanTableData">
                        <el-table-column prop="regionLoc" label="地区" >
                        </el-table-column>
                        <el-table-column prop="regionUniqNumCnt" label="号码次数" >
                        </el-table-column>
                        <el-table-column prop="regionCallInCnt" label="呼入次数">
                        </el-table-column>
                        <el-table-column prop="regionCallOutCnt" label="呼出次数">
                        </el-table-column>
                        <el-table-column prop="regionAvgCallInTime" label="呼入时间">
                        </el-table-column>                                                
                        <el-table-column prop="regionAvgCallOutTime" label="呼出时间">
                        </el-table-column>
                        <el-table-column prop="regionCallInCntPct" label="呼入次数比">
                        </el-table-column>  
                        <el-table-column prop="regionCallOutCntPct" label="呼出次数比">
                        </el-table-column>  
                        <el-table-column prop="regionCallInTimePct" label="呼入时间比">
                        </el-table-column>  
                        <el-table-column prop="regionCallOutTimePct" label="呼出时间比">
                        </el-table-column>
                    </el-table>                     
                  </el-card> 
                  <!-- 运营商数据分析                   -->
                  <el-card class="el-card" v-if="operatorDataTableData.length>0">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>运营商数据分析 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="operatorDataTableData">
                        <el-table-column prop="phoneNum" label="号码" >
                        </el-table-column>
                        <el-table-column prop="phoneNumLoc" label="归属地">
                        </el-table-column>
                        <!-- <el-table-column prop="gist" label="通话次数">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="通话时间(分)">
                        </el-table-column> -->
                        <el-table-column prop="callOutCnt" label="主叫次数">
                        </el-table-column>  
                        <el-table-column prop="callInCnt" label="被叫次数">
                        </el-table-column>  
                        <el-table-column prop="contactHoliday" label="节假日通话次数">
                        </el-table-column>  
                        <el-table-column prop="contactWeekend" label="周末通话次数">
                        </el-table-column>  
                        <el-table-column prop="contactWeekday" label="工作日通话次数">
                        </el-table-column>  
                        <el-table-column prop="contact1w" label="一周内通话次数">
                        </el-table-column>  
                        <el-table-column prop="contact1m" label="一月内通话次数">
                        </el-table-column>  
                        <el-table-column prop="contact3m" label="三月内通话次数">
                        </el-table-column>  
                        <el-table-column prop="contact3mPlus" label="三月外通话次数">
                        </el-table-column>  
                    </el-table>                     
                  </el-card> 
                  <!-- 联系人信息                  -->
                  <el-card class="el-card" v-if="contactTableData.length>0">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>联系人信息 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="contactTableData">
                        <el-table-column prop="testItem" label="联系人" >
                        </el-table-column>
                        <el-table-column prop="result" label="最早联系时间" >
                        </el-table-column>
                        <el-table-column prop="gist" label="最晚联系时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="联系电话">
                        </el-table-column>
                        <el-table-column prop="gist" label="号码归属地">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="通话时长">
                        </el-table-column>
                    </el-table>                     
                  </el-card>  
                  <!-- 电商地址信息                  -->
                  <el-card class="el-card" v-if="esAddTableData.length>0">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>电商地址信息 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="esAddTableData">
                        <el-table-column prop="testItem" label="地址" >
                        </el-table-column>
                        <el-table-column prop="result" label="	总消费金额" >
                        </el-table-column>
                        <el-table-column prop="gist" label="收货人姓名">
                        </el-table-column>
                        <el-table-column prop="gist" label="收货人手机">
                        </el-table-column>
                    </el-table>                     
                  </el-card>  
                  <!-- 电商数据分析                  -->
                  <el-card class="el-card" v-if="esDataTableData.length>0">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>电商数据分析</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="esDataTableData">
                        <el-table-column prop="testItem" label="月份" >
                        </el-table-column>
                        <el-table-column prop="result" label="消费次数" >
                        </el-table-column>
                        <el-table-column prop="gist" label="消费金额">
                        </el-table-column>
                        <el-table-column prop="gist" label="品类分析">
                        </el-table-column>
                    </el-table>                     
                  </el-card> 
                  <!-- 出行数据分析                 -->
                  <el-card class="el-card" v-if="tripTableData.length>0">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>出行数据分析</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="tripTableData">
                        <el-table-column prop="testItem" label="时间段" >
                        </el-table-column>
                        <el-table-column prop="result" label="出发时间" >
                        </el-table-column>
                        <el-table-column prop="gist" label="回程时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="出发地">
                        </el-table-column>
                        <el-table-column prop="gist" label="目的地">
                        </el-table-column>                        
                    </el-table>                     
                  </el-card>                                                       
                </el-row>
                  </el-main> 
                  </el-row>               
              </el-tab-pane>
            </el-tabs>        
        </el-dialog>         
    </div>
</template>

<script>
import { httpGetUserList, httpGetBlackReport } from "@/api/http";
export default {
  data() {
    return {
      form: {
        name: null,
        phone: null,
        idCard: null
      },
      showText: false,
      activeName: "second",
      tableData: [],
      loading: true,
      showVisible: false,
      nPage: 1,
      pagesize: 20,
      allsize: 0,
      rules: {
        phone: [
          { message: "请输入11位以内数字", trigger: "change" },
          {
            pattern: /^\d{1,16}$/,
            message: "请输入11位以内数字"
          }
        ]
      },
      userBasicInformation: {}, //用户基本信息检测用户基本信息检测
      userInfo: {},
      kinsfolkTableData: [], //亲属联系人
      testTableData: [],
      operatorTableData: [], //运营商消费数据
      linkmanTableData: [], //联系人区域汇总
      operatorDataTableData: [], //运行商数据分析
      contactTableData: [], //联系人信息
      esAddTableData: [], //电商信息
      esDataTableData: [], //电商数据统计
      tripTableData: [],
      canvasimg: "",
      canvasShow: true,
      note: {
        backgroundImage: ""
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "25px auto",
        // marginTop: "5px"
      },
      baseInfo: {},
      row: {},
      type: 0
    };
  },
  methods: {
    getTabelDate(npage, pagesize, username, phoneNumber, idno) {
      let _this = this;
      _this.loading = true;
      httpGetUserList(npage, pagesize, username, phoneNumber, idno)
        .then(res => {
          let data = res.data;
          _this.tableData = data.rows;
          console.log(_this.tableData);
          _this.allsize = data.total;
          _this.loading = false;

          setTimeout(() => {
            _this.loading = false;
          }, 5000);
        })
        .catch(() => {
          (_this.tableData = [{ id: 1 }]), (_this.loading = false);
        });
    },
    handleSearch() {
      console.log(typeof this.form.phone);
      this.getTabelDate(
        this.nPage,
        this.pagesize,
        this.form.name,
        this.form.phone,
        this.form.idCard
      );
    },
    handleCurrentChange(val) {
      this.nPage = val;
      this.getTabelDate(
        this.nPage,
        this.pagesize,
        this.form.name,
        this.form.phone,
        this.form.idCard
      );
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getTabelDate(
        this.nPage,
        this.pagesize,
        this.form.name,
        this.form.phone,
        this.form.idCard
      );
    },
    handleConfiguration(index, row) {
      let _this = this;
      console.log(row);
      this.row = row;
      // let type = row.zhimaReportId
      //   ? 1
      //   : row.tongdunReportId ? 2 : row.mifengReportId ? 3 : 0;

      // var id = row.zhimaReportId
      //   ? row.zhimaReportId
      //   : row.tongdunReportId
      //     ? row.tongdunReportId
      //     : row.mifengReportId ? row.mifengReportId : false;
      let id = row.tongdunReportId
        ? row.tongdunReportId
        : row.mifengReportId ? row.mifengReportId : false;
      let type = row.tongdunReportId ? 2 : row.mifengReportId ? 3 : 0;

      if (!id) {
        this.$message.error("错了哦，这是一条错误消息");
      } else {
        httpGetBlackReport(id, type)
          .then(res => {
            let data = res.data;
            this.userBasicInformation = null;
            this.testTableData = null;
            this.operatorTableData = null;
            this.kinsfolkTableData = null;
            this.linkmanTableData = null;
            this.operatorDataTableData = null;
            this.userInfo = null;
            this.baseInfo = null;
            if (data.tdReport) {
              _this.baseInfo = data.tdReport;
            }
            if (data.mifengreport) {
              _this.userBasicInformation = data.mifengreportApplicationCheck;
              _this.testTableData = data.list1;
              _this.operatorTableData = data.list2;
              _this.kinsfolkTableData = data.list6;

              _this.linkmanTableData = data.list4;
              _this.operatorDataTableData = data.list3;
              _this.userInfo = data.mifengreportUserInfoCheck;
            }

            this.showVisible = true;
          })
          .catch();
      }

      //得到canvas
      // setTimeout(() => {
      //   if (this.canvasShow) {
      //     var canvas = document.getElementById("myCanvas");
      //     var ctx = canvas.getContext("2d");
      //     ctx.save();
      //     ctx.font = "30px Microsoft YaHei";
      //     ctx.rotate(-45 * Math.PI / 180);
      //     ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      //     ctx.fillText("烈焰云", -100, 220);
      //     ctx.restore();
      //     this.note.backgroundImage = 'url("' + ctx.canvas.toDataURL() + '")';
      //     this.canvasShow = false;
      //   }
      // }, 20);
    },
    handleClick(tab, event) {
      let _this = this;
      let id =
        tab.label == "芝麻信用报告"
          ? this.row.zhimaReportId
          : tab.label == "同盾信用报告"
            ? this.row.tongdunReportId
            : tab.label == "运行商信用报告" ? this.row.mifengReportId : false;
      let type =
        tab.label == "芝麻信用报告"
          ? 1
          : tab.label == "同盾信用报告"
            ? 2
            : tab.label == "运行商信用报告" ? 3 : 0;
      // let id = this.row.tongdunReportId
      //   ? this.row.tongdunReportId
      //   : this.row.mifengReportId ? this.row.mifengReportId : false;
      console.log(id);
      if (id) {
        httpGetBlackReport(id, type)
          .then(res => {
            let data = res.data;
            console.log(data);
            if (data.tdReport) {
              _this.baseInfo = data.tdReport;
            }
            if (data.mifengreport) {
              _this.userBasicInformation =
                data.mifengreport.mifengreportApplicationCheck;
              _this.testTableData = data.mifengreport.list1;
              _this.operatorTableData = data.mifengreport.list2;
              _this.kinsfolkTableData = data.mifengreport.list6;

              _this.linkmanTableData = data.mifengreport.list4;
              _this.operatorDataTableData = data.mifengreport.list3;
              _this.userInfo = data.mifengreport.mifengreportUserInfoCheck;
            }

            this.showVisible = true;
          })
          .catch();
      }
    },
    getRporrt(id) {
      console.log(id, this.type);
    }
  },
  created() {
    this.getTabelDate(
      this.nPage,
      this.pagesize,
      this.form.name,
      this.form.phone,
      this.form.idCard
    );
  }
};
</script>

<style scoped>
.title {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
}
.input-width {
  width: 215px;
}
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.el-main-info {
  color: #999;
}
.l {
  float: left;
}
.r {
  float: right;
}
.report_t {
  overflow: hidden;
  color: #999;
}
.el-card {
  margin-top: 24px;
}
.panel_title {
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
  height: 40px;
  text-align: center;
}
.panel_title h2 {
  height: 30px;
  line-height: 30px;
  display: inline-block;
  background: #e88f08;
  color: #fff;
  border-radius: 100px;
  padding: 0;
  margin: 0;
  font-size: 16px;
  position: absolute;
  z-index: 99;
  width: 200px;
  left: 50%;
  margin-left: -100px;
}
.line {
  background: #e88f08;
  height: 4px;
  top: 13px;
  position: absolute;
  width: 100%;
  border-radius: 10px;
}
.table {
  width: 100%;
  border-radius: 2px;
  border: 1px solid #f1f1f1;
  border-bottom: none;
}
/* .table tr:hover {
  background:#c0b184 ;
} */
.table tr td {
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
}
.table tr th {
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 14px;
  text-align: left;
  background: #f7f7f9;
}

.table span {
  margin-right: 20px;
  display: inline-block;
}
span.item {
  width: 60px;
  font-weight: bold;
  text-align: right;
}
.tip_y {
  background: #5cb85c;
  padding: 2px 10px;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
}
span.remarks {
  display: block;
  padding-left: 85px;
  padding-top: 5px;
  color: #c0b184;
}

.tip {
  background: #ccbfae;
  padding: 2px 10px;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
}
.wrap {
  margin: 0 auto;
  padding: 20px;
  width: 640px;
  border: 1px solid #ccc;
}
.form .row {
  padding: 10px 0 0;
}
.btn {
  display: block;
  margin: 20px auto;
  padding: 8px 16px;
}
.title {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
}
.input-width {
  width: 215px;
}
.flx {
  width: 85%;
  top: 0px;
  padding-top: 10px;
  overflow: hidden;
  line-height: 30px;
}
.fl {
  float: left;

  font-size: 24px;
  font-weight: bold;
}
.fl span {
  font-size: 12px;
  font-weight: normal;
}
.fr {
  float: right;
  font-size: 12px;
}
.bar {
  position: relative;
  width: 50%;
  display: inline-block;
}
.progress-text {
  position: absolute;
  text-align: center;
  font-size: 32px;
  line-height: 126px;
  width: 126px;
  height: 126px;
}
.progress-text p {
  width: 100%;
  position: absolute;
  top: 80px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}
.table {
  border-spacing: 2px;
  border-color: grey;
  font-size: 13px;
  padding-left: 20px;
  width: 100%;
  display: table;
  border-collapse: collapse;
}
thead tr {
  border-bottom: 2px solid #eaeaea;
}
th {
  padding-left: 10px;
  height: 36px;
  text-align: left;
}
.row1,
.row2,
.row3 {
  width: 30%;
}
.borderBottom1 {
  border-bottom: 1px solid #eaeaea;
}
.borderBottom2 {
  border-bottom: 1px solid #eaeaea;
}
.risk-detail-list {
  margin-left: 40px;
}
ul,
li {
  list-style: none;
}
.check-table {
  width: 100%;
}
</style>

