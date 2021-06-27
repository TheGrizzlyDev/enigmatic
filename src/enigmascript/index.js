const parse = require('./parser')
const Interpreter = require('./interpreter')
const interpreter = require('./interpreter')

module.exports = function(code) {
    const intepreter = new Interpreter(parse(code))
    interpreter.init()
    return interpreter
}