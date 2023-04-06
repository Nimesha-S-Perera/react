import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import InputForCheckin from "./Input";
import { InputText } from "primereact/inputtext";
import CheckInCalendar from "./Calendar";
import CheckInInput from "./Input";
import StayTypeDropDown from "./DropDownStayType";
import RoomSuiteDropDown from "./DropDownRoomSuite";
import RoomNoDropDown from "./DropDownRoomNo";

export default function ModalForCheckIn() {
  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Button label="Check-In" onClick={() => setVisible(false)} autoFocus />
    </div>
  );

  const url = ""
  const [data,setData] = useState({
    name:"",
  })

  function handle(e){
    const newdata = {data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  return (
    <div className="card flex justify-content-center w-50rem">
      <Button
        label="New Check-In"
        size="small"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Add New Check-In"
        className="text-xl font-normal"
        size="small"
        visible={visible}
        style={{ width: "50rem" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <p className="m-0 text-base">Guest Information</p>

        <div class="card">
          <div class="formgrid grid">
            <div class="field col-12 md:col-4 text-sm">
              <label htmlFor="name">Name</label>
              <CheckInInput
                id="name"
                onChange={(e) => handle(e)}
                value={data.name}
              />
            </div>
            <div class="field col-12 md:col-4 text-sm">
              <label htmlFor="nic">NIC</label>
              <CheckInInput
                  id="name"
                  onChange={(e) => handle(e)}
                  value={data.nic}
              />
            </div>
            <div class="field col-12 md:col-4 text-sm">
              <label htmlFor="contactNumber">Contact Number</label>
              <CheckInInput
                  id="name"
                  onChange={(e) => handle(e)}
                  value={data.contactNumber}
              />
            </div>
            <p className="m-0 text-base mt-3">Check In Details</p>
            <div class="formgrid grid">
              <div class="field col-12 md:col-4 text-sm">
                <label htmlFor="stayingPeriod">Staying Period</label>
                <CheckInCalendar />
              </div>
              <div class="field col-12 md:col-4 text-sm">
                <label for="stayingPeriod">Staying Period</label>
                <CheckInCalendar />
              </div>
              <div class="field col-12 md:col-4 text-sm">
                <label htmlFor="stayType">Stay Type</label>
                <StayTypeDropDown/>
              </div>
              <div class="field col-12 md:col-4 text-sm">
                <label htmlFor="roomSuite">Room Suite</label>
                <RoomSuiteDropDown/>
              </div>
              <div class="field col-12 md:col-4 text-sm">
                <label htmlFor="roomNo">Room No</label>
                <RoomNoDropDown/>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
