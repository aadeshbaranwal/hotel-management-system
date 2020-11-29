import React, { useEffect } from 'react'

export default function Logout(props) {

    useEffect(() => {
        window.localStorage.removeItem('signupData');
    }, [])

    props.history.push("/home")

    return (
        <div>
            Hello
        </div>
    )
}
