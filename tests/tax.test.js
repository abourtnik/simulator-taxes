import { expect, test } from 'vitest'
import { calculateFamilyQuotient } from '@/functions/tax.ts'

test('test calculateFamilyQuotient', () => {
    expect(calculateFamilyQuotient(true, 2, 0)).toBe(3);
})