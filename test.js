import {Tri} from './base/tri.js';
import {Word} from './base/word.js';
import {WORD_SIZE} from "./constants"

let word = new Word();
let Tris = new Array(WORD_SIZE).fill(new Tri());
for (let i = 0; i < WORD_SIZE; i++) {
    Tris[i].setState(-1);
}
word.writeWord(Tris);
console.log(word.toString());
