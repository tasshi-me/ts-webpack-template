import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";

module.exports = (
  env: "production" | "development" | "none" | undefined,
  argv: { mode: "production" | "development" }
): Configuration => {
  const dist = path.resolve(__dirname, "build");
  const mode = argv.mode || "development";

  return {
    mode,

    entry: {
      main: "src/index.ts",
    },

    output: {
      path: dist,
      filename: "assets/chunks/[name].js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        src: path.resolve(__dirname, "src/"),
        images: path.resolve(__dirname, "images/"),
      },
    },
    devtool: mode === "development" ? "inline-source-map" : false,
    devServer: {
      contentBase: dist,
      port: 3000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        chunks: ["main"],
      }),
      new CopyPlugin([
        {
          from: "public",
          to: "./",
          ignore: [".DS_Store"],
        },
      ]),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: [
            "htmllint-loader",
            {
              loader: "html-loader",
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { url: false },
            },
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif|bmp|tiff)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "assets/[name].[ext]",
                limit: 1024,
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
  } as Configuration;
};
