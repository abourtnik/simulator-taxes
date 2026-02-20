import React from 'react';

type Props = {
    name: string
    type?: string
    label?: string
    help?: string,
    value?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({name, type= 'number', label, help, value, onChange}: Props) {
    return (
        <div className={'flex flex-col gap-2 w-full'}>
            {label && <label className={'font-bold'} htmlFor={name}>{label}</label>}
            <input
                type={type}
                name={name} className="block w-full p-2 bg-gray-50 text-gray-900 focus:outline-hidden border border-gray-300"
                id={name}
                onChange={onChange}
                value={value}
                min={0}
            />
            {help && <small className={'text-sm text-gray-500 text-left'}>{help}</small>}
        </div>
    )
}