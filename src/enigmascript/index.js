const parse = require('./parser')
const Interpreter = require('./interpreter')

module.exports = function(code) {
    const int = new Interpreter(parse(code))
    int.init()
    return int
}