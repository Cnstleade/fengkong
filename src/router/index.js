import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },

    {
      //风险趋势
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: {
        title: ''
      },
      children: [{
          path: '/',
          redirect: '/riskTrend'
        },
        {
          //风险趋势
          path: '/riskTrend',
          component: resolve => require(['../components/page/HS_marketRisk/HS_riskTrend.vue'], resolve),
          meta: {
            title: '风险趋势'
          }
        },
        {
          //风控结果展示
          path: '/riskControlResult',
          component: resolve => require(['../components/page/HS_statisticsStatements/HS_riskControlResults.vue'], resolve),
          meta: {
            title: '风控结果展示'
          }
        },
        {
          //运营商报告列表
          path: '/operatorReport',
          component: resolve => require(['../components/page/HS_creditReport/HS_operatorReport.vue'], resolve),
          meta: {
            title: '运营商报告列表'
          }
        },
        {
          //芝麻报告
          path: '/zmcReportId',
          component: resolve => require(['../components/page/HS_creditReport/HS_zmcReportId.vue'], resolve),
          meta: {
            title: '芝麻信用分'
          }
        },

        {
          //信贷预测报告列表
          path: '/creditPredict',
          component: resolve => require(['../components/page/HS_creditReport/HS_creditPredict.vue'], resolve),
          meta: {
            title: '信贷预测报告列表'
          }
        },
        {
          //消费明细
          path: '/consumptionDetail',
          component: resolve => require(['../components/page/HS_financialManagement/HS_consumptionDetail.vue'], resolve),
          meta: {
            title: '消费明细'
          }
        },
        {
          //客户消费详情
          path: '/customerConsumption',
          component: resolve => require(['../components/page/HS_financialManagement/HS_customerConsumption.vue'], resolve),
          meta: {
            title: '客户消费详情'
          }
        },
        {
          //新增用户决策管理
          path: '/userDecision',
          component: resolve => require(['../components/page/HS_configurationManagement/HS_userDecision.vue'], resolve),
          meta: {
            title: '新增用户决策管理'
          }
        },
        {
          //复贷用户决策管理
          path: '/reditDecision',
          component: resolve => require(['../components/page/HS_configurationManagement/HS_creditDecision.vue'], resolve),
          meta: {
            title: '复贷用户决策管理'
          }
        },
        {
          //基本资料
          path: '/basicInformation',
          component: resolve => require(['../components/page/HS_accountManagement/HS_basicInformation.vue'], resolve),
          meta: {
            title: '基本资料'
          }
        },
        {
          //密码管理
          path: '/passwordManagement',
          component: resolve => require(['../components/page/HS_accountManagement/HS_passwordManagement.vue'], resolve),
          meta: {
            title: '密码管理'
          }
        },
        {
          //黑名单管理
          path: '/index7',
          component: resolve => require(['../components/page/HS_queryInformation/HS_blackList.vue'], resolve),
          meta: {
            title: '黑名单管理'
          },
        },
        {
          //白名单管理
          path: '/index8',
          component: resolve => require(['../components/page/HS_queryInformation/HS_whiteList.vue'], resolve),
          meta: {
            title: '白名单管理'
          },

        },
        {
          //运营商报告列表
          path: '/test',
          component: resolve => require(['../components/page/HS_creditReport/test.vue'], resolve),
          meta: {
            title: '测试'
          }
        },
        {
          //运营商报告列表
          path: '/systemInformation',
          component: resolve => require(['../components/page/HS_queryInformation/systemInformation.vue'], resolve),
          meta: {
            title: '信息查询'
          }
        },
        {
          //客户列表展示
          path: '/allcredituser',
          component: resolve => require(['../components/page/HS_queryInformation/HS_allcredituser.vue'], resolve),
          meta: {
            title: '客户列表展示'
          }
        },        
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
