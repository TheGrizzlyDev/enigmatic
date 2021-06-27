const lexer = require('./lexer')
const astBuilder = require('./ast-builder')

class ParserError extends Error {
    constructor(errors) {
        super()
        this.errors = errors
    }

    get top() {
        return this.errors[0]
    }
}

module.exports = function(code) {
    const tokens = lexer(code)
    const [ast, errors] = astBuilder(tokens)

    if (errors && errors.length > 0) throw new ParserError(errors)

    return ast
}