import axios from 'axios';
var qs = require('qs');
import {
  getCookie
} from '../config/cookie'

axios.defaults.withCredentials = true;
//引用刚才我们创建的util.js文件，并使用getCookie方法
//axios.defaults.baseURL = 'http://localhost:8082';
axios.defaults.baseURL = 'http://101.132.171.38:8082';
//axios.defaults.baseURL = 'http://47.88.171.117:8082';
//baseURL: 'http://101.132.171.38:7992',



// // http request 拦截器，通过这个，我们就可以把Cookie传到后台
// axios.interceptors.request.use(
//   config =>  {
//     // const token = getCookie('login_id'); //获取Cookie
//     // config.data = JSON.stringify(config.data);
//     let allCookies = document.cookie
//     config.headers =  {
//       'set-cookie':allCookies, //设置跨域头部
//       'Content-Type':'application/x-www-form-urlencoded'
//     }; 
//     // if (token) {
//     //   config.params = {
//     //     'login_id': token
//     //   } //后台接收的参数，后面我们将说明后台如何接收
//     // }
//     return config; 
//   }, 
//   err =>  {
//     return Promise.reject(err); 
//   }
// ); 


// // http request 拦截器，通过这个，我们就可以把Cookie传到后台
// axios.interceptors.request.use(
//   config => {
//     const token = getCookie('session'); //获取Cookie
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//        //设置跨域头部
//     };
//     if (token) {
//       config.params = {'token': token} //后台接收的参数，后面我们将说明后台如何接收
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );


// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
// //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
//     // if(response.data.errCode == 2) {
//     //   router.push({
//     //     path: '/login',
//     //     query: {redirect: router.currentRoute.fullPath} //从哪个页面跳转
//     //   })
//     // }
//     return response;
//   },
//   error => {
//     return Promise.reject(error.response.data)
//   })


//credit 获取风控菜单
export function httpGetCreditMenuList() {
  let allCookies = document.cookie
  return axios({
    url: "creditMenu/list",
    method: "get",
    headers: {
      'set-cookie': allCookies, //设置跨域头部

    }
  })
}

//风控后台 / credit 风险趋势 上部四个方块
export function httpGetSummary() {
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/summary",
    method: "get",
    headers: {
      'set-cookie': allCookies, //设置跨域头部

    }
  })
}

//风控后台 / credit 风险趋势 下部下拉框展示
export function httpGetComboBox() {
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/getcombobox",
    method: "get",
    headers: {
      'set-cookie': allCookies, //设置跨域头部

    }
  })
}

