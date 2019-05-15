const Mock = require('@/mock/mock.js')

Mock.success('getLocusList', {
  id: '@id()',
  total: 21.7,
  detail: [{
    time: '@datetime()',
    address: '广东省 深圳市 南山区',
  }, {
    time: '@datetime()',
    address: '广东省 深圳市 南山区 深南大道多源路口北路口北路口北路口北路口北路口北',
  }]
}, [1, 10]);

Mock.success(/\/getLocusDetail\\?id=.+/, {
  id: '@id()',
  total: 21.7,
  detail: [{
    time: '@datetime()',
    address: '广东省 深圳市 南山区',
  }, {
    time: '@datetime()',
    address: '广东省 深圳市 南山区 深南大道多源路口北路口北路口北路口北路口北路口北',
  }]
});