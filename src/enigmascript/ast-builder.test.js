const tokenizer = require('./lexer')
const astBuilder = require('./ast-builder')

test('Can generate the correct token sequence', () => {
    tokens = tokenizer(`
    using 🔥, ✨, 💩, 👽️

    rotors = [
        rotor(🔥 => 💩, ✨ => 🔥, 💩 => 👽️, 👽️ => ✨) starting at 🔥
        rotor(🔥 => 🔥, ✨ => 👽️, 💩 => ✨, 👽️ => 💩) starting at ✨
    ]
    
    plugboard = plugboard(🔥 <=> 👽️, ✨ <=> 💩)
    
    run key <- input {
        for rotor <- rotors {
            key = rotor <- key
            rotor.step()
        }
    
        output <- plugboard <- key
    }`.trim())

    const [ast, errors] = astBuilder(tokens)

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
    })

})