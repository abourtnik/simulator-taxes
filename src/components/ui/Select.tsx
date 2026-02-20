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
            <select name={name} id={name} onChange={onChange} className={'block w-full p-2 bg-gray-50 text-gray-900 focus:outline-hidden border border-gray-300'}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {t(option.label)}
                    </option>)
                )}
            </select>
            {help && <small className={'text-sm text-gray-500 text-left'}>{help}</small>}
        </div>
    )
}