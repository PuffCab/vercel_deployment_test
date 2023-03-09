import { useEffect, useState } from "react";
import getToken from "./utils/getToken.js";
import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile.js";

function App() {
  const [user, setUser] = useState(false);

  const isUserLoggedin = () => {
    const token = getToken();

    if (token) {
      console.log("user is logged in");
      setUser(true);
    }
    if (!token) {
      console.log("user is NOT logged in");
      setUser(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    console.log(user);
    setUser(false);
    console.log(user);
  };

  useEffect(() => {
    isUserLoggedin();
    console.log("useeffect run");
  }, [user]);

  return (
    <div className="App">
      <h1>Our superduper MERN App</h1>

      <button onClick={logout} style={{ backgroundColor: "red" }}>
        logout
      </button>
      <br />
      <Register />
      <br />
      <Login />
      <br />
      <Profile />
    </div>
  );
}

export default App;
