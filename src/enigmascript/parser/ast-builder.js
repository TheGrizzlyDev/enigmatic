module.exports = function(tokens) {
    let i = 0;
    const next = () => tokens[++i]
    const lookahead = () => tokens[i + 1]
    const current = () => tokens[i]
    
    const reports = []
    const e = msg => {
        reports.push({
            line: current().line,
            column: current().column,
            error: msg.toString().trim()
        }) 
    }
    const parserState = {
        phase: 'setup'
    }
    const state = () => parserState

    function isTokenOrEOF(...types) {
        return ['EOF', ...types].includes(next().type)
    }
    
    function id() {
        const token = current()
        const op = lookahead()
        const handlers = {
            assignment() {
                return {
                    type: 'assign',
                    to: token.value,
                    value: assignment()
                }
            },
            feed() {
                return {
                    type: 'feed',
                    to: token.value,
                    value: feed()
                }
            },
            accessor() {
                if (next().type !== 'id') {
                    e`
                    An object accessor must always be followed by an identifier
                    `
                    return
                }
                return {
                    type: 'accessor',
                    to: token.value,
                    access: id()
                }
            },
            tuple_start() {
                const args = []
                while (! isTokenOrEOF('tuple_end')) {
                    if (current().type !== 'id') {
                        e`
                        Expected a valid identifier as the argument
                        `
                        return
                    }
                    args.push(id())
                }
                if (current().type !== 'tuple_end') {
                    e`
                    Expected a closing parentheses after an invocation
                    `
                    return
                }
                return {
                    type: 'invocation',
                    to: token.value,
                    args
                }
            }
        }

        const handler = handlers[op.type]
        if (! handler) {
            return {
                type: 'id',
                value: token.value
            }
        }
        next()
        return handler()
    }
    
    function rotor() {
        if (state().phase !== 'setup') {
            e`
            a rotor can only be created during the initial setup
            `
            return
        }
        // const value = current().value

        const wiring = []
        if (! next().type === 'tuple_start') 
            e(`
            Expected an open parentheses after declaring a rotor
            `)

        while(! isTokenOrEOF('tuple_end')) {
            const left = current()
            const connect = next()
            const right = next()

            if (left.type !== 'string')
                e(`
                Expected a string in the left side of a rotor connection
                `)
            
            if (connect.type !== 'connect')
                e(`
                Expected a connection operator (=>) between the 2 sides of a connection
                `)
        
            if (right.type !== 'string')
                e(`
                Expected a string in the right side of a rotor connection
                `)
            
            wiring.push([left.value, right.value])

            if (lookahead().type === 'comma') next()
        }

        if (next().type !== 'rotor_start') 
            e`
            Expected "starting at 'symbol'" after declaring a rotor's connection
            `

        const startToken = next()
        if (startToken.type !== 'string')
            e`
            Starting point of a rotor must be a valid symbol
            `
        const start = startToken.value

        const value = { wiring, start }

        const alphabet = state().alphabet
    
        if (! alphabet.includes(value.start))
            e(`
            Starting point of a rotor has to be one of the symbols defined in the alphabet [${alphabet}],
            instead got ${value.start}
            `)
    
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
                Right side of a rotor connection should contain one of the symbols defined in the alphabet [${alphabet}],
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
    
    function plugboard() {
        if (state().phase !== 'setup') {
            e`
            a plugboard can only be created during the initial setup
            `
            return
        }
        const value = []

        if (! next().type === 'tuple_start') 
            e(`
            Expected an open parentheses after declaring a plugboard
            `)

        while(! isTokenOrEOF('tuple_end')) {
            const left = current()
            const bind = next()
            const right = next()

            if (left.type !== 'string')
                e(`
                Expected a string in the left side of a plugboard connection
                `)
            
            if (bind.type !== 'bind')
                e(`
                Expected a binding operator (<=>) between the 2 sides of a connection
                `)
        
            if (right.type !== 'string')
                e(`
                Expected a string in the right side of a plugboard connection
                `)
            
            value.push([left.value, right.value])

            if (lookahead().type === 'comma') next()
        }

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
    
    function assignment() {
        const token = next()
        const opType = token.type
    
        if (opType == 'id') {
            return id()
        }
    
        const op = instructions[opType]
        if (! op) {
            e(`
            Operation ${opType} is not assignable
            `)
            return
        }
    
        return op()
    }
    
    function feed() {
        return assignment()
    }
    
    const supportedCodeBlockInstructions = { id }
    function block() {
        const instructions = []
        while (! isTokenOrEOF('scope_end')) {
            const tokenType = current().type
            const op = supportedCodeBlockInstructions[tokenType]
            if (! op) {
                e(`
                Did not expect token ${tokenType} during a run block
                `)
                continue
            }
            instructions.push(op()) 
        }
        return instructions
    }
    
    const setupInstructions = { rotor, plugboard } 
    function using() {
        const token = current()
        const alphabet = token.value
        if (alphabet.length % 2 !== 0) 
            e`
            The alphabet must have an even number of symbols to be able to properly connect.
            `

        state().alphabet = alphabet
        const instructions = []
        while(! isTokenOrEOF('run')) {
            const tokenType = current().type
            if (tokenType !== 'id') { 
                e(`
                Expected a valid identifier, instead got: ${tokenType}
                `)
            }

            const op = setupInstructions[current().value]   
            
            if (op) {
                instructions.push(op())
            } else {
                instructions.push(id())
            }

        }
        return {
            alphabet,
            instructions
        }
    }
    
    function run() {
        const nextTokenType = next().type
        if (nextTokenType !== 'scope_start') {
            e(`
            Expecting a code-block after run,
            instead found: ${nextTokenType}
    
            ie: 
            run {
    
            }
            `)
        }
        const instructions = block()
    
        if (current().type !== 'scope_end') {
            e(`
            Code block in a run block must be closed
            `)
        }
        if (next().type !== 'EOF') {
            e(`
            Code after the run block cannot be parsed nor executed 
            `)
        }
        return {
            instructions
        }
    }
    
    function program() {
        const ast = {
            type: 'program',
            setup: {},
            run:   {}
        }
        
        if(current().type == 'using') {
            ast.setup = using()
        } else {
            e`
            Alphabet is not defined for the current enigma machine. Please define one with:
    
            using 'a', 'b', 'c'
            `
        }
    
        if (current().type == 'run') {
            parserState.phase = 'run'
            ast.run = run()
        } else {
            e`
            Need to define a run block for the machine to do anything
    
            run {
                # your code
            }
            `
        }
    
        return ast
    }

    return [program(), reports]
}