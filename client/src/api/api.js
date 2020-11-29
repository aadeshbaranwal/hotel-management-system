import store from "../store/store";

function addNewuser(data) {
    console.log("getting data", data)

    fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then((data) => data.json())
        .then(response => {
            console.log("success :", response)
        })
        .catch((err) => {
            console.log('error', err)
        })
}

function addRoom(data){
    console.log("adding room");

    fetch('http://localhost:5000/admin-page/addroom', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then((data) => data.json())
        .then(response => {
            console.log("success :", response)
        })
        .catch((err) => {
            console.log("error", err)
        })
}

function verifyLoginDetails(history, getData, dispatch, props) {
    console.log("getting data", getData, history, dispatch, props)

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getData)
    })
        .then((data) => data.json())
        .then(response => {
            console.log("success :", response)
            if (response.success === true) {
                localStorage.setItem("signupData", JSON.stringify(response.user));
                console.log(response.user)

                store.dispatch({
                    type: "ADD_USER",
                    userData: response.user
                });

                alert("Login Successfully")
                return true
            }
            else {
                alert("wrong credentials")
                return false
            }
        }).then(() => {
            if(getData.email === 'admin@gmail.com' || getData.email==="deo@gmail.com")
                history.push("/admin-page")
            else
                history.push("/home")
        })
        .catch((err) => {
            console.log('error', err)
            return false
        })
}

function updateProfile(userData, userId) {
    console.log("recevied data", userData, "user ID", userId)
    fetch(`http://localhost:5000/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then((data) => data.json())
        .then(response => {
            console.log("success :", response)
            if (response.success === true) {
                // window.location.reload()
                localStorage.setItem("signupData", JSON.stringify(response.user));

                store.dispatch({
                    type: "UPDATE_USER_DETAILS",
                    userData: response.user
                });

                alert("update Successfully")
                return true
            }
        })
        .catch((err) => {
            console.log('error', err)
        })
}

function getUserBookings(data) {
    console.log("inside booking details")
    let reqData={};
    if(data.username){
        fetch("http://localhost:5000/profile", {
            method: 'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify(data)
        })
        .then((data) => data.json())
        .then(response => {
            console.log("booking details: ", response)
            reqData.response=response
            return response
        })
        .catch(err => {
            console.log("error: ", err)
        })
    }
    else{
        console.log("username does not exist")
    }
    console.log(reqData)
    // return reqData
}

function getuser() {
    fetch("http://localhost:5000/generate-report/users")
        .then((data) => data.json())
        .then(response => {
            console.log("responese ", response)
            return response;
        })
}

function bookRoom(data,type,id,bedroom){
    data.type=type ? type: " "
    data.bedroom=bedroom
    console.log("book room api: ", data)

    fetch(`http://localhost:5000/roomView/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
        .then(data => data.json())
        .then(response => {
            console.log("book room success: ", response)
            if(response.success){
                alert("book room successful!")
            }
            else{
                alert("room not available")
            }
        })
        .catch(err => 
            console.log("book room error:",err)
        )
}

export { addNewuser, getuser, verifyLoginDetails, updateProfile, addRoom, getUserBookings, bookRoom };