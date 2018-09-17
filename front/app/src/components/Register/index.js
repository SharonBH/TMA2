import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './RegisterComp.scss'

class Register extends Component {

  render() {
    
    return (
        <div className={classes.Register}>
            <h1>Register</h1><br/>
            <form>
                <input type="text" name="user" placeholder="Username" />
                <input type="email" name="email" placeholder="eMail" />
                <input type="date" name="date" placeholder="" />
                <input type="password" name="pass" placeholder="Password" />
                <input type="submit" name="login" value="login" />
            </form>
            <div>
                <h2>Have a user?</h2>
                <Link to='/login'>
                    <h2>Log-In</h2>
                </Link> 
                {/* <Link to="#">Forgot Password</Link> */}
            </div>
        </div>
    );
  }
}

export default Register;




