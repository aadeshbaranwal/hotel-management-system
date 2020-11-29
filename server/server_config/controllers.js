const models = require('./db');
const usersModel=models.usersModel;
const roomModel=models.roomModel;
const bookingModel=models.bookingModel;

async function verifyLogin(data) {
    const { email, password } = data;
    try {
        const result = await usersModel.findOne({ where: { email: email } })

        if (!result || !(result.validPassword(password))) {
            console.log("invalid password")
            return false;
        }
        else {
            return result
        }
    } catch (err) {
        console.log("err", err);
        return false;
    }
}

async function addroom(data) {
    console.log(data)

    try { 
        await roomModel.create({
            roomnumber: data.roomnumber,
            roomfloor: data.roomfloor,
            roomtype: "null",
            price: data.price,
            bedroom: data.bedRooms,
        })
        return true;
    }
    catch (e) {
        console.log("err", e)
        return false;
    }
}

async function adduser(data) {
    console.log(data)
    try { 
        await usersModel.create({
            username: data.username,
            email: data.email,
            name: data.name,
            phoneNumber: data.phoneNumber,
            password: data.password,
        })
        return true;
    }
    catch (e) {
        console.log("err", e)
        return false;
    }
}

async function readUsersData() {
    try {
        const results = await usersModel.findAll();
        console.log("success", results)
        return results;
    }
    catch (e) {
        console.log(e)
        return [];
    }
}

async function readBookingDetails() {
    try {
        const results = await bookingModel.findAll();
        console.log("success", results)
        return results;
    }
    catch (e) {
        console.log(e)
        return [];
    }
}

async function readRoomData() {
    try {
        const results = await roomModel.findAll();
        console.log("success", results)
        return results;
    }
    catch (e) {
        console.log(e)
        return [];
    }
}

async function deleteuser(username) {

    try {
        await usersModel.destroy({
            where: {
                username: username
            }
        })

        console.log("deleted successfully")
        return true
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

async function updateuser(data, username) {
    console.log("inside update user")
    console.log(data, username)
    try {
        const userD = await usersModel.findOne({ where: { username: username } })
        console.log('sddsds1234', userD)

        if(!data.password){
            data.password=userD.password
        }
        
        await usersModel.update({
            name: data.name,
            phoneNumber: data.phoneNumber,
            password: data.password
        }, { where: { username: username } })
        // const userD = await usersModel.findOne({ where: { username: username } })
        return userD
    }
    catch (e) {
        console.log("err", e)
        return false;
    }
}

async function updateroom(data) {
    console.log("inside update room:",data)
    try {
        
        const userD = await roomModel.findOne({ where: { roomnumber: data.roomnumber } })

        if(userD){
            console.log('found room:', userD)
            await roomModel.update({
                roomnumber: data.roomnumber,
                bedroom: data.bedroom,
                roomfloor: data.roomfloor,
                price: data.price,
                booked: data.booked,
                roomtype: userD.roomtype 
            }, { where: { roomnumber: data.roomnumber } })

            return true
        }
        
        console.log("room not found")
        return false
    }
    catch (e) {
        console.log("err", e)
        return false;
    }
}

async function updateBookingDetails(data) {
    console.log(data)
    try {
        
        const userD = await bookingModel.findOne({ where: { username: data.username } })
        const roomD = await roomModel.findOne({ where: { username: data.username } })

        if(userD.allotedRoomNumber !== data.allotedRoomNumber){
            await roomModel.update({
                roomnumber: roomD.roomnumber,
                roomfloor: roomD.roomfloor,
                roomtype: "null",
                price: roomD.price,
                bedroom: roomD.bedroom,
                booked: false
            }, { where: { username: data.username } })
        }

        if(userD){
            console.log('found bookingDetails:', userD)
            await bookingModel.update({
                username: data.username,
                bedroom: data.bedroom,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                persons: data.persons,
                children: data.children,
                payment: data.payment,
                allotedRoomNumber: data.allotedRoomNumber 
            }, { where: { username: data.username } })

            return true
        }
        
        console.log("bookingDetails not found")
        return false
    }
    catch (e) {
        console.log("err", e)
        return false;
    }
}

async function updateUserDetails(data) {
    console.log("inside update user",data)
    try {
        
        const userD = await usersModel.findOne({ where: { username: data.username } })

        if(userD){
            console.log('found userDetails:', userD)
            await usersModel.update({
                email: data.email,
                phoneNumber: data.phoneNumber,
                name: data.name,
                password: userD.password,
                username: userD.username
            }, { where: { username: data.username } })

            return true 
        }
        
        console.log("bookingDetails not found")
        return false
    }
    catch (e) {
        console.log("err", e)
        return false;
    }
}


async function bookingDetails(data){
    console.log("inside controller of booking details")

    try{
        const results = await bookingModel.findAll({
            where: {
                username:data.username
            }
        });

        console.log("booking details" ,results)

        return results
    }
    catch(err){
        console.log("booking details error:", err)
        return false
    }
}

async function addBookingDetails(data){
    console.log("inside adding booking details controller:",data)
    
    try { 
        //find if any room of the required number of bedrooms are available
        const roomDetails = await roomModel.findOne({
            where: {
                bedroom: data.bedroom,
                booked: false
            }
        })

        console.log("chacking for available rooms: ",roomDetails)
        const roomNumber = roomDetails.roomnumber;

        if(roomNumber){
            console.log("found available room", roomNumber)

            roomModel.update({booked: true},{
                where : {
                    roomnumber: roomNumber
                }
            })

            await bookingModel.create({
                username: data.username,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                children: data.childs,
                persons: data.adults,
                payment: data.totalprice,
                bedroom: data.bedroom,
                allotedRoomNumber: roomNumber,
                bedroom: data.bedroom       
            })
            
            return true;
        }
        else {
            console.log("no available room found")
            return false;
        }
    }
    catch (e) {
        console.log("err", e)
        return false;
    }
}

async function deleteRoom(roomnumber){
    try {
        await roomModel.destroy({
            where: {
                roomnumber: roomnumber
            }
        })

        console.log("deleted room successfully", roomnumber)
        return true
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

async function deleteBookingDetails(username1){
    console.log("deleteBookingDetails:", username1)

    try {
        const bookingD = await bookingModel.findOne({where: {
            username: username1
        }})


        if(bookingD)
        {
            const roomD = await roomModel.findOne({where: {
                roomnumber: bookingD.allotedRoomNumber
            }})

            // await roomModel.update({
            //     roomnumber: roomD.roomnumber,
            //     roomfloor: roomD.roomfloor,
            //     roomtype: "null",
            //     price: roomD.price,
            //     bedroom: roomD.bedroom,
            //     booked: false
            // }, { where: { roomnumber: roomD.roomnumber } })
            
            await roomModel.update({
                roomnumber: roomD.roomnumber,
                bedroom: roomD.bedroom,
                roomfloor: roomD.roomfloor,
                price: roomD.price,
                booked: false,
                roomtype: roomD.roomtype 
            }, { where: { roomnumber: bookingD.allotedRoomNumber } })
        
            await bookingModel.destroy({
                where: {
                    username: username1
                }
            })
            console.log("deleted bookingDetails successfully", roomnumber)
            return true;
        }
    }
    catch (err) {
        console.log(err)
        return false;
    }
}
module.exports = { 
    readUsersData, adduser, deleteuser, 
    verifyLogin, updateuser, updateUserDetails,
    addroom, readRoomData, deleteRoom, updateroom,
    bookingDetails, addBookingDetails, readBookingDetails, deleteBookingDetails, updateBookingDetails
}