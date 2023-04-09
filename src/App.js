import logo from "./logo.svg";
import PrimeReact from "primereact/api";
import "./App.css";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import BookingsDataTable from "./Components/BookingsDataTable";
import AllBookingsDataTable from "./Components/AllBookingDataTable";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import DialogForm from "../src/Components/Modal";
import React, {useEffect, useState} from "react";
import MyComponent from "../src/Components/TestForm";
import RoomList from "../src/Components/TestAvailable"
import TableSwitcher from "./Components/ToggleButton";


function App() {
  return (
    <div className="App overflow-hidden ">
      <div className="flex flex-wrap align-items-center justify-content-between surface-200">
        <div className="flex align-items-center ">
          <h1 className="text-2xl font-semibold ml-3">ABC Hotel</h1>
        </div>
        <h2 className="flex text-xl font-normal mx-auto">
          ABC Hotel - Check-In System
        </h2>
      </div>
      <div className="flex flex-wrap align-items-center justify-content-between gap-2 ml-2">
        <div className="flex align-items-center gap-3 ml-2">
          <p className="text-xl">Check-In List</p>
          <DialogForm label="New Check-In" size="small" />

        </div>

      </div>
        <TableSwitcher/>
    </div>
  );
}

export default App;
