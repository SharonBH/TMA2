import React, { Component } from 'react';
import classes from '../Register/RegisterComp.scss';
import chClasses from './ChangePassword.scss';
import { connect } from 'react-redux';
import { changePasswordRequest } from "../../actions/Api";
import { successMessageAction, errorMessageAction, changePassOpenAction } from "../../actions";
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';
import history from '../../configuration/history'

class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password:'',
            newPassword:'',
            confirmPassword:'',
            error:'',
            show: false
        }
    }
    componentDidMount(){
        this.setState({username: this.props.user})
    }
    componentWillUnmount() {
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
    }
    
    changeUsername = (e) => { this.setState({username: e.target.value})}
    changePassword = (e) => { this.setState({password: e.target.value}) }
    changeNewPassword = (e) => { this.setState({newPassword: e.target.value}) }
    changeConfirmPassword = (e) => { this.setState({confirmPassword: e.target.value})}

    onClick = (e) => {
        const username = this.props.user
        const { password, newPassword, confirmPassword } = this.state
        if(password === '') {
            this.props.errorMessageAction('you must enter your password')
        } else if (newPassword.length < 6) {
            this.props.errorMessageAction('the new password must have at least 6 characters')
        } else if (password !== confirmPassword) {
            this.props.errorMessageAction('confirm password doesn\'t match  password')
        } else {
            this.props.changePasswordRequest(username, password, newPassword, confirmPassword)
        }
    }

    errorMessage = () => {
        const error = this.props.errorMessage
        if (error !== null) {
            return <p className={chClasses.error}>{error}</p>
        } else {
            return null
        }
    }
    successMessage = () => { 
        const success = this.props.successMessage
        if (success !== null) {
            this.props.errorMessageAction(null)
            return <p className={chClasses.success}>{success}</p>
        } else {
            return null
        }
    }
    closePopUp = () => {
        this.props.changePassOpenAction(false)
    }
    render() {
        return (
            <div className={chClasses.changePassWrapper}>
                <div className={chClasses.changePass}>
                    <h1>Change Password?</h1>
                    {this.errorMessage()}
                    {this.successMessage()}
                    <span className={chClasses.nameUserWrap}><span>User Name: </span><span className={chClasses.nameUser}>{this.props.user}</span></span>
                    {history.location.pathname !== `/change_password/${this.props.user}` 
                    ? <InputComp inputType='password' name='password' placeholder='Password' onChange={this.changePassword} content={this.state.password}/> 
                    : null}
                    

                    <InputComp inputType='password' name='newPassword' placeholder='New Password - must be A-Za-z0-9 + special character' onChange={this.changeNewPassword} content={this.state.newPassword}/>
                    <InputComp inputType='password' name='confirmPassword' placeholder='Confirm Password - must be A-Za-z0-9 + special character' onChange={this.changeConfirmPassword} content={this.state.confirmPassword}/>
                    <div className={classes.changeBtn}><BtnComp inputType='button' content='Send' onClick={this.onClick}/></div>
                    {history.location.pathname !== '/change_password' 
                    ? <div className={chClasses.closePopBtn} onClick={this.closePopUp}><span>Close</span></div>
                    : null}
                </div>
                <div className={chClasses.changePassBG}></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.sharedReducer.errorMessage,
        successMessage: state.sharedReducer.successMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePasswordRequest: (username, password, newPassword, confirmPassword) => dispatch(changePasswordRequest(username, password, newPassword, confirmPassword)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        changePassOpenAction: payload => dispatch(changePassOpenAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);