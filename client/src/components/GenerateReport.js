import React from 'react'
import { Link } from 'react-router-dom';

function GenerateReport() {
    return(
        <div>
            <Link to="/generate-report/users"><button className="btn btn-primary btn-block">Users</button></Link>
            <br />
            <Link to="/generate-report/bookingDetails"><button className="btn btn-primary btn-block">Booking Details</button></Link>
            <br />
            <Link to="/generate-report/rooms"><button className="btn btn-primary btn-block">Rooms</button></Link>
        </div>
    )
}

export default GenerateReport;