import moment from "moment-timezone";

export const ConvertDate = (checkInDate, checkOutDate) => {

    const checkInDateFromCalendar = checkInDate;
    const timezone = 'Asia/Colombo';
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const convertedCheckInDate = moment.tz(checkInDateFromCalendar, timezone).format(dateFormat);
    console.log(convertedCheckInDate)
    const checkOutDateFromCalendar = checkOutDate;
    const convertedCheckOutDate = moment.tz(checkOutDateFromCalendar, timezone).format(dateFormat);
    console.log(convertedCheckOutDate)

    return {convertedCheckInDate, convertedCheckOutDate};
};