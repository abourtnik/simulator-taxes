import {PARTS} from '@/config'
import {Situation} from "@/types";

export function calculateFamilyQuotient(situation: Situation, children: number, handicappedChildren: number): number {

    if (children < 0 || handicappedChildren < 0) {
        throw new Error('Children count cannot be negative');
    }

    if (handicappedChildren > children) {
        // throw new Error('Handicapped children cannot exceed total children');
    }

    const isSingle= [Situation.SINGLE, Situation.FREE, Situation.DIVORCED, Situation.WIDOWER].includes(situation);

    const base: number = isSingle ? 1 : 2;

    const childrenParts: number = Math.min(children, 2) * 0.5 + Math.max(children - 2, 0);

    return base + childrenParts + handicappedChildren;
}
export function calculateNetTaxableIncome(gain: number, quotient: number): number {
    return gain / quotient;
}

export function calculateTaxPerBracket(netTaxableIncome: number): number[] {

    const taxesPerBracket: number[] = [];
    let previousLimit = 0;

    for (const bracket of PARTS) {

        if (netTaxableIncome <= previousLimit) {
            taxesPerBracket.push(0);
            continue;
        }

        const taxableInBracket = Math.min(netTaxableIncome, bracket.upperLimit) - previousLimit;

        taxesPerBracket.push(Math.round(taxableInBracket * bracket.tax));

        previousLimit = bracket.upperLimit;
    }

    return taxesPerBracket;
}

export function calculateTax(netTaxableIncome: number, quotient: number): number {

    const taxPerBracket = calculateTaxPerBracket(netTaxableIncome);
    const sum = taxPerBracket.reduce((acc, curr) => acc + curr, 0);

    return Math.round(sum * quotient);
}

export function calculatePercentageOfSalary(taxToPay: number, gain: number): number {

    if(gain === 0) return 0;

    const percentage = (taxToPay / gain) * 100

    return Number(percentage.toFixed(2));
}