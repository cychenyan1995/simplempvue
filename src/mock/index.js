// 动态加载 mock 模块

if (process.env.MOCK) {
  const context = require.context('@/mock/modules', true, /\.js$/);
  context.keys().forEach(module => context(module))
}
