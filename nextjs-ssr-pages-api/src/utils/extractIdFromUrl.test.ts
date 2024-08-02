import { describe, test, expect } from 'vitest';
import extractIdFromUrl from './extractIdFromUrl';

describe('extractIdFromUrl', () => {
    test('extracts ID from a valid URL', () => {
        const url = 'https://swapi.dev/api/people/1/';
        const id = extractIdFromUrl(url);
        expect(id).toBe('1');
    });

    test('extracts ID from another valid URL', () => {
        const url = 'https://swapi.dev/api/starships/9/';
        const id = extractIdFromUrl(url);
        expect(id).toBe('9');
    });

    test('handles URL with query parameters', () => {
        const url = 'https://swapi.dev/api/people/7/?search=C-3PO';
        const id = extractIdFromUrl(url);
        expect(id).toBe('7');
    });
});
