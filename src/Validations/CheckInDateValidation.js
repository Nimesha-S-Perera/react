export function CheckInDateValidation(checkInDate) {
    let error = "";
    if (!checkInDate) {
        error = "Please select check-in date.";
    } else {
        error = "";
    }
    return error;
};