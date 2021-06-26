const lexer = require('./lexer')

function isTokenOrEOF(next, type) {
    return ['EOF', type].includes(next().type)
}

function id(state, next, current, e, token) {
    const op = next()
    if (op.type == 'assignment') {
        return {
            type: 'assign',
            to: token.value,
            value: assignment(state, next, current, e)
        }
    }
}

function rotor(state, next, current, e) {
    if (state().phase !== 'setup') {
        e`
        a rotor can only be created during the initial setup
        `
        return
    }
    const value = current().value
    const alphabet = state().alphabet

    if (! alphabet.includes(value.start)) {
        e(`
        Starting point of a rotor has to be one of the symbols defined in the alphabet [${alphabet}],
        instead got ${value.start}
        `)
    }

    const leftCoverage = [], rightCoverage = []

    for (let [l, r] of value.wiring) {
        leftCoverage.push(l)
        if (! alphabet.includes(l)) {
            e(`
            Left side of a rotor connection should contain one of the symbols defined in the alphabet [${alphabet}],
            instead got ${l}
            `)
        }

        rightCoverage.push(r)
        if (! alphabet.includes(r)) {
            e(`
            Left side of a rotor connection should contain one of the symbols defined in the alphabet [${alphabet}],
            instead got ${l}
            `)
        }
    }

    for (let symbol of alphabet) {
        if (! leftCoverage.includes(symbol)) 
            e(`
            Rotor does not contain a left-side mapping for the symbol '${symbol}' defined in the alphabet [${alphabet}].
            `)

        
        if (! rightCoverage.includes(symbol)) 
            e(`
            Rotor does not contain a left-side mapping for the symbol '${symbol}' defined in the alphabet [${alphabet}].
            `)
    }

    return {
        type: 'rotor',
        value
    }
}

function plugboard(state, next, current, e) {
    if (state().phase !== 'setup') {
        e`
        a plugboard can only be created during the initial setup
        `
        return
    }
    const value = current().value
    const alphabet = state().alphabet

    const coveredSymbols = []
    for (let [l, r] of value) {
        if (l === r) 
            e(`
            A connection in the plugboard must be between 2 different symbols but instead got only '${l}'
            `)

        if (! alphabet.includes(l)) 
            e(`
            Left side of a connection contains a symbol not the defined in the alphabet [${alphabet}],
            instead got '${l}'
            `)

        
        if (! alphabet.includes(r)) 
            e(`
            Right side of a connection contains a symbol not the defined in the alphabet [${alphabet}],
            instead got '${r}'
            `)
        
        coveredSymbols.push(l, r)
    }

    for (let symbol of alphabet) {
        if (! coveredSymbols.includes(symbol)) 
            e(`
            Plugboard does not have a mapping for the symbol '${symbol}' defined in the alphabet [${alphabet}]
            `)
    }

    return {
        type: 'plugboard',
        value
    }
}

const instructions = { rotor, plugboard }

function assinableOp(state, next, current, e) {
    const opType = current().type
    const op = instructions[opType]
    if (! op) {
        console.log(current())
        e(`
        Operation ${opType} is not assignable
        `)
        return
    }

    return op(state, next, current, e)
}

function* array(state, next, current, e) {
    while(! isTokenOrEOF(next, 'array_end')) {
        yield assinableOp(state, next, current, e)
    }
}

function assignment(state, next, current, e) {
    const token = next()
    if (token.type == 'array_start') {
        return {
            type: 'array',
            value: [...array(state, next, current, e)]
        }
    }
    return assinableOp(state, next, current, e)
}

function using(state, next, current, e) {
    const token = current()
    const alphabet = token.value
    state().alphabet = alphabet
    const instructions = []
    while(! isTokenOrEOF(next, 'run')) {
        if (current().type !== 'id') {
            e`
            Expressions in the setup block must be assigned to an identifier to be valid
            `
            continue
        }

        instructions.push(id(state, next, current, e, current()))
    }
    return {
        alphabet,
        instructions
    }
}

function program(next, current, e) {
    const ast = {
        type: 'program',
        setup: {},
        run:   {}
    }
    const parserState = {
        phase: 'setup'
    }
    const state = () => parserState
    
    if(current().type == 'using') {
        ast.setup = using(state, next, current, e)
    } else {
        e`
        Alphabet is not defined for the current enigma machine. Please define one with:

        using 'a', 'b', 'c'
        `
    }

    // setup run block

    return ast
}

module.exports = function(tokens) {
    let i = 0;
    const next = () => tokens[++i]
    const current = () => tokens[i]
    
    const reports = []
    const report = msg => reports.push(`[${current().line}:${current().column}] ${msg.toString().trim()}`) 
    // const report = msg => console.log(msg.toString().trim())

    return [program(next, current, report), reports]
}