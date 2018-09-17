import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginComp.css';
import { connect } from 'react-redux';
import { getUsersList } from "../../actions/Api";
import { loginRequestAction } from "../../actions";

class LogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userPass: '',
            loginValidation: false,
            thisUser: {}
        }
    }

    componentDidMount() {
        this.props.getUsersList();
    }

    onUserNameChange = (e) => {
        this.setState({userName: e.target.value})
    }

    onUserPassChange = (e) => {
        this.setState({userPass: e.target.value})
    }

    loginRequest = () => {
        const name = this.state.userName
        const pass = this.state.userPass
        this.props.loginRequestAction({name: name, pass: pass})
    }

  render() {
    
    return (
        <div className="LogIn">
            <h1>Log-in</h1>
            <form>
                <input type="text" name="user" placeholder="Username / e-Mail" onChange={(e) => {this.onUserNameChange(e)}} />
                <input type="password" name="pass" placeholder="Password" onChange={(e) => {this.onUserPassChange(e)}} />
                <input type="submit" name="login" value="login" onClick={this.loginRequest} />
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
}

const mapStateToProps = (state) => {
    return {
        userList: state.UserLogInReducer.userList,
        userName: state.UserLogInReducer.userName,
        userPass: state.UserLogInReducer.userPass,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsersList: payload => dispatch(getUsersList(payload)),
        loginRequestAction: payload => dispatch(loginRequestAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);