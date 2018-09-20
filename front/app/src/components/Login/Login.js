import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Register/RegisterComp.scss';
import loginClasses from '../LogIn/LoginComp.scss';
import { connect } from 'react-redux';
import { loginRequest } from "../../actions/Api";
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';
import Spinner from '../UI/Spinner';

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

    errorMessage = () => {
        const error = this.props.errorMessage
        if (error === 'Invalid login attempt.') {
            return <p>{error}</p>
        } else {
            return null
        }
    }

    spinner = () => {
        if(this.props.toggleSpinner) {
            return <Spinner />
        } else {
            return null
        }
    }

    loginFage = () => {
        return (
            <div className={classes.LogIn}>
                <h1>Log-in</h1>
                {this.spinner()}
                <form>
                    <InputComp inputType="text" name="user" placeholder="User Name" onChange={this.onUserNameChange}/>
                    <InputComp inputType="password" name="pass" placeholder="Password" onChange={this.onUserPassChange}/>
                    {this.errorMessage()}
                    <BtnComp inputType="submit" name="login" content="Login" onClick={this.loginSbmit}/>
                    <div className={loginClasses.rememberMe}>
                        <span><input type="checkbox" name="remember me"/> <label>Remember Me</label></span> 
                        <span className='forgotPass'><Link to='/'>Forgot Password</Link></span>
                    </div> 
                </form>
                <h3>Not a register user?</h3>
                <h3>Keep Calm</h3>
                <h3>And</h3>
                <Link to='/register'><h2>Register</h2></Link> 
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
        errorMessage: state.loginErrorMessageReducer.errorMessage,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (userName, password) => dispatch(loginRequest(userName, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);