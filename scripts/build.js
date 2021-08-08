const webpack = require('webpack')
const configuration = require('../webpack.config')

const compiler = webpack(configuration, (compilation) => {
  console.log('compiler over')
  // compilation.run(function(err, stats) {
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log('compiler over')
  // })
})
