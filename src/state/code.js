import { writable } from 'svelte/store';
import emojiEnigma from '../examples/emoji.enigmascript';
import boolEnigma from '../examples/bool.enigmascript';

const files = { emoji: emojiEnigma, bool: boolEnigma }

export const code = writable(emojiEnigma)

export function changeFile(filename) {
    code.update(_ => files[filename])
}