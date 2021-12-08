import React from 'react'
import { Link } from 'react-router-dom'
import{GrTwitter}from'react-icons/gr'
import "./App.css"
import {BsPersonSquare} from 'react-icons/bs'
import{AiFillLike}from 'react-icons/ai'
import{AiOutlinePoweroff}from 'react-icons/ai'

export default function NavBar(props) {
    return (
        <div className="Navbar">
            {
                // props.token? "" : 
            }
            
            <Link to="/home" className="home-logo"><GrTwitter/></Link>

            {
                props.token? <ul className="nav-span">
                {/*  className="nav-span" */}
               <li> <Link to="/users" className="nav-link">
                    <BsPersonSquare/>  Accounts
                </Link>
                </li>
                <li>
                <Link to="/" onClick={()=>{
                // props.setToken("")
                localStorage.setItem("token", "")
                }} className="nav-link"><AiOutlinePoweroff/>  Log out</Link></li>
                <li>
                <Link to="/favorite" className="nav-link"><AiFillLike/>  Likes</Link>
                </li>
                </ul>
                     : 
                     <ul>
                    <li className="nav-span">
                    <Link to="/" className="nav-link">  Log in</Link>
                    </li>
                    {console.log(props.token)}
                    <li className="nav-span">
                    <Link to="/signup" className="nav-link">  Sign up</Link>
                    </li>
                </ul>
            }
            
        </div>
    )
}
