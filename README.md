小程序 mpvue
===

## 项目

#### 目录

```
|____build              webpack打包的环境代码
|____config             webpack打包的配置文件
|____node_modules       项目运行依赖的npm包
|____src                项目代码文件夹
 |__components          自定义组件
 |__pages               页面组件
 |__plugins             vue插件
  |__ibox
   |__index.js          vue插件的注册，包含接口请求及工具utils
   |__utils.js          工具类及共用方法注册js
 |__router              小程序的page.json的配置
  |__flyio          
   |__apiUrl            接口请求地址管理
   |__config            接口请求配置管理
   |__interceptors.js   接口请求拦截器
   |__request           接口请求封装（包括loading及toast，接口的定制化配置及默认配置)
  |__modules            store的管理文件
  |__index.js           实现store对modules文件下的自动注册
 |__store               vuex状态管理
 |__App.vue             小程序的App页面
 |__main.js             小程序app.json配置
|____static             静态资源文件夹
 |__less                全局样式文件
 |__iview               iview-weapp 的组件代码
 |__iview-mpvue         mpvue 封装 iview-weapp 的组件代码
 |__images              全局图片
|____.babelrc           es6语法转换配置文件
|____.editorconfig      编辑器配置
|____.eslintignore      eslint的忽略配置
|____.eslintrc.js       eslint配置
|____.gitignore         git push忽略配置
|____.postcssrc.js      postcss插件的配置文件
|____index.html         SPA的index页面
|____package.json       npm包配置文件
|____README.md          readme文档
```


#### 傻hh教程

###### UI 框架 iview-weapp

[iview-weapp 文档](https://weapp.iviewui.com/docs/guide/start) [mpvue-iview 文档](https://github.com/JJJYY/mpvue-iview)

![微信扫描体验](https://file.iviewui.com/weapp/dist/e5da9fdc97a0b3fb16c115d379820583.jpg)  

下载 iview-weapp 源码

```bash
cd workspace
# 源码
# git clone https://github.com/TalkingData/iview-weapp.git

# mpvue 版本示例
git clone https://github.com/JJJYY/mpvue-iview.git
cd mpvue-iview
npm install
npm run dev
```

用微信开发工具打开 `iview-weapp/examples` 目录 就可以在看到效果了

在每个 `examples/pages/**/` 可以看到 4 个文件

- .json 后缀的 JSON 配置文件, 本页面的配置，包括依赖组件，页面标题等
- .wxml 后缀的 WXML 模板文件, 相当于 html 
- .wxss 后缀的 WXSS 样式文件, 相当于 css
- .js 后缀的 JS 脚本逻辑文件, 相当于 js

###### simplempvue 框架

下载 simplempvue 代码

```bash
cd workspace
git clone git@gitee.com:wolfnorth7/simplempvue.git
cd simplempvue
npm install
npm run dev
```

用微信开发工具打开 `simplempvue` 目录 就可以在看到效果了

新建一个页面的步骤：

- 在 `src/pages/` 新建一个文件夹（如 `example`），这个文件夹下包含一个文件 `index.vue`
- 在 `src/router/index.js` 中的数组 添加以下代码

```js
  module.exports = [
  // ...
  {
    path: '/pages/example/index',
    config: {
      // page title
      navigationBarTitleText: '粟子',
      // 依赖的 iview-weapp 组件
      usingComponents: {
        "i-input": "../../static/iview/input/index",
      }
    }
  }
  // ...
]
```

- 保存后就可以在微信开发工具中预览这个页面了。 (*数组中第一个路由默认首页，为了预览方便可以把当前开发中的路由放在第一个，但提交时要放加原位。*)

在  `index.vue` 中引用 iview-weapp 组件

- 在 `iview-weapp` 的预览中找到使用的组件对应的目录，如 `examples/pages/input/`
- 在 `index.wxml` 中复制选中组件对应的代码到 `index.vue`, 并修改一丢丢：
  + 表单 value 值：`value="{{value}}"` => `:model="value"`
  + 事件：`bind:click="{{handleclick}}"` => `@click="handleclick"`
  + 普通变量值绑定： `type="{{vType}}"` => `:type="vType"`
- `index.wxml` 中绑定的 *变量/方法* 存放在 `index.js` 中，找到对应变量并复制到 `index.vue` 中的 data/methods 中
- 依赖组件配置在 `index.json` 中，复制对应依赖的组件到 `src/router/index.js` 对应路由的 usingComponents 中，并修改路径
  +  `../../dist/input/index` => `../../static/iview/input/index`
- 这时候保存就可以预览到了

修改组件样式

写在前面：小程序组件的样式是全封闭的，它内部定义的样式影响不到组件外部元素，组件外部定义的样式也影响不到组件内部元素

解决方案：通过约定好的接口传递 className 到组件内部，这样才可以达到修改组件样式的目的

对于 iview-weapp 这个约定好的接口就是属性 `i-class`，如修改 `i-button` 组件

```html
<template>
  <i-button type="primary" i-class="hh-btn-primary">button</i-button>
</template>
<!-- scoped 表示在这个 vue 文件内定义的样式只对这个 vue 起作用，不用影响到其他 vue 页面-->
<style scoped>
  .hh-btn-primary {
    background-color: #fff;
    color: deepgreen;
  }
</style>
```

*小程序会把屏幕计算为 750rpx，即 1rpx=屏幕的宽度/750。当小程序运行在 iphone 6上时，750rpx=375px。在本项目中，框架会自动以 1px=2rpx 的比率转化 px 单位的 css 值到 rpx 单位。*

导航相关：[js 代码导航](https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html) & [标签导航](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)

协作流程：

- 每天开始前先拉取代码，在最新版本上开发：`git pull`
- 每天结束时要上传代码，不要堆积本地代码：`git push`
- push 之前要先 pull 服务器代码：防止冲突
- pull 之前要先 commit 本地代码：防止冲突
- pull 之后查看日志 `git log`, 如果更新下来的版本有 install 字样，则需要运行 `npm install` 重新安装包
- 每次 commit 代码要写有意义的备注

---

## 与 vue 的区别

#### 不支持复杂的运算

因为小程序的架构分为 app-service 和 page-frame，分别运行于不同的线程。
在动态绑定（`{{}}`）中不支持复杂的运算，可以通过 computed 来实现运算

支持的有 `+ - * % ?: ! == === > < [] .`， 不支持这样 `message.split('').reverse().join('')`

#### 不支持过滤器

[变通方法](https://www.jianshu.com/p/7a9029e99ed7)

## 引用组件

#### 引用原生组件

通过router

```js
module.exports = [
  {
    path: '/pages/index/index',
    config: {
      navigationBarTitleText: '首页',
      usingComponents: {
        'i-card': '../../static/iview/card/index',
        'i-steps': '../../static/iview/steps/index',
        'i-step': '../../static/iview/step/index',
        'i-button': '../../static/iview/button/index',
      }
    }
  },
]
```

#### 引用 vue 的组件

```js
import card from '@/components/card'
export default {
  components: {
    card
  },
}
```