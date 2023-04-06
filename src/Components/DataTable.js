import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {InputText} from "primereact/inputtext";
import DialogForm from "./Modal";
import axios from "axios";

function BookingsDataTable() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/api/bookings?current_guest_only=true');
      const data = response.data.data.map(booking => {
        const checkInDate = new Date(booking.checkInDate);
        const checkOutDate = new Date(booking.checkOutDate);
        const stayPeriod = booking.guest ?
         `${checkInDate.getDate()}/${checkInDate.getMonth() + 1} ${checkInDate.getHours()}:${checkInDate.getMinutes()} - ${checkOutDate.getDate()}/${checkOutDate.getMonth() + 1} ${checkOutDate.getHours()}:${checkOutDate.getMinutes()}` :
            null;
        return {...booking, stayPeriod};
      });
      setBookings(data);
    };
    fetchData();
  }, []);

  return (
      <div className="card p-5" size="small">
        <DataTable value={bookings} paginator rows={5} responsive>
          <Column field="roomNo" header="Room ID" sortable style={{ width: '12%' }} />
          <Column field="status" header="Status" sortable style={{ width: '12%' }} />
          <Column field="roomType" header="Room Suite" sortable style={{ width: '12%' }} />
          <Column field="guest.name" header="Guest" style={{ width: '14%' }} />
          <Column field="stayPeriod" header="Staying Period" style={{ width: '14%' }} />
          <Column field="stayType" header="Stay Type" sortable style={{ width: '12%' }} />
          <Column field="guest.contactNumber" header="Contact" style={{ width: '12%' }} />
          <Column field="guest.nic" header="NIC" style={{ width: '12%' }} />
        </DataTable>
      </div>
  );
}

export default BookingsDataTable;

