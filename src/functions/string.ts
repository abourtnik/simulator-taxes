import {Option} from "@/types";

export function enumToOptions(enumObject : any): Option[] {
    return Object.values(enumObject)
        .filter((v) => typeof v === 'number')
        .map(value => ({
            value,
            label: humanize(enumObject[value]),
        }))
}

export function humanize(str: string): string {
    return str.toLowerCase()
        .replace(/_/g, ' ')
        .replace(/^\w/, c => c.toUpperCase());
}