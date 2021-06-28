const parse = require('./parser')
const Interpreter = require('./interpreter')

module.exports = async function(code) {
    console.log(code)
    const ast = parse(code)
    console.log(ast)
    const int = new Interpreter(ast)
    int.init()
    return int
}