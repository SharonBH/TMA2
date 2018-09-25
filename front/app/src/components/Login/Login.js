import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Register/RegisterComp.scss';
import loginClasses from '../LogIn/LoginComp.scss';
import { connect } from 'react-redux';
import { loginRequest } from "../../actions/Api";
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';
import Spinner from '../UI/Spinner';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class LogIn extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)

        const { cookies } = props;

        this.state = {
            userName: cookies.get('userName') || '',
            userPassword: cookies.get('userPassword') || '',
            rememberMe: cookies.get('rememberMe') || false
        }
    }
    
    componentDidMount(){
        console.log(this.props)
    }
    onUserNameChange = (e) => {
        this.setState({userName: e.target.value})
    }

    onUserPassChange = (e) => {
        this.setState({userPassword: e.target.value})
    }

    loginSbmit = (e) => {
        const { cookies } = this.props;
        const userName = this.state.userName
        const password = this.state.userPassword
        const rememberMe = this.state.rememberMe
        e.preventDefault()
        this.props.loginRequest(userName, password)
        if(rememberMe) {
            cookies.set('userName', userName, { path: '/' });
            cookies.set('userPassword', password, { path: '/' });
            cookies.set('rememberMe', rememberMe, { path: '/' });
        }
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

    rememberMe = () => {
        this.setState({
            rememberMe: !this.state.rememberMe
        })
    }

    loginFage = () => {
        return (
            <div className={classes.LogIn}>
                <h1>Sign In</h1>
                {this.spinner()}
                <form>
                    <InputComp inputType="text" name="user" placeholder="User Name" onChange={this.onUserNameChange} content={this.state.userName}/>
                    <InputComp inputType="password" name="pass" placeholder="Password" onChange={this.onUserPassChange} content={this.state.userPassword}/>
                    {this.errorMessage()}
                    <BtnComp inputType="submit" name="login" content="Login" onClick={this.loginSbmit}/>
                    <div className={loginClasses.rememberMe}>
                        <span>
                            <input type="checkbox" name="remember me" checked={this.state.rememberMe} onChange={this.rememberMe}/> 
                            <label>Remember Me</label>
                        </span> 
                        <span className='forgotPass'><Link to='/forgot_pass'>Forgot Password</Link></span>
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
        console.log(this.state)
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

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(LogIn));