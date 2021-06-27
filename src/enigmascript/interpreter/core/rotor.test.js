const Rotor = require('./rotor')

test("Rotor can map between two symbols", () => {
    const victim = new Rotor('a', [['a', 'b'], ['b', 'a']])
    expect(victim.operator_feed('a')).toEqual('b')
})