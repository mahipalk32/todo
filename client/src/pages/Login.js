import React from "react";
import { Link } from "react-router-dom";

function Login() {
    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`,
            "_self"
        )
    }
  return (
    <div>
      <h3>Login</h3>
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <button> Login</button>
      <p>or</p>
      <button onClick={googleAuth}> <span>Sign in with google</span></button>
      <p>New Here ? <Link to="/signup" >Signup</Link></p>
    </div>
  );
}

export default Login;
