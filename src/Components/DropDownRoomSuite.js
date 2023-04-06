import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function RoomSuiteDropDown() {
    const [selectedRoomSuite, setSelectedRoomSuite] = useState(null);
    const roomSuites = [
        { name: 'Stabndard', code: 'Stabndard' },
        { name: 'Deluxe', code: 'Deluxe' },
    ];

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedRoomSuite} onChange={(e) => setSelectedRoomSuite(e.value)} options={roomSuites} optionLabel="Room Suite"
                      placeholder="Select" className="w-full md:w-14rem" />
        </div>
    )
}
