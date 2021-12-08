import React from 'react'
import LogIn from './LogIn'

export default function WelcomePage({setToken}) {
    return (
        <div className="welcome-container">
            <div className="left-side"></div>
            <div className="right-side"><LogIn setToken={setToken}/></div>
        </div>
    )
}
