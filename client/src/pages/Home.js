import React, { useReducer } from "react";
import { Link } from "react-router-dom";

function Home(useDetails) {
    const user = useDetails.user;
    const logout = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/logout`,
            "_self"
        )
    }
  return (
    <div>
      <h3>Home</h3>
      <img src={user.picture} alt="profile" />
      <input type="text" defaultValue={user.name} placeholder="email" />
      <input type="password" placeholder="password" />
      <button onClick={logout}> logout</button>
    </div>
  );
}

export default Home;
