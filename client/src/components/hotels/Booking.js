import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookRoom } from '../../api/api';

export default function Booking(props) {

    // const type=props.state.hotel.type
    console.log("booking props 1:",props)

    const [bookingDetails, udpateDetails] = useState({
        checkIn: "",
        checkOut: "",
        adults: 0,
        childs: 0,
        totalDays: 0,
        totalprice: 0,
        showBooking: true,
        dbooking: false,
        showPayment: false,
        bookingMsg: false, 
        username: "",
    })

    useEffect(() => {
        // const type = props.state.hotel.type
        udpateDetails({
            checkIn: "",
            checkOut: "",
            adults: 0,
            childs: 0,
            totalDays: 0,
            totalprice: 0,
            showBooking: true,
            dbooking: false,
            showPayment: false,
            bookingMsg: false,
            username: JSON.parse(localStorage.getItem("signupData")).username,
        });

    },[]);

    const username = JSON.parse(localStorage.getItem("signupData")).username;
    const bedRooms = props.state.hotel.bedRooms
    console.log(username, bedRooms)
    console.log("inside booking props: ", bookingDetails);
    const handleChange = (event) => {
        console.log(event.target.value)
        const { name } = event.target;
        // console.log(e.target.value)
        udpateDetails({
            ...bookingDetails,
            [name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        console.log(bookingDetails.checkOut)
        let totaldays = datediff(parseDate(bookingDetails.checkIn), parseDate(bookingDetails.checkOut))
        udpateDetails({
            ...bookingDetails,
            totalDays: totaldays,
            showBooking: false,
            dbooking: true
        });

        event.preventDefault()
    }

    const parseDate = (str) => {
        var mdy = str.split('-');
        return new Date(mdy);
    }

    const datediff = (first, second) => {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }


    const today = new Date();
    const date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    const checkOutD = (str) => {
        let DateStr = str.split('-')
        DateStr[2] = Number(DateStr[2]) + 1
        let d = new Date(DateStr[0], DateStr[1], DateStr[2])
        let chekOutD = d.getFullYear() + '-' + ('0' + (d.getMonth())).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
        return chekOutD
    }

    const getPrice = (price, totalDays, persons) => {
        let ans = price * persons
        let rate = ans * totalDays
        return rate
    }

    const confirmBooking = () => {
        udpateDetails({
            ...bookingDetails,
            dbooking: false,
            showPayment: true,
            totalprice: document.getElementById("totalPrice").innerHTML
        });
    }

    const confirmPayment = () => {
        const mm=document.getElementById("expiryDate1")
        const yy=document.getElementById("expiryDate2")
        const cvv=document.getElementById("cardCVV")
        if(!validateCardNumber() || cvv.value.length !== 3 
             || parseInt(mm.value) > 12 || parseInt(mm.value) < 1 || parseInt(yy.value) < 20){
            alert("Please enter card details correctly!")
            console.log(mm.value, yy.value, cvv.value)
            return;
        }

        if(document.getElementById("expiryDate1").value < 11 && document.getElementById("expiryDate2").value === 20){
            alert("Wrong card details!")
            return;
        }

        udpateDetails({
            ...bookingDetails,
            dbooking: false,
            showPayment: false,
            bookingMsg: true,
            // type: props.state.hotel.type,
            // username: JSON.parse(localStorage.getItem("signupData")).name
        });

        // Enter the data into the database

        console.log("hotel being booked is of type", bookingDetails);
        
        const type=props.state.hotel.type
        const id=props.state.hotel.id
        
        const res = bookRoom(bookingDetails, type, id, bedRooms);

        console.log("result",res)
        if(res){
            alert("Room booked succesfully!")
        }
    }

    function validateCardNumber() {
        let number = document.getElementById('cardNumber').value;
        var regex = new RegExp("^[0-9]{16}$");
        if (!regex.test(number)){
            alert("Card number is wrong")
            return false;
        }
    
        return luhnCheck(number);
    }
    
    function luhnCheck(val) {
        var sum = 0;
        for (var i = 0; i < val.length; i++) {
            var intVal = parseInt(val.substr(i, 1));
            if (i % 2 == 0) {
                intVal *= 2;
                if (intVal > 9) {
                    intVal = 1 + (intVal % 10);
                }
            }
            sum += intVal;
        }
        return (sum % 10) == 0;
    }
    
    return (
        <div>
            <section className={bookingDetails.showBooking ? "d-block" : "d-none"}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="input-group input-group-lg mt-5">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-lg">Check In</span>
                            </div>
                            <input type="date" min={date} name="checkIn" onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" required />
                        </div>
                        <div className="input-group input-group-lg mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-lg">Check Out</span>
                            </div>
                            <input type="date" min={checkOutD(bookingDetails.checkIn)} name="checkOut" onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" required />
                        </div>
                        <div className="d-flex">
                            <div className="input-group input-group-lg mt-3 m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-lg">Persons</span>
                                </div>
                                <input type="number" min="1" max={props.state.hotel.maximumAdultsAllow} name="adults" onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" required />
                            </div>
                            <div className="input-group input-group-lg mt-3 m-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-lg">Childs</span>
                                </div>
                                <input type="number" min="0" max={props.state.hotel.maximumChildsAllow} name="childs" onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" required />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-lg btn-block btn-danger mt-4">Book Now</button>

                    </div>
                </form>
            </section>
            <section className={bookingDetails.dbooking ? "d-block" : "d-none"}>

                <table className="table table-borderless">
                    <tbody>

                        <tr>
                            <th>Check In</th>
                            <td><h4>{bookingDetails.checkIn}</h4></td>
                        </tr>
                        <tr>
                            <th>Check Out</th>
                            <td><h4>{bookingDetails.checkOut}</h4></td>
                        </tr>
                        <tr>
                            <th>No. of Persons</th>
                            <td><h4>{bookingDetails.adults}</h4></td>
                        </tr>
                        <tr>
                            <th>No. of Childs</th>
                            <td><h4>{bookingDetails.childs}</h4></td>
                        </tr>
                        <tr>
                            <th>Total Days</th>
                            <td><h4>{bookingDetails.totalDays}</h4></td>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td><h4 id="totalPrice">
                                {undefined}{getPrice(props.state.hotel.price, bookingDetails.totalDays, bookingDetails.adults)}
                            </h4></td>
                        </tr>

                    </tbody>

                </table>

                <button className="btn btn-info btn-block rounded" onClick={confirmBooking}>Confirm Booking</button>
            </section>

            <section className={bookingDetails.showPayment ? "d-block" : "d-none"}>
                <div className="card text-dark" style={{ width: "24rem" }} >
                    <div className="card-header">
                        <div className="row my-0">
                            <h5 className="mt-1 font-weight-bold" >Payment Details</h5>
                            <div className="display-td" >
                                <img className="img-responsive pull-right" src="http://i76.imgup.net/accepted_c22e0.png" alt="" />
                            </div>
                        </div>
                    </div>


                    <div className="card-body">

                        <label htmlFor="cardNumber">Card Number</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="cardNumber" placeholder="Valid card number" aria-describedby="basic-addon2"  />
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2"><i className="fa fa-credit-card"></i></span>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col">
                                <label htmlFor="expireDate">Expire Date </label>
                                <input type="number" id="expiryDate1" className="form-control"  placeholder="MM" />
                                <input type="number" id="expiryDate2" className="form-control" placeholder="YY" />
                            </div>
                            <div className="col">
                                <label htmlFor="cardCVV">CVV</label>
                                <input type="password" id="cardCVV" className="form-control" placeholder="CVV" />
                            </div>
                        </div>

                        <label htmlFor="AmountPay" className="mt-3">Amount to Pay</label>
                        <div className="input-group mb-2">
                            <div className="col mb-3">
                                <input type="text" value={bookingDetails.totalprice} className="form-control" placeholder="Ammout to Pay" readOnly />
                            </div>
                        </div>


                        <button href="#" className="btn btn-primary mt-3 btn-block" onClick={confirmPayment}>Confirm Payemnt</button>
                    </div>
                </div>

            </section>

            <section className={bookingDetails.bookingMsg ? "d-block" : "d-none"}>
                {/* <img src="https://i.ibb.co/sQrBnc9/b60fb214-e35f-4474-957c-6e63120e66f5-200x200.png" alt="" /> */}
                {/* <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Booking Done!</h4>
                    <h5>{username}</h5>
                    <p>Thank you for your booking and that you have chosen our hotel.</p>
                    <hr />
                    {/* <p className="mb-0">Please note that you can make changes or cancellations of your booking. This request should be solely communicated in writing an Email to buchung@hotel-oxot.de . </p> */}
                    {/* <Link to="/home"><p className="alert-link">Go to Home</p></Link> */}
                {/* </div> */} 
            </section >
        </div >
    )
}
