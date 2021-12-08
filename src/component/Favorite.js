import axios from 'axios'
import React, {useEffect,useState} from 'react'
import NavBar from './NavBar'
import{GrTwitter}from'react-icons/gr'

export default function Favorite({token}) {

    const [favList, setFavList] = useState([])

    useEffect(() => {
        const getFav = async()=>{
            const response = await axios.get("https://twitter-tuwaiq-backend.herokuapp.com/allFavorite",{
                headers: {
                    authorization: `Bearer ${token}`,
                  }  
            })
            console.log(response.data);
            setFavList(response.data)
        }

        getFav()
    }, [])
    
    return (<div className="favorite-page">
            <NavBar token={token}/>
        <div className="favorite-container">
            {
                favList.map((elem,index)=>{
                    return <div key={index}>
                        {/* { console.log(elem.userId)} */}
                        <p className="fav-text-tweet">{elem.text} 
                            {
                                elem.img? <img src={elem.img}/> : ""
                            }
                            </p>
                        
                    </div>
                })
            }
        </div>
        </div>
    )
}
