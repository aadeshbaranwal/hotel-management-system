const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./server_config/controllers')
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.post('/login', async (req, res) => {
    let result = {};
    try {
        const reqData = req.body;
        const validUser = await controllers.verifyLogin(reqData);
        if (!validUser) {
            console.log("invalid user")
            result.success = false;
        }
        else {
            result.success = true;
            result.user = validUser.dataValues
            console.log("valid user", validUser.dataValues)
        }

    } catch (err) {
        result.success = false;
        console.log('Error', err);
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.post("/admin-page/addroom", async (req,res) => {
    let result={}
    try{
        const reqData = req.body;
        const validDetails = await controllers.addroom(reqData)

        if(validDetails){
            console.log("room added successfullly");
            console.log("room details", req.body)
            result.success=true;
        }
        else{
            result.success=false
            console.log("room details not valid")
        }
    }
    catch (err) {
        result.success = false;
        console.log("err:", err)
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
});

app.post("/signup", async (req, res) => {
    let result = {}
    try {
        const reqData = req.body;
        const validDatails = await controllers.adduser(reqData)

        if (validDatails) {
            console.log("data", req.body)
            console.log("User Added Successfully")
            result.success = true;
        } else {
            console.log("User Details not valid")
            result.success = false;
        }
    }

    catch (err) {
        result.success = false;
        console.log("err", err)
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
});


app.get("/generate-report/users", async (req, res) => {

    const userRows = await controllers.readUsersData();
    console.log("all users", userRows)
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(userRows))
});

app.get("/generate-report/rooms", async (req, res) => {

    const roomRows = await controllers.readRoomData();
    console.log("all rooms", roomRows)
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(roomRows))
});

app.get("/generate-report/bookingDetails", async (req, res) => {
    try{
    const roomRows = await controllers.readBookingDetails();
    console.log("all booking details", roomRows)
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(roomRows))
    }
    catch(err){
        console.log("error:", err)
    }
});

app.delete("/generate-report/delete-room", async(req, res) => {
    let result={}
    try{
        console.log("enterred delete room interface", req.body)
        const reqData=req.body.roomnumber
        console.log("delete rrom", reqData);
        const status = await controllers.deleteRoom(reqData)
        if(status){
            console.log("deleted room!!!")
            result.success=true
        }
        else{
            console.log("room does not exist")
            result.success=false
        }
    }

    catch(err){
        console.log(err)
        result.success=false
    }

    finally {
        res.setHeader('content-type', "application/json")
        res.send(JSON.stringify(result))
    }
})

app.delete("/generate-report/delete-bookingDetails", async(req, res) => {
    let result={}
    try{
        console.log("enterred delete bookingDetails interface", req.body)
        const reqData=req.body.username
        console.log("delete rrom", reqData);
        const status = await controllers.deleteBookingDetails(reqData)
        if(status){
            console.log("deleted bookingDetails!!!")
            result.success=true
        }
        else{
            console.log("bookingDetails does not exist")
            result.success=false
        }
    }

    catch(err){
        console.log(err)
        result.success=false
    }

    finally {
        res.setHeader('content-type', "application/json")
        res.send(JSON.stringify(result))
    }
})


app.delete("/generate-report/delete-user", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body.username;
        const deletedUser = await controllers.deleteuser(reqJson)
        if (deletedUser) {
            console.log(reqJson)
            result.success = true;
        } else {
            console.log("somthing went wrong in delete user")
            result.success = false;
        }
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/user/:id", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        const reqId = reqJson.username
        const valid = await controllers.updateuser(reqJson, reqId)
        console.log("reqData", reqJson)
        if (valid) {
            console.log("update succecssfully")
            result.success = true;
            result.user = valid.dataValues
        } else {
            console.log("User Updating False")
            result.success = false;
        }
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/generate-report/update-room", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        // console.log("reqJson:", reqJson)
        const valid = await controllers.updateroom(reqJson)
        console.log("reqData", reqJson)
        if (valid) {
            console.log("updated room succecssfully")
            result.success = true;
        } else {
            console.log("Room Updating False")
            result.success = false;
        }
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/generate-report/update-bookingDetails", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        // console.log("reqJson:", reqJson)
        const valid = await controllers.updateBookingDetails(reqJson)
        console.log("reqData", reqJson)
        if (valid) {
            console.log("updated bookingDetails succecssfully")
            result.success = true;
        } else {
            console.log("bookingDetails Updating False")
            result.success = false;
        }
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.put("/generate-report/update-user", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        // console.log("reqJson:", reqJson)
        const valid = await controllers.updateUserDetails(reqJson)
        console.log("reqData", reqJson)
        if (valid) {
            console.log("updated userDetails succecssfully")
            result.success = true;
        } else {
            console.log("userDetails Updating False")
            result.success = false;
        }
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.post("/profile", async (req,res) => {
    let result={}
    
    try {
        const reqData=req.body
        const bookingDetails = await controllers.bookingDetails(reqData)

        console.log("bookingDetails: ", bookingDetails)

        if(bookingDetails){
            // console.log("booking details success")
            result.success=true;
            res.setHeader('content-type','application/json')
            console.log(bookingDetails[0].dataValues)

            res.send(JSON.stringify(bookingDetails[0].dataValues))
        } else {
            // console.log("booking details failed")
            result.success=false
            res.send(JSON.stringify(result))
        }
    }
    catch(e) {
        result.success = false;
        res.setHeader('content-type','application/json')
        res.send(JSON.stringify(result))
    }
})

app.put("/roomView/:id", async (req,res) => {
    let result={}

    try{
        const reqData = req.body
        const valid = await controllers.addBookingDetails(reqData)

        if(valid){
            // console.log("booking details added successfully")
            result.success = true
        } else {
            console.log("adding booking details failed")
            result.success = false
        }
    }
    catch(err){
        result.success=false
        // console.log("roomm view controller not working")
    }

    res.send(JSON.stringify(result))
})

app.listen(5000, () => {
    console.log("server running on port 5000")
})
