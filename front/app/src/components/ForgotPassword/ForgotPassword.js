import React, { Component } from 'react';
import classes from './ForgotPassword.scss';
import { connect } from 'react-redux';
import { forgotPassRequest } from "../../actions/Api";
import { successMessageAction, errorMessageAction } from "../../actions";
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';

class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            error:''
        }
    }
    componentWillUnmount() {
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
    }
    onChangeValue = (e) => { this.setState({email: e.target.value})}

    onClick = (e) => {
        e.preventDefault()
        const email = this.state.email

        if(!email.includes('@')) {
            this.props.errorMessageAction('you must enter a valid email address')
        } else {
            this.props.forgotPassRequest(email)           
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
    successMessage = () => {
        const success = this.props.successMessage
        if (success !== null) {
            this.props.errorMessageAction(null)
            return <p className={classes.success}>{success}</p>
        } else {
            return null
        }
    }

    render() {
        const { closePop } = this.props
        return (
            <div className={classes.ForgotPasswordWrapper}>
                <div className={classes.ForgotPassword}>
                    <h1>Forgot Password?</h1>
                    <h3>Enter email to reset password</h3>
                    {this.errorMessage()}
                    {this.successMessage()}
                    <InputComp inputType='email' name='email' placeholder='Email' onChange={this.onChangeValue} content={this.state.email}/>
                    <div className={classes.forgotBtn}><BtnComp inputType='button' content='Send' onClick={this.onClick}/></div>
                    <div className={classes.closePopBtn} onClick={closePop}><span>Close</span></div>
                </div>
                
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
        forgotPassRequest: (payload) => dispatch(forgotPassRequest(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);