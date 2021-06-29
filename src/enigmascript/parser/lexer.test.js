const fs = require('fs')
const tokenizer = require('./lexer')

test('Can generate the correct token sequence', () => {
    const code = fs.readFileSync('src/examples/emoji.enigmascript', 'utf8')
    const tokens = tokenizer(code)

    expect(tokens.shift()).toMatchObject({
        type: 'using',
        value: ['🔥', '✨', '💩', '🐼']
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'rotor'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'tuple_start',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🔥'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'connect',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '💩'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'comma',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '✨'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'connect',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🔥'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'comma',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '💩'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'connect',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🐼'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'comma',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🐼'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'connect',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '✨'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'tuple_end',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'rotor_start',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🔥'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'rotor'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'tuple_start',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🔥'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'connect',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🔥'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'comma',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '✨'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'connect',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🐼'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'comma',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '💩'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'connect',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '✨'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'comma',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🐼'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'connect',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '💩'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'tuple_end',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'rotor_start',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '💩'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'plugboard'
    })
    
    expect(tokens.shift()).toMatchObject({
        type: 'tuple_start',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🔥'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'bind',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '🐼'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'comma',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '✨'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'bind',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'string',
        value: '💩'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'tuple_end',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'run'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'scope_start'
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
        type: 'feed',
    })
    
    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'rotors'
    })
    
    expect(tokens.shift()).toMatchObject({
        type: 'feed',
    })
    
    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'in'
    })
    
    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'rotors'
    })
    
    expect(tokens.shift()).toMatchObject({
        type: 'accessor',
    })
    
    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'step'
    })
    
    expect(tokens.shift()).toMatchObject({
        type: 'tuple_start',
    })
    
    expect(tokens.shift()).toMatchObject({
        type: 'tuple_end',
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'out'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'assignment'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'res'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'scope_end'
    })
})