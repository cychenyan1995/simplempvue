const Mock = require('@/mock/mock.js')

Mock.success('getTokenByRefreshId', {
  access_token: '@id()',
  refresh_token: '@id()',
  token_type: 'bearer',
  expires_in: 7194,
  scope: 'read write',
});

Mock.success('login', {
  jwt: {
    access_token: '@id()',
    refresh_token: '@id()',
    token_type: 'bearer',
    expires_in: 7194,
    scope: 'read write',
    jti: '@id()',
  },
  userId: 1,
  username: 'admin',
  nickname: null,
  avatarUrl: null,
  userLastLogged: '@datetime()'
});

Mock.error('loginFailed', {
  statusCode: 401,
  data: '授权失败',
  message: null,
});
