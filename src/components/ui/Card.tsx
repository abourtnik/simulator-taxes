import React from 'react';

type Props = {
    title: string,
    children: React.ReactNode
}

export function Card({title, children}: Props) {
    return (
        <section className={'bg-white rounded border border-gray-300 w-full h-full'}>
            <div className={'bg-gray-100 rounded-t border-b border-gray-300 text-center'}>
                <h2 className="text-xl font-bold p-3 text-blue-500">{title}</h2>
            </div>
            <div className={'p-5'}>
                {children}
            </div>
        </section>
    )
}