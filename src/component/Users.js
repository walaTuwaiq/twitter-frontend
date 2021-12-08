import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import NavBar from './NavBar'

export default function Users({token}) {
    const [users, setUsers] = useState([])
    const history = useHistory()

    useEffect(() => {
        const getUsers = async()=>{
            const response = await axios.get("https://twitter-tuwaiq-backend.herokuapp.com/users")
            setUsers(response.data)
        }

        getUsers()
    }, [])

const goToUser=(id)=>{
    history.push(`/profile/${id}`)
}

    return (
        <div className="user-page">
            <NavBar token={token}/>
        <div className="user-container">
            {
                users.map((elem,index)=>{
                    return <div className="user" key={index}>
                        <img src={elem.imageProfile} />
                        <h3>{elem.account}</h3>
                        <p>{elem.description}</p>
                        <button onClick={()=>{goToUser(elem._id)}}>Open profile</button>
                        { console.log(elem._id)}
                    </div>
                })
            }
        </div>
        </div>
    )
}
