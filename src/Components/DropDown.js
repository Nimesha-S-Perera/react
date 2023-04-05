
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function DropdownCheckIn() {
    const [select, setSelect] = useState(null);
    const cities = [
        { name: 'FB', code: 'FB' },
        { name: 'BB', code: 'BB' },
    ];

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={select} onChange={(e) => setSelect(e.value)} options={cities} optionLabel="name" 
                placeholder="Select" className="w-full md:w-14rem" />
        </div>
    )
}




        