const Rotors = require('./rotors')
const Rotor = require('./rotor')

test("Stepping correctly sets the current position", () => {
    const alphabet = ['A', 'B']
    const assertRotorsPositions = (...positions) => {
        const state = victim.rotorsWithState()
        positions.forEach((position, i) => {
            expect(state[i].position).toEqual(position)
        })
    }
    const victim = new Rotors(
        alphabet,
        new Rotor('A'),
        new Rotor('A')
    )

    assertRotorsPositions('A', 'A')
    
    victim.step()
    assertRotorsPositions('B', 'A')

    victim.step()
    assertRotorsPositions('A', 'B')

    victim.step()
    assertRotorsPositions('B', 'B')
    
})
test("Stepping correctly sets the current position", () => {
    const alphabet = ['A', 'B']
    const wiring = [['A','B'],['B','A']]
    const victim = new Rotors(
        alphabet,
        new Rotor('A',wiring),
        new Rotor('A',wiring)
    )

    expect(victim.operator_feed('A')).toEqual('A')
    
    victim.step()
    expect(victim.operator_feed('A')).toEqual('B')


    victim.step()
    expect(victim.operator_feed('A')).toEqual('A')


    victim.step()
    expect(victim.operator_feed('A')).toEqual('B')

    
})