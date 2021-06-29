import { writable, readable } from 'svelte/store';
import { run, state, result } from './interpreter'

export const input = writable()
export const output = writable()
export const alphabet = readable([], set => {
    state.subscribe(({ alphabet }) => {
        set(alphabet)
    })
})
export const rotorsPositions = readable([], set => {
    state.subscribe(({ rotors }) => {
        set(rotors.map(({ position }) => position))
    })
})

input.subscribe(run)

result.subscribe(value => {
    if (! value) return
    output.update(_ => value.out)
})
