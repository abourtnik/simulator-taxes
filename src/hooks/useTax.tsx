import React, {useState, useMemo} from "react";
import {
    calculateFamilyQuotient,
    calculateNetTaxableIncome,
    calculatePercentageOfSalary,
    calculateTax, calculateTaxPerBracket
} from "@/functions/tax";

type FormValues = {
    gain: number;
    isMarried: boolean;
    children: number;
    CMIChildren: number;
};

const initialState: FormValues = {
    gain: 0,
    isMarried: false,
    children: 0,
    CMIChildren: 0
};

type useTaxReturn = {
    tax: FormValues,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    quotient: number,
    netTaxableIncome: number,
    percentageOfSalary: number,
    afterTaxIncome: number,
    taxToPay: number,
    taxPerBracket: number[],
};

export function useTax (): useTaxReturn {

    const [tax, setTax] = useState<FormValues>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setTax(prev => {
            if (type === 'checkbox') {
                return {...prev, [name]: checked}
            }
            return {...prev, [name]: Number(value) || 0}
        })
    };

    const quotient: number = useMemo(() => {
        return calculateFamilyQuotient(tax.isMarried, tax.children, tax.CMIChildren)
    }, [tax.isMarried, tax.children, tax.CMIChildren]);

    const netTaxableIncome: number = calculateNetTaxableIncome(tax.gain, quotient);

    const taxToPay: number = calculateTax(netTaxableIncome, quotient);

    const percentageOfSalary: number = calculatePercentageOfSalary(taxToPay, tax.gain);

    const taxPerBracket: number[] = calculateTaxPerBracket(netTaxableIncome);

    return {
        tax,
        handleChange,
        quotient: quotient,
        netTaxableIncome: netTaxableIncome,
        percentageOfSalary: percentageOfSalary,
        afterTaxIncome : tax.gain - taxToPay,
        taxToPay : taxToPay,
        taxPerBracket: taxPerBracket
    }
}