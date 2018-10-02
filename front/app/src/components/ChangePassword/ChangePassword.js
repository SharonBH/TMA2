import React, { Component } from 'react';
import classes from './ChangePassword.scss';
import { connect } from 'react-redux';
import { changePasswordRequest } from "../../actions/Api";
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';
import Spinner from '../Spiner';

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    }

    componentWillUnmount() {
        this.setState({error: ''})
        this.setState({oldPassword: ''})
        this.setState({newPassword: ''})
        this.setState({confirmNewPassword: ''})
    }
    
    onChangeOldPassword = (e) => {
        this.setState({oldPassword: e.target.value})
    }
    onChangeNewPassword = (e) => {
        this.setState({newPassword: e.target.value})
    }
    onChangeConfirmNewPassword = (e) => {
        this.setState({confirmNewPassword: e.target.value})
    }

    changePasswordRequest = (e, header) => {
        const userName = this.props.currentUser.username
        const oldPassword = this.state.oldPassword
        const newPassword = this.state.newPassword
        const confirmNewPassword = this.state.confirmNewPassword
        const reset = 'DefPass123$'
        e.preventDefault()
        if(header === 'reset password') {
            this.props.changePasswordRequest(userName, reset, newPassword, confirmNewPassword)
        } else {
            this.props.changePasswordRequest(userName, oldPassword, newPassword, confirmNewPassword)
        }
    }

    changePassword = (header) => {
        return (
            <div className={classes.ForgotPassword}>
                {header === 'reset password' ? <h1>We Have Reset Your Password</h1> : <h1>Change Password</h1>}
                {header === 'reset password' ? <h3>Enter A New password</h3> : null}
                <p className={classes.error}>{this.props.errorMessage}</p>
                {
                    header === 'reset password' 
                    ? null
                    : <InputComp inputType='password' name='Old Password' placeholder='Old Password' onChange={(e) => this.onChangeOldPassword(e)} content={this.state.oldPassword}/>
                }
                <InputComp inputType='password' name='New Password' placeholder='New Password' onChange={(e) => this.onChangeNewPassword(e)} content={this.state.newPassword}/>
                <InputComp inputType='password' name='Confirm New Password' placeholder='Confirm New Password' onChange={(e) => this.onChangeConfirmNewPassword(e)} content={this.state.confirmNewPassword}/>
                <BtnComp inputType='button' content='Send' onClick={(e) => this.changePasswordRequest(e, header)}/>
            </div>
        );
    }

    spinner = () => {
        if (this.props.toggleSpinner) {
            return <Spinner />
        } else {
            return null
        }
    }

    render() {
        const { header } = this.props
        return (
            <div className={classes.ForgotPasswordWrapper}>
                {this.spinner()}
                {
                    header === 'reset password' 
                    ? <div>{this.changePassword(header)}</div>
                    : <div className={classes.popUp}>{this.changePassword(header)}</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.changePasswordErrorMessageReducer.errorMessage,
        currentUser: state.UserLogInReducer.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePasswordRequest: (userName, oldPassword, newPassword, confirmNewPassword) => dispatch(changePasswordRequest(userName, oldPassword, newPassword, confirmNewPassword)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);