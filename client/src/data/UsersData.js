import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {updateProfile} from '../api/api'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// let rows = [];

export default function BasicTable() {
    const [state,updateState]=useState({
      rows:[],
      edit: false,
      username: "",
      phoneNumber: "",
      name: "",
      email: ""
    })
    const classes = useStyles();

    // let rows=[];
    useEffect(() => {
      fetch("http://localhost:5000/generate-report/users")
        .then((data) => data.json())
        .then(response => {
            updateState({
              ...state,
              rows:response
            });
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
        
    
    const handleDelete = data => {
        console.log("delete user submit button", data.target.value)
        const reqData = {
          username: data.target.value
        }
        fetch(`http://localhost:5000/generate-report/delete-user`, {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reqData)
        })
        .then(reqData => reqData.json())
        .then(response => {
            console.log("delete user success ", response)
            if(response){
              window.location.reload()
            }

        })
        .catch(err => 
            console.log("delete user error:",err)
        )
    }

    const handelUpdate = () => {
      console.log("update room submit button")
      const data = {
        username: state.username,
        name: state.name,
        email: state.email,
        phoneNumber: state.phoneNumber
      }

      function allLetter(word)
      { 
      //   var letters = /^[A-Za-z]+$/;
        if (/^[a-zA-Z\s]*$/.test(word))
          return true;
        // alert("enter name correctly")
        return false;
      }

      const Validity = () => {
        return (
          data.name.length > 2 &&
          allLetter(data.name) &&
          data.email &&
          data.email.includes("@") &&
          data.email.includes(".") &&
          data.phoneNumber.length === 10
        );
      };

      if (!Validity()) {
        alert("Enter valid details!");
        return;
      } 
      console.log("inside handel update:", data)
        
      try{
        fetch(`http://localhost:5000/generate-report/update-user`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
        })
        .then(reqData => reqData.json())
        .then(response => {
            console.log("update user success ", response)
            if(response){
              alert("update successful!")
              window.location.reload()
            }

        })
        .catch(err => 
            console.log("update user error:",err)
        )


        // window.location.reload()
      }
      catch(e) {
        console.log("error:", e)
      }
      
    }

    const changeHandler = e => {
      console.log(e.target)
      const { name } = e.target;
      updateState({
          ...state,
          [name]: e.target.value
      });
    };

    const onEdit = (data) => {
      console.log("inside onEdit", data.target)
      const user = data.target.value
      if (!state.edit) {
          updateState({
              ...state,
              edit: true,
              username: data.target.value,
              email: state.rows.find(o => o.username === user).email,
              phoneNumber: state.rows.find(o => o.username === user).phoneNumber,
              name: state.rows.find(o => o.username === user).name
          });

      } else {
          updateState({
              ...state,
              edit: false,
              username: null,
          });
      }
    };

  return (
    <TableContainer component={Paper}>
        {console.log(state)}
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone Number</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
             { state.rows.map((row) => (
              state.edit &&  row.username === state.username ? (
                    <TableRow key={row.username}>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="name"
                                        className="d-inline pl-5"
                                        placeholder={row.name}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row" >
                                    <input
                                        name="username"
                                        className="d-inline pl-5 "
                                        value={row.username}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                      name="email"
                                      className="d-inline pl-4"
                                      placeholder={row.email}
                                      onChange={changeHandler}
                                      required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                      name="phoneNumber"
                                      type="number"
                                      className="d-inline pl-5 "
                                      placeholder={row.phoneNumber}
                                      onChange={changeHandler}
                                      required
                                    />
                        </TableCell>
                        <TableCell>
                            <span onClick={handelUpdate}>
                                <button className="btn btn-outline-dark">Confirm</button>
                            </span>
                        </TableCell>
                    </TableRow>
               ) : (
                 row.username !== "admin" && row.username !== "deo" &&
                    <TableRow key={row.username}>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell align="right">{row.username}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.phoneNumber}</TableCell>
                        <TableCell><button value={row.username} className="btn btn-outline-dark" onClick={handleDelete}>&#128465;</button></TableCell>
                        <TableCell>
                            <span onClick={onEdit}>
                                <button value={row.username} className="btn btn-outline-dark">&#9998;</button>
                            </span>
                        </TableCell>
                    </TableRow>
               )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