//风控后台 / credit 风险趋势 按时间类型查找
export function httpGetSummaryBydateandType(begaindate, enddate, type) {
  let data = {
    begaindate,
    enddate,
    type
  };
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/summarybydateandtype",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies, //设置跨域头部
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 报表统计 风险结果展示
export function httpGetCreditResultByuser(npage, pagesize, phoneNume, begain, end, userName) {
  let data = {
    npage,
    pagesize,
    phoneNume,
    begain,
    end,
    userName
  };
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/getcreditresultbyuser",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 报表统计 风险结果统计 结果按钮点击展示
export function httpGetRiskpoint(id) {
  //console.log(data);
  let allCookies = document.cookie
  return axios({
    url: "/sys/getriskpoint",
    method: "get",
    params: { //请求参数  
      id: id
    },
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
  })
}

//风控后台 / credit 信用报告
export function httpGetCreditReport(npage, pagesize, startDate, EndDate, phonenume, interfaceCallType, realname) {
  let data = {
    npage,
    pagesize,
    startDate,
    EndDate,
    phonenume,
    interfaceCallType,
    realname
  };
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/getCreditReport",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 信贷报告
export function httpGetList(id) {
  let data = {
    id
  };
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "rep/getlist",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 财务管理 消费明细）
export function httpGetConsumeDetail(npage, pagesize) {
  let data = {
    npage,
    pagesize,
  };
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/consume_detail",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//credit 获取风控菜单
export function httpGetMoneyNow() {
  let allCookies = document.cookie
  return axios({
    url: "/sys/getmoneynow",
    method: "get",
    headers: {

      'set-cookie': allCookies,
    },
  })
}

//风控后台 / credit 财务管理 客户消费详情 列表展示
export function httpGetAllCus(npage, pagesize) {
  let data = {
    npage,
    pagesize,
  };
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/getallcus",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 财务管理 客户消费详情 图表展示（按照月份）
export function httpGetChartInfobyMonth(type) {
  let data = {
    type
  };
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/getchartinfobymonth",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 财务管理 客户消费详情 图表展示（按照日期）
export function httpGetChartInfobyDate(date) {
  let data = {
    date
  };
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/getchartinfobydate",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//credit 风控配置管理 执行器激活/停用
export function httpUpdateCreditStatus(
  id,
  status
) {
  const data = {
    id,
    status
  };
  let allCookies = document.cookie
  return axios({
    url: "/sys/changstatus",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  });
}

//credit 风控配置管理 执行器激活/修改
export function httpChangepara(
  id,
  executePara
) {
  const data = {
    id,
    executePara
  };
  let allCookies = document.cookie
  return axios({
    url: "/sys/changpara",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  });
}


//credit 风控配置管理 执行器展示（新增 和复贷）
export function httpGetExecutor(npage, pagesize, type) {
  let data = {
    npage,
    pagesize,
    type
  };
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/getexecutor",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台/信用报表统计风险结果展示credit 账户管理 基本资料展示
export function httpGetCustuserInfo() {
  //console.log(data);
  let allCookies = document.cookie
  return axios({
    url: "/sys/getcustuserinfo",
    method: "get",
    headers: {

      'set-cookie': allCookies,
    },
  })
}

//风控后台/信用报表统计风险结果展示credit 账户管理 基本资料展示
export function httpPostCustuserInfo(data) {
  let allCookies = document.cookie
  //console.log(data);
  return axios({
    url: "/sys/updatecustuserinfo",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 信用报告 运营商列表 查看报告
export function httpPostCarryReport(mifeng_report_id = 27) {
  let data = {
    mifeng_report_id,
  };
  let allCookies = document.cookie
  return axios({
    url: "/sys/getcarryreport",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 黑名单列表
export function httpGetUserList(npage, pagesize, username, phonenumber, idno) {
  let data = {
    npage,
    pagesize,
    username,
    phonenumber,
    idno
  };
  let allCookies = document.cookie
  return axios({
    url: "/black/getlist",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / getTDReport
export function httpGetTDReport(tdReportId) {
  let data = {
    tdReportId,

  };
  let allCookies = document.cookie
  return axios({
    url: "sys/getTDReport",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}


//风控后台 / getTDReport
export function httpGetBlackReport(id, type) {
  let data = {
    id,
    type
  };
  let allCookies = document.cookie
  return axios({
    url: "/black/getReport",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / getTDReport
export function httpALLGetTDReport(pages = 1) {
  let data = {
    pages,
  };
  let allCookies = document.cookie
  return axios({
    url: "sys/getAllTDReport",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//风控后台 / 芝麻分
export function httpGetZMCReport(zmcReportId) {
  let data = {
    zmcReportId
  };
  let allCookies = document.cookie
  return axios({
    url: "/sys/getZMCReport",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//信息查询 手动回调
export function httpRecallbacklist(npage, pagesize, phonenumber, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    phonenumber,
    begainTimeString,
    endTimeString
  };
  let allCookies = document.cookie
  return axios({
    url: "/sys/recallbacklist",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}


//风控后台 / credit 报表统计 风险结果统计 结果按钮点击展示
export function httpRecallback(id) {
  //console.log(data);
  let allCookies = document.cookie
  return axios({
    url: "/sys/recallback",
    method: "get",
    params: { //请求参数  
      id: id
    },
    headers: {

      'set-cookie': allCookies,
    },
  })
}


//登录
export function httpLogin(username, password) {
  let data = {
    username,
    password
  };

  let allCookies = document.cookie
  return axios({
    url: "/sys/login",
    method: "post",
    data: qs.stringify(data),
    headers: {
      'set-cookie': allCookies, //设置跨域头部
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//风控后台 / credit 风险趋势 上部四个方块
export function httpGetallcredituser() {
  let allCookies = document.cookie
  return axios({
    url: "/sys/getallcredituser",
    method: "get",
    headers: {
      'set-cookie': allCookies,
    },
  })
}

//登录
export function httpUpdatesysuser(username, password, perContact, perContactPhone, companyname, carrierCallUrl, partnerKey, partnerCode, id) {
  let data = {
    username,
    password,
    perContact,
    perContactPhone,
    companyname,
    carrierCallUrl,
    partnerKey,
    partnerCode,
    id
  };
  let allCookies = document.cookie
  return axios({
    url: "/sys/updatesysuser",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

//登录
export function httpCreatesysuser(username, password, perContact, perContactPhone, companyname, carrierCallUrl, partnerKey, partnerCode) {
  let data = {
    username,
    password,
    perContact,
    perContactPhone,
    companyname,
    carrierCallUrl,
    partnerKey,
    partnerCode
  };
  let allCookies = document.cookie
  return axios({
    url: "/sys/createsysuser",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

export function httpSetExecutorOrder(orderIds) {
  let data = {
    orderIds
  };
  let allCookies = document.cookie
  return axios({
    url: '/sys/setExecutorOrder',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}

export function httpGetxinyanreport(xyReportId) {
  let data = {
    xyReportId
  };
  let allCookies = document.cookie
  return axios({
    url: '/sys/getxinyanreport',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'set-cookie': allCookies,
    },
    data: qs.stringify(data)
  })
}
