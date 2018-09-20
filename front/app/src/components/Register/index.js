import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './RegisterComp.scss';
import { registerRequest } from "../../actions/Api";
import { connect } from 'react-redux';

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            userType: '',
            userName: '',
        }
    }

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    onConfirmPasswordChange = (e) => {
        this.setState({confirmPassword: e.target.value})
    }

    onNameChange = (e) => {
        this.setState({ name: e.target.value})
    }

    onUseTypeChange = (e) => {
        this.setState({userType: e.target.value})
    }

    onUserNameChange = (e) => {
        this.setState({userName: e.target.value})
    }

    registerSbmit = (e) => {
        const email = this.state.email
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword
        const name = this.state.name
        const userType = this.state.userType
        const userName = this.state.userName
        e.preventDefault()
        this.props.registerRequest(email, password, confirmPassword, name, userType, userName)
    }

    rgisterFage = () => {
        return (
            <div className={classes.Register}>
                <h1>Register</h1><br/>
                <form>
                    <input type="email" name="email" placeholder="eMail" onChange={this.onEmailChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={this.onPasswordChange}/>
                    <input type="password" name="ConfirmPassword" placeholder="ConfirmPassword" onChange={this.onConfirmPasswordChange}/>
                    <input type="text" name="name" placeholder="Name" onChange={this.onNameChange}/>
                    <select onChange={this.onUseTypeChange}>
                        <option>Select User Type</option>
                        <option value='user'>user</option>
                        <option value='admin'>admin</option>
                    </select>
                    <input type="text" name="userName" placeholder="Username" onChange={this.onUserNameChange}/>
                    <span>
                        {/* {
                            this.props.errorMessage !== null
                            ?   <p>{this.props.errorMessage}</p>
                            :   null
                        } */}
                    </span>
                    <input type="submit" name="register" value="Register" onClick={(e) => this.registerSbmit(e)}/>
                </form>
                <h3>Have a user?</h3>
                <h3>Keep Calm</h3>
                <h3>And</h3>
                <Link to='/login'>
                    <h2>Log-In</h2>
                </Link> 
            </div>
        )
    }

    render() {
        
        return (
            <div className={classes.RegisterWrapper}>
                {this.rgisterFage()}
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
        registerRequest: (email, password, confirmPassword, name, userType, userName) => dispatch(registerRequest(email, password, confirmPassword, name, userType, userName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);




