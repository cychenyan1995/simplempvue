const Mock = require('@/mock/mock.js')

Mock.success('getBannerList', {
  id: '@id()',
  'url|+1': [
    'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
  ],
}, [1, 3]);

Mock.success('getToken', {
  code: '@id()',
});

// Mock.error('getBannerList', {code: 403 });