const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { AureliaPlugin } = require("aurelia-webpack-plugin");

// config helpers:
const ensureArray = config =>
  (config && (Array.isArray(config) ? config : [config])) || [];
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig);

// primary config:
const title = "Aurelia Navigation Skeleton";
const outDir = path.resolve(__dirname, "dist");
const srcDir = path.resolve(__dirname, "src");
const nodeModulesDir = path.resolve(__dirname, "node_modules");
const baseUrl = "/";

const cssRules = [
  { loader: "css-loader" },
  {
    loader: "postcss-loader",
    options: {
      plugins: () => [
        require("autoprefixer")({ browsers: ["last 2 versions"] })
      ]
    }
  }
];

module.exports = () => {
  const production = process.env.NODE_ENV === "production";
  return {
    mode: production ? "production" : "development",
    resolve: {
      extensions: [".ts", ".js"],
      modules: [srcDir, "node_modules"]
    },
    entry: "./src/main",
    output: {
      path: outDir,
      publicPath: baseUrl,
      filename: production
        ? "[name].[chunkhash].bundle.js"
        : "[name].[hash].bundle.js",
      sourceMapFilename: production
        ? "[name].[chunkhash].bundle.map"
        : "[name].[hash].bundle.map",
      chunkFilename: production
        ? "[name].[chunkhash].chunk.js"
        : "[name].[hash].chunk.js"
    },
    devServer: {
      contentBase: outDir,
      // serve index.html for all 404 (required for push-state)
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          issuer: [{ not: [{ test: /\.html$/i }] }],
          use: ["style-loader", ...cssRules]
        },
        {
          test: /\.css$/i,
          issuer: [{ test: /\.html$/i }],
          // CSS required in templates cannot be extracted safely
          // because Aurelia would try to require it again in runtime
          use: cssRules
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            exportAsEs6Default: true
          }
        },
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: nodeModulesDir
        },
        // embed small images and fonts as Data Urls and larger ones as files:
        {
          test: /\.(png|gif|jpg|cur)$/i,
          loader: "url-loader",
          options: { limit: 8192 }
        },
        {
          test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: "url-loader",
          options: { limit: 10000, mimetype: "application/font-woff2" }
        },
        {
          test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: "url-loader",
          options: { limit: 10000, mimetype: "application/font-woff" }
        },
        // load these fonts normally, as files:
        {
          test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: "file-loader"
        }
      ]
    },
    plugins: [
      new AureliaPlugin(),
      new HtmlWebpackPlugin({
        template: "src/index.ejs",
        minify: production
          ? {
              removeComments: true,
              collapseWhitespace: true
            }
          : undefined,
        metadata: {
          // available in src/index.ejs
          title,
          baseUrl
        }
      })
    ]
  };
};
