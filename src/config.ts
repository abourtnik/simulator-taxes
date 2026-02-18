type Part = {
    lowerLimit: number,
    upperLimit: number,
    tax: number
}
export const PARTS: Part[] = [
    {
        lowerLimit: 0,
        upperLimit: 11498,
        tax: 0
    },
    {
        lowerLimit: 11499,
        upperLimit: 29315,
        tax: 0.11
    },
    {
        lowerLimit: 29316,
        upperLimit: 83823,
        tax: 0.3
    },
    {
        lowerLimit: 29317,
        upperLimit: 180294,
        tax: 0.41
    },
    {
        lowerLimit: 180295,
        upperLimit: Infinity,
        tax: 0.45
    }
];