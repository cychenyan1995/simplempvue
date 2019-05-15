const Mock = require('@/mock/mock.js')

Mock.success('getMyInfo', {
  phone: '@integer(11)',
  deviceNo: '@integer(8)',
  validay: '@date()',
  carType: '宝马 3系 2018款 320i M 运动曜夜版',
  carNo: '粤 B0X888',
  standNo: '@string(18)',
  engineeNo: '@string(6)',
  name: '@cname()',
  photo: "/static/images/logo.png"
});


/*Mock.error('getMyInfo', {
  statusCode: 401
});*/
