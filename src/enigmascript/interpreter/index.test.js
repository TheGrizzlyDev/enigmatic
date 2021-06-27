const fs = require('fs')
const parser = require('../parser')
const Interpreter = require('./index')

test('Can setup an enigma-machine without any state', () => {
    const code = fs.readFileSync('src/enigmascript/testdata/simple.enigmascript', 'utf8')
    const ast = parser(code)
    const interpreter = new Interpreter(ast)
    interpreter.init()
    const [ state, _ ] = interpreter.run('🔥')

    expect(state).toMatchObject({
        alphabet: ['🔥', '✨', '💩', '👽️'],
        rotors: [
            {
                id: 'r_0',
                position: '🔥',
                wiring: [
                    ['🔥', '💩'], 
                    ['✨', '🔥'], 
                    ['💩', '👽️'], 
                    ['👽️', '✨']
                ]
            },
            {
                id: 'r_1',
                position: '✨',
                wiring: [
                    ['🔥', '🔥'], 
                    ['✨', '👽️'], 
                    ['💩', '✨'], 
                    ['👽️', '💩']
                ]
            }
        ],
        plugboards: [
            {
                id: 'p_0',
                value: [['🔥', '👽️'], ['✨', '💩']]
            }
        ]
    })
})