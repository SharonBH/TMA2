import React, { Component } from 'react';

// import { Link } from 'react-router-dom';
import classes from '../Register/RegisterComp.scss';
import chClasses from './ChangePassword.scss';
// import loginClasses from '/../LogIn/LoginComp.scss';

// import classes from './ChangePassword.scss';

import { connect } from 'react-redux';
import { changePasswordRequest } from "../../actions/Api";
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';

import Spinner from '../Spiner';


class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {

            username: '',
            password:'',
            newPassword:'',
            confirmPassword:'',
            error:'',
            display: false
        }
    }
    
    componentDidMount(){
        console.log(this.props)
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
            console.log('username', username )
        console.log('password', password)
        console.log('newPassword', newPassword)
        console.log('confirmPassword', confirmPassword)
            this.props.changePasswordRequest(username, password, newPassword, confirmPassword)
            // this.props.changePassAction()
        }
    }

    errorMessage = () => {
        const error = this.props.errorMessage
        
        if (error !== null || this.state.error !== '') {
            return ( <p>{error}  {this.state.error}</p> )
        }
    }

    spinner = () => {
        if (this.props.toggleSpinner) {
            return <Spinner />

        } else {
            return null
        }
    }

    successChangeMessage = () => {
        const displayStyleTrue = 'display: none';
        const displayStyleFalse = 'display: block'; 

        const style = ( this.state.display === false ? displayStyleTrue : displayStyleFalse )
        console.log('12212', style)

        return this.props.messageErr.message !== '' 
        ? <p className={classes.success}>
            <span>{this.props.messageErr.message}
                <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
            </span>
        </p>
        : null 
    }
    closeMessage = () => {
        this.setState({ display: true });
    }
    
    render() {
        console.log('123123', this.props)
        return (
            <div className={chClasses.changePassWrapper}>
                <div className={chClasses.changePass}>
                    <h1>Change Password?</h1>
                    <p className={chClasses.errorColor}>{this.errorMessage()}</p>
                    {this.successChangeMessage()}
                    <InputComp inputType='text' name='username' placeholder='User Name' onChange={this.changeUsername} content={this.state.username}/>
                    <InputComp inputType='password' name='password' placeholder='Password' onChange={this.changePassword} content={this.state.password}/>
                    <InputComp inputType='text' name='newPassword' placeholder='New Password' onChange={this.changeNewPassword} content={this.state.newPassword}/>
                    <InputComp inputType='text' name='confirmPassword' placeholder='Confirm Password' onChange={this.changeConfirmPassword} content={this.state.confirmPassword}/>
                    <div className={classes.changeBtn}><BtnComp inputType='button' content='Send' onClick={this.onClick}/></div>
                </div>
                
            </div>
        );
    }
    


}

const mapStateToProps = (state) => {
    return {

        errorMessage: state.editErrorMessageReducer.editErrorMessage,
        messageErr: state.changePassReducer.messageErr,

    }
}

const mapDispatchToProps = dispatch => {
    return {

        changePasswordRequest: (username, password, newPassword, confirmPassword) => dispatch(changePasswordRequest(username, password, newPassword, confirmPassword)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);