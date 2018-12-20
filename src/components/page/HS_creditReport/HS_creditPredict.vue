<template>
    <div class="container">
        <el-row>
            <el-col :span="6">
                <el-button type="primary" @click="handleEdit()">新增用户</el-button>
            </el-col>
            <el-col :span="18" >
                <el-row>
                    <el-col :span="4">
<el-button  type="primary" @click="reset">重置</el-button>
                    </el-col>                    
                    <el-col :span="10">
                       <el-date-picker
                           v-model="select_time"
                              type="daterange"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           value-format="yyyy-MM-dd">
                       </el-date-picker>   
                    </el-col>
                    <el-col :span="10" >
                        <el-row>
                            <el-col :span="8">
                                <el-input v-model="select_phone" placeholder="请输入手机号搜索" ></el-input>
                            </el-col>
                            <el-col :span="8" class="l20">
                                <el-input v-model="realname" placeholder="请输入姓名" ></el-input>
                            </el-col>                            
                            <el-col :span="4" class="l20">
                                 <el-button type="primary" icon="search" @click="handleSearch">搜索</el-button> 
                            </el-col>    
                        </el-row>
                    </el-col>
                </el-row>

            </el-col>            
        </el-row>
        
        <el-row style="margin-top:20px">
           <el-table
                :data="tableData"
                 v-loading="loading"
                border
                style="width: 100%">
                <el-table-column
                    sortable
                    prop="id"
                    label="序号"
                     width="180">
                </el-table-column>
                 <el-table-column
                  v-if="companyName"
                    prop="companyname"
                    label="公司名称"
                    width="120">
                 </el-table-column>                 
                 <el-table-column
                    prop="realname"
                    label="姓名"
                    width="180">
                 </el-table-column>
                <el-table-column
                    prop="idcard"
                    label="身份证">
                </el-table-column>
                <el-table-column
                    prop="phonenume"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    sortable
                    label="时间">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.applytime |dateServer }}</span>                        
                    </template>
                </el-table-column> 
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleReport(scope.$index, scope.row)">查看报告</el-button>
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
        <!-- 编辑弹出框 -->        
        <el-dialog  :visible.sync="editVisible" width="80%">
            <el-row>
                    <p class="title">基本信息</p>
            </el-row>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="姓名" >
                    <el-input v-model="form.name" class="input-width" ></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" class="input-width"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="身份证号">
                    <el-input v-model="form.cardid" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="移动卡号">
                    <el-input v-model="form.operatorPassword" class="input-width"></el-input>
                </el-form-item>                
            </el-form>  
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="qq">
                    <el-input v-model="form.cardid" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="email">
                    <el-input v-model="form.operatorPassword" class="input-width"></el-input>
                </el-form-item>                
            </el-form>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="学历">
                    <el-select v-model="form.region" placeholder="————请选择————">
                        <el-option label="高中" value="shanghai"></el-option>
                        <el-option label="大专" value="beijing"></el-option>
                        <el-option label="本科" value="beijing"></el-option>
                        <el-option label="硕士" value="beijing"></el-option>
                        <el-option label="博士" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="婚姻">
                    <el-select v-model="form.region" placeholder="————请选择————">
                        <el-option label="未婚" value="shanghai"></el-option>
                        <el-option label="已婚" value="beijing"></el-option>
                        <el-option label="离婚" value="beijing"></el-option>
                    </el-select>
                </el-form-item>                
            </el-form>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="户籍地址">
                    <el-input v-model="form.cardid" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="通讯地址">
                    <el-input v-model="form.operatorPassword" class="input-width"></el-input>
                </el-form-item>                
            </el-form> 
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="申请人类别">
                    <el-select v-model="form.region" placeholder="————请选择————">
                        <el-option label="学生" value="shanghai"></el-option>
                        <el-option label="在职" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>                                                           
            <el-row>
                    <p class="title">联系人信息</p>
            </el-row>            
           <el-form :inline="true" :model="form" label-position="right" label-width="120px" class="demo-form-inline">           
             <el-form-item label="第一联系人关系">
               <el-select v-model="form.region" placeholder="————请选择————">
                 <el-option label="父母" value="shanghai"></el-option>
                 <el-option label="配偶" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="姓名">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>             
             <el-form-item label="手机号">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>
           </el-form>
           <el-form :inline="true" :model="form" label-position="right" label-width="120px" class="demo-form-inline">           
             <el-form-item label="第二联系人关系">
               <el-select v-model="form.region" placeholder="————请选择————">
                 <el-option label="兄弟姐妹" value="shanghai"></el-option>
                 <el-option label="子女" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="姓名">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>             
             <el-form-item label="手机号">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>
           </el-form> 
           <el-form :inline="true" :model="form" label-position="right" label-width="120px" class="demo-form-inline">           
             <el-form-item label="第三联系人关系">
               <el-select v-model="form.region" placeholder="————请选择————">
                 <el-option label="同事" value="shanghai"></el-option>
                 <el-option label="同学" value="beijing"></el-option>
                 <el-option label="朋友" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="姓名">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>             
             <el-form-item label="手机号">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>
           </el-form>
           <el-row style="margin-bottom:30px">
               <el-col :span="8" :offset="8">
                    <el-button type="primary" @click="saveEdit" style="width:100%" >提交</el-button>
               </el-col>
            </el-row>                                  
        </el-dialog>  
        <el-dialog :visible.sync="showVisible" width="60%"  v-if="JSON.stringify(baseInfo) !== '{}'">
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
                                <el-progress type="circle" :percentage="baseInfo.baseInfo.score" color="red" :show-text="showText">aaaaa</el-progress>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-row style="text-align:center;padding-top:30px">
                           <strong style="font-size:20px">
                               {{baseInfo.baseInfo.suggestion == 1?'申请用户测出高危风险建议拒绝':(baseInfo.baseInfo.suggestion == 2?'申请用户测出风险建议人工审核':'申请用户建议通过')}}
                              </strong>
                        <br/>
                        <!-- <span>
                            共发现15条异常信息
                           </span> -->
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
                        <!-- <el-col :span="12">
                            <el-row>
                                <el-col :span="5">
                                    芝麻分：
                                </el-col>
                                <el-col :span="6" v-if="baseInfo.zhimaReportDO">
                                     {{baseInfo.zhimaReportDO.score}}
                                </el-col>
                            </el-row>
                        </el-col>                         -->
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
                            <template v-for="(temp,index1) in baseInfo.overdueInfo" >
                                <tr :key="temp.riskName" v-bind:class="{ borderBottom1: index1 != baseInfo.platFormInfo.length-1,borderBottom2: index1 == baseInfo.platFormInfo.length-1 }">
                                    <td :rowspan="baseInfo.overdueInfo.length" v-if="index1==0">命中信贷逾期名单</td>
                                    <td class="risk-item-name">{{temp.riskName}}</td>
                                    <td class="risk-item-level">
                                        <!-- {{temp.riskLevel==1?'低':(temp.riskLevel==2?'中':'高')}}   -->
                                    </td>
                                    <td>
                                        <span>总数{{temp.tdOverDetailDTOList.length}}</span><br/>
                                        <span><a href="javascript:void(0)" style="color: #2ea5ff;text-decoration: blink;">频度规则详情</a></span>
                                        <ul class="risk-detail-list"  style="text-align: left;margin-left:150px;">
                                            <li v-for="(tem ,i) in temp.tdOverDetailDTOList" :key="i">
                                               <ul style="border-bottom:2px solid black">
                                                   <li>
                                                       <span>逾期区间</span>  {{tem.amountRange}}
                                                   </li>
                                                   <li>
                                                       <span>逾期天数</span>  {{tem.dayRange}}
                                                   </li>                                                   
                                                   <li>
                                                       <span>逾期次数</span>  {{tem.eachCount}}
                                                   </li>
                                                   <li>
                                                       <span>逾期时间</span>  {{tem.overdueTime}}
                                                   </li>
                                               </ul>

                                                <!-- <span>{{tem.dimension}}</span>
                                                <ul>
                                                    <li v-for="(te) in tem.displayReportDOS" :key="te.displayName" style="margin-left:20px">
                                                        {{te.dimension}}
                                                        {{te.displayName}}&nbsp;&nbsp;{{te.count}}
                                                    </li>
                                                </ul>                                                 -->
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
        </el-dialog> 
        <el-dialog :visible.sync="showDialogVisible" width="60%">
            <el-row class="flx">
                <div class="fl">
                    新颜报告
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
                                <strong>{{reportList.loans_score}}</strong>
                                <p>贷款行为分</p>
                            </div>
                                <el-progress type="circle" :percentage="reportList.loans_score" color="red" :show-text="showText">aaaaa</el-progress>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-row style="text-align:center;padding-top:30px">
                           <strong style="font-size:20px">
                               贷款行为置信度{{reportList.loans_credibility}}
                              </strong>
                        <br/>
                        <!-- <span>
                            共发现15条异常信息
                           </span> -->
                        </el-row>
                    </el-col>
                </el-card>
            </el-row> 
            <el-row style="margin-top:20px">
                <el-card>
                    <el-row>
                        <h3>报告详情</h3>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-col :span="5">
                            总贷款放款订单数(12个月内):
                        </el-col>
                        <el-col :span="12">
                            {{reportList.loans_count}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                           已结清贷款订单数(12个月内):
                        </el-col>
                        <el-col :span="12">
                           {{reportList.loans_settle_count}}
                        </el-col>
                    </el-row> 

                    <el-row>
                        <el-col :span="5">
                           逾期贷款（M0+）订单数(12个月内):
                        </el-col>
                        <el-col :span="12">
                           {{reportList.loans_overdue_count}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           贷款放款机构数(12个月内):
                        </el-col>
                        <el-col :span="12">
                           {{reportList.loans_org_count}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           贷款放款的消费金融类机构数(12个月内):
                        </el-col>
                        <el-col :span="12">
                           {{reportList.consfin_org_count}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           查询主体贷款放款的网络贷款类机构数(12个月内):
                        </el-col>
                        <el-col :span="12">
                           {{reportList.loans_cash_count}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           近1个月的贷款放款笔数:
                        </el-col>
                        <el-col :span="12">
                           {{reportList.latest_one_month}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           近3个月的贷款放款笔数:
                        </el-col>
                        <el-col :span="12">
                           {{reportList.latest_three_month }}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           近6个月的贷款放款笔数:
                        </el-col>
                        <el-col :span="12">
                           {{reportList.latest_six_month}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           贷款机构历史成功扣款笔数(12个月内):
                        </el-col>
                        <el-col :span="12">
                           {{reportList.history_suc_fee}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           贷款机构历史失败扣款笔数(12个月内):
                        </el-col>
                        <el-col :span="12">
                           {{reportList.history_fail_fee}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           近一个月的贷款机构成功扣款笔数:
                        </el-col>
                        <el-col :span="12">
                           {{reportList.latest_one_month_suc}}
                        </el-col>
                    </el-row>                                                                                                                                                                                                                            
                    <el-row>
                        <el-col :span="5">
                           近一个月的贷款机构失败扣款笔数:
                        </el-col>
                        <el-col :span="12">
                           {{reportList.latest_one_month_fail}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           第一次贷款放款记录至今的天数:
                        </el-col>
                        <el-col :span="12">
                           {{reportList.loans_long_time}}
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col :span="5">
                           最后一次贷款放款记录时间(12个月内):
                        </el-col>
                        <el-col :span="12">
                           {{reportList.loans_latest_time}}
                        </el-col>
                    </el-row>                                                             
                </el-card>
            </el-row>                                 
        </el-dialog>     
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  httpGetCreditReport,
  httpGetList,
  httpGetTDReport,
  httpGetxinyanreport
} from "@/api/http";
import { timeFormat } from "../../../../static/js/time";
export default {
  data() {
    return {
      form: {
        name: "",
        date: "",
        address: ""
      },
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      allpage: 0,
      select_phone: "",
      select_time: [],
      loading: true,
      editVisible: false,
      showVisible: false,
      showDialogVisible: false,
      showText: false,
      information: {},
      contacts: {},
      tongDunAddressDetectVO: {},
      activeNames: ["1"],
      tableData6: [],
      tableData: [],
      column_row_offset: [[2, 1], [0, 0], [3, 1], [0, 0], [0, 0], [1, 1]],
      baseInfo: {},
      s: null,
      realname: "",
      reportList: {}
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
    reset() {
      this.select_phone = "";
      this.select_time = [];
      this.getTableData(
        this.currentPage,
        this.pageSize,
        "",
        "",
        this.select_phone
      );
    },
    handleEdit() {
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    //查看报告
    handleReport(index, row) {
      let _this = this;

      for (var key in this.baseInfo) {
        delete this.baseInfo[key];
      }
      console.log(index, row);
      let id = row.tongdunReportId;

      httpGetxinyanreport(id)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.reportList = JSON.parse(
              JSON.stringify(data.data.data.result_detail)
            );
            this.showDialogVisible = true;
          } else if (data.code == 404) {
            this.$notify.error({
              title: "错误",
              message: "此用户没有新颜报告"
            });
          }
          //   let data = res.data;

          //   _this.baseInfo = data;
          //   _this.showVisible = true;
        })
        .catch();
    },
    arraySpanMethod(row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 0) {
        let j = row.rowIndex;
        return this.column_row_offset[j];
      }
    },
    //得到数据
    getTableData(
      pagesize,
      npage,
      time,
      phonenume,
      interfaceCallType = 6,
      realname
    ) {
      let _this = this;
      _this.loading = true;
      if (time.length === 0) {
        httpGetCreditReport(pagesize, npage, "", "", phonenume, 6, realname)
          .then(res => {
            let data = res.data;
            _this.allpage = data.allsize;
            _this.currentPage = data.npage;
            _this.tableData = data.list;
            _this.loading = false;
          })
          .catch();
      } else {
        httpGetCreditReport(pagesize, npage, ...time, phonenume, 6, realname)
          .then(res => {
            let data = res.data;
            _this.allpage = data.allsize;
            _this.currentPage = data.npage;
            _this.tableData = data.list;
            _this.loading = false;
            setTimeout(() => {
              _this.loading = false;
            }, 5000);
          })
          .catch(() => {
            _this.loading = false;
          });
      }
    },
    handleSearch() {
      if (
        this.select_time == null &&
        this.select_time &&
        this.select_time.length
      ) {
        this.getTableData(
          this.currentPage,
          this.pageSize,
          ["", ""],
          this.select_phone,
          6,
          this.realname
        );
      } else {
        this.getTableData(
          this.currentPage,
          this.pageSize,
          this.select_time,
          this.select_phone,
          6,
          this.realname
        );
      }
    },
    // handleSearch() {
    //   this.currentPage = 1;
    //   console.log(this.select_time);
    //   if (this.select_time && this.select_time.length) {
    //     this.getTableData(
    //       this.currentPage,
    //       this.pageSize,
    //       "",
    //       "",
    //       this.select_phone
    //     );
    //   } else {
    //     this.getTableData(
    //       this.currentPage,
    //       this.pageSize,
    //       ...this.select_time,
    //       this.select_phone
    //     );
    //   }
    // },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleSearch();
    },
    handl() {
      let _this = this;
      httpGetTDReport(this.s)
        .then(res => {
          let data = res.data;

          _this.baseInfo = data;
          _this.showVisible = true;
        })
        .catch();
    }
  },
  mounted: function() {
    this.getTableData(
      this.currentPage,
      this.pageSize,
      this.select_time,
      this.select_phone
    );
  }
};
</script>

<style scoped>
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
  position: absolute;
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

