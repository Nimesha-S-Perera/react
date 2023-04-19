export function RoomNoValidation(roomNo) {
    let error = "";
    if (!roomNo) {
        error = "Please select a room number.";
    } else {
        error = "";
    }
    return error;
};