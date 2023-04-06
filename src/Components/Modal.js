import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import InputForCheckin from "./Input";
import { InputText } from "primereact/inputtext";
import CheckInCalendar from "./Calendar";

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

        <div class="card">
          <div class="formgrid grid">
            <div class="field col-12 md:col-4 text-sm">
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="text-sm text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <div class="field col-12 md:col-4 text-sm">
              <label for="nic">NIC</label>
              <input
                id="nic"
                type="text"
                class="text-sm text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <div class="field col-12 md:col-4 text-sm">
              <label for="contactNumber">Contact Number</label>
              <input
                id="contactNumber"
                type="text"
                class="text-sm text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <p className="m-0 text-base mt-3">Check In Details</p>
            <div class="formgrid grid">
              <div class="field col-12 md:col-4 text-sm">
                <label for="stayingPeriod">Staying Period</label>
                <CheckInCalendar />
              </div>
              <div class="field col-12 md:col-4 text-sm">
                <label for="stayingPeriod">Staying Period</label>
                <CheckInCalendar />
              </div>
              <div class="field col-12 md:col-4 text-sm">
                <label for="stayType">Stay Type</label>
                <select
                  id="stayType"
                  placeholder="Select"
                  class="w-full text-sm text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary "
                >
                  <option>FB</option>
                  <option>BB</option>
                </select>
              </div>
              <div class="field col-12 md:col-4 text-sm">
                <label for="roomSuite">Room Suite</label>
                <select
                  id="roomSuite"
                  placeholder="Select"
                  class="w-full text-sm text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary"
                >
                  <option>Standard</option>
                  <option>Deluxe</option>
                </select>
              </div>
              <div class="field col-12 md:col-4 text-sm">
                <label for="roomNo">Room No</label>
                <select
                  id="roomNo"
                  placeholder="Select"
                  class="w-full text-sm text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary "
                >
                  <option>12</option>
                  <option>23</option>
                  <option>45</option>
                  <option>46</option>
                  <option>48</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
