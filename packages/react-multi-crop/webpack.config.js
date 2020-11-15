module.exports = (env, argv) => {
  return {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
      extensions: [".js", ".jsx"],
    },
    optimization: {
      nodeEnv: argv.mode,
    },
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        // import file .css
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};