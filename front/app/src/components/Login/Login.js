import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './LoginComp.scss';
import { connect } from 'react-redux';
import { loginRequest } from "../../actions/Api";

class LogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userPassword: '',
        }
    }

    onUserNameChange = (e) => {
        this.setState({userName: e.target.value})
    }

    onUserPassChange = (e) => {
        this.setState({userPassword: e.target.value})
    }

    loginSbmit = (e) => {
        const userName = this.state.userName
        const password = this.state.userPassword
        e.preventDefault()
        this.props.loginRequest(userName, password)
    }

    loginFage = () => {
        return (
            <div className={classes.LogIn}>
                <h1>Log-in</h1>
                <form>
                    <input type="text" name="userName" placeholder="User Name" onChange={(e) => {this.onUserNameChange(e)}} />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => {this.onUserPassChange(e)}} />
                    <span>
                        {
                            this.props.errorMessage === 'Invalid login attempt.'
                            ? <p>{this.props.errorMessage}</p>
                            : null
                        }
                    </span>
                    <input type="submit" name="login" value="Login" onClick={(e) => this.loginSbmit(e)}/>
                    <div>
                        <span><input type="checkbox" name="remember me"/> <label>Remember Me</label></span> 
                        <button>Forgot Password</button>      
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
        errorMessage: state.errorMessageReducer.errorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (userName, password) => dispatch(loginRequest(userName, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);