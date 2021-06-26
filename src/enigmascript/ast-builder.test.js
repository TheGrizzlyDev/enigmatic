const fs = require('fs')
const tokenizer = require('./lexer')
const astBuilder = require('./ast-builder')

function dump(ast, testCase) {
    if (! process.env.DUMP) return 
    fs.writeFileSync(testCase + ".dump.json", JSON.stringify(ast, null, 2))
}

test('Can generate the correct token sequence', () => {
    const code = fs.readFileSync('src/enigmascript/testdata/simple.enigmascript', 'utf8')
    tokens = tokenizer(code)

    const [ast, errors] = astBuilder(tokens)

    dump(ast, "simple")
    expect(errors).toHaveLength(0)
    expect(ast).toMatchObject({
        type: 'program',
        setup: {
            alphabet: ['🔥', '✨', '💩', '👽️'],
            instructions: [
                {
                    type: 'assign',
                    to: 'rotors',
                    value: {
                        type: 'array',
                        value: [
                            {
                                type: 'rotor',
                                value: {
                                    start: '🔥',
                                    wiring: [
                                        ['🔥', '💩'], 
                                        ['✨', '🔥'], 
                                        ['💩', '👽️'], 
                                        ['👽️', '✨']
                                    ]
                                }
                            },
                            {
                                type: 'rotor',
                                value: {
                                    start: '✨',
                                    wiring: [
                                        ['🔥', '🔥'], 
                                        ['✨', '👽️'], 
                                        ['💩', '✨'], 
                                        ['👽️', '💩']
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    type: 'assign',
                    to: 'plugboard',
                    value: {
                        type: 'plugboard',
                        value: [['🔥', '👽️'], ['✨', '💩']]
                    }
                }
            ]
        },
        run: {
            instructions: [
                {
                    type: 'assign',
                    to: 'key',
                    value: {
                        type: 'id',
                        value: 'in'
                    }
                },
                {
                    type: 'for',
                    item: 'rotor',
                    over: 'rotors',
                    instructions: [
                        {
                            type: 'assign',
                            to: 'key',
                            value: {
                                type: 'feed',
                                to: 'rotor',
                                value: {
                                    type: 'id',
                                    value: 'key'
                                }
                            }
                        },
                        {
                            type: "accessor",
                            to: "rotor",
                            access: {
                                to: "step",
                                type: "invocation"
                            }
                        }
                    ]
                },
                {
                    type: 'assign',
                    to: 'res',
                    value: {
                        to: 'plugboard',
                        type: 'feed',
                        value: {
                            type: 'id',
                            value: 'key'
                        }
                    }
                },
                {
                    type: 'feed',
                    to: 'out',
                    value: {
                        type: 'id',
                        value: 'res'
                    }
                }
            ]
        }
    })


})