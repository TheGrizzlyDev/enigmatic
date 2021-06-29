const fs = require('fs')
const parser = require('../parser')
const Interpreter = require('./index')

test('Can setup and run an enigma-machine', () => {
    const code = fs.readFileSync('src/enigmascript/testdata/simple.enigmascript', 'utf8')
    const ast = parser(code)
    const interpreter = new Interpreter(ast)
    interpreter.init()
    const [ state, result ] = interpreter.run('🔥')

    expect(state).toMatchObject({
        alphabet: ['🔥', '✨', '💩', '🐼'],
        rotors: [
            {
                position: '✨', // after running once the interpreter steps the rotors and the first one moves from 🔥 to ✨
                wiring: [
                    ['🔥', '💩'], 
                    ['✨', '🔥'], 
                    ['💩', '🐼'], 
                    ['🐼', '✨']
                ]
            },
            {
                position: '💩',
                wiring: [
                    ['🔥', '🔥'], 
                    ['✨', '🐼'], 
                    ['💩', '✨'], 
                    ['🐼', '💩']
                ]
            }
        ],
        plugboard: {
            value: [['🔥', '🐼'], ['✨', '💩']]
        }
    })

    expect(result).toMatchObject({
        out: '💩'
    })
})