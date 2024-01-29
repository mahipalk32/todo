import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`,
            "_self"
        )
    }
  return (
    <div>
      <h3>SignUp</h3>
      <input type="text" placeholder="name" />
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <button> signup</button>
      <p>or</p>
      <button onClick={googleAuth}> <span>Sign up with google</span></button>
      <p>Already have account ? <Link to="/login" >login</Link></p>
    </div>
  );
}

export default SignUp;
