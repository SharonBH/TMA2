import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './LoginComp.scss';
import { connect } from 'react-redux';
import { loginRequest } from "../../actions/Api";
import history from '../../configuration/history';

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

    accessAction = () => {
        history.push({pathname: '/'})
    }

    loginFage = () => {
        return (
            <div className={classes.LogIn}>
                <h1>Log-in</h1>
                <form>
                    <input type="text" name="user" placeholder="Username / e-Mail" onChange={(e) => {this.onUserNameChange(e)}} />
                    <input type="password" name="pass" placeholder="Password" onChange={(e) => {this.onUserPassChange(e)}} />
                    <span>
                        {
                            this.props.errorMessage === 'xxx' || 'xsx' || 'xvx'
                            ? <p>{this.props.errorMessage}</p>
                            : null
                        }
                    </span>
                    <input type="submit" name="login" value="login" onClick={(e) => this.loginSbmit(e)} />
                    <div>
                        <span><input type="radio" name="remember" /> <label>Remember Me</label></span> 
                        <button>Forgot Password</button>      
                    </div> 
                </form>
                <h2>Not a register user ?</h2>
                <Link to='/register'>
                    <h2>Register</h2>
                </Link> 
            </div>
        );
    }
    
    render() {
        if(this.props.currentUser === null) {
            return (
                <div className={classes.LogInWrapper}>
                    {this.loginFage()}
                </div>
            );
        } else {
            return (
                <div>
                    {this.accessAction()}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.UserLogInReducer.currentUser,
        errorMessage: state.UserLogInReducer.errorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (name, pass) => dispatch(loginRequest(name, pass)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);