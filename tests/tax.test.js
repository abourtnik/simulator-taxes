import { expect, test } from 'vitest'
import { calculateFamilyQuotient } from '@/functions/tax.ts'

test('calculate family quotient for single person without children', () => {
    expect(calculateFamilyQuotient(false, 0, 0)).toBe(1);
});

test('calculate family quotient for married person without children 2', () => {
    expect(calculateFamilyQuotient(true, 0, 0)).toBe(2);
});