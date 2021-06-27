const Instruction = require("./instruction")
const Rotor = require('./core/rotor')
const Plugboard = require('./core/plugboard')

class TestInstruction extends Instruction {
    testScope = {}
    testEmissions = []

    constructor(astNode, setupScope = {}) {
        super(
            astNode, 
            setupScope, 
            (...args) => {
                this.testEmissions.push(args)
            })

        this.testScope = setupScope
    }

    get emissions() {
        return this.testEmissions
    }

    get scope() {
        return this.testScope
    }
}

test("Assign a simple value", () => {
    const varName = 'test'
    const expectedValue = 42
    const victim = new TestInstruction({
        type: 'assign',
        to: varName,
        value: {
            type: 'id',
            value: 'expectedValue'
        }
    }, {
        expectedValue
    })

    victim.execute()

    expect(victim.scope[varName]).toEqual(expectedValue)
})

test("Assign a scoped value", () => {
    const varName = 'test'
    const expectedValue = 42
    const victim = new TestInstruction({
        type: 'assign',
        to: varName,
        value: {
            type: 'accessor',
            to: 'nest',
            access: {
                type: 'id',
                value: 'expectedValue'
            }
        }
    }, {
        nest: { expectedValue }
    })

    victim.execute()

    expect(victim.scope[varName]).toEqual(expectedValue)
})

test("Consecutive assignments", () => {
    const firstVarName = 'test_0'
    const secondVarName = 'test_1'
    const expectedValue = 42
    const victim = new TestInstruction({
        type: 'assign',
        to: firstVarName,
        value: {
            type: 'assign',
            to: secondVarName,
            value: {
                type: 'id',
                value: 'expectedValue'
            }
        }
    }, {
        expectedValue
    })

    victim.execute()

    expect(victim.scope[firstVarName]).toEqual(expectedValue)
    expect(victim.scope[secondVarName]).toEqual(expectedValue)
})

test("Creating a rotor emits a rotor action with a rotor instance", () => {
    const expectedStart = 'A'
    const expectedWiring = [['a', 'b'], ['b', 'a']]
    const victim = new TestInstruction({
        type: 'rotor',
        value: {
            start: expectedStart,
            wiring: expectedWiring
        }
    })

    victim.execute()

    expect(victim.emissions).toHaveLength(1)

    const [ [ action, instance ] ] = victim.emissions

    expect(action).toEqual('rotor')

    expect(instance).toMatchObject({
        start: expectedStart,
        wiring: expectedWiring
    })

    expect(instance).toBeInstanceOf(Rotor)
})

test("Creating a plugboard emits a plugboard action with a plugboard instance", () => {
    const expectedValue = [['a', 'b']]
    const victim = new TestInstruction({
        type: 'plugboard',
        value: expectedValue
    })

    victim.execute()

    expect(victim.emissions).toHaveLength(1)

    const [ [ action, instance ] ] = victim.emissions

    expect(action).toEqual('plugboard')

    expect(instance).toMatchObject({
        value: expectedValue
    })

    expect(instance).toBeInstanceOf(Plugboard)
})