import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function StayTypeDropDown() {
    const [selectedStayType, setSelectedStayType] = useState(null);
    const stayTypes = [
        { name: 'FB', code: 'FB' },
        { name: 'BB', code: 'BB' },
    ];

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedStayType} onChange={(e) => setSelectedStayType(e.value)} options={stayTypes} optionLabel="Stay Type"
                      placeholder="Select" className="w-full md:w-14rem" />
        </div>
    )
}
