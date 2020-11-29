import React, { useEffect, useState } from 'react';
// import { getUserBookings } from '../api/api';

const MyBookings = () => {
    const [state, updateState] = useState({
        username:JSON.parse(localStorage.getItem("signupData")).username,
        type:"",
        checkIn:"",
        checkOut:"",
        persons:"",
        children:"",
        payment:""
    })

    useEffect(() => {
        if(localStorage.getItem("signupData")){
            
            const data=state

            if(data.username){
                fetch("http://localhost:5000/profile", {
                    method: 'POST',
                    headers:{ 'Content-Type':'application/json' },
                    body: JSON.stringify(data)
                })
                .then((data) => data.json())
                .then(response => {
                    console.log("booking details: ", response)
                    updateState({
                                username:response.username,
                                type:response.bedroom,
                                checkIn:response.checkIn,
                                checkOut:response.checkOut,
                                persons:response.persons,
                                children:response.children,
                                payment:response.payment
                            })

                })
                .catch(err => {
                    console.log("error: ", err)
                })
            }
        }
    }, [])

    return (
        
        <div className="container shadow-sm p-3 mb-5  bg-white mt-5 fullH rounded border">
        <h2>Bookings</h2>
        <div className="">
            <div>
                
                <div>
                    <h5 className="d-inline">Beds</h5>
                    <h5 className="d-inline pl-5 ml-5">{state.type}</h5>
                    <hr />
                </div>
                <div>
                    <h5 className="d-inline">Check In</h5>
                    <h5 className="d-inline pl-5 ml-5">{state.checkIn}</h5>
                    <hr />
                </div>
                <div>
                    <h5 className="d-inline">Check Out</h5>
                    <h5 className="d-inline pl-5 ml-5">{state.checkOut}</h5>
                    <hr />
                </div>
                <div>
                    <h5 className="d-inline">Persons</h5>
                    <h5 className="d-inline pl-5 ml-5">{state.persons}</h5>
                    <hr />
                </div>
                <div>
                    <h5 className="d-inline">Children</h5>
                    <h5 className="d-inline pl-5 ml-5">{state.children}</h5>
                    <hr />
                </div>
                <div>
                    <h5 className="d-inline">Payment</h5>
                    <h5 className="d-inline pl-5 ml-5">{state.payment}</h5>
                    <hr />
                </div>
            </div>
        </div>
    </div>

    )
}

export default MyBookings;