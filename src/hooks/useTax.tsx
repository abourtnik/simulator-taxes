import {useState, useMemo} from "react";
import {
    calculateFamilyQuotient,
    calculateNetTaxableIncome,
    calculatePercentageOfSalary,
    calculateTax, calculateTaxPerBracket
} from "@/functions/tax";

import {Situation} from "@/types";

type FormValues = {
    gain: number;
    situation: Situation;
    children: number;
    CMIChildren: number;
};

const initialState: FormValues = {
    gain: 0,
    situation: Situation.SINGLE,
    children: 0,
    CMIChildren: 0
};

type useTaxReturn = {
    tax: FormValues,
    handleChange: (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void,
    quotient: number,
    netTaxableIncome: number,
    percentageOfSalary: number,
    afterTaxIncome: number,
    taxToPay: number,
    taxPerBracket: number[],
};

export function useTax (): useTaxReturn {

    const [tax, setTax] = useState<FormValues>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTax(prev => {
            return {...prev, [name]: Math.max(0, Number(value)) || 0}
        })
    };

    const quotient: number = useMemo(() => {
        return calculateFamilyQuotient(tax.situation, tax.children, tax.CMIChildren)
    }, [tax.situation, tax.children, tax.CMIChildren]);

    const netTaxableIncome: number = calculateNetTaxableIncome(tax.gain, quotient);

    const taxToPay: number = calculateTax(netTaxableIncome, quotient);

    const percentageOfSalary: number = calculatePercentageOfSalary(taxToPay, tax.gain);

    const taxPerBracket: number[] = calculateTaxPerBracket(netTaxableIncome);

    return {
        tax,
        handleChange,
        quotient,
        netTaxableIncome,
        percentageOfSalary,
        afterTaxIncome: tax.gain - taxToPay,
        taxToPay,
        taxPerBracket
    }
}