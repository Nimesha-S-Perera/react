export function StayTypeValidation(stayType) {
    let error = "";
    if (!stayType) {
        error = "Please select stay type.";
    } else {
        error = "";
    }
    return error;
};