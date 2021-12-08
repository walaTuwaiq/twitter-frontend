import axios from 'axios'
import React,{useState ,useEffect} from 'react'
import NavBar from './NavBar'
// import pic from "../../../pp.jpg"
// import pp from "../../../download.jpg"

export default function Home({token}) {
    const [tweets, setTweets] = useState([])
    // const [toggle, setToggle] = useState(false)
    const [favList, setFavList] = useState([])
    const [text,setText]= useState("")
    const [img, setImg] = useState("")
    // const [searchInput, setSearchInput] = useState("")
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const getDate = async()=>{

            try {
                const response = await axios.get("https://twitter-tuwaiq-backend.herokuapp.com/tweets",{
                })
            setTweets(response.data)


            if(token){
                const likes= await axios.get("https://twitter-tuwaiq-backend.herokuapp.com/allFavorite",{
                    headers: { authorization: `Bearer ${token}`  }
                    })
                console.log(likes.data,"likes");
                setFavList(likes.data)
               }

            // const likes= await axios.get("https://twitter-tuwaiq-backend.herokuapp.com/allFavorite",{
            //     headers: { authorization: `Bearer ${token}`  }
            //     })
            // console.log(likes.data,"likes");
            // setFavList(likes.data)
            
            } catch (error) {
            console.log("roooooooooooo");
            }
        
        // try {
        //     console.log(likes.data,"likes.data");
            
        // } catch (error) {
        //     console.log("iiiiiiiiiiiiiiiiii");
        // }
        
        }

        getDate()
    }, [token])

    // const addSearch =(e)=> {
    //     setSearchInput(e.target.value)
    // } 

    const addText = (e) => {
        setText(e.target.value);
      };
      const addimg = (e) => {
        setImg(e.target.value);
      };

      const addTweet=async ()=>{
        const result = await axios.post(
          "https://twitter-tuwaiq-backend.herokuapp.com/add-tweet",
          {
            text: text,
            img: img,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        setTweets(result.data)
        setImg("")
        setText("")
    }


    const deleteTweet = async(id)=>{
        const response = await axios.delete(`https://twitter-tuwaiq-backend.herokuapp.com/cut-one/${id}`,{
            headers: { authorization: `Bearer ${token}`  }
        })
        setTweets(response.data)
    }
    
    const favTweet= async(tweetId)=>{
        const response = await axios.post("https://twitter-tuwaiq-backend.herokuapp.com/favorite",{
            tweetId: tweetId
        },{
            headers: { authorization: `Bearer ${token}`  }
        })

        console.log(response.data.favorite);
        setFavList(response.data.favorite)
        
    }

    return (<div className="home-page">
                <NavBar token={token}/>

        <div className="tweet-container">

            {
                token? toggle? "" : <button className="add-tweet-btn" onClick={()=>{setToggle(!toggle)}}>ADD TWEET</button> : ""
            }
            
            {
                toggle? <div className="box-home">
                {/* <input type="text" placeholder="search here" onChange={addSearch} value={searchInput}/> */}
                <input onChange={addText} placeholder="tweet" value={text}/>
                <input onChange={addimg} placeholder="img" value={img}/>
                <button onClick={() => {addTweet()}}>Add</button>
            </div> : ""
            }
            {/* <div className="box-home">
                <input type="text" placeholder="search here" onChange={addSearch} value={searchInput}/>
                <input onChange={addText} value={text}/>
                <input onChange={addimg} value={img}/>
                <button onClick={() => {addTweet()}}>Add</button>
            </div> */}

            {/* <img src={pic} alt="ddd" />ddd */}
            <br /><br />
            {/* <img src="b.png" alt="kk" /> */}


            {
                tweets.map((elem,index)=>{
                    console.log(elem);
                    // <img src="b.png" alt="kk" />

                   for (let i = 0; i < favList.length; i++) {
                       if (elem._id == favList[i]._id){
                        return <div key={index}>
                            <h3 className="account-tweet">{elem.userId.account}</h3>
                            <p className="text-tweet">{elem.text}
                            <span className="like-icon" onClick={()=>{favTweet(elem._id)}}>♥</span>
                            {
                                elem.img? <img src={elem.img}/> : ""
                            }
                            <button className="btn-delete" onClick={()=>{deleteTweet(elem._id)}}>✖️</button>
                            </p>
                            
                            
                        </div>
                       }
                   }
                    return <div key={index}>
                        <h3 className="account-tweet">{elem.userId.account}</h3>
                        <p className="text-tweet">{elem.text}
                        <span className="like-icon" onClick={()=>{favTweet(elem._id)}}>♡</span>
                        {
                            elem.img? <img src={elem.img}/> : ""
                        }
                        <button className="btn-delete" onClick={()=>{deleteTweet(elem._id)}}>✖️</button>
                        </p>
                        
                        
                    </div>
                })   
            }

        </div>
        </div>
    )
}