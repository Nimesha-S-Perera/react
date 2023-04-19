export const Payments = (checkInDate, checkOutDate, taxRate, matchingPackagePrice) => {

    const diffInMs = Math.abs(checkInDate - checkOutDate); // difference in milliseconds
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    console.log(`dates:${diffInDays}`);
    const subtotal = diffInDays * matchingPackagePrice;
    const thousandSepSubtotal = subtotal.toLocaleString('en-US').replace(/,/g, ' ');
    console.log(`subtotal:${subtotal}`);
    const tax = (taxRate / 100) * subtotal;
    let thousandSepTax = tax.toLocaleString('en-US').replace(/,/g, ' ');
    const total = subtotal + tax;

    return {subtotal: thousandSepSubtotal, tax: thousandSepTax, total: total};
};