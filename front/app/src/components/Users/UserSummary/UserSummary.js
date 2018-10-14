import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import BtnComp from '../../UI/BtnComp/BtnComp';
import InputComp from '../../UI/InputComp/InputComp';
import SelectComp from '../../UI/SelectComp/SelectComp.js';
import {  changePasswordRequest, editThisUserRequest } from '../../../actions/Api';
import {  editThisTournamentRequest, editThisEventRequest } from '../../../actions/GamesApi';
import ChangePassword from '../../ChangePassword/ChangePassword';
import { changePassOpenAction, successMessageAction, errorMessageAction, editThisItemAction, editThisGroupAction }  from '../../../actions';

class UserSummary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentUser: '',
            changePassword: false,
            // password: password,
            userDetailsArr: this.detailsToState()
        }
        this.editDetail = this.editDetailBtn.bind(this)
    }
    detailsToState = () => {
        const headline = this.props.headline
        if(headline === 'Edit Tournament'){
            const tournamentData = this.props.tournament
            const tournamentName = tournamentData.tournamentName
            const startDate = tournamentData.startDate
            const endDate = tournamentData.endDate
            const numberOfEvents = tournamentData.numberOfEvents
            return ([
                    {edit: false, detail: 'Tournament Name', param: tournamentName, editInput: tournamentName},
                    {edit: false, detail: 'Start Date', param: startDate, editInput: startDate},
                    {edit: false, detail: 'End Date', param: endDate, editInput: endDate},
                    {edit: false, detail: 'Max Events', param: numberOfEvents,  editInput: numberOfEvents},
            ])
        } else if( headline === 'Edit' || headline === 'Your Profile' ){
            const userData = this.props.user
            const name = userData.name
            const username = userData.username
            const email = userData.email
            const password = userData.password
            const role = userData.role
            return ( [
                    {edit: false, detail: 'User Name', param: username, editInput: username},
                    {edit: false, detail: 'Name', param: name, editInput: name},
                    {edit: false, detail: 'eMail', param: email, editInput: email},
                    {edit: false, detail: 'User Type', param: role,  editInput: role},
            ])
        } else if( headline === 'Edit Event' ){
            const eventData = this.props.event
            const eventTName = this.props.allEventTypesList !== undefined ? this.props.allEventTypesList.find((event) => {return event.eventTypeId === eventData.eventTypeId} ): null
            const eventN = eventTName !== undefined ?  Object.values(eventTName)[1] : null

            const TournamName = this.props.allEventTypesList !== undefined ? this.props.allTournsList.find((tourn) => {return tourn.tournamentId === eventData.tournamentId}): null
            const tournN = TournamName !== undefined ?  Object.values(TournamName)[1] : null
            const eventName = eventData.eventName
            const eventDate = eventData.eventDate
            return ( [
                {edit: false, detail: 'Event Name', param: eventName, editInput: eventName},
                {edit: false, detail: 'Event Type', param: eventN, editInput: eventN},
                {edit: false, detail: 'Tournament Name', param: tournN, editInput: tournN},
                {edit: false, detail: 'Event Date', param: eventDate,  editInput: eventDate},
            ])
        }
    }
    
    componentWillUnmount() {
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({changePassword: false})
    }

    editDetailBtn = (index) => {
        const details = Object.assign([], this.state.userDetailsArr)
        if(details[index].edit) { details[index].edit = false} 
        else { details[index].edit = true }
        this.setState({userDetailsArr: details})
    }

    editDetailInput = (index, e) => {
        const details = Object.assign([], this.state.userDetailsArr)
        details[index].editInput = e.target.value
        this.setState({ userDetailsArr: details })
    }
  
    changePassword = () => {
        setTimeout(() => {
            this.setState({changePassword: true})
        }, 200)
    }

    editBtnFunc = (item, index) => {
        if(item.detail === 'Name' || item.detail === 'eMail' || (this.props.editThisItem && item.detail !== 'User Name' )) {
            return (
                <div className={classes.BTN}>
                    <i className={ 
                        item.edit 
                            ?  classes.active + ' fas fa-pen' 
                            : classes.notActive + ' fas fa-pen'  } 
                        onClick={() => this.editDetailBtn(index)}>
                    </i>
                </div> 
            )
        } else {
            return null
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

    changePassBtn = (username) => {
        this.props.successMessageAction(null)
        this.props.errorMessageAction(null)
        setTimeout(() => {
            this.props.changePassOpenAction(true)
            this.setState({username: username})
        }, 200)
    }

    closePopUp = () => {
        this.props.editThisItemAction(false)
    }

    submitUserAditeChanges = (headline) => {
        const editRequestParam = [
            headline,
            this.state.userDetailsArr[0].editInput,
            this.state.userDetailsArr[1].editInput,
            this.state.userDetailsArr[2].editInput,
            this.state.userDetailsArr[3].editInput,
        ]
        if(headline === 'Edit Tournament'){
            const tournamentId = this.props.tournament.tournamentId
            this.props.editThisTournamentRequest(tournamentId, editRequestParam[0], editRequestParam[1], editRequestParam[2], editRequestParam[3], editRequestParam[4])
        } else if(headline === 'Edit' || headline === 'Your Profile') {
            this.props.editThisUserRequest(editRequestParam[0],editRequestParam[1],editRequestParam[2],editRequestParam[3],editRequestParam[4])
        }  else if(headline === 'Edit Event'){
            const eventId = this.props.event.eventId
            this.props.editThisEventRequest(eventId, editRequestParam[1],editRequestParam[2],editRequestParam[3],editRequestParam[4])
            console.log('event page',eventId, editRequestParam[1],editRequestParam[2],editRequestParam[3],editRequestParam[4])
        }
        
    }
    detailLine = (item, index, headline) => {

        const detail = item.detail
        return (

            <div key={index} className={classes.wrappLine}>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? <div className={classes.EditInput}>
                        {
                            detail === 'User Type'
                            ? <SelectComp 
                                onChange={(e) => this.editDetailInput(index, e)}
                                options={['User', 'Admin']}
                                placeholder='Select User Type'
                            />
                            : <InputComp 
                                inputType={'text'}
                                name={detail} 
                                placeholder={detail} 
                                content={this.state.userDetailsArr[index].editInput}
                                onChange={(e) => this.editDetailInput(index, e)}
                            />
                        } 
                      </div> 
                    : headline === "Edit" ? <span className={classes.editLineInput}>{item.param}</span> : <span>{item.param}</span>
                }
                {this.editBtnFunc(item, index)}
            </div>
        )
    }
    editGameLine = (item, index) => {
        // const allTous = this.props.allTournsList !== undefined ? this.props.allTournsList.map((item) => { return item}) : null
        // const events = events === undefined ? ['no events'] : allTous.map((item) => { return item.eventName});
        const detail = item.detail
        return (
            <div key={index} className={classes.wrappLine}>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? <div className={classes.EditInput}>
                        {
                            detail === 'Max Events'
                            ? <InputComp 
                                inputType={'number'}
                                name={detail} 
                                placeholder={detail} 
                                content={this.state.userDetailsArr[index].editInput}
                                onChange={(e) => this.editDetailInput(index, e)}
                            /> 
                            : <InputComp 
                                inputType={detail === 'Tournament Name' ? 'text' : 'date'}
                                name={detail} 
                                placeholder={detail} 
                                content={this.state.userDetailsArr[index].editInput}
                                onChange={(e) => this.editDetailInput(index, e)}
                            /> 
                        } 
                      </div> 
                    : <span className={classes.editLineInput}>{item.param}</span>
                }
                {this.editBtnFunc(item, index)}
            </div>
        )
    }

    eventEditLine = (item, index) => {
        const detail = item.detail
        const tournaments = this.props.allTournsList.map((game, index) => { return {key: game.tournamentId, value: game.tournamentName }})
        const eventTypes = this.props.allEventTypesList.map((data, key) => { return { key: data.eventTypeId, value: data.eventTypeName } })
        
        return (
            <div key={index} className={classes.wrappLine}>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? <div className={classes.EditInput}>
                        { detail === 'Event Name' ||  detail === 'Event Date'
                            ? <InputComp 
                                inputType={detail === 'Event Name' ? 'text' : 'date'} 
                                name={detail} 
                                placeholder={detail} 
                                content={this.state.userDetailsArr[index].editInput} 
                                onChange={(e) => this.editDetailInput(index, e)} />
                            : <SelectComp 
                                onChange={(e) => this.editDetailInput(index, e)} 
                                options={detail === 'Tournament Name' ? tournaments : eventTypes} 
                                placeholder={detail === 'Tournament Name' ? "Choose tournament name" : "Choose Event Type"}
                        />
                        } 
                        </div> 
                    : <span className={classes.editLineInput}>{item.param}</span>
                }
                {this.editBtnFunc(item, index)}
            </div>
        )
    }

    userSummary = (headline, user, tournament, event) => {
        const headLine = headline;
        let name = ''
        if(headline === 'Edit User'){
             name = user !== null ?  user.name.charAt(0).toUpperCase() + user.name.slice(1) : null
        } else if( headline === 'Edit Tournament' ){
            name = tournament !== null ? tournament.tournamentName : null
        } else if ( headline === 'Edit Event' ){
            name = event !== null ? event.eventName : null
        }
        return (
            <div className={classes.Profile} >
                {<h1>{headline} {name}</h1>}
                {this.state.userDetailsArr.map((item, index) => { 
                    if(headline === 'Edit Tournament'){
                        return this.editGameLine(item, index, headLine)
                    } else if( headline === 'Edit' || headline === 'Your Profile' ){
                        return this.detailLine(item, index, headLine)
                    } else if( headline === 'Edit Event' ){
                        return this.eventEditLine(item, index, headLine)
                    } else if(headline === 'Edit User'){
                        return this.detailLine(item, index, headLine)
                    }
                })}
                {this.errorMessage()}
                {this.successMessage()}
                <span className={classes.SubmitAll}>
                    <BtnComp 
                        className={classes.editBtn} 
                        inputType="submit" 
                        content='Save All Changes'
                        onClick={() => this.submitUserAditeChanges(headline)}
                    />
                </span>
                {(headline !== 'Register' && headline !== 'Your Profile') ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                {(this.props.editThisItem || this.props.editThisGroup) ? null : <span className={classes.changePass}  onClick={this.changePassBtn}>Change Password</span>}   
                {this.props.passwords ? <ChangePassword headline='Change Password' user={user.username} classStr='none' /> : null}
                
            </div>
        )
    }

    render() {
        const { headline, user, tournament } = this.props
        return (
            <div className={classes.ProfileWrapper}>
                {this.userSummary(headline, user, tournament)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.sharedReducer.errorMessage,
        successMessage: state.sharedReducer.successMessage,
        passwords: state.userReducer.passwords,
        currentUser: state.userReducer.currentUser,
        editThisItem: state.editItemReducer.editThisItem,
        editThisGroup: state.editItemReducer.editThisGroup,
        allTournsList: state.allListReducer.allTournsList,
        allEventTypesList: state.allListReducer.allEventTypesList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePassOpenAction: payload => dispatch(changePassOpenAction(payload)),
        changePasswordRequest: (username, password, newPassword, confirmPassword) => dispatch(changePasswordRequest(username, password, newPassword, confirmPassword)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        editThisItemAction: (payload) => dispatch(editThisItemAction(payload)),
        editThisGroupAction: payload => dispatch(editThisGroupAction(payload)),
        editThisUserRequest: (headline, userName, name, email, userType) => dispatch(editThisUserRequest(headline, userName, name, email, userType)),
        editThisEventRequest: (eventId, eventName, eventN, tournN, eventDate) => dispatch(editThisEventRequest(eventId, eventName, eventN, tournN, eventDate)),
        editThisTournamentRequest: (tournamentId, headline, tournamentName, startDate, endDate, numberOfEvents) => dispatch(editThisTournamentRequest(tournamentId, headline, tournamentName, startDate, endDate, numberOfEvents)),
        

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);