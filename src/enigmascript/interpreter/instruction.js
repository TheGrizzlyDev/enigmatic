const Rotor = require('./core/rotor')
const Plugboard = require('./core/plugboard')

class Instruction {
    constructor(astNode, scope, _get, _set, _emit) {
        this.astNode = astNode
        this._scope = scope
        this._get = _get
        this._set = _set
        this._emit = _emit
    }

    execute() {
        return this[this.astNode.type](...arguments)
    }

    assign() {
        this.setInScope(this.astNode.to, this.createInstruction(this.astNode.value).execute())
    }

    array() {
        return this.astNode.value.map(node => this.createInstruction(node).execute())
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

    getInScope(id) {
        return this._get(id, this._scope)
    }

    setInScope(id, value) {
        return this._set(id, value, this._scope)
    }

    emit(action, ...args) {
        return this._emit(action, ...args)
    } 
}

module.exports = Instruction