var webpack = require("webpack"),
  path = require("path"),
  fileSystem = require("fs"),
  env = require("./utils/env"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  WriteFilePlugin = require("write-file-webpack-plugin"),
  userscript = require("./utils/userscript");

// load the secrets
var alias = {};

var fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2"
];

var options = {
  entry: {
    rtpp: path.join(__dirname, "src", "js", "main.js"),
    injector: path.join(__dirname, "src", "js", "injector.js")
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].user.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "raw-loader"
      },
      {
        test: /\.html$/,
        use: "raw-loader"
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: alias
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(["build"]),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
    }),
    new CopyWebpackPlugin([
      {
        from: "src/manifest.json",
        transform: function(content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString())
            })
          );
        }
      }
    ]),
    new WriteFilePlugin(),
    new webpack.BannerPlugin({
      banner: userscript(process.env.npm_package_version),
      raw: true
    })
  ]
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;
