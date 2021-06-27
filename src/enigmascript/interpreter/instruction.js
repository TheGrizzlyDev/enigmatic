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

    invocation() {
        const args = (this.astNode.args || []).map(arg => arg.type === 'id' ? 
                this.get(valueNode.value)
                : this.createInstruction(arg).execute())
        return this.get(this.astNode.to)(...args)
    }

    feed() {
        const valueNode = this.astNode.value
        const value = valueNode.type === 'id' ? 
            this.get(valueNode.value)
            : this.createInstruction(valueNode).execute();
        const scope = this.get(this.astNode.to)
        const operator = this.get('operator_feed', scope)
        return operator(value)
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

    createInstruction(node, scope = this._scope) {
        return new Instruction(node, scope, this._emit)
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