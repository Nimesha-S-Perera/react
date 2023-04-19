export function CheckOutDateValidation(checkOutDate,checkInDate) {
    let error = "";
    if (!checkOutDate) {
        error = "Please select check-out date.";
    } else if(checkOutDate < checkInDate){
        error = "Check out date cannot be a date before check in date.";
    } else {
        error = "";
    }
    return error;
};