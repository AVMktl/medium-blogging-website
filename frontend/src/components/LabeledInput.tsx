import { ChangeEvent } from "react"

export const LabeledInput = ({label, placeholder, type, onChange}: {label: string, placeholder: string, type?: string, onChange: (e: ChangeEvent<HTMLInputElement>)=> void}) => {
    return (
        <div className="mb-3">
            <label className="block mb-2 text-base font-medium ">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}