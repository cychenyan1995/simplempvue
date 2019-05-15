var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }

  var px2rpxLoader = {
    loader: 'px2rpx-loader',
    options: {
      baseDpr: 1,
      rpxUnit: 0.5
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader, px2rpxLoader, postcssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    wxss: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

/* 按需 copy 组件 */ 
// 解析组件路径
function parseComp (config, configPath) {
  if (!config || !config.usingComponents) return [];

  return Object.values(config.usingComponents).reduce((list, comp) => {
    comp = path.dirname(path.join(path.dirname(configPath), comp));

    // 获取组件依赖的组件
    let subCompConfigPath = path.join(comp, 'index.json');
    let subComps = parseComp(require(subCompConfigPath), subCompConfigPath);

    return list.concat(comp, ...subComps);
  },[]);
}
exports.getWxComponents = function(routerPath) {
  // 获取页面依赖的组件
  // let routerPath = '../src/router/index.js';
  var pagesComps = require(routerPath).reduce((list, page) => {
    return list.concat(...parseComp(page.config, routerPath))
  }, []);
  let wxComponents = Array.from(new Set(pagesComps)).map( compath => {
    return {
      from: path.resolve(__dirname, compath),
      to: path.join(config.build.assetsSubDirectory, path.relative(path.join(compath,'../../'), compath)),
      ignore: ['.*']
    };
  });

  return wxComponents;
}