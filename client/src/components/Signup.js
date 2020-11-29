import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addNewuser } from "../api/api";

const Signup = props => {

    const [state, updateState] = useState({
        username:"",
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phoneNumber: ""
    });


    const changeHandler = e => {
        const { name } = e.target;
        // console.log(e.target.value)
        updateState({
            ...state,
            [name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (validityCheck()) {

            const signupData = {
                username: state.username,
                email: state.email,
                password: state.password,
                name: state.name,
                phoneNumber: state.phoneNumber
            };

            console.log("dbdata", JSON.stringify(signupData))

            try {
                console.log("dbdata", JSON.stringify(signupData))
                addNewuser(signupData);

                alert('Details Submitted Successfully')
                window.location.reload();
            } catch (e) {
                console.log(e.message);
                alert("User can't be created");
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
        return (
            state.name.length > 2 &&
            allLetter(state.name) &&
            state.email &&
            state.email.includes("@") &&
            state.email.includes(".") &&
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
        <div className="signup-form">
            {/* <form > */}
            <div className="card bg-light">
                <article className="card-body ">
                    <h4 className="card-title mt-3 text-center">Create Account</h4>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-envelope" />{" "}
                            </span>
                        </div>
                        <input
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            type="text"
                            required
                            value={state.username}
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
                            name="email"
                            className="form-control"
                            placeholder="Email Address"
                            type="email"
                            required
                            value={state.email}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-lock" />{" "}
                            </span>
                        </div>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            value={state.name}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-lock" />{" "}
                            </span>
                        </div>
                        <input
                            className="form-control"
                            type="number"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            required
                            value={state.phoneNumber}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-lock" />{" "}
                            </span>
                        </div>
                        <input
                            name="password"
                            className="form-control"
                            placeholder="Create Password"
                            type="password"
                            required
                            value={state.password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {" "}
                                <i className="fa fa-lock" />{" "}
                            </span>
                        </div>
                        <input
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm Password"
                            type="password"
                            required
                            value={state.confirmPassword}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="text-left font-italic mb-2">
                        <small id="passwordHelpBlock" class="form-text text-muted">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</small>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" onClick={handleSubmit}>
                            {" "}
                            Create Account{" "}
                        </button>
                    </div>
                    <p className="text-center text-muted small">
                        Already have an account?{" "}
                        <Link to="#" onClick={props.handleSave}>
                            Sign in here!
              </Link>
                    </p>
                </article>
            </div>
            {/* </form> */}
        </div>
    );
};

export default Signup;
