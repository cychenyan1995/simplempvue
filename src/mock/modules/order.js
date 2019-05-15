const Mock = require('@/mock/mock.js')

Mock.success('getOrderInfoList?status=0', {
  orderTime: '@date()',
  orderNo: '@integer(15)',
  deviceNo: '@integer(10)',
  productName: '12个月数据流量包',
  productNum: '@integer(1)',
  productPrice: '60元',
  orderStatus: '待付款',
  isPaid: 0
}, [1, 3]);

Mock.success('getOrderInfoList?status=1', {
  orderTime: '@date()',
  orderNo: '@integer(15)',
  deviceNo: '@integer(10)',
  productName: '12个月数据流量包',
  productNum: '@integer(1)',
  productPrice: '60元',
  orderStatus: '充值成功',
  isPaid: 1
}, [1, 3]);

Mock.success('getOrderDetail?id=11', {
  orderTime: '@date()',
  orderNo: '@integer(15)',
  deviceNo: '@integer(10)',
  productName: '12个月数据流量包',
  productNum: '@integer(1)',
  productPrice: '60元',
  orderStatus: '充值成功',
  isPaid: 1
});
