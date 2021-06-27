const Instruction = require('./instruction.js')

class Interpreter {
    constructor(ast) {
        this.ast = ast
        this.state = {}
        this.global = {}
        this.rotors = {}
        this.plugboards = {}
    }

    init() {
        let rotorId = 0, plugboardId = 0;
        const emit = (action, ...args) => {
            switch(action) {
                case 'rotor':
                    const rotor = args[0]
                    if (rotor == null) throw new Error(`Cannot emit rotors if a rotor is null`)
                    this.rotors[`r_${rotorId++}`] = rotor
                    break
                case 'plugboard':
                    const plugboard = args[0]
                    if (plugboard == null) throw new Error(`Cannot emit plugboard if a plugboard is null`)
                    this.plugboards[`p_${plugboardId++}`] = plugboard
                    break
                default:
                    throw new Error(`action ${action} cannot be emitted`)
            }
        }

        const alphabet = this.ast.setup.alphabet 

        for(let instruction of this.ast.setup.instructions) {
            new Instruction(instruction, this.global, this.get, this.set, emit).execute()
        }

        const rotors = Object.entries(this.rotors).map(([id, {start, wiring}]) => ({
            id,
            wiring,
            position: start,
        }))

        const plugboards = Object.entries(this.plugboards).map(([id, {value}]) => ({
            id,
            value
        }))

        this.state = { alphabet, plugboards, rotors }
    }

    run(input) {
        return [this.state, []]
    }

    set(id, value, root = global) {
        root[id] = value
    }

    get(id, root = global) {
        return root[id]
    }
}

module.exports = Interpreter