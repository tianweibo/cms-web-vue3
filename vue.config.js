/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin=require('terser-webpack-plugin');
const config = require("./src/services/config");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isAnalyzeMode=process.env.ANALYZE_MODE=='analyze';
const isProduction = process.env.NODE_ENV === 'production'
const flag = process.argv.find(item => {
  return item === "build";
});
let me = process.argv.find(item => item.indexOf('--dirname') > -1);
let dirname = '';
me && (dirname = me.split('=')[1]);
let outputDir = 'dist/' + dirname;

module.exports = {
  publicPath: "/",
  // 输出静态文件目录
  outputDir: outputDir,
  // assetsDir: 'dist',
  indexPath: "index.html",
  // 配置命令行输出异常 Type: boolean | 'warning' | 'default' | 'error'
  lintOnSave: process.env.NODE_ENV === "production" ? false : "default",
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  chainWebpack: config => {
    config.resolve.alias
    .set("@", path.resolve("src"))
    /* .set(
      '@ant-design/icons-vue/lib/icons',path.join(__dirname,'./src/configAntdIcon.ts')
    ); */ 
    config.plugin("run-cache").use(HardSourceWebpackPlugin);
    //   config.plugin('webpack-bundle-analyzer')
    // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  pluginOptions: {
    // 配置less 全局变量
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/variables.less")]
    }
  },
  configureWebpack: config => {
    config.resolve.extensions = [".ts", ".js", ".jsx", ".json", ".vue"];
    config.plugins.forEach(val => {
      if (val instanceof HtmlWebpackPlugin) {
        val.options.title = "营销活动";
      }
    });
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    )
    //config.resolve.alias.set("@", path.resolve("src"));
    
    
    if(isAnalyzeMode){
      config.plugins.push(
        new TerserJSPlugin({
          test: /\.js(\?.*)?$/i,    //匹配参与压缩的文件
            parallel: true,    //使用多进程并发运行
            terserOptions: {    //Terser 压缩配置
              output: { comments: false },
              compress: { drop_console: true }   // 去除console
            },
            //extractComments: true,    //将注释剥离到单独的文件中
        })
      )
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode:'static'
        })
      )
    }
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm:'gzip',
          test: /\.js$|\.html$|\.json$|\.css/,
          threshold: 10240,
        })
      )
    } 
    config.optimization.splitChunks = {
      maxInitialRequests: Infinity,
      minSize: 300 * 1024,
      chunks: 'all',
      cacheGroups: {
        antVendor: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            // get the name. 
            // node_modules/packageName/sub/path
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `npm.${packageName.replace('@', '')}`
          }
        },
      }
    }

  },
  css: {
    // antd less加载问题
      // antd less加载问题
      loaderOptions: {
        less: {
          modifyVars: {
            "primary-color": "#4a5aec",
            "link-color": "#4a5aec",
            "success-color": "#52c41a",
            "warning-color": "#faad14",
            "error-color": "#ff4d4f",
            "text-color": "#333333",
            "font-size-base": "14px",
            "heading-color": "#333333",
            "text-color-secondary": "#666666",
            "disabled-color": "#d9d9d9",
            "border-color-base": "#eeeeee",
            "btn-border-radius-base": "4px"
          },
          javascriptEnabled: true
        }
      }
  },
  devServer: {
    // 配置浏览器输出异常
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        target: "https://b.tb-test-k8s.enbrands.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
};
