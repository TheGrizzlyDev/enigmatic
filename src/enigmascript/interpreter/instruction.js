const Rotor = require('./core/rotor')
const Plugboard = require('./core/plugboard')

class Instruction {
    constructor(astNode, scope, _emit) {
        this.astNode = astNode
        this._scope = scope
        this._emit = _emit
    }

    execute() {
        return this[this.astNode.type](...arguments)
    }

    assign() {
        const valueNode = this.astNode.value
        const value = valueNode.type === 'id' ? 
            this.get(valueNode.value)
            : this.createInstruction(valueNode).execute();
        this.set(this.astNode.to, value)
        return value
    }

    accessor() {
        const valueNode = this.astNode.access
        const scope = this.get(this.astNode.to)

        const value = valueNode.type === 'id' ? 
            this.get(valueNode.value, scope)
            : this.createInstruction(valueNode, scope).execute();
        
        console.log(valueNode, scope, value)
        return value
    }

    rotor() {
        const rotor = new Rotor(this.astNode.value.start, this.astNode.value.wiring)
        this.emit('rotor', rotor)
        return rotor
    }

    plugboard() {
        const plugboard = new Plugboard(this.astNode.value)
        this.emit('plugboard', plugboard)
        return plugboard
    }

    createInstruction(node, scope = this.scope) {
        return new Instruction(node, scope, this._get, this._set, this._emit)
    }

    get(id, scope = this._scope) {
        return scope[id]
    }

    set(id, value, scope = this._scope) {
        return scope[id] = value
    }

    emit(action, ...args) {
        return this._emit(action, ...args)
    } 

}

module.exports = Instruction