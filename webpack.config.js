const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const DefinePlugin = require("webpack/lib/DefinePlugin")

module.exports = {
  mode: "none",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "calculator-app.bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html", // HTML 模版文件所在的文件路径,使用了之后一些配置项就无效了，比如 title
      // filename: "index.html", // 输出的 HTML 的文件名称
      title: "learn_webpack", // 设置网页标题
      saySomething: "hello to!",
      // favicon: "./favicon.ico", // 指定网站图标路径，除了会在 html 上填充 favicon 相关内容，还会将该文件拷贝到打包文件夹下，非常好用。
      inject: "body",
      // 在head里添加meta便于seo
      meta: {
        description: "description----",
        keyword: "keyword----",
      },
      // minify: isProd,
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  devServer: {
    static: {
      // directory同以前的contentBase
      directory: path.join(__dirname, "/dist"), // 这里的路径是入口html的上层路径，只在开发阶段使用，和开发阶段的output里的path一样
      watch: true, // 默认true，猜测和以前的inline配置实时刷新是一样的
    },
    client: {
      progress: true,
      overlay: { warnings: false },
    },
  },
}
