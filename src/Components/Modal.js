import React, {useEffect, useState, useRef} from "react";
import moment from 'moment-timezone';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Calendar} from 'primereact/calendar';
import {config} from "../config/config";
import axios from 'axios';
import {Dropdown} from "primereact/dropdown";
import { Toast } from 'primereact/toast';


export default function ModalForCheckIn() {

    //Toast
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Guest checked-in successfully', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Incomplete checked-in', life: 3000});
    }

    const [visible, setVisible] = useState(false);

    const [name, setName] = useState('');
    const [nic, setNic] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [userID, setUserID] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [stayType, setStayType] = useState('');

    //To validate data
    const [onNameError, setOnNameError] = useState('');
    const [onNicError, setOnNicError] = useState('');
    const [onContactNumberError, setonContactNumberError] = useState('');
    const [onCheckInDateError, setOnCheckInDateError] = useState('');
    const [onCheckOutDateError, setOnCheckOutDateError] = useState('');
    const [onStayTypeError, setOnStayTypeError] = useState('');
    const [onRoomTypeError, setOnRoomTypeError] = useState('');
    const [onRoomNoError, setOnRoomNoError] = useState('');

    //To fetch available rooms
    const [roomType, setRoomType] = useState("");
    const [roomNos, setRoomNos] = useState([]);

    //date convert
    const checkInDateFromCalendar = checkInDate;
    const timezone = 'Asia/Colombo';
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const convertedCheckInDate = moment.tz(checkInDateFromCalendar, timezone).format(dateFormat);
    console.log(convertedCheckInDate)
    const checkOutDateFromCalendar = checkInDate;
    const convertedCheckOutDate = moment.tz(checkOutDateFromCalendar, timezone).format(dateFormat);
    console.log(convertedCheckOutDate)

    const handleRoomNoChange = (event) => {
        setRoomNo(event.target.value);
    };

    const handleRoomTypeChange = async (event) => {
        const selectedRoomType = event.target.value;
        setRoomType(selectedRoomType);
        try {
            const response = await axios.get(`${config.ABC_hotel_check_in_system}/rooms/available/?roomType=${selectedRoomType}`);
            console.log(response.data);
            setRoomNos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    //To insert new checkin
    const handleStayTypeChange = (event) => {
        const selectedStayType = event.target.value;
        setStayType(selectedStayType);
    };

    const handleCheckInDateSelect = (e) => {
        setCheckInDate(e.value);
    };

    const handleCheckOutDateSelect = (e) => {
        setCheckOutDate(e.value);
    };

    //To get the tax rate
    const [taxRate, setTaxRate] = useState(null);

    const [packageStayType, setPackageStayType] = useState(null);
    const [packageRoomSuite, setPackageRoomSuite] = useState(null);
    const [packageRoomNo, setPackageRoomNo] = useState(null);

    useEffect(() => {
        axios.get(`${config.ABC_hotel_check_in_system}/tax`).then((response) => {
            const taxData = response.data.data[0];
            setTaxRate(taxData.taxRate);
        });
    }, []);

    useEffect(() => {
        axios.get(`${config.ABC_hotel_check_in_system}/packages`).then((response) => {
            const PackageDetails = response.data.data;
            setPackageStayType(PackageDetails.PackageDetails);
            console.log(PackageDetails)
        });
    }, []);

    const footerContent = (
        <div>
            <Button label="Check-In" type="submit" onClick={() => setVisible(false)} autoFocus/>
        </div>
    );

    let ratePerNight = 0;
    if (stayType == "FB" && roomType == "Standard") {
        ratePerNight = 25000;
        console.log("25000")
    } else if (stayType == "FB" && roomType == "Deluxe") {
        ratePerNight = 40000;
        console.log("40000")
    } else if (stayType == "BB" && roomType == "Standard") {
        ratePerNight = 15000;
        console.log("15000")
    } else if (stayType == "BB" && roomType == "Deluxe") {
        ratePerNight = 25000;
        console.log("25000")
    }

    const diffInMs = Math.abs(checkInDate - checkOutDate); // difference in milliseconds
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    console.log(diffInDays); // Output: 5

    const subtotal = diffInDays * ratePerNight;
    console.log(subtotal)
    const tax = (taxRate / 100) * subtotal;
    //total = (100+Tax rate)% * Subtotal
    const total = subtotal + tax;

    console.log(name)
    console.log(nic)
    console.log(contactNumber)
    console.log(userID)
    console.log(checkInDate)
    console.log(checkOutDate)
    console.log(stayType)
    console.log(roomNo)

    const roomTypes = [
        {label: 'Standard', value: 'Standard'},
        {label: 'Deluxe', value: 'Deluxe'}
    ];

    const stayTypes = [
        {label: 'FB', value: 'FB'},
        {label: 'BB', value: 'BB'}
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!validateForm()){
            return
        }
        const data = {
            name: name,
            nic: nic,
            contactNumber: contactNumber,
            roomID: roomNo,
            userID: '2',
            checkInDate: convertedCheckInDate,
            checkOutDate: convertedCheckOutDate,
            stayType: stayType,
            packageID: '1',
            total: total,
        };
        console.log(data)

        try {
            const response = await axios.post(
                `${config.ABC_hotel_check_in_system}/add/checkin`,
                data
            );
            setName("");
            setNic("");
            setContactNumber("");
            setCheckInDate("");
            setCheckOutDate("");
            setStayType("");
            setRoomType("");
            setRoomNo("");

            console.log(response);
            showSuccess();
        } catch (error) {
            console.error(error);
            showError();

        }
    };

    function validateForm() {
        if (!name) {
            setOnNameError("Please enter valid name")
            return true;
        } else if (nic == "") {
            setOnNicError("Please enter valid nic")
            return false;
        } else if (contactNumber == "") {
            setonContactNumberError("Please enter valid contact number")
            return false;
        } else if (!convertedCheckInDate) {
            setOnCheckInDateError("Please enter valid data")
            return false;
        } else if (!convertedCheckOutDate) {
            setOnCheckOutDateError("Please enter valid data")
            return false;
        }  else if (!stayType) {
            setOnStayTypeError("Please enter valid data")
            return false;
        }  else if (!roomType) {
            setOnRoomTypeError("Please enter valid data")
            return false;
        }  else if (!roomNo) {
            setOnRoomNoError("Please enter valid data")
            return false;
        }
        return true;
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
                style={{width: "50rem"}}
                onHide={() => setVisible(false)}
            >

                <p className="m-0 text-base mb-4 font-normal">Guest Information</p>
                <form onSubmit={handleSubmit} method="POST" action={""}>
                    <div class="card gap-1">
                        <div class="formgrid grid">
                            <div class="field col-12 md:col-4 text-sm ">
                                <label className="ml-2" htmlFor="name">Name</label>
                                <InputText id="name"
                                           name="name" value={name}
                                           onChange={(event) => setName(event.target.value)} />
                                {onNameError != '' ? (<label style={{color:'red'}} className="ml-2" htmlFor="name">{onNameError}</label>) : null}
                            </div>
                            <div class="field col-12 md:col-4 text-sm">
                                <label className="ml-2" htmlFor="nic">NIC</label>
                                <InputText
                                    id="nic"
                                    value={nic}
                                    onChange={(event) => setNic(event.target.value)}
                                    //required
                                />
                                {onNicError != '' ? (<label style={{color:'red'}} className="ml-2" htmlFor="name">{onNicError}</label>) : null}
                            </div>
                            <div class="field col-12 md:col-4 text-sm ">
                                <label className="ml-2" htmlFor="contactNumber">Contact Number</label>
                                <InputText
                                    id="contactNumber"
                                    value={contactNumber}
                                    onChange={(event) => setContactNumber(event.target.value)}
                                    //required
                                />
                                {onContactNumberError != '' ? (<label style={{color:'red'}} className="ml-2" htmlFor="name">{onContactNumberError}</label>) : null}
                            </div>
                        </div>
                        <p className="m-0 text-base mt-3 mb-4">Check In Details</p>
                        <div class="formgrid grid">
                            <div class="field col-12 md:col-4 text-sm">
                                <label htmlFor="stayingPeriod">Staying Period</label>

                                <Calendar value={checkInDate}
                                          onChange={handleCheckInDateSelect}
                                            //required
                                />
                                {onCheckInDateError != '' ? (<label style={{color:'red'}} className="ml-2" htmlFor="name">{onCheckInDateError}</label>) : null}
                            </div>
                            <div class="field col-12 md:col-4 text-sm">
                                <label for="stayingPeriod">Staying Period</label>
                                <Calendar
                                    value={checkOutDate}
                                    onChange={handleCheckOutDateSelect}
                                    //required
                                />
                                {onCheckOutDateError != '' ? (<label style={{color:'red'}} className="ml-2" htmlFor="name">{onCheckOutDateError}</label>) : null}
                            </div>
                            <div class="field col-12 md:col-4 text-sm">
                                <label className="ml-2" htmlFor="stayType">Stay Type</label>
                                <div className="card flex justify-content-center">
                                    <Dropdown value={stayType}
                                              onChange={handleStayTypeChange}
                                              options={stayTypes}
                                              optionLabel="label"
                                             // required
                                              placeholder="Select" className="w-full md:w-14rem"/>
                                    {onStayTypeError != '' ? (<label style={{color:'red'}} className="ml-2" htmlFor="name">{onStayTypeError}</label>) : null}
                                </div>
                            </div>
                            <div class="field col-12 md:col-4 text-sm">
                                <label className="ml-2" htmlFor="roomSuite">Room Suite</label>
                                <div className="card flex justify-content-center">
                                    <Dropdown value={roomType}
                                              onChange={handleRoomTypeChange}
                                              options={roomTypes}
                                              optionLabel="label"
                                              //required
                                              placeholder="Select" className="w-full md:w-14rem"/>
                                    {onRoomTypeError != '' ? (<label style={{color:'red'}} className="ml-2" htmlFor="name">{onRoomTypeError}</label>) : null}
                                </div>

                            </div>
                            <div class="field col-12 md:col-4 text-sm">
                                <label className="ml-2" htmlFor="roomNo">Room No</label>
                                <div className="card flex justify-content-center">
                                    <Dropdown
                                        value={roomNo}
                                        onChange={handleRoomNoChange}
                                        options={roomNos.map(roomNo => ({label: roomNo, value: roomNo}))}
                                        optionLabel="label"
                                        placeholder="Select"
                                        //required
                                        className="w-full md:w-14rem"
                                    />
                                    {onRoomNoError != '' ? (<label style={{color:'red'}} className="ml-2" htmlFor="name">{onRoomNoError}</label>) : null}
                                </div>
                            </div>
                            <div className="flex field col-12 md:col-12 text-sm justify-content-end">
                                <div className="grid w-17rem">
                                    <div className="flex col-6 flex-column ">
                                        <label htmlFor="subTotal">Sub Total</label>
                                        <label htmlFor="tax">Tax {taxRate}%</label>
                                        <label htmlFor="total">Total</label>
                                    </div>
                                    <div className="flex col-6 flex-column text-right">
                                        <label htmlFor="roomNo">{subtotal}.00</label>
                                        <label htmlFor="roomNo">{tax}.00</label>
                                        <label htmlFor="roomNo">LKR {total}.00</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex field col-12 md:col-12 text-sm justify-content-end">
                        <div className="grid w-17rem justify-content-end">

                            <div className="card flex justify-content-center">
                                <Toast ref={toast} />
                                <div className="flex flex-wrap gap-2">
                                    <Button label="Check-in" footer={footerContent}  onClick={(handleSubmit) => setVisible(true)} size="small" className="bg-primary outline-none"  />
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    );
}
