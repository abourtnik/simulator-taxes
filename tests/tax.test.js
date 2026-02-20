import { expect, test } from 'vitest'
import { calculateFamilyQuotient } from '@/functions/tax.ts'
import {Situation} from "@/types/index.ts";

test('calculate family quotient for single person without children', () => {
    expect(calculateFamilyQuotient(Situation.SINGLE, 0, 0)).toBe(1);
});

test('calculate family quotient for married person without children', () => {
    expect(calculateFamilyQuotient(Situation.MARRIED, 0, 0)).toBe(2);
});