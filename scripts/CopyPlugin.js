const fs = require('fs')
const path = require('path')

function CopyPlugin(options) {
  this.options = options
}

CopyPlugin.prototype.apply = function(compiler) {
  compiler.hooks.afterCompile.tap('CopyPlugin', (compilation) => {
    const outputPath = compiler.options.output.path
    const filePath = path.resolve(outputPath, this.options.path)
    try{
      fs.statSync(filePath)
    } catch (e) {
      fs.copyFileSync(this.options.path, filePath)
    }
  })
}

module.exports = CopyPlugin