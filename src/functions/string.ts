import {Option} from "@/types";

type EnumLike = { [key: string]: string | number };

export function enumToOptions(enumObject : EnumLike): Option[] {
    return Object.values(enumObject)
        .filter((v) => typeof v === 'number')
        .map(value => ({
            value,
            label: humanize(enumObject[value] as string),
        }))
}

export function humanize(str: string): string {
    return str.toLowerCase()
        .replace(/_/g, ' ')
        .replace(/^\w/, c => c.toUpperCase());
}