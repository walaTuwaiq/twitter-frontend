import { Route } from "react-router-dom";
import SignUp from "./component/SignUp";
import LogIn from "./component/LogIn";
import NavBar from "./component/NavBar";
import Home from "./component/Home";
import { useState, useEffect } from "react";
import Users from "./component/Users";
import Account from "./component/Account";
import "./component/App.css";
import Favorite from "./component/Favorite";
import WelcomePage from "./component/WelcomePage";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if(localStorage.getItem("token")==null){
      localStorage.setItem("token", JSON.stringify(""))
    }
    if (!token && localStorage.getItem("token") !== null) {
      const localStorageToken = JSON.parse(localStorage.getItem("token"));
      setToken(localStorageToken);
    }
  }, []);

  return (
    <div>
      {/* <NavBar token={token} setToken={setToken} /> */}
      <Route exact path="/signup" component={SignUp} />
      <Route
        exact
        path="/"
        render={() => {
          return <WelcomePage setToken={setToken}/>;
        }}
      />
      <Route
        exact
        path="/home"
        render={() => {
          return <Home setToken={setToken} token={token} />;
        }}
      />
      {/* <Route
        exact
        path="/login"
        render={() => {
          return <LogIn setToken={setToken} />;
        }}
      /> */}
      <Route
        exact
        path="/users"
        render={() => {
          return <Users token={token} />;
        }}
      />
      <Route
        exact
        path="/profile/:id"
        render={() => {
          return <Account token={token} />;
        }}
      />
      <Route
        exact
        path="/favorite"
        render={() => {
          return <Favorite token={token} />;
        }}
      />
    </div>
  );
}

export default App;
