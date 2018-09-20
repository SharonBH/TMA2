import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Register/RegisterComp.scss';
import loginClasses from '../LogIn/LoginComp.scss';
import { connect } from 'react-redux';
import { loginRequest } from "../../actions/Api";
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';

class LogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userPass: '',
        }
    }

    onUserNameChange = (e) => {
        this.setState({userName: e.target.value})
    }

    onUserPassChange = (e) => {
        this.setState({userPass: e.target.value})
    }

    loginSbmit = (e) => {
        const name = this.state.userName
        const pass = this.state.userPass
        e.preventDefault()
        this.props.loginRequest(name, pass)
    }

    loginFage = () => {
        return (
            <div className={classes.LogIn}>
                <h1>Log-in</h1>
                <form>
                    <InputComp inputType="text" name="user" placeholder="eMail" onChange={(e) => {this.onUserNameChange(e)}} />
                    <InputComp inputType="password" name="pass" placeholder="Password" onChange={(e) => {this.onUserPassChange(e)}} />
                    <span>
                        {
                            this.props.errorMessage === 'xxx' || 'xsx' || 'xvx'
                            ? <p>{this.props.errorMessage}</p>
                            : null
                        }
                    </span>
                    <BtnComp inputType="submit" name="login" content="Login" onClick={(e) => this.loginSbmit(e)}/>
                    <div className={loginClasses.rememberMe}>
                        <span><input type="checkbox" name="remember me"/> <label>Remember Me</label></span> 
                        <span className='forgotPass'><Link to=''>Forgot Password</Link></span>
                    </div> 
                </form>
                <h3>Not a register user?</h3>
                <h3>Keep Calm</h3>
                <h3>And</h3>
                <Link to='/register'>
                    <h2>Register</h2>
                </Link> 
            </div>
        );
    }
    
    render() {
        return (
            <div className={classes.LogInWrapper}>
                {this.loginFage()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.UserLogInReducer.errorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (name, pass) => dispatch(loginRequest(name, pass)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);