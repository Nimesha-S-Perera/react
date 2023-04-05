import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import './Table.css';

function BookingsDataTable() {
  const [bookings, setBookings] = useState([]);

 

  return (
    <div className="card p-5">
      <DataTable
        value={bookings}
        paginator
        rows={5}
        
        responsive // added responsive attribute
      >
        <Column field="name" header="Room ID" sortable style={{ width: '12%' }} />
        <Column field="email" header="Status" sortable style={{ width: '14%' }} />
        <Column field="phone" header="Room Suite" sortable style={{ width: '12%' }} />
        <Column field="website" header="Guest" style={{ width: '14%' }} />
        <Column field="name" header="Staying Period" style={{ width: '12%' }} />
        <Column field="email" header="Stay Type" sortable style={{ width: '12%' }} />
        <Column field="phone" header="Contact" style={{ width: '12%' }} />
        <Column field="website" header="NIC" style={{ width: '12%' }} />
      </DataTable>
    </div>
  );
}

export default BookingsDataTable;