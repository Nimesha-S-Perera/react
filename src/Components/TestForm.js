import React, { useState } from "react";


function MyComponent() {
    const [name, setName] = useState("");
    const [nic, setNic] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [errors, setErrors] = useState({});

    function handleSubmit(event) {
        event.preventDefault();
        const errors = {};

        if (!name.match(/^[a-zA-Z\s]+$/)) {
            errors.name = "Name must only contain letters and spaces";
        }

        if (!nic.match(/^\d{5}-\d{7}-\d{1}$/)) {
            errors.nic = "Invalid NIC format";
        }

        if (!contactNumber.match(/^\d{10}$/)) {
            errors.contactNumber = "Invalid contact number format";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            // Submit the form
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                {errors.name && <span>{errors.name}</span>}
            </label>
            <label>
                NIC:
                <input type="text" value={nic} onChange={(event) => setNic(event.target.value)} />
                {errors.nic && <span>{errors.nic}</span>}
            </label>
            <label>
                Contact Number:
                <input type="text" value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} />
                {errors.contactNumber && <span>{errors.contactNumber}</span>}
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default MyComponent;