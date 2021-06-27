const fs = require('fs')
const tokenizer = require('./lexer')

test('Can generate the correct token sequence', () => {
    const code = fs.readFileSync('src/enigmascript/testdata/simple.enigmascript', 'utf8')
    tokens = tokenizer(code)

    expect(tokens.shift()).toMatchObject({
        type: 'using',
        value: ['🔥', '✨', '💩', '👽️']
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'rotors'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'assignment'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'array_start'
    })

    expect(tokens.shift()).toMatchObject({
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
    })

    expect(tokens.shift()).toMatchObject({
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
    })

    expect(tokens.shift()).toMatchObject({
        type: 'array_end'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'plugboard'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'assignment'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'plugboard',
        value: [['🔥', '👽️'], ['✨', '💩']]
    })

    expect(tokens.shift()).toMatchObject({
        type: 'run'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'scope_start'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'key'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'assignment'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'in'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'for'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'rotor'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'feed'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'rotors'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'scope_start'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'key'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'assignment'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'rotor'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'feed'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'key'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'rotor'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'accessor',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'step'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'tuple_start'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'tuple_end'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'scope_end'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'res'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'assignment'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'plugboard'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'feed'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'key'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'out'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'feed'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'res'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'scope_end'
    })
})