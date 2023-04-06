import React from 'react'; 
import { Button } from 'primereact/button';


export default function CheckinButton() {
    return (
        <div className="card">
            <Button label="New Check-In" type="submit" size="small" />
        </div>
    )
}