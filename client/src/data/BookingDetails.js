import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
    const [state,updateState] = useState({
      rows: [],
      edit: false,
      username: null,
      allotedRoomNumber: null,
      checkIn: null,
      checkOut: null,
      persons: null,
      children: null,
      payment: null,
      bedroom: null
    })
    const classes = useStyles();

    // let rows=[];

    useEffect(() => {
        console.log("inside useEffect of bok")
      fetch("http://localhost:5000/generate-report/bookingDetails")
      .then((data) => data.json())
      .then(response => {
          console.log(response)
          updateState({
            ...state,
            rows:response
          });
      })
      .catch(err => {
          console.log(err)
      })
    }, [])
        
    const handelDelete = data => {
      console.log("delete room submit button", data.target.value)
      const reqData={
        username: data.target.value
      }
        fetch(`http://localhost:5000/generate-report/delete-bookingDetails`, {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reqData)
        })
        .then(reqData => reqData.json())
        .then(response => {
            console.log("delete room success ", response)
            // if(response){
            //   window.location.reload()
            // }
            // else{
            //   alert("Error while deleting room");
            // }
            window.location.reload()
        })
        .catch(err => 
            console.log("delete room error:",err)
        )
    }

    const handelUpdate = () => {
      console.log("update room submit button")

      const data = {
        username: state.username,
        allotedRoomNumber: state.allotedRoomNumber,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        persons: state.persons,
        children: state.children,
        payment: state.payment,
        bedroom: state.bedroom
      }

      console.log("inside handel update:", data)
        fetch(`http://localhost:5000/generate-report/update-bookingDetails`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
        })
        .then(reqData => reqData.json())
        .then(response => {
            console.log("update room success ", response.success)
            if(response.success){
              alert("update successful!")
            //   window.location.reload()
            }
            else{
                alert("enter valid details!")
            }

        })
        .catch(err => 
            console.log("update room error:",err)
        )
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
      console.log("inside onEdit", data.target.value)
      if (!state.edit) {
        var result = state.rows.filter(rows => {
          return rows.username === data.target.value
        })

        console.log("data: ",result[0])

          updateState({
              ...state,
              edit: true,
              username: data.target.value,
              checkIn: result[0].checkIn,
              checkOut: result[0].checkOut,
              children: result[0].children,
              payment: result[0].payment,
              bedroom: result[0].bedroom,
              persons: result[0].persons
          });

          console.log(state.edit)
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
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            {/* <TableCell >Room Type</TableCell> */}
            <TableCell >Alloted Room</TableCell>
            <TableCell >Check In</TableCell>
            <TableCell >Check Out</TableCell>
            <TableCell >Persons</TableCell>
            <TableCell >Children</TableCell>
            <TableCell >Payment</TableCell>
            <TableCell>Beds</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
             { state.rows.map((row) => (
               state.edit && row.username === state.username ? (
                    <TableRow key={row.username}>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="username"
                                        className="d-inline pl-5"
                                        value={row.username}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                      name="allotedRoomNumber"
                                      className="d-inline pl-5 "
                                      placeholder={row.allotedRoomNumber}
                                      onChange={changeHandler}
                                      required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="checkIn"
                                        className="d-inline pl-5"
                                        value={row.checkIn}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="checkOut"
                                        className="d-inline pl-5"
                                        value={row.checkOut}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="persons"
                                        className="d-inline pl-5"
                                        type="number"
                                        placeholder={row.persons}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="children"
                                        className="d-inline pl-5"
                                        type="number"
                                        placeholder={row.children}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="payment"
                                        type="number"
                                        className="d-inline pl-5"
                                        placeholder={row.payment}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="bedroom"
                                        type="number"
                                        className="d-inline pl-5"
                                        placeholder={row.bedroom}
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
                    <TableRow key={row.username}>
                        <TableCell component="th" scope="row">{row.username}</TableCell>
                        <TableCell>{row.allotedRoomNumber}</TableCell>
                        <TableCell>{row.checkIn}</TableCell>
                        <TableCell>{row.checkOut}</TableCell>
                        <TableCell>{row.persons}</TableCell>
                        <TableCell>{row.children}</TableCell>
                        <TableCell>{row.payment}</TableCell>
                        <TableCell>{row.bedroom}</TableCell>
                        <TableCell>
                            <button value={row.username} className="btn btn-outline-dark" onClick={handelDelete}>&#128465;</button>
                        </TableCell>
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
