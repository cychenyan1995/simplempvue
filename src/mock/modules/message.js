const Mock = require('@/mock/mock.js')

Mock.success('getLastMessage', {
  title: '@ctitle(1,20)',
  content: '@cparagraph(1,10)',
  time: '@datetime()'
});


Mock.success('getMessageList', {
  remindtime: '今天 17:12',
  text: '@ctitle(1,20)',
  message: '小ｉ侦测到你的车辆有一条故障信息，请及时查看。',
  carNum: '粤B0X888',
  device: '12345678',
  problem: '右后轮胎胎压异常',
  tips: '请尽快在安全区域靠边停车，到胎压检测页面查看详细信息，并检查轮胎状态。',
  parkingTime: '@datetime()',
  erroCode: '234458',
  position: '定位',
  consult: '咨询专家',
  emergNum: '',
  obtainPic: '提取图片'
}, [1, 5]);
