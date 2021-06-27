const Instruction = require('./instruction.js')
const Rotors = require('./core/rotors')

class Interpreter {
    constructor(ast) {
        this.ast = ast
        this.state = {}
        this.global = {}
    }

    init() {
        const emittedRotors = []
        const emittedPlugboards = []
        const emit = (action, ...args) => {
            switch(action) {
                case 'rotor':
                    const rotor = args[0]
                    if (rotor == null) throw new Error(`Cannot emit rotors if a rotor is null`)
                    emittedRotors.push(rotor)
                    break
                case 'plugboard':
                    const plugboard = args[0]
                    if (plugboard == null) throw new Error(`Cannot emit plugboard if a plugboard is null`)
                    emittedPlugboards.push(plugboard)
                    break
                default:
                    throw new Error(`action ${action} cannot be emitted`)
            }
        }

        this.alphabet = this.ast.setup.alphabet 

        for(let instruction of this.ast.setup.instructions) {
            new Instruction(instruction, this.global, emit).execute()
        }

        const plugboard = (emittedPlugboards && emittedPlugboards.length === 1) && emittedPlugboards[0]
        if (! plugboard) throw new Error("Exactly a single plugboard must be declared for an enigma machine") 

        this.global.plugboard = plugboard
        this.global.rotors = new Rotors(this.alphabet, ...emittedRotors)
    }

    run(input) {
        this.global.in = input
        const emit = (action, ...args) => {
            throw new Error(`action ${action} cannot be emitted`)
        }
        for(let instruction of this.ast.run.instructions) {
            new Instruction(instruction, this.global, emit).execute()
        }
        return [this.computeCurrentState(), {
            out: this.global.out
        }]
    }

    computeCurrentState() {
        return {
            alphabet: this.alphabet,
            plugboard: {
                value: this.global.plugboard.value
            },
            rotors: this.global.rotors.rotorsWithState()
                .map(({position, wiring}) => ({ position, wiring }))
        }
    }
}

module.exports = Interpreter