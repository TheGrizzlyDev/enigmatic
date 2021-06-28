import { writable } from 'svelte/store';

export const code = writable(`
using 🔥, ✨, 💩, 👽️

rotor(🔥 => 💩, ✨ => 🔥, 💩 => 👽️, 👽️ => ✨) starting at 🔥
# Just a comment
rotor(🔥 => 🔥, ✨ => 👽️, 💩 => ✨, 👽️ => 💩) starting at ✨

plugboard(🔥 <=> 👽️, ✨ <=> 💩)

run {
    res = plugboard <- rotors <- in
    rotors.step()
    out = res
}`.trim())