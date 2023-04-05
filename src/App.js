import logo from "./logo.svg";
import PrimeReact from "primereact/api";
import "./App.css";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import BookingsDataTable from "../src/Components/DataTable";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import DialogForm from "../src/Components/Modal";
import InputForCheckin from "../src/Components/Input";

function App() {
  return (
    
      <div className="App overflow-hidden"> 
  <div className="grid"> 
    <div className="col-12"> 
    
      <div className="flex flex-row align-items-center surface-200"> 
      
        <h1 className="text-2xl font-semibold ml-5">ABC Hotel</h1> 
        <h2 className="flex text-xl font-normal mx-auto"> 
          ABC Hotel - Check-In System 
        </h2> 
      </div> 
    </div> 
    </div>
    <div className="flex justify-content-between align-items-center">
        <div className="flex align-items-center gap-3 m-3">
          <p className="text-xl">Check-In List</p>
          <DialogForm label="New Check-In" size="small" />
        </div>
        <div className="justify-content-between m-3">
          <span className="p-input-icon-left">
            <i className="pi pi-search"/>
            <InputText placeholder="Search" />
          </span>
        </div>
      </div>
     

<BookingsDataTable/>

    </div>

    
  );
}

export default App;
