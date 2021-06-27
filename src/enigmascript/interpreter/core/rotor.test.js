const Rotor = require('./rotor')

test("Rotor can map between two symbols", () => {
    const victim = new Rotor('a', [['a', 'b'], ['b', 'a']])
    expect(victim.feed('a')).toEqual('b')
})