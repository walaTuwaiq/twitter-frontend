import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function SignUp() {
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [discription, setDiscription] = useState("");
  const history = useHistory();
  const changeName = (e) => {
    setAccount(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeimg = (e) => {
    setImg(e.target.value);
  };
  const changediscription = (e) => {
    setDiscription(e.target.value);
  };

  const addUser = async () => {
      
    const response = await axios.post("https://twitter-tuwaiq-backend.herokuapp.com/signUp", {
        account: account,
      email: email,
      imageProfile:img,
      description:discription,
      password: password,

    });
    if (response.status === 201){
        history.push("/")
    }
  };
  return (<div className="signup-page">
  <NavBar/>
    <div className="signup">
      <h3>Sign up:</h3>
      <input
        onChange={(e) => {
          changeName(e);
        }}
        placeholder="enter your account"
      />
      <input
        onChange={(e) => {
          changeEmail(e);
        }}
        placeholder="enter your email"
      />
      <input onChange={(e)=>{changediscription(e)}} type="text" placeholder="enter your description" />
      <input onChange={(e)=>{changeimg(e)}} type="text" placeholder="enter your img profile" />
      <input
        onChange={(e) => {
          changePassword(e);
        }}
        type="password"
        placeholder="enter your password"
      />
      <button
        onClick={() => {
          addUser();
        }}
      >
        sign up
      </button>
      <p>You are already have account? <Link to="/">Log in.</Link></p>
    </div>
    </div>
  );
}
