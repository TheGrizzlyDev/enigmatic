class Rotors {
    constructor(alphabet, ...rotors) {
        this.alphabet = alphabet
        this.rotors = rotors
        this.offset = 0

        this.operator_feed = this.operator_feed.bind(this)
        this.step = this.step.bind(this)
    }

    operator_feed(input) {
        const alphabet = this.alphabet
        const rotorsWithState = this.rotorsWithState()
        const rotorsOut = rotorsWithState
            .reduce((acc, act) => act.feed(acc), input)
        const outRotations = rotorsWithState[rotorsWithState.length - 1].rotations
        const remappedIndex = (alphabet.indexOf(rotorsOut) + outRotations) % alphabet.length
        return alphabet[remappedIndex]
    }

    rotorsWithState() {
        return this.rotors.map((rotor, i) => {
            return new RotorWithOffset(rotor, this.alphabet, this.offset, i)
        })
    }

    step() {
        this.offset++
    }

}

class RotorWithOffset {
    constructor(rotor, alphabet, offset, index) {
        this._rotor = rotor
        this._offset = offset
        this._index = index
        this._alphabet = alphabet
    }

    feed(input) {
        const alphabet = this._alphabet
        const inputIndex = alphabet.indexOf(input)
        const remappedIndex = (inputIndex + this.rotations) % alphabet.length
        return this._rotor.feed(alphabet[remappedIndex])
    }

    get wiring() {
        return this._rotor.wiring
    }

    get position() {
        const alphabet = this._alphabet
        const absoluteAlphabetPosition = alphabet.indexOf(this._rotor.start) + this.rotations
        return this._alphabet[absoluteAlphabetPosition % alphabet.length]
    }

    get rotations() {
        const alphabet = this._alphabet
        const ticksNeededForRotation = Math.pow(alphabet.length, this._index)
        return Math.floor(this._offset / ticksNeededForRotation)
    }
}

module.exports = Rotors