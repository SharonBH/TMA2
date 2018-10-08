import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './RegisterComp.scss';
import { registerRequest, addNewUserRequest } from "../../actions/Api";
import { addNewTournamentRequest } from "../../actions/GamesApi";
import { successMessageAction, errorMessageAction, addNewItemAction } from '../../actions'
import { connect } from 'react-redux';
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            userType: 'User',
            userName: '',
            TournamentName:'',
            TournamentStartDate: '',
            TournamentEndDate: '',
            EventsMaxNum: ''
        }
    }

    onEmailChange = (e) => { this.setState({ email: e.target.value })}
    onPasswordChange = (e) => { this.setState({password: e.target.value})}
    onConfirmPasswordChange = (e) => { this.setState({confirmPassword: e.target.value})}
    onNameChange = (e) => { this.setState({ name: e.target.value})}
    onUserNameChange = (e) => { this.setState({userName: e.target.value})}

    onTournamentNameChange = (e) => { this.setState({TournamentName: e.target.value})}
    onStartDateChange = (e) => { this.setState({TournamentStartDate: e.target.value})}
    onEndDateChange = (e) => { this.setState({TournamentEndDate: e.target.value})}
    onMaxNumChange = (e) => { this.setState({EventsMaxNum: e.target.value})}


    componentWillUnmount(){
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
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

    addNewUser = (e) => {
        const email = this.state.email
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword
        const name = this.state.name
        const userType = this.state.userType
        const userName = this.state.userName
        e.preventDefault()
        this.props.addNewUserRequest(email, password, confirmPassword, name, userType, userName)
        
    }
    addNewTournament = (e) => {
        const tournamentName = this.state.TournamentName
        const tournamentStartDate = this.state.TournamentStartDate
        const tournamentEndDate = this.state.TournamentEndDate
        const eventsMaxNum = this.state.EventsMaxNum

        e.preventDefault()
        this.props.addNewTournamentRequest(tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum)
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
    closePopUp = () => {
        this.props.addNewItemAction(false)
    }
    rgisterFage = (headline, classStr) => {
        return (
            <div className={classes.Register}>
                <h1>{headline}</h1>
                <form>
                    <InputComp inputType="email" name="email" placeholder="eMail" onChange={this.onEmailChange}/>
                    <InputComp inputType="password" name="password" placeholder="Password" onChange={this.onPasswordChange}/>
                    <InputComp inputType="password" name="ConfirmPassword" placeholder="ConfirmPassword" onChange={this.onConfirmPasswordChange}/>
                    <InputComp inputType="text" name="name" placeholder="Name" onChange={this.onNameChange}/>
                    <InputComp inputType="text" name="userName" placeholder="Username" onChange={this.onUserNameChange}/>
                    {this.errorMessage()}
                    {this.successMessage()}
                    {<BtnComp 
                        inputType="submit" 
                        name="register" 
                        content={headline} 
                        onClick={ headline === 'Register' ?  this.registerSbmit : this.addNewUser}
                    />}
                    {headline === 'Add User' ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                </form>
                <div style={{display: classStr}}>
                    <h3>Have a user? Keep Calm.</h3>
                    <div className='loginLink'>
                        <h2>And </h2>
                        <Link to='/'><h2>Sign In</h2></Link>
                    </div> 
                </div>
            </div>
        )
    }
    tournamentFage = (headline, classStr) => {
        return (
            <div className={classes.Register}>
                <h1>{headline}</h1>
                <form>
                    <InputComp inputType="text" name="tournamentName" placeholder="Tournament Name" onChange={this.onTournamentNameChange}/>
                    <InputComp inputType="date" name="startDate" placeholder="Start Date" onChange={this.onStartDateChange}/>
                    <InputComp inputType="date" name="endDate" placeholder="End Date" onChange={this.onEndDateChange}/>
                    <InputComp inputType="number" name="maxNumOfEvents" placeholder="Maximum number Of Events" onChange={this.onMaxNumChange}/>
                    {this.errorMessage()}
                    {this.successMessage()}
                    {<BtnComp 
                        inputType="submit" 
                        name="createTour" 
                        content={headline} 
                        onClick={ headline === 'Add Tournament' ?  this.addNewTournament : this.addNewEvent }
                    />}
                    {headline === 'Add Tournament' ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                </form>
                <div style={{display: classStr}}>
                    <h3>Have a user? Keep Calm.</h3>
                    <div className='loginLink'>
                        <h2>And </h2>
                        <Link to='/'><h2>Sign In</h2></Link>
                    </div> 
                </div>
            </div>
        )
    }

    eventFage = (headline, classStr) => {}

    render() {
        const { headline, classStr } = this.props
        return (
            <div className={classes.RegisterWrapper}>
                { headline === 'Register' || headline === 'Add User'
                ? this.rgisterFage(headline, classStr)
                : this.tournamentFage(headline, classStr)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.sharedReducer.errorMessage,
        successMessage: state.sharedReducer.successMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerRequest: (email, password, confirmPassword, name, userType, userName) => dispatch(registerRequest(email, password, confirmPassword, name, userType, userName)),
        addNewUserRequest: (email, password, confirmPassword, name, userType, userName) => dispatch(addNewUserRequest(email, password, confirmPassword, name, userType, userName)),
        addNewTournamentRequest: (tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum) => dispatch(addNewTournamentRequest(tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: (payload) => dispatch(successMessageAction(payload)),
        addNewItemAction: (payload) => dispatch(addNewItemAction(payload)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);