const parse = require('./parser')
const Interpreter = require('./interpreter')

module.exports = function(code) {
    const ast = parse(code)
    const int = new Interpreter(ast)
    int.init()
    return int
}