import React, { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import AllBookingsDataTable from './AllBookingDataTable';
import BookingsDataTable from './BookingsDataTable';

export default function TableSwitcher() {
    const options = ['Recent', 'Check-in List'];
    const [selectedTable, setSelectedTable] = useState(options[0]);

    return (
        <div className="card flex justify-content-center flex-column">
            <SelectButton className="p-3 justify-content-end" value={selectedTable} onChange={(e) => setSelectedTable(e.value)} options={options} />
            <div>
            {selectedTable === 'Recent' ? <BookingsDataTable /> : <AllBookingsDataTable />}
            </div>
        </div>
    );
}
