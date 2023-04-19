export function ContactNumberValidation(contactNumber) {
    let error = "";
    if (!contactNumber) {
        error = "Please enter contact number.";
    } else if (!/^\d+$/.test(contactNumber)) {
        error = "Contact number cannot contain letters";
    } else if (Number(contactNumber.charAt(0)) != 0 && contactNumber.length != 9 ) {
        error = "Please enter valid contact number.";
    } else if (Number(contactNumber.charAt(0)) == 0 && contactNumber.length != 10) {
        error = "Please enter valid contact number.";
    } else {
        error = "";
    }
    return error;
};