import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addRoom } from '../api/api';
// import data from '../data/data.json';

function AddRoom(){
    const [state,updateState] = useState({
        roomnumber:"",
        roomfloor:null,
        roomtype:null,
        bedRooms: null,
        price: null
    })

    const changeHandler = (e) => {
        const {name} = e.target
        updateState({
            ...state,
            [name]: e.target.value
        });
    };

    const handleSubmit = e => {
        const addRoomData = {
            roomnumber: state.roomnumber,
            roomfloor: state.roomfloor,
            roomtype: state.roomtype,
            bedRooms: state.bedRooms,
            price: state.price
        }

        const Validity = () => {
            return (
              addRoomData.roomfloor < 10 &&
              addRoomData.bedRooms < 5 &&
              addRoomData.bedRooms > 0
            );
          };
    
          if (!Validity()) {
            alert("Enter valid details!");
            return;
          } 

        try{
            // localStorage.setItem("signupData", JSON.stringify(response.user))
            localStorage.setItem("rooms",
                JSON.stringify({
                    "id": 8,
                    "hotelName": "Blue Ocean",
                    "city": "banglore",
                    "address": "671-2932 Nascetur Street",
                    "price": state.price,
                    "photos": "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    "wifi": "No",
                    "fitness_center": "Yes",
                    "parking": "Yes",
                    "swimmingPool": "No",
                    "imgUrl": "cbc@cbc.com",
                    "availableDate": "03/01/2020",
                    "contactNo": "+919216720542",
                    "description": "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "maximumAdultsAllow": 6,
                    "maximumChildsAllow": 4,
                    "country": "india",
                    "rating": 4,
                    "star": "1",
                    "propertyType": "hostel",
                    "bedRooms": state.bedRooms,
                    "availableRooms": 1,
                    "type": state.type
                })
            )
            addRoom(addRoomData);
            alert("Room added!")
        }
        catch(e){
            console.log(e.message)
            alert("Room can't be added")
        }
    }

    return (
        <div className="addroom-form"> 
            {/* <form > */}
            <div className="card bg-light">
                <article className="card-body ">
                    <h4 className="card-title mt-3 text-center">Create Room</h4>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-envelope" />{" "}
                            </span>
                        </div>
                        <input
                            name="roomnumber"
                            className="form-control"
                            placeholder="Room Number"
                            type="text"
                            required
                            value={state.roomnumber}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-envelope" />{" "}
                            </span>
                        </div>
                        <input
                            name="roomfloor"
                            className="form-control"
                            placeholder="Floor"
                            type="number"
                            required
                            value={state.roomfloor}
                            onChange={changeHandler}
                        />
                    </div>

                    {/* <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-envelope" />{" "}
                            </span>
                        </div>
                        <input
                            name="roomtype"
                            className="form-control"
                            placeholder="Room Type"
                            type="text"
                            required
                            value={state.roomtype}
                            onChange={changeHandler}
                        />
                    </div> */}
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-envelope" />{" "}
                            </span>
                        </div>
                        <input
                            name="bedRooms"
                            className="form-control"
                            placeholder="Beds"
                            type="number"
                            required
                            value={state.bedRooms}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-envelope" />{" "}
                            </span>
                        </div>
                        <input
                            name="price"
                            className="form-control"
                            placeholder="Room Price"
                            type="number"
                            required
                            value={state.price}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" onClick={handleSubmit}>
                            {" "}
                            Create Room{" "}
                        </button>
                        
                    </div>
                    <p className="text-center text-muted small">
                        <Link to="/admin-page">
                            Back!
                        </Link>
                    </p>
                </article>
            </div>
            {/* </form> */}
        </div>
    )
}

export default AddRoom;