import React, {useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import NavBar from './NavBar'


export default function LogIn({setToken}) {
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    const accountInput = (e)=>{
        setAccount(e.target.value)
    }

    const passwordInput = (e)=>{
        setPassword(e.target.value)
    }

    const logInBtn = async()=>{
        const response = await axios.post("https://twitter-tuwaiq-backend.herokuapp.com/login",{
            account:account, password:password
        })
        if (response.status === 201){
            setToken(response.data.token)
            localStorage.setItem("token", JSON.stringify(response.data.token))
            history.push("/home")
        }
        console.log(response);
    }

    return (
        <div className="butonLogin">
            {/* <NavBar/> */}
            <h1>WELCOME</h1>
            <input type="text" placeholder="account" onChange={accountInput} />
            <input type="password" placeholder="password" onChange={passwordInput} />
            <button onClick={() => {logInBtn()}}>Log in</button>
            <p>Don't Have Account? <Link to="/signup">Sign Up.</Link></p>
            
        </div>
    )
}
