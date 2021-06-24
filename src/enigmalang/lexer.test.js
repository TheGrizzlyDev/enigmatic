const tokenizer = require('./lexer')

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
        type: 'id',
        value: 'key'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'feed'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'id',
        value: 'input'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'scope_start'
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
        value: 'output'
    })

    expect(tokens.shift()).toMatchObject({
        type: 'feed'
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
        type: 'scope_end'
    })
})