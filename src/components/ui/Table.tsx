import React from 'react';

type Props = {
    columns: string[],
    data: (string | number)[][]
}

export function Table({columns, data}: Props) {
    return (
        <div className="overflow-x-auto">
            <table className={'border border-gray-300 rounded-base shadow-xs rounded-base w-full text-sm min-w-full'}>
                <thead className={'text-sm text-body bg-gray-100 border-b rounded-base border-gray-300'}>
                <tr>
                    {columns.map((column, index) => <th key={index} scope="col"
                                                        className={'px-6 py-3 font-bold'}>{column}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.map((c, index) => (
                    <tr key={index} className={'odd:bg-white even:bg-gray-100 border-b border-gray-300'}>
                        {c.map((row, index) => <th key={index} className={'font-normal px-6 py-4'}
                                                   scope="row">{row}</th>)}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}