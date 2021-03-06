const Tokenizr = require("tokenizr")

let lexer = new Tokenizr()

lexer.rule(/using ((?:.\,?)+)/, (ctx, match) => {
    ctx.accept("using", match[1].split(',').map(symbol => symbol.trim()))
})

lexer.rule(/starting at/, (ctx) => { //TODO eventually replacewith well known ids or a symbol like bind or connect
    ctx.accept("rotor_start")
})

lexer.rule(/run/, (ctx, match) => {
    ctx.accept("run")
})

lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (ctx, match) => {
    ctx.accept("id")
})

lexer.rule(/,/, (ctx) => {
    ctx.accept("comma")
})

lexer.rule(/=>/, (ctx, match) => {
    ctx.accept("connect")
})

lexer.rule(/<=>/, (ctx, match) => {
    ctx.accept("bind")
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

lexer.rule(/("|')(.)\1/u, (ctx, match) => {
    ctx.accept("string", match[2])
})


module.exports = function(code) {
    lexer.input(code)
    return lexer.tokens()
}