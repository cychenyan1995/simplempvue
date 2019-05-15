const Mock = require('@/mock/WxMock.js');

let res = {
  timestamp: '@now()',
  data: {},
}

function getSuccess(data, array) {
  let suc = {
    status: true,
    statusCode: 200,
    message: '请求成功！',
  };

  data = !array ? { data } : { [`data|${array[0] + (array[1]?('-'+array[1]):'')}`]: [data] };
  return Object.assign(suc, res, data);
}

function getError(data) {
  let err = Object.assign({
    status: true,
    statusCode: data.statusCode || 500,
    message: '请求失败！',
  }, data);
  return Object.assign(err, res);
}

module.exports = {
  success(url, data, array) {
    url = (url instanceof RegExp) ? url : ('/' + url);
    Mock.mock(url, getSuccess(data, array))
  },
  error(url, data) {
    url = (url instanceof RegExp) ? url : ('/' + url);
    Mock.mock(url, getError(data))
  }
}
