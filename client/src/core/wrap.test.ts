import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { wrapText } from './wrap.ts';

describe('wrapText', () => {
    it ("wraps on word boundaries", () => {
        assert.deepEqual(wrapText('the quick brown fox', 10), ['the quick', 'brown fox']);
    });

    it("keeps short text on one line", () => {
        assert.deepEqual(wrapText('hello', 40), ['hello']);
    });

    it("splits words longer than a line", () => {
        assert.deepEqual(wrapText('abcdefghij', 4), ['abcd', 'efgh', 'ij']);
    });

    it("preserves explicit newlines and blank lines", () => {
        assert.deepEqual(wrapText('a\n\nb', 10), ['a', '', 'b']);
    });
});