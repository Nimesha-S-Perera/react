import React, { useEffect, useState } from "react";
import axios from "axios";

function RoomList() {
    const [taxRate, setTaxRate] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/tax").then((response) => {
            const taxData = response.data.data[0];
            setTaxRate(taxData.taxRate);
        });
    }, []);

    return (
        <label>
            TAx: {taxRate}
        </label>
    );
}


export default RoomList;

