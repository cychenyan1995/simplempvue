/*const modules = ['index' 
  // 'index', 'message', 'mine', 'remind',
  // 'test',
  // 'counter', 'logs'
];

const routers = modules.reduce((prev, next) => {
  let router = require(`../pages/${next}/router`);
  return prev.concat(...router);
}, []);

module.exports = routers.map(router => {
  console.log(router.config.usingComponents)

  Array.isArray(router.config.usingComponents) && (router.config.usingComponents = router.config.usingComponents.reduce((prev, next) => {
    prev[`i-${next}`] = `../../static/iview/${next}/index`;
    return prev;
  }, {}));

  return router;
});

return;*/

var routers = [{
    path: '/pages/index/index',
    config: {
      navigationBarTitleText: '首页',
      usingComponents: ['button', 'grid', 'grid-item', 'grid-icon', 'grid-label', 'icon', 'row', 'badge']
    }
  },
  {
    path: '/pages/message/index',
    config: {
      navigationBarTitleText: '提醒信息',
      usingComponents: ['button', ]
    }
  },
  {
    path: '/pages/mine/index',
    config: {
      navigationBarTitleText: '我的',
      usingComponents: ['modal', 'button', 'grid', 'grid-item', 'grid-icon', 'grid-label', 'icon', 'row', ]
    }
  },
  {
    path: '/pages/message/showPic',
    config: {
      navigationBarTitleText: '查看图片',
      usingComponents: ['spin', 'icon', ]
    }
  },
  {
    path: '/pages/call/index',
    config: {
      navigationBarTitleText: '应急电话',
      usingComponents: ['icon', ]
    }
  },
  {
    path: '/pages/mine/promptManage',
    config: {
      navigationBarTitleText: '提醒信息管理',
      usingComponents: ['switch', 'icon', 'cell-group', 'cell', 'panel']
    }
  },
  {
    path: '/pages/index/promotion',
    config: {
      navigationBarTitleText: '推广',
      usingComponents: []
    }
  },
  {
    path: '/pages/mine/updateTel',
    config: {
      navigationBarTitleText: '变更手机号',
      usingComponents: ['modal', 'icon', 'toast', 'input', 'button', ]
    }
  },
  {
    path: '/pages/mine/updateCardNo',
    config: {
      navigationBarTitleText: '变更车牌号',
      usingComponents: ['modal', 'icon', 'toast', 'input', 'button', ]
    }
  },
  {
    path: '/pages/mine/myOrder',
    config: {
      navigationBarTitleText: '我的订单',
      usingComponents: ['modal', 'icon', 'input', 'button', ]
    }
  },
  {
    path: '/pages/charge/index',
    config: {
      navigationBarTitleText: '充值中心',
      usingComponents: ['modal', 'button', 'input', 'icon', 'row', ]
    }
  },
  {
    path: '/pages/charge/confirmOrder',
    config: {
      navigationBarTitleText: '确认订单',
      usingComponents: ['modal', 'icon', 'input', 'button', ]
    }
  },
  {
    path: '/pages/login/index',
    config: {
      navigationBarTitleText: 'ｉ随行登录',
      usingComponents: ['modal', 'grid', 'grid-item', 'grid-icon', 'icon', 'grid-label', 'input', 'button', 'checkbox', 'checkbox-group']
    }
  },
  {
    path: '/pages/login/userTreaty',
    config: {
      navigationBarTitleText: '用户协议',
      usingComponents: []
    }
  },
  {
    path: '/pages/driving/index',
    config: {
      navigationBarTitleText: '驾驶行为分析',
      usingComponents: ['icon']
    }
  }, {
    path: '/pages/check/index',
    config: {
      navigationBarTitleText: '爱车体检',
      usingComponents: ['button', 'icon', 'modal', ]
    }
  },
  {
    path: '/pages/valuation/index',
    config: {
      navigationBarTitleText: '爱车估值',
      usingComponents: ['input', 'icon', 'button', 'radio-group', 'radio', 'checkbox', 'checkbox-group']
    }
  }, {
    path: '/pages/valuation/result',
    config: {
      navigationBarTitleText: '爱车估值',
      usingComponents: []
    }
  },
  {
    path: '/pages/insurance/index',
    config: {
      navigationBarTitleText: '车险计算',
      usingComponents: ['icon', 'input', 'button', 'radio-group', 'radio', 'checkbox', 'checkbox-group']
    }
  }, {
    path: '/pages/tire/index',
    config: {
      navigationBarTitleText: '胎压监测',
      usingComponents: ['icon', ]
    }
  },
  {
    path: '/pages/position/index',
    config: {
      navigationBarTitleText: '位置服务',
      usingComponents: ['icon',]
    }
  },
  {
    path: '/pages/position/locus',
    config: {
      navigationBarTitleText: '行车轨迹',
      usingComponents: ['icon', 'spin', ]
    }
  },
  {
    path: '/pages/position/detail',
    config: {
      navigationBarTitleText: '轨迹详情',
      usingComponents: []
    }
  },
  {
    path: '/pages/violation/index',
    config: {
      navigationBarTitleText: '违章查询',
      usingComponents: ['icon', 'input', 'button','radio-group', 'radio', ]
    }
  },
  {
    path: '/pages/violation/result',
    config: {
      navigationBarTitleText: '查询结果',
      usingComponents: ['icon', 'input', 'button', ]
    }
  },
];

routers.forEach(item => {
  item.config.usingComponents = item.config.usingComponents.reduce((coms, next) => {
    coms[`i-${next}`] = `../../static/iview/${next}/index`;
    return coms;
  }, {})
});

module.exports = routers;
