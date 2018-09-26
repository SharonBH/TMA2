import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import classes from '../Register/RegisterComp.scss';
import loginClasses from '../LogIn/LoginComp.scss';
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
    
    componentDidMount(){
        console.log(this.props)
    }
    onChangeValue = (e) => {
        this.setState({email: e.target.value})
    }

    onClick = (e) => {
        e.preventDefault()
        const email = this.state.email
        if(email === ''){
            this.setState({error: 'Must be Email'})
        }else{
            this.setState({error: ''})
            this.props.forgotPassRequest(email)
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

    
    render() {
        return (
            <div className={classes.LogInWrapper}>
                <div className={classes.forgotPass}>
                    <h1>Forgot Password?</h1>
                    <h3>Enter email to reset password</h3>
                    <p className={classes.error}>{this.state.error}</p>
                    <InputComp inputType='email' name='email' placeholder='Email' onChange={this.onChangeValue} content={this.state.email}/>
                    <div className={classes.forgotBtn}><BtnComp inputType='button' content='Send' onClick={this.onClick}/></div>
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