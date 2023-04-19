export function NameValidation(name) {
    let error = "";
    if (!name) {
        error = "Please enter a name.";
    } else if (/\d/.test(name)) {
        error = "Name cannot contain numbers.";
    } else {
        error = "";
    }
    return error;
};