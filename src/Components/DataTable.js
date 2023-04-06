import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

function BookingsDataTable() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/api/bookings?current_guest_only=true');
      const data = await response.json();
      setBookings(data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="card p-5">
      <DataTable value={bookings} paginator rows={5} responsive>
        <Column field="roomNo" header="Room ID" sortable style={{ width: '12%' }} />
        <Column field="status" header="Status" sortable style={{ width: '14%' }} />
        <Column field="roomType" header="Room Suite" sortable style={{ width: '12%' }} />
        <Column field="guest.name" header="Guest" style={{ width: '14%' }} />
        <Column field="stayingPeriod" header="Staying Period" style={{ width: '12%' }} />
        <Column field="stayType" header="Stay Type" sortable style={{ width: '12%' }} />
        <Column field="guest.contactNumber" header="Contact" style={{ width: '12%' }} />
        <Column field="guest.nic" header="NIC" style={{ width: '12%' }} />
      </DataTable>
    </div>
  );


}

export default BookingsDataTable;