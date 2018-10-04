import React, { Component } from 'react';
import classes from '../Register/RegisterComp.scss';
import chClasses from './ChangePassword.scss';
import { connect } from 'react-redux';
import { changePasswordRequest } from "../../actions/Api";
import { successMessageAction, errorMessageAction, changePassOpenAction } from "../../actions";
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';

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
        console.log(this.props)
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
        const username = this.state.username
        const password = this.state.password
        const newPassword = this.state.newPassword
        const confirmPassword = this.state.confirmPassword
        

        if(username === '' || password === '' || newPassword === '' || confirmPassword === ''){
            this.setState({error: 'Must be all data'})
        }else{
            this.setState({error: ''})
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
        console.log("close good")
        this.props.changePassOpenAction(false)
    }
    render() {
        return (
            <div className={chClasses.changePassWrapper}>
                <div className={chClasses.changePass}>
                    <h1>Change Password?</h1>
                    {this.errorMessage()}
                    {this.successMessage()}
                    <InputComp inputType='text' name='username' placeholder='User Name' onChange={this.changeUsername} content={this.state.username}/>
                    <InputComp inputType='password' name='password' placeholder='Password' onChange={this.changePassword} content={this.state.password}/>
                    <InputComp inputType='password' name='newPassword' placeholder='New Password' onChange={this.changeNewPassword} content={this.state.newPassword}/>
                    <InputComp inputType='password' name='confirmPassword' placeholder='Confirm Password' onChange={this.changeConfirmPassword} content={this.state.confirmPassword}/>
                    <div className={classes.changeBtn}><BtnComp inputType='button' content='Send' onClick={this.onClick}/></div>
                    <div className={chClasses.closePopBtn} onClick={this.closePopUp}><span>Close</span></div>
                </div>
                <div className={chClasses.changePassBG}></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorMessageReducer.errorMessage,
        successMessage: state.successMessageReducer.successMessage,
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