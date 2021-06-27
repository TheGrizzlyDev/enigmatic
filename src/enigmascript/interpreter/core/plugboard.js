class Plugboard {
    constructor(value) {
        this.value = value
        
        this.operator_feed = this.operator_feed.bind(this)
    }

    operator_feed(value) {
        for(let [l, r] of this.value) {
            if (value === l) return r
            if (value === r) return l
        }
    }
}

module.exports = Plugboard