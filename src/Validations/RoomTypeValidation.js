export function RoomTypeValidation(roomType) {
    let error = "";
    if (!roomType) {
        error = "Please select room type.";
    } else {
        error = "";
    }
    return error;
};