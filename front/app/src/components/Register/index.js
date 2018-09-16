import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {

  render() {
    
    return (
        <div className="Register">
            <h1>Log-in</h1><br/>
            <form>
                <input type="text" name="user" placeholder="Username"/>
                <input type="password" name="pass" placeholder="Password"/>
                <input type="submit" name="login" value="login"/>
            </form>
            <div>
                •   <Link to='/login'>Log-In</Link>    • 
                    {/* <Link to="#">Forgot Password</Link> */}
            </div>
        </div>
    );
  }
}

export default Register;




