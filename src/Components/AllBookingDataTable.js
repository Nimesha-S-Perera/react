import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {InputText} from "primereact/inputtext";
import { FilterMatchMode } from 'primereact/api';
import DialogForm from "./Modal";
import {config} from "../config/config";
import axios from "axios";

function AllBookingsDataTable() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${config.ABC_hotel_check_in_system}/bookings`);
      const data = response.data.data.map(booking => {
        const checkInDate = new Date(booking.checkInDate);
        const checkOutDate = new Date(booking.checkOutDate);
        const stayPeriod = booking.guest ?
            `${checkInDate.getDate()}/${(checkOutDate.getMonth() + 1).toString().padStart(2, '0')}/${checkInDate.getFullYear()}  - ${checkOutDate.getDate()}/${(checkOutDate.getMonth() + 1).toString().padStart(2, '0')}/${checkInDate.getFullYear()} ` :
            null;
        return {...booking, stayPeriod};
      });
      setBookings(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'guest.nic': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'guest.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'guest.contactNumber': { value: null, matchMode: FilterMatchMode.IN },
    roomNo: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
        <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
        </span>
        </div>
    );
  };

  const header = renderHeader();

  return (
      <div className="card p-3">
        <DataTable value={bookings} paginator rows={5} responsive filters={filters} filterDisplay="row" tableStyle={{minWidth:"50rem"}}
                   globalFilterFields={[ 'guest.nic', 'guest.name', 'guest.contactNumber', 'roomNo']} header={header} emptyMessage="No bookings found.">
          <Column field="room.roomNo" header="Room ID" sortable style={{ width: '12%' }} />
          <Column field="room.status" header="Status" sortable style={{ width: '12%' }} />
          <Column field="room.roomType" header="Room Suite" sortable style={{ width: '12%' }} />
          <Column field="guest.name" header="Guest" style={{ width: '14%' }} />
          <Column field="stayPeriod" header="Staying Period" style={{ width: '14%' }} />
          <Column field="stayType" header="Stay Type" sortable style={{ width: '12%' }} />
          <Column field="guest.contactNumber" header="Contact" style={{ width: '12%' }} />
          <Column field="guest.nic" header="NIC" style={{ width: '12%' }} />
        </DataTable>
      </div>
  );
}

export default AllBookingsDataTable;

