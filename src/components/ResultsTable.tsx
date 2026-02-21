import {Table} from "@/components/ui";
import {PARTS, Part} from "@/config";
import numeral from "numeral";

type Props = {
    taxPerBracket: number[]
}

export function ResultsTable({taxPerBracket}: Props) {

    const tableColumns = [
        {'label': 'Tranche n°', className: 'w-30 min-w-30'},
        {'label': 'Montant des revenus', className: 'w-80 min-w-80'},
        {'label': 'Imposition'},
        {'label': 'Impôt payé', className: 'w-50 min-w-50'},
    ];

    const getLowerLimit = (part: Part): string => {
        return `${numeral(part.lowerLimit).format('0,0')} €`;
    };
    const getUpperLimit = (part: Part): string => {

        if (part.upperLimit === Infinity) {
            return 'ou plus';
        }

        return `${numeral(part.upperLimit).format('0,0')} €`;
    };

    const tableData = PARTS.map((part, index) => ([
        index + 1,
        `${getLowerLimit(part)} - ${getUpperLimit(part)}`,
        `${part.tax * 100}%`,
        `${numeral(taxPerBracket[index] ?? 0).format('0,0')} €`
    ]));

    return (
        <Table
            columns={tableColumns}
            data={tableData}
        />
    )
}