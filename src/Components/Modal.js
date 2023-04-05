import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import InputForCheckin from "./Input";
import { InputText } from "primereact/inputtext";
import DropdownCheckIn from "./DropDown";

export default function ModalForCheckIn() {
  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Button label="Check-In" onClick={() => setVisible(false)} autoFocus />
    </div>
  );

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
        <div className="flex justify-content-between align-items-center">
          <div className="flex align-items-center gap-3">
            <div className="flex-column">
              <p className="text-sm">Name</p>
              <InputForCheckin />
            </div>
            <div className="flex-column">
              <p className="text-sm">NIC</p>
              <InputForCheckin />
            </div>
            <div className="flex-column">
              <p className="text-sm">Contact Number</p>
              <InputForCheckin />
            </div>
          </div>
        </div>

        <p className="text-base mt-5">Check In Details</p>
        <div className="flex justify-content-between align-items-center">
          <div className="flex align-items-center gap-3">
            <div className="flex-column">
              <p className="text-sm">Staying Period</p>
              <InputForCheckin />
            </div>
            <div className="flex-column">
              <p className="text-sm">Staying Period</p>
              <InputForCheckin />
            </div>
            <div className="flex-column">
              <p className="text-sm">Stay Type</p>
              <DropdownCheckIn />
            </div>
          </div>
        </div>
        <div className="flex justify-content-between align-items-center">
          <div className="flex align-items-center gap-3">
            <div className="flex-column">
              <p className="text-sm">Room Suite</p>
              <DropdownCheckIn />
            </div>
            <div className="flex-column">
              <p className="text-sm">Room No</p>
              <DropdownCheckIn />
            </div>
          </div>
        </div>

        <div className="flex justify-content-end">
          <div className="flex gap-3">
            <div className="flex-row-reverse">
              <p className="text-sm">Sub Total</p>
            </div>
            <div className="flex-row-reverse">
              <p className="text-sm">40 000.00</p>
            </div>
          </div>
        </div>
        <div className="flex justify-content-end">
          <div className="flex gap-3">
            <div className="flex-row-reverse">
              <p className="text-sm ">Tax 10%</p>
            </div>
            <div className="flex-row-reverse">
              <p className="text-sm">4 000.00</p>
            </div>
          </div>
        </div>
        <div className="flex justify-content-end">
          <div className="flex gap-3">
            <div className="flex-row-reverse">
              <p className="text-sm ">Total</p>
            </div>
            <div className="flex-row-reverse">
              <p className="text-sm">LKR 44 000.00</p>
            </div>
          </div>
        </div>
        
        
      </Dialog>
    </div>
  );
}
