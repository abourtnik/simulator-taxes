import React from 'react';
import { useTranslation } from 'react-i18next';
import {Option} from '@/types'

type Props = {
    name: string
    options: Option[]
    label?: string
    help?: string,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({name, options, label, help, onChange, }: Props) {

    const { t } = useTranslation();


    return (
        <div className={'flex flex-col gap-2 w-full'}>
            {label && <label className={'font-bold'} htmlFor={name}>{label}</label>}
            <div className={'relative'}>
                <select name={name} id={name} onChange={onChange} className={'block w-full p-2 bg-gray-50 text-gray-900 focus:outline-hidden border border-gray-300 appearance-none'}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {t(option.label)}
                        </option>)
                    )}
                </select>
                <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 9l-7 7-7-7"/>
                </svg>
            </div>
            {help && <small className={'text-sm text-gray-500 text-left'}>{help}</small>}
        </div>
    )
}