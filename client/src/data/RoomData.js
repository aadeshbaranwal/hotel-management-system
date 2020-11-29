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
      roomnumber: null,
      roomtype: null,
      roomfloor: null,
      bedroom: null,
      price: null,
      booked: null
    })
    const classes = useStyles();

    // let rows=[];

    useEffect(() => {
      fetch("http://localhost:5000/generate-report/rooms")
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
        roomnumber: data.target.value
      }
        fetch(`http://localhost:5000/generate-report/delete-room`, {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reqData)
        })
        .then(reqData => reqData.json())
        .then(response => {
            console.log("delete room success ", response)
            if(response){
              window.location.reload()
            }
            else{
              alert("Error while deleting room");
            }
        })
        .catch(err => 
            console.log("delete room error:",err)
        )
    }

    const handelUpdate = () => {
      console.log("update room submit button")

      const data = {
        roomnumber: state.roomnumber,
        roomfloor: state.roomfloor,
        roomtype: state.roomtype,
        bedroom: state.bedroom,
        price: state.price,
        booked: state.booked
      }

      console.log("data:",data)

      const Validity = () => {
        return (
          data.roomfloor < 10 &&
          data.bedroom < 5 &&
          data.bedroom > 0
        );
      };

      if (!Validity()) {
        alert("Enter valid details!");
        return;
      } 

      if(data.booked !== "true" && data.booked !== "false"){
        alert("Enter valid details!")
        return;
      }

      console.log("inside handel update:", data)
        fetch(`http://localhost:5000/generate-report/update-room`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
        })
        .then(reqData => reqData.json())
        .then(response => {
            console.log("update room success ", response)
            if(response){
              alert("update successful!")
              window.location.reload()
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
          return rows.roomnumber === data.target.value
        })
        console.log("result", result[0])
        updateState({
            ...state,
            edit: true,
            roomnumber: data.target.value,
            bedroom: result[0].bedroom,
            price: result[0].price,
            booked: result[0].booked.toString(),
            roomfloor: result[0].roomfloor
        });

          console.log(state)
      } else {
          updateState({
              ...state,
              edit: false,
              roomnumber: null,
          });
      }
    };
    
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Room Number</TableCell>
            {/* <TableCell >Room Type</TableCell> */}
            <TableCell >Room Floor</TableCell>
            <TableCell >Beds</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >Booking Status</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
             { state.rows.map((row) => (
               state.edit && row.roomnumber === state.roomnumber ? (
                    <TableRow key={row.roomnumber}>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="roomnumber"
                                        className="d-inline pl-5"
                                        value={row.roomnumber}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                      name="roomfloor"
                                      type="number"
                                      className="d-inline pl-5 "
                                      placeholder={row.roomfloor}
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
                        <TableCell component="th" scope="row">
                                    <input
                                        name="price"
                                        type="number"
                                        className="d-inline pl-5"
                                        placeholder={row.price}
                                        onChange={changeHandler}
                                        required
                                    />
                        </TableCell>
                        <TableCell component="th" scope="row">
                                    <input
                                        name="booked"
                                        className="d-inline pl-5"
                                        placeholder={row.booked.toString()}
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
                    <TableRow key={row.roomnumber}>
                        <TableCell component="th" scope="row">{row.roomnumber}</TableCell>
                        {/* <TableCell component="th" scope="row" >{row.roomtype}</TableCell> */}
                        <TableCell>{row.roomfloor}</TableCell>
                        <TableCell>{row.bedroom}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.booked.toString()}</TableCell>
                        <TableCell>
                            <button value={row.roomnumber} className="btn btn-outline-dark" onClick={handelDelete}>&#128465;</button>
                        </TableCell>
                        <TableCell>
                            <span onClick={onEdit}>
                                <button value={row.roomnumber} className="btn btn-outline-dark">&#9998;</button>
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
