const Tokenizr = require("tokenizr")

let lexer = new Tokenizr()

lexer.rule(/using ((?:.\,?)+)/, (ctx, match) => {
    ctx.accept("using", match[1].split(',').map(symbol => symbol.trim()))
})

lexer.rule(/rotor\((.+,?)*\) starting at (.+)/, (ctx, match) => {
    ctx.accept("rotor", {
        start: match[2],
        wiring: match[1].split(',')
            .map(connectionStatement => 
                connectionStatement.split('=>').map(symbol => symbol.trim()))
    })
})

lexer.rule(/plugboard\((.+,?)*\)/, (ctx, match) => {
    ctx.accept("plugboard", match[1].split(',')
        .map(connectionStatement => 
            connectionStatement.split('<=>').map(symbol => symbol.trim())))
})

lexer.rule(/run/, (ctx, match) => {
    ctx.accept("run")
})

lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (ctx, match) => {
    ctx.accept("id")
})

lexer.rule(/=/, (ctx, match) => {
    ctx.accept("assignment")
})

lexer.rule(/\{/, (ctx, match) => {
    ctx.accept("scope_start")
})

lexer.rule(/\}/, (ctx, match) => {
    ctx.accept("scope_end")
})

lexer.rule(/\(/, (ctx, match) => {
    ctx.accept("tuple_start")
})

lexer.rule(/\)/, (ctx, match) => {
    ctx.accept("tuple_end")
})

lexer.rule(/<-/, (ctx, match) => {
    ctx.accept("feed")
})

lexer.rule(/\./, (ctx, match) => {
    ctx.accept("accessor")
})

lexer.rule(/#[^\r\n]*\r?\n/, (ctx, match) => {
    ctx.ignore()
})

lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
    ctx.ignore()
}) 

lexer.rule(/./, (ctx, match) => {
    ctx.accept("char", match)
})


module.exports = function(code) {
    lexer.input(code)
    return lexer.tokens()
}