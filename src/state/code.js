import { writable } from 'svelte/store';
import emojiEnigma from '../examples/emoji.enigmascript';
import boolEnigma from '../examples/bool.enigmascript';
import realEnigma from '../examples/enigma.enigmascript';

const files = { emoji: emojiEnigma, bool: boolEnigma, real: realEnigma }

export const code = writable(realEnigma)

export function changeFile(filename) {
    code.update(_ => files[filename])
}