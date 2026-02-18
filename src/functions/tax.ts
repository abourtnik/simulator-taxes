import {PARTS} from '@/config'

export function calculateFamilyQuotient(isMarried: boolean, children: number, handicappedChildren: number): number {

    const base = isMarried ? 2 : 1;

    const childrenParts = Math.min(children, 2) * 0.5 + Math.max(children - 2, 0);

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

    const sum = calculateTaxPerBracket(netTaxableIncome).reduce((acc, curr) => acc + curr, 0);

    return sum / quotient;
}

export function calculatePercentageOfSalary(taxToPay: number, gain: number): number {

    if(gain === 0) return 0;

    const percentage = (taxToPay / gain) * 100

    return Number(percentage.toFixed(2));
}