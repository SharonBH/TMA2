import React, { Component } from 'react';
import classes from './ForgotPassword.scss';
import { connect } from 'react-redux';
import { forgotPassRequest } from "../../actions/Api";
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
    
    onChangeValue = (e) => {
        this.setState({email: e.target.value})
    }

    onClick = (e) => {
        e.preventDefault()
        const email = this.state.email
        if(email === ''){
            this.setState({error: 'Must be Email'})
        } else {
            this.setState({error: ''})
            this.props.forgotPassRequest(email)           
        }
    }

    componentWillUnmount() {
        this.setState({error: ''})
        this.setState({email: ''})
    }

    errorMessage = () => {
        const error = this.props.errorMessage
        if (error === 'Invalid login attempt.') {
            return <p>{error}</p>
        } else {
            return null
        }
    }

    render() {
        return (
            <div className={classes.ForgotPasswordWrapper}>
                <div className={classes.ForgotPassword}>
                    <h1>Forgot Password?</h1>
                    <h3>Enter email to reset password</h3>
                    <p className={classes.error}>{this.state.error}</p>
                    <InputComp inputType='email' name='email' placeholder='Email' onChange={this.onChangeValue} content={this.state.email}/>
                    <BtnComp inputType='button' content='Send' onClick={this.onClick}/>
                </div>
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.loginErrorMessageReducer.errorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        forgotPassRequest: (payload) => dispatch(forgotPassRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);