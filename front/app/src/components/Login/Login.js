import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Register/RegisterComp.scss';
import loginClasses from '../Login/LoginComp.scss';
import { connect } from 'react-redux';
import { loginRequest } from "../../actions/Api";
import { errorMessageAction, successMessageAction } from "../../actions";
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import ForgotPassword from '../ForgotPassword';

class Login extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)

        const { cookies } = props;

        this.state = {
            userName: cookies.get('userName') || '',
            userPassword: cookies.get('userPassword') || '',
            rememberMe: Boolean(cookies.get('rememberMe')) || false,
            forgotPassword: false
        }
    }
    componentWillUnmount(){
        this.props.errorMessageAction(null)
    }
    onUserNameChange = (e) => {
        this.setState({userName: e.target.value})
    }

    onUserPassChange = (e) => {
        this.setState({userPassword: e.target.value})
    }

    loginSbmit = (e) => {
        e.preventDefault()
        if(this.state.userName === '') {
            this.props.errorMessageAction('you must enter a name')
        } else if (this.state.userPassword.length < 6) {
            this.props.errorMessageAction('password must have at least 6 characters')
        } else {
            const { cookies } = this.props;
            const { userName, userPassword, rememberMe } = this.state
            this.props.loginRequest(userName, userPassword)
            if(rememberMe) {
                cookies.set('userName', userName, { path: '/' });
                cookies.set('userPassword', userPassword, { path: '/' });
                cookies.set('rememberMe', rememberMe, { path: '/' });
            }
        }
    }

    errorMessage = () => {
        const error = this.props.errorMessage
        if (error !== null) {
            return <p className={classes.error}>{error}</p>
        } else {
            return null
        }
    }

    rememberMe = () => {
        this.setState({rememberMe: !this.state.rememberMe})
    }

    forgotPassword = () => {
        this.props.successMessageAction(null)
        this.props.errorMessageAction(null)
        setTimeout(() => {
            this.setState({forgotPassword: true})
        }, 200)
    }

    closePopUp = () => {
        this.setState({forgotPassword: false})
    }
    loginFage = () => {
        return (
            <div className={classes.LogIn}>
                <h1>Sign In</h1>
                <form>
                    <InputComp inputType="text" name="user" placeholder="User Name" onChange={this.onUserNameChange} content={this.state.userName}/>
                    <InputComp inputType="password" name="pass" placeholder="Password" onChange={this.onUserPassChange} content={this.state.userPassword}/>
                    <BtnComp inputType="submit" name="login" content="Login" onClick={this.loginSbmit} />
                    <div>{this.errorMessage()}</div>
                    <div className={loginClasses.rememberMe}>
                        <span>
                            <input type="checkbox" name="remember me" checked={this.state.rememberMe} onChange={this.rememberMe}/> 
                            <label>Remember Me</label>
                        </span> 
                        <span className={loginClasses.forgotPass} onClick={this.forgotPassword}>Forgot Password</span>
                    </div> 
                </form>
                <h3>Not a Member?</h3>
                <Link to='/register'><h2>Register Here</h2></Link>
                {this.state.forgotPassword ? <ForgotPassword closePop={this.closePopUp} /> : null}
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
        errorMessage: state.sharedReducer.errorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (userName, password) => dispatch(loginRequest(userName, password)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
    }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Login));