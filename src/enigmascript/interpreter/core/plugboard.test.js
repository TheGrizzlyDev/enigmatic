const Plugboard = require('./plugboard')

test("Plugboard can map between 2 symbols bidirectionally", () => {
    const victim = new Plugboard([['a', 'b']])
    expect(victim.operator_feed('a')).toEqual('b')
    expect(victim.operator_feed('b')).toEqual('a')
})