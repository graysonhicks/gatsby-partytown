const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              "node_modules",
              "@builder.io",
              "partytown",
              "lib"
            ),
            to: path.join(__dirname, "static", "~partytown"),
          },
        ],
      }),
    ],
  })
}
