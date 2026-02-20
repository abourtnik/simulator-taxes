export type Option = {
    value: string|number,
    label: string
}

export enum Situation {
    SINGLE = 0,
    MARRIED = 1,
    WIDOWER = 2,
    DIVORCED = 3,
    PACSED = 4,
    FREE = 5,
}