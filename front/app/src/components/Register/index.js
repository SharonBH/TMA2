import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './RegisterComp.scss';
import { registerRequest } from "../../actions/Api";
import { connect } from 'react-redux';
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';
import SelectComp from '../UI/SelectComp/SelectComp';

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
            someSelectArrayFromApiProps:['user', 'admin']
        }
    }

    onEmailChange = (e) => { this.setState({ email: e.target.value })}
    onPasswordChange = (e) => { this.setState({password: e.target.value})}
    onConfirmPasswordChange = (e) => { this.setState({confirmPassword: e.target.value})}
    onNameChange = (e) => { this.setState({ name: e.target.value})}
    onUseTypeChange = (e) => { this.setState({userType: e.target.value})}
    onUserNameChange = (e) => { this.setState({userName: e.target.value})}


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
                <h1>Register</h1>
                <form>
                    <InputComp inputType="email" name="email" placeholder="eMail" onChange={this.onEmailChange}/>
                    <InputComp inputType="password" name="password" placeholder="Password" onChange={this.onPasswordChange}/>
                    <InputComp inputType="password" name="ConfirmPassword" placeholder="ConfirmPassword" onChange={this.onConfirmPasswordChange}/>
                    <InputComp inputType="text" name="name" placeholder="Name" onChange={this.onNameChange}/>
                    <SelectComp 
                        onChange={this.onUseTypeChange}
                        options={this.state.someSelectArrayFromApiProps}
                        placeholder='Select User Type'
                    />
                    <InputComp inputType='text' name="userName" placeholder="Username" onChange={this.onUserNameChange}/>
                    <span>
                        {/* {
                            this.props.errorMessage !== null
                            ?   <p>{this.props.errorMessage}</p>
                            :   null
                        } */}
                    </span>
                    <BtnComp inputType="submit" name="register" content="Register" onClick={(e) => this.registerSbmit(e)}/>
                </form>
                <h3>Have a user? Keep Calm.</h3>
                <div className='loginLink'>
                    <h2>And </h2>
                    <Link to='/login'>
                        <h2>Log-In</h2>
                    </Link>
                </div> 
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




