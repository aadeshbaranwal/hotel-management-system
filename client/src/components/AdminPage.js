import React from 'react';
import { Link } from 'react-router-dom';

//add user
//generate report
//add room

function AdminPage(){
    return(
        <div>
            <Link to="/signup">
                <button className="btn btn-primary login-btn btn-block">Add User</button>
            </Link>
            {/* <Link to="#">            
                <button>Add Staff</button>
            </Link> */}
            <br />
            <Link to="/generate-report">            
                <button className="btn btn-primary login-btn btn-block">Generate Report</button>
            </Link>
            <br />
            <Link to="/admin-page/addroom">
                <button className="btn btn-primary login-btn btn-block">Add Room</button>
            </Link>
        </div>
    )
}

export default AdminPage;