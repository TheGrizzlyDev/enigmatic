import { code } from "./code";
import createInterpreter from "../enigmascript";
import { writable } from "svelte/store";

//TODO create a notification mechanism for errors
export const parsingErrors = writable([])
export const state = writable()
export const result = writable()

let interpreter
code.subscribe(value => {
    try {
        interpreter = createInterpreter(value)
        state.update(_ => interpreter.computeCurrentState())
        result.update(_ => null)
        parsingErrors.update(_ => [])
    } catch(e) {
        if (e.errors) {
            parsingErrors.update(_ => e.errors)
        }
        
        // if there is an e without errors than the lexer has failed
        // no error bubbling for now, instead keep the previous errors
    }
})
code.update(old => old) //forcing a first update to get the interpreter loaded when code has only the original value

export function run(input) {
    if (! input) return
    const [newState, newResult] = interpreter.run(input)
    state.update(_ => newState)
    result.update(_ => newResult)
}