import React, { useState, useEffect } from "react";
import { updateProfile } from "../api/api"
import MyBookings from "./MyBookings"

export default function Profile() {

    const [state, updateState] = useState({
        edit: false,
        name: "",
        phoneNumber:"",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const onEdit = () => {
        if (!state.edit) {
            updateState({
                ...state,
                edit: true
            });
        } else {
            updateState({
                ...state,
                edit: false
            });
        }
    };

    const changeHandler = e => {
        console.log("profile changeHandler:", e.target)
        const { name } = e.target;
        updateState({
            ...state,
            [name]: e.target.value
        });
    };

    useEffect(() => {
        if (localStorage.getItem("signupData")) {
            let name = JSON.parse(localStorage.getItem("signupData")).name;
            let phoneNumber = JSON.parse(localStorage.getItem("signupData")).phoneNumber;
            let password = JSON.parse(localStorage.getItem("signupData")).password;
            let email = JSON.parse(localStorage.getItem("signupData")).email;

            updateState({
                name: name,
                phoneNumber: phoneNumber,
                password: password,
                email: email,
                confirmPassword: password
            })
        } else {
            alert("User could not be created");
        }
    }, [])


    const handleSubmit = () => {
        if (validityCheck()) {
            const profileData = {
                password: state.password,
                name: state.name,
                phoneNumber: state.phoneNumber,
                username: JSON.parse(localStorage.getItem("signupData")).username,
                email: state.email,
            };

            try {
                console.log("Profile Data", JSON.stringify(profileData))

                let username = JSON.parse(localStorage.getItem("signupData")).username;

                updateProfile(profileData, username)
                // window.location.reload();
            } catch (e) {
                console.log(e.message);
            }
        } else {
            alert("Enter valid Details");
        }
    };

    function allLetter(word)
    { 
    //   var letters = /^[A-Za-z]+$/;
      if (/^[a-zA-Z\s]*$/.test(word))
        return true;
    alert("enter name correctly")
    return false;
    }

    const validityCheck = () => {
        console.log("state:", state)
        return (
            state.name.length > 2 &&
            allLetter(state.name) &&
            state.phoneNumber.length === 10 &&
            state.password &&
            state.password.length > 6 &&
            state.confirmPassword &&
            state.password === state.confirmPassword &&
            checkPassword(state.password)
        );
    };
    const checkPassword = str => {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return true;
    };

    return (
        <>
            <div className="container shadow-sm p-3 mb-5  bg-white mt-5 fullH rounded border">
                <h2>Profile</h2>
                <h5 className="mb-5">Basic info, for a faster booking experience</h5>
                <div className="mb-4">
                    <h3 className="font-weight-bold">
                        Edit Profile{" "}
                        <span onClick={onEdit}>
                            <button className="btn btn-outline-dark">&#9998;</button>
                        </span>
                    </h3>
                </div>
                <div className="">
                    {!state.edit ? (
                        <div>
                            <div>
                                <h5 className="d-inline">Name</h5>
                                <h5 className="d-inline pl-5 ml-5">{state.name}</h5>
                                <hr />
                            </div>
                            <div>
                                <h5 className="d-inline">Phone Number </h5>
                                <h5 className="d-inline pl-5 ml-5">{state.phoneNumber}</h5>
                                <hr />
                            </div>
                            <div>
                                <h5 className="d-inline">Email id</h5>
                                <h5 className="d-inline pl-5 ml-5">{state.email}</h5>
                                <hr />
                            </div>
                            <div>
                                <h5 className="d-inline">Password</h5>
                                <h5 className="d-inline pl-5 ml-5">******</h5>
                                <hr />
                            </div>
                        </div>
                    ) : (
                            <div>
                                <div>
                                    <h5 className="d-inline">Name</h5>
                                    <input
                                        name="name"
                                        className="d-inline pl-5 ml-5"
                                        placeholder={JSON.parse(localStorage.getItem("signupData")).name}
                                        onChange={changeHandler}
                                        required
                                    />
                                    <hr />
                                </div>
                                <div>
                                    <h5 className="d-inline">Phone Number</h5>
                                    <input
                                        name="phoneNumber"
                                        className="d-inline pl-5 ml-5"
                                        type="number"
                                        placeholder={JSON.parse(localStorage.getItem("signupData")).phoneNumber}
                                        onChange={changeHandler}
                                        required
                                    />
                                    <hr />
                                </div>
                                <div>
                                    <h5 className="d-inline">Email id</h5>
                                    <h5 className="d-inline pl-5 ml-5">{state.email}</h5>
                                    <hr />
                                </div>
                                <div>
                                    <h5 className="d-inline">Password</h5>
                                    <input
                                        name="password"
                                        className="d-inline pl-5 ml-5"
                                        type="password"
                                        // value={state.password}
                                        placeholder="Password"
                                        onChange={changeHandler}
                                        required
                                    />
                                    <hr />
                                </div>
                                <div>
                                    <h5 className="d-inline">Confirm Password</h5>
                                    <input
                                        name="confirmPassword"
                                        className="d-inline pl-5 ml-5"
                                        placeholder="Confirm Password"
                                        type="password"
                                        onChange={changeHandler}
                                        required
                                    />
                                    <hr />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="btn p-2 btn-primary"
                                >
                                    Update
                                </button>
                            </div>
                        )}
                </div>
            </div>
            <MyBookings />
        </>
    );
}
