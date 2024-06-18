import getDiff from '../src/utils/get-diff.js';
import {describe, expect, it} from "@jest/globals";

describe("Shallow comparing", () => {
    it('should compare json files', () => {
        const expected = JSON.stringify({
            '- follow': false,
            '  host': 'hexlet.io',
            '- proxy': '123.234.53.22',
            '- timeout': 50,
            '+ timeout': 20,
            '+ verbose': true
        });
        const result = getDiff(
            '__tests__/__fixtures__/file1.json',
            '__tests__/__fixtures__/file2.json',
        );

        expect(result).toBe(expected);
    });
});
