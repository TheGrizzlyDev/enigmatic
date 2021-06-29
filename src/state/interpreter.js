import { code } from "./code";
import createInterpreter from "../enigmascript";
import { writable } from "svelte/store";
import { addError } from "./notification"

const parsingErrors = writable([])
const interpreterNotificationHandlers = writable([])
parsingErrors.subscribe(errors => {
    const newNotifications = errors.map(error => addError({
        notifier: 'Parser',
        msg: `[${error.line}:${error.column}] ${error.error}`
    }))
    interpreterNotificationHandlers.update(oldNotifications => {
        for(let { close } of oldNotifications) close()
        return newNotifications
    })
})

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