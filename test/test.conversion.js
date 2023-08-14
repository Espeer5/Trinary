import { decimalToBalancedTernary, wordToDec } from "../src/TriArithmetic/conversions.js";
import { Word } from "../src/representation/word.js";
import assert from "assert";
import { WORD_SIZE } from "../src/constants.js";

describe("Conversion Bounds", function () {
    it("Tests that the conversion functions are bounded by the word size", function () {
        let max_word = 0;
        let min_word = 0;
        for (let i = 0; i < WORD_SIZE; i++) {
            max_word += 3 ** i;
            min_word -= 3 ** i;
        }
        assert.throws(() => decimalToBalancedTernary(max_word + 1));
        assert.throws(() => decimalToBalancedTernary(min_word - 1));
        assert.doesNotThrow(() => decimalToBalancedTernary(max_word));
        assert.doesNotThrow(() => decimalToBalancedTernary(min_word));
    });
});

describe("Conversion Tests", function () {
    it("Tests the ability to convert a decimal number to balanced ternary and back", function () {
        for (let i = -100; i < 100; i++) {
            let ternary = new Word();
            ternary.writeWord(decimalToBalancedTernary(i));
            let decimal = wordToDec(ternary);
            assert.equal(decimal, i);
        }
    });
});