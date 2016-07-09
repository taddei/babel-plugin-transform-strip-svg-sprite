var path = require('path')

module.exports = function (conf) {

  var types = conf.types;

  function replaceSVG (filename) {
    return types.expressionStatement(types.stringLiteral('#' + filename.replace('.svg', '')))
  }

  return {
    visitor: {
      CallExpression: {
        enter: function enter (nodePath) {

          var callee = nodePath.get('callee')
          var arg = nodePath.get('arguments')[0]

          if (callee.isIdentifier() && callee.equals('name', 'require') && arg && arg.isStringLiteral() && path.extname(arg.node.value) === '.svg') {
            nodePath.replaceWith(replaceSVG(path.basename(arg.node.value)))
          }
        }
      }
    }
  }
}
