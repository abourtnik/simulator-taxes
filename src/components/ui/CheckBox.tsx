import React from "react";

type Props = {
    name: string
    label?: string,
    checked?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CheckBox({name, label, checked = false, onChange}: Props) {
    return (
        <div className="flex gap-2 items-center">
            <input name={name} className="" type="checkbox" onChange={onChange} checked={checked} id={name}/>
            <label className="" htmlFor={name}>{label}</label>
        </div>
    )
}