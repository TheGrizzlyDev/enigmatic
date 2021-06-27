class Rotor {
    constructor(start, wiring) {
        this.start = start 
        this.wiring = wiring
    }

    feed(value) {
        for(let [l, r] of this.wiring) {
            if (value === l) return r
        }
    }
}

module.exports = Rotor