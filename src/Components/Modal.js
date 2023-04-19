import React, {useEffect, useState, useRef, Children} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Calendar} from 'primereact/calendar';
import {config} from "../config/config";
import axios from '../Axios/AxiosInstance';
import {Dropdown} from "primereact/dropdown";
import {Toast} from 'primereact/toast';
import {Card} from 'primereact/card';
import AsteriskSign from './AsteriskSign';
import {NameValidation} from "../Validations/NameValidation";
import {NICValidation} from "../Validations/NICValidation";
import {ContactNumberValidation} from "../Validations/ContactNumberValidation";
import {CheckInDateValidation} from "../Validations/CheckInDateValidation";
import {CheckOutDateValidation} from "../Validations/CheckOutDateValidation";
import {StayTypeValidation} from "../Validations/StayTypeValidation";
import {RoomTypeValidation} from "../Validations/RoomTypeValidation";
import {RoomNoValidation} from "../Validations/RoomNoValidation";
import {Payments} from "../Utilities/Payments";
import {ConvertDate} from "../Utilities/ConvertDate";
import {BookingsDataTable,FetchData} from "../Components/BookingsDataTable";
import {RoomTypeEnum} from "../Utilities/RoomTypeEnum";
import {StayTypeEnum} from "../Utilities/StayTypeEnum";


export default function ModalForCheckIn({onClick},props) {


    //Toasts
    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Guest checked-in successfully',
            life: 3000
        });
    }
    const showWarn = () => {
        toast.current.show({severity: 'warn', summary: 'Warning', detail: 'Incomplete check-in', life: 3000});
    }
    const showWarnNoRoomsAvailable = () => {
        toast.current.show({
            severity: 'warn',
            summary: 'Warning',
            detail: 'There are no rooms available for the selected room suite',
            life: 3000
        });
    }

    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [nic, setNic] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    let [stayType, setStayType] = useState('');
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
    let [roomType, setRoomType] = useState(null);
    const [roomNos, setRoomNos] = useState([]);

    const {convertedCheckInDate, convertedCheckOutDate} = ConvertDate(checkInDate, checkOutDate);

    const handleRoomNoChange = (event) => {
        setRoomNo(event.target.value);
    };

    const handleRoomTypeChange = async (event) => {
        const selectedRoomType = event.target.value;
        setRoomType(selectedRoomType);
        try {
            const response = await axios.get(`${config.ABC_hotel_check_in_system}/rooms/available/?roomType=${selectedRoomType}`);
            console.log(response.data);
            if (response.data.length == 0) {
                showWarnNoRoomsAvailable();
            }
            setRoomNos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    console.log('roomtypeafterenum=',roomType);
    console.log('staytypeafterenum=',stayType);
    const handleStayTypeChange = (event) => {
        setStayType(event.value);
    };
    console.log('stayTypeaftenenum',stayType)

    const handleCheckInDateSelect = (event) => {
        setCheckInDate(event.value);
        validateCheckInDate();
    };

    const handleCheckOutDateSelect = (event) => {
        setCheckOutDate(event.value);
        validateCheckOutDate();
    };

    //To get the tax rate
    const [taxRate, setTaxRate] = useState(null);
    const [packageStayType, setPackageStayType] = useState(null);

    useEffect(() => {
        axios.get(`${config.ABC_hotel_check_in_system}/tax`).then((response) => {
            const taxData = response.data.data[0];
            setTaxRate(taxData.taxRate);
        });
    }, []);



    const [matchingPackageID, setMatchingPackageID] = useState(null);
    const [matchingPackagePrice, setMatchingPackagePrice] = useState(null);
    useEffect(() => {
        if(stayType == 0 ){
            stayType = StayTypeEnum[0];
        }else if(stayType == 1){
            stayType = StayTypeEnum[1];
        }else {
            stayType = "Stay type not found";
        }
        if(roomType == 0 ){
            roomType = RoomTypeEnum[0];
        }else if(roomType == 1){
            roomType = RoomTypeEnum[1];
        }else {
            roomType = "Stay type not found";
        }
        axios
            .get(`${config.ABC_hotel_check_in_system}/packages`)
            .then((response) => {
                const packageDetails = response.data.data;
                const matchingPackages = packageDetails.filter(
                    (pkg) => pkg.stayType === stayType && pkg.roomType === roomType

                );
                console.log(matchingPackages);
                if (matchingPackages.length > 0) {
                    matchingPackages.forEach((pkg) => {
                        console.log(`PackageID: ${pkg.id}, Price: ${pkg.price}`);
                        setMatchingPackagePrice(pkg.price);
                        setMatchingPackageID(pkg.id);
                    });
                } else {
                    console.log("No matching package found.");
                }
                setPackageStayType(packageDetails);
            });
    }, [stayType, roomType]);

    console.log(`price :${matchingPackagePrice}`);
    console.log(`PackageID :${matchingPackageID}`);

    const footerContent = (
        <div>
            <Button label="Check-In" type="submit" onClick={() => setVisible(false)}/>
        </div>
    );

    const PaymentDetails = Payments(checkInDate, checkOutDate, taxRate, matchingPackagePrice);
    const subtotal = PaymentDetails.subtotal;
    const tax = PaymentDetails.tax;
    const total = parseFloat(PaymentDetails.total);
    const thousandSepTotal = total.toLocaleString('en-US').replace(/,/g, ' ');


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
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
            packageID: matchingPackageID,
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
            onClick()
            showSuccess();

        } catch (error) {
            console.error(error);
            showWarn();
        }
    };

    //Validation
    const today = new Date();

    function validateName() {
        const error = NameValidation(name);
        setOnNameError(error);
    }

    function validateNIC() {
        const error = NICValidation(nic);
        setOnNicError(error);
    }

    function validateContactNumber() {
        const error = ContactNumberValidation(contactNumber);
        setonContactNumberError(error);
    }

    function validateCheckInDate() {
        const error = CheckInDateValidation(checkInDate);
        setOnCheckInDateError(error);
    }

    function validateCheckOutDate() {
        const error = CheckOutDateValidation(checkOutDate,checkInDate);
        setOnCheckOutDateError(error);
    }

    function validateStayType() {
        const error = StayTypeValidation(stayType);
        setOnStayTypeError(error);
    }

    function validateRoomType() {
        const error = RoomTypeValidation(roomType);
        setOnRoomTypeError(error);
    }

    function validateRoomNo() {
        const error = RoomNoValidation(roomNo);
        setOnRoomNoError(error);
    }

    function validateForm() {
        validateName();
        validateNIC();
        validateContactNumber();
        validateCheckInDate();
        validateCheckOutDate();
        validateStayType();
        validateRoomType();
        validateRoomNo();
    }

    const clearErrorMessageCheckInDate = () => {
        setOnCheckInDateError("");
    };

    const clearErrorMessageCheckOutDate = () => {
        setOnCheckOutDateError("");
    };

    const mindate = checkInDate ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000) : new Date();
    /*
    const [guestName,setGuestName] = useState("");
    const [guestContactNumber,setGuestContactNumber] = useState("");
    //to get existing guests
    const handleExistingGuests = async (event) => {
        const enteredNIC = event.target.value;
        setNic(enteredNIC);
        try {
            const response = await axios.get(`${config.ABC_hotel_check_in_system}/guest/exist/?nic=${enteredNIC}`);
            const guestData = response.data;
            setGuestName(guestData.name);
            setGuestContactNumber(guestData.contactNumber);
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    };
*/


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
                <Card>
                    <p className="m-0 text-base mb-4 font-normal">Guest Information</p>
                    <form onSubmit={handleSubmit} method="POST" action={""}>
                        <div className="card ">
                            <div className="formgrid grid ">
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="name">
                                        Name
                                        <AsteriskSign/>
                                    </label>
                                    <InputText
                                        id="name"
                                        className="p-field w-full"
                                        name="name"
                                        value={name}
                                        onKeyUp={validateName}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    {onNameError != '' ? (
                                        <label className="text-red-500" htmlFor="name">
                                            {onNameError}
                                        </label>) : null}
                                </div>
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="nic">
                                        NIC
                                        <AsteriskSign/>
                                    </label>
                                    <InputText
                                        id="nic"
                                        className="p-field w-full"
                                        value={nic}
                                        onKeyUp={validateNIC}
                                        onChange={(event) => setNic(event.target.value)}
                                    />
                                    {onNicError != '' ? (
                                        <label className="text-red-500" htmlFor="name">
                                            {onNicError}
                                        </label>) : null}
                                </div>
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="contactNumber">
                                        Contact Number
                                        <AsteriskSign/>
                                    </label>
                                    <InputText
                                        id="contactNumber"
                                        className="p-field w-full"
                                        value={contactNumber}
                                        onKeyUp={validateContactNumber}
                                        onChange={(event) => setContactNumber(event.target.value)}
                                    />
                                    {onContactNumberError != '' ? (
                                        <label className="text-red-500" htmlFor="name">
                                            {onContactNumberError}
                                        </label>) : null}
                                </div>
                            </div>
                            <p className="m-0 text-base mt-3 mb-4">Check In Details</p>
                            <div className="formgrid grid">
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="stayingPeriod">
                                        Staying Period
                                        <AsteriskSign/>
                                    </label>
                                    <Calendar
                                        placeholder="Start Date"
                                        className="p-field w-full"
                                        minDate={today}
                                        value={checkInDate}
                                        onChange={handleCheckInDateSelect}
                                        onClick={clearErrorMessageCheckInDate}
                                    />
                                    {onCheckInDateError != '' ? (
                                        <label className="text-red-500" htmlFor="name">
                                            {onCheckInDateError}
                                        </label>) : null}
                                </div>
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="stayingPeriod">
                                        <AsteriskSign/>
                                    </label>
                                    <Calendar
                                        placeholder="End Date"
                                        className="p-field w-full"
                                        minDate={mindate}
                                        value={checkOutDate}
                                        onChange={handleCheckOutDateSelect}
                                        onClick={clearErrorMessageCheckOutDate}
                                    />
                                    {onCheckOutDateError != '' ? (
                                        <label className="text-red-500" htmlFor="name">
                                            {onCheckOutDateError}
                                        </label>) : null}
                                </div>
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className=" flex flew-row gap-1" htmlFor="stayType">
                                        Stay Type
                                        <AsteriskSign/>
                                    </label>
                                    <div className="card flex justify-content-center flex-column">
                                        <Dropdown
                                            value={stayType}
                                            options={Object.entries(StayTypeEnum).map(([key, value]) => ({ label: value, value: key }))}
                                            onChange={handleStayTypeChange}
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Select"
                                            className="w-full md:w-14rem"
                                            defaultValue={null}
                                        />
                                        {onStayTypeError != '' ? (
                                            <label className="text-red-500" htmlFor="name">
                                                {onStayTypeError}
                                            </label>) : null}
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="roomSuite">
                                        Room Suite
                                        <AsteriskSign/>
                                    </label>
                                    <div className="card flex justify-content-center flex-column">
                                        <Dropdown
                                            value={roomType}
                                            options={Object.entries(RoomTypeEnum).map(([key, value]) => ({ label: value, value: key }))}
                                            onChange={handleRoomTypeChange}
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Select"
                                            className="w-full md:w-14rem"
                                            defaultValue={null}
                                        />
                                        {onRoomTypeError != '' ? (
                                            <label className="text-red-500" htmlFor="name">
                                                {onRoomTypeError}
                                            </label>) : null}
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className=" flex flew-row gap-1" htmlFor="roomNo">
                                        Room No
                                        <AsteriskSign/>
                                    </label>
                                    <div className="card flex justify-content-center flex-column">
                                        <Dropdown
                                            value={roomNo}
                                            onSelect={validateRoomNo}
                                            onChange={handleRoomNoChange}
                                            options={roomNos.map(roomNo => ({label: roomNo, value: roomNo}))}
                                            optionLabel="label"
                                            placeholder="Select"
                                            className="w-full md:w-14rem"
                                        />
                                        {onRoomNoError != '' ? (
                                            <label className="text-red-500" htmlFor="name">
                                                {onRoomNoError}
                                            </label>) : null}
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
                                            <label htmlFor="roomNo">LKR {thousandSepTotal}.00</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card flex justify-content-end">
                            <Toast ref={toast}/>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    //onClick={() => onClick()}
                                    label="Check-in"
                                    footer={footerContent}
                                    size="small"
                                    className="bg-primary outline-none"/>
                            </div>
                        </div>
                    </form>
                </Card>
            </Dialog>
        </div>
    );
};
