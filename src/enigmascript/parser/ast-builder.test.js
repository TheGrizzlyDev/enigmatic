const fs = require('fs')
const tokenizer = require('./lexer')
const astBuilder = require('./ast-builder')

function dump(ast, testCase) {
    if (!process.env.DUMP) return
    fs.writeFileSync(testCase + ".dump.json", JSON.stringify(ast, null, 2))
}

test('Can generate the correct token sequence', () => {
    const code = fs.readFileSync('src/examples/emoji.enigmascript', 'utf8')
    tokens = tokenizer(code)

    const [ast, errors] = astBuilder(tokens)

    dump(ast, "simple")
    expect(errors).toHaveLength(0)
    expect(ast).toMatchObject({
        "type": "program",
        "setup": {
            "alphabet": [
                "🔥",
                "✨",
                "💩",
                "🐼"
            ],
            "instructions": [
                {
                    "type": "rotor",
                    "value": {
                        "start": "🔥",
                        "wiring": [
                            [
                                "🔥",
                                "💩"
                            ],
                            [
                                "✨",
                                "🔥"
                            ],
                            [
                                "💩",
                                "🐼"
                            ],
                            [
                                "🐼",
                                "✨"
                            ]
                        ]
                    }
                },
                {
                    "type": "rotor",
                    "value": {
                        "start": "💩",
                        "wiring": [
                            [
                                "🔥",
                                "🔥"
                            ],
                            [
                                "✨",
                                "🐼"
                            ],
                            [
                                "💩",
                                "✨"
                            ],
                            [
                                "🐼",
                                "💩"
                            ]
                        ]
                    }
                },
                {
                    "type": "plugboard",
                    "value": [
                        [
                            "🔥",
                            "🐼"
                        ],
                        [
                            "✨",
                            "💩"
                        ]
                    ]
                }
            ]
        },
        "run": {
            "instructions": [
                {
                    "type": "assign",
                    "to": "res",
                    "value": {
                        "type": "feed",
                        "to": "plugboard",
                        "value": {
                            "type": "feed",
                            "to": "rotors",
                            "value": {
                                "type": "id",
                                "value": "in"
                            }
                        }
                    }
                },
                {
                    "type": "accessor",
                    "to": "rotors",
                    "access": {
                        "type": "invocation",
                        "to": "step",
                    }
                },
                {
                    "type": "assign",
                    "to": "out",
                    "value": {
                        "type": "id",
                        "value": "res"
                    }
                }
            ]
        }
    })


})