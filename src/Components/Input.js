import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

export default function InputForCheckin() {
    const [value, setValue] = useState('');

    return (
        <div className="p-inputtext-sm" placeholder="Small" size="Small">
            <InputText value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}