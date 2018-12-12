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
                                 <el-button type="primary" icon="search" @click="handleSearch" >搜索</el-button> 
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
                     width="100">
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
                    width="100">
                 </el-table-column>
                <el-table-column
                    prop="idcard"
                    width="300"
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
        <el-dialog  :visible.sync="editVisible" width="78%">
            <el-row>
                    <p class="title">
                        基本信息
                    </p>
            </el-row>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="姓名" >
                    <el-input v-model="form.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" ></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="身份证号">
                    <el-input v-model="form.cardid" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="移动运行商密码">
                    <el-input v-model="form.operatorPassword" ></el-input>
                </el-form-item>                
            </el-form>            
            <el-row>
                    <p class="title">
                        联系人信息
                    </p>                
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
        <!-- 查勘报告         -->
        <el-dialog id="table" :visible.sync="showVisible" :width="fullscreenWidth"   title="报告详情" :fullscreen="fullscreen" top="30px">
            <el-container   :style="{ height: fullscreenHeight}" style="border: 1px solid #eee">
              <el-header style="font-size: 12px;overflow：hidden;line-height:60px;    background-color:#EEEEEE">
                <el-row >
                  <el-col :span="6">
                    <h1 >烈焰云</h1>
                  </el-col>
                  <el-col :span="1" :offset="15">
                     <div class="btn-fullscreen"  >
                         <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                             <el-button type="info" icon="el-icon-rank" circle @click="changeFullscreen"></el-button>
                         </el-tooltip>
                     </div>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" @click="Print">打印报告</el-button>
                  </el-col>
                  <el-col style="position:absolute;top:0;line-height:16px;text-align:right;color:rgb(153,153,153)">
                    <span >tips:若打印页面不全或不存在请重新点击打印报告</span>
                  </el-col>
                </el-row>
              </el-header>
              <el-main  id="subOutputRank-print" >

                <el-row    style="padding-top:0;position:relative;">
                  <el-row id="bg" style="width:100%;height:100%;position:absolute;top:0;left:0;zIndex:9999" :style ="note" >
                    <div >

                    </div>
                  </el-row>
                  <el-row>

                  
                  <el-row class="report_t">
                    <div class="el-main-info l">
                      <span>报告编号：201805241119371288237</span>
                    </div>
                    <div class="el-main-info r">
                      <span>报告生成时间：{{new Date() |dateServer}}</span>
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
                </el-row>
              </el-main>
            </el-container>
        </el-dialog>
                        <el-row v-show="false">
                    <canvas id="myCanvas" width="200" height="230" >
                    </canvas>
                </el-row> 
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  httpGetCreditReport,
  httpPostCarryReport,
  httpGetZMCReport
} from "@/api/http";
import { timeFormat } from "../../../../static/js/time";
import Print from "print-js";
import "../../../assets/libs/jquery/jQuery.print.js";
export default {
  data() {
    return {
      form: {
        name: "",
        date: "",
        address: ""
      },
      loading: true,
      select_time: [],
      select_word: "",
      editVisible: false,
      showVisible: false,
      fullscreen: false,
      tableData: [],
      pageSize: 20,
      currentPage: 1,
      allpage: 0,
      select_phone: "",
      userBasicInformation: {}, //用户基本信息检测用户基本信息检测
      userInfo: {},
      fullscreenWidth: "80%",
      fullscreenHeight: "750px",
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
      realname: ""
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
        this.select_phone,
        2
      );
    },
    _httpGetZMCReport(zmcReportId) {
      httpGetZMCReport(zmcReportId)
        .then(res => {
          console.log(res);
        })
        .catch();
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
      let mifengReportId = row.mifengReportId;
      let _this = this;
      let zmcReportId = row.zmcReportId;
      this._httpGetZMCReport(zmcReportId);
      httpPostCarryReport(mifengReportId)
        .then(res => {
          let data = res.data;
          _this.userBasicInformation = data.mifengreportApplicationCheck;
          _this.testTableData = data.list1;
          _this.operatorTableData = data.list2;
          _this.kinsfolkTableData = data.list6;

          _this.linkmanTableData = data.list4;
          _this.operatorDataTableData = data.list3;
          _this.userInfo = data.mifengreportUserInfoCheck;
          this.showVisible = true;
        })

        .catch();
      setTimeout(() => {
        if (this.canvasShow) {
          var canvas = document.getElementById("myCanvas");
          var ctx = canvas.getContext("2d");
          ctx.save();
          ctx.font = "30px Microsoft YaHei";
          ctx.rotate(-45 * Math.PI / 180);
          ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
          ctx.fillText("烈焰云", -100, 220);
          ctx.restore();
          this.note.backgroundImage = 'url("' + ctx.canvas.toDataURL() + '")';
          this.canvasShow = false;
        }
      }, 20);
    },
    changeFullscreen() {
      if (this.fullscreen) {
        this.fullscreen = false;
        this.fullscreenWidth = "80%";
        this.fullscreenHeight = "450px";
      } else {
        this.fullscreen = true;
        this.fullscreenWidth = "100%";
        this.fullscreenHeight = "1050px";
      }
    },
    //得到数据
    getTableData(
      pagesize,
      npage,
      startDate,
      EndDate,
      phonenume,
      interfaceCallType,
      realname
    ) {
      let _this = this;
      _this.loading = true;
      httpGetCreditReport(
        pagesize,
        npage,
        startDate,
        EndDate,
        phonenume,
        2,
        realname
      )
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
          "",
          "",
          this.select_phone,
          2,
          this.realname
        );
      } else {
        this.getTableData(
          this.currentPage,
          this.pageSize,
          this.select_time[0],
          this.select_time[1],
          this.select_phone,
          2,
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
    // handleCurrentChange(val) {
    //   if (this.select_time.length === 0) {
    //     this.getTableData(val, this.pageSize, "", "", this.select_phone);
    //   } else {
    //     this.getTableData(
    //       val,
    //       this.pageSize,
    //       ...this.select_time,
    //       this.select_phone
    //     );
    //   }
    // },
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.getTableData(this.currentPage, this.pageSize);
    // },

    Print() {
      console.log(jQuery("#subOutputRank-print"));
      // jQuery("#subOutputRank-print").print({
      //   //Use Global styles
      //   globalStyles: true,
      //   //Add link with attrbute media=print
      //   mediaPrint: false,
      //   //Custom stylesheet
      //   //Print in a hidden iframe
      //   //Don't print this
      //   //Add this at top
      //   //   stylesheet: "./static/css/print.css",
      //   prepend: "烈焰云<br/>",
      //   timeout: 4000
      //   //Add this on bott
      //   // append: "<br/>Buh Bye!"
      // });

      jQuery("#subOutputRank-print").print({
        //Use Global styles
        globalStyles: false,
        //Add link with attrbute media=print
        mediaPrint: false,
        //Custom stylesheet
        //Print in a hidden iframe
        //Don't print this
        //Add this at top
        stylesheet: "./static/css/print.css",
        prepend: "烈焰云<br/>",
        timeout: 4000
        //Add this on bott
        // append: "<br/>Buh Bye!"
      });
    },
    toPrint() {
      console.log(Print);
      let subOutputRankPrint = document.getElementById("subOutputRank-print");
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    }

    // print() {
    //   console.log(1);
    //   var Print = function(dom, options) {
    //     if (!(this instanceof Print)) return new Print(dom, options);

    //     this.options = this.extend(
    //       {
    //         noPrint: ".no-print"
    //       },
    //       options
    //     );

    //     if (typeof dom === "string") {
    //       this.dom = document.querySelector(dom);
    //     } else {
    //       this.dom = dom;
    //     }

    //     this.init();
    //   };
    //   Print.prototype = {
    //     init: function() {
    //       var content = this.getStyle() + this.getHtml();
    //       var isFirst = true;
    //       // function completeLoading() {
    //       //   if (document.readyState == "complete") {
    //       //     console.log(document.readyState);
    //       //
    //       //   }
    //       // }
    //       this.writeIframe(content);
    //     },
    //     extend: function(obj, obj2) {
    //       for (var k in obj2) {
    //         obj[k] = obj2[k];
    //       }
    //       return obj;
    //     },

    //     getStyle: function() {
    //       var str = "",
    //         styles = document.querySelectorAll("style,link");

    //       for (var i = 0; i < styles.length; i++) {
    //         str += styles[i].outerHTML;
    //       }
    //       str +=
    //         "<style>" +
    //         (this.options.noPrint ? this.options.noPrint : ".no-print") +
    //         "{display:none;}</style>";

    //       return str;
    //     },

    //     getHtml: function() {
    //       var inputs = document.querySelectorAll("input");
    //       var textareas = document.querySelectorAll("textarea");
    //       var selects = document.querySelectorAll("select");

    //       for (var k in inputs) {
    //         if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
    //           if (inputs[k].checked == true) {
    //             inputs[k].setAttribute("checked", "checked");
    //           } else {
    //             inputs[k].removeAttribute("checked");
    //           }
    //         } else if (inputs[k].type == "text") {
    //           inputs[k].setAttribute("value", inputs[k].value);
    //         }
    //       }

    //       for (var k2 in textareas) {
    //         if (textareas[k2].type == "textarea") {
    //           textareas[k2].innerHTML = textareas[k2].value;
    //         }
    //       }

    //       for (var k3 in selects) {
    //         if (selects[k3].type == "select-one") {
    //           var child = selects[k3].children;
    //           for (var i in child) {
    //             if (child[i].tagName == "OPTION") {
    //               if (child[i].selected == true) {
    //                 child[i].setAttribute("selected", "selected");
    //               } else {
    //                 child[i].removeAttribute("selected");
    //               }
    //             }
    //           }
    //         }
    //       }

    //       return this.dom.outerHTML;
    //     },

    //     writeIframe: function(content) {
    //       var w,
    //         doc,
    //         iframe = document.createElement("iframe"),
    //         f = document.body.appendChild(iframe);
    //       iframe.id = "myIframe";
    //       iframe.style =
    //         "position:absolute;width:0;height:0;top:-10px;left:-10px;";

    //       w = f.contentWindow || f.contentDocument;
    //       doc = f.contentDocument || f.contentWindow.document;
    //       doc.open();
    //       doc.write(content);
    //       doc.close();
    //       this.toPrint(w);
    //       setTimeout(function() {
    //         document.body.removeChild(iframe);
    //       }, 100);
    //     },

    //     toPrint: function(frameWindow) {
    //       try {
    //         console.log(frameW);
    //         setTimeout(function() {
    //           frameWindow.focus();
    //           try {
    //             if (!frameWindow.document.execCommand("print", false, null)) {
    //               frameWindow.print();
    //             }
    //           } catch (e) {
    //             frameWindow.print();
    //           }
    //           frameWindow.close();
    //         }, 10);
    //       } catch (err) {
    //         console.log("err", err);
    //       }
    //     }
    //   };

    //   Print("#subOutputRank-print");
    // }
  },
  mounted: function() {
    this.getTableData(
      this.currentPage,
      this.pageSize,
      "",
      "",
      this.select_phone,
      2
    );
  },
  created() {}
};
</script>
<style >
#table .el-dialog__body {
  padding: 0px 20px 20px;
  height: auto;
}
</style>

<style scoped>
#subOutputRank-print {
  height: auto;
}
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
</style>

<style media="print" type="text/css" scoped>
.noprint {
  display: none;
}
#subOutputRank-print {
  height: auto;
}
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
</style> 