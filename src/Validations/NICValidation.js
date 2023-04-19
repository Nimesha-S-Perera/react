export function NICValidation(nic) {
    let error = "";
    if (!nic) {
        error = "Please enter a NIC.";
    } else if (!(/^(\d{9}[vV]|\d{12})$/.test(nic))) {
        error = "Please enter valid NIC.";
    } else {
        error = "";
    }
    return error;
};