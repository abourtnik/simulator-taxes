import React from 'react';
import clsx from 'clsx';

type Column = {
    label: string,
    className?: string
}

type Props = {
    columns: Column[],
    data: (string | number)[][]
}

export function Table({columns, data}: Props) {
    return (
        <div className="overflow-x-auto">
            <table className={'border border-gray-300 rounded-base shadow-xs rounded-base w-full text-sm min-w-full'}>
                <thead className={'text-sm text-body bg-gray-100 border-b rounded-base border-gray-300'}>
                <tr>
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            scope="col"
                            className={clsx('px-6 py-3 font-bold', column.className)}
                        >
                            {column.label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((column, index) => (
                    <tr key={index} className={'odd:bg-white even:bg-gray-100 border-b border-gray-300'}>
                        {column.map((row, index) => (
                            <th key={index} className={'font-normal px-6 py-4'} scope="row">{row}</th>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}