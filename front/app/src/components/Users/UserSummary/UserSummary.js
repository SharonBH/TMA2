import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import moment from 'moment'
import { Link } from 'react-router-dom'
import BtnComp from '../../UI/BtnComp/BtnComp';
import InputComp from '../../UI/InputComp/InputComp';
import SelectComp from '../../UI/SelectComp/SelectComp.js';
import SelectIdComp from '../../UI/SelectComp/SelectIdComp.js';
import { changePasswordRequest, editThisUserRequest } from '../../../actions/Api';
import { editThisTournamentRequest, editThisEventRequest, tournEventsByIdRequest } from '../../../actions/GamesApi';
import ChangePassword from '../../ChangePassword/ChangePassword';
import { changePassOpenAction, successMessageAction, errorMessageAction, editThisItemAction, editThisGroupAction, editThisEventAction }  from '../../../actions';
import { EDIT_TOURNAMENT, YOUR_PROFILE, EDIT, EDIT_EVENT, EDIT_USER } from '../../../configuration/config';


import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
// import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { DateTimePicker } from 'material-ui-pickers';
// @param {Boolean} [options.awareOfUnicodeTokens=false]

class UserSummary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: '',
            changePassword: false,
            inputs: [],
            userDetailsArr: this.detailsToState(),
            selectedDate: this.props.event.eventDate,
        }
        this.editDetail = this.editDetailBtn.bind(this)
    }
    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
      }



    componentWillUnmount() {
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({changePassword: false})
    }
    getTournById=(tournIdToPage)=>{
        this.props.tournEventsByIdRequest(tournIdToPage)
    }
    detailsToState = () => {
        const headline = this.props.headline
        if(headline === EDIT_TOURNAMENT){
            const tournamentData = this.props.tournament
            const gName =  this.props.groupsList !== undefined ? this.props.groupsList.find((tourn) => {return tourn.groupId === tournamentData.groupId}): null
            const eventTName = this.props.allEventTypesList !== undefined || this.props.allEventTypesList !== null ? this.props.allEventTypesList.find((event) => {return event.eventTypeId === tournamentData.eventTypeId} ) : null
            const eventN = eventTName.eventTypeName
            const tournamentName = tournamentData.tournamentName
            const groupName = gName.groupName
            const startDate = moment(tournamentData.startDate).format('LLLL') 
            const endDate =  moment(tournamentData.endDate).format('LLLL') 
            const numberOfEvents = tournamentData.numberOfEvents
            return ([
                    {edit: false, detail: 'Tournament Name', param: tournamentName, editInput: tournamentName},
                    {edit: false, detail: 'Group Name', param: groupName, editInput: groupName},
                    {edit: false, detail: 'Event Type', param: eventN, editInput: eventN},
                    {edit: false, detail: 'Start Date', param: startDate, editInput: startDate},
                    {edit: false, detail: 'End Date', param: endDate, editInput: endDate},
                    {edit: false, detail: 'Max Events', param: numberOfEvents,  editInput: numberOfEvents},
            ])
        } else if( headline === EDIT || headline === YOUR_PROFILE ){
            const userData = this.props.user
            const name = userData.name
            const username = userData.username
            const email = userData.email
            // const password = userData.password
            const role = userData.role
            return ( [
                    {edit: false, detail: 'User Name', param: username, editInput: username},
                    {edit: false, detail: 'Name', param: name, editInput: name},
                    {edit: false, detail: 'eMail', param: email, editInput: email},
                    {edit: false, detail: 'User Type', param: role,  editInput: role},
            ])
        } else if( headline === EDIT_EVENT ){
            const eventData = this.props.event
            const TournamName = this.props.allTournsList.find((tourn) => {return tourn.tournamentName === eventData.tournamentName})
            const tournN = TournamName !== undefined ?  Object.values(TournamName)[1] : null
            const eventName = eventData.eventName
            const eventDate = eventData.eventDate
            const eventResults = eventData.eventResults

            return ( [
                {edit: false, detail: 'Event Name', param: eventName, editInput: eventName},
                {edit: false, detail: 'Tournament Name', param: tournN, editInput: tournN},
                {edit: false, detail: 'Event Date', param: eventDate,  editInput: eventDate},
                {edit: false, detail: 'Event Users Results', param: eventData,  editInput: eventResults},
            ])
        }
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

    editEventDetailInput = (index, user, e) => {
        const details = [...this.state.inputs]
        const results = {userId: user.userId, result: e.target.value}
        const filtered = details.filter(user => user.userId !== results.userId)
        const some = [
            ...filtered,
            results
        ]
        this.setState({inputs: some}) 
    }

    editBtnFunc = (item, index) => {
        if(item.detail === 'Name' || item.detail === 'eMail' || (this.props.editThisItem && item.detail !== 'User Name' ) || this.props.editThisEvent || (this.props.editThisEvent && item.detail !== 'Tournament Name' ) ) {
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
    changePassword = () => {
        setTimeout(() => {
            this.setState({changePassword: true})
        }, 200)
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
        this.props.editThisEventAction(false)
    }

    submitUserAditeChanges = (headline) => {
        const today = Date.parse(new Date())
        const editRequestParam = []
        this.state.userDetailsArr.map((item) => {
          return  editRequestParam.push(item.editInput) 
        })           
        if(headline === EDIT || headline === YOUR_PROFILE) {
            if(!editRequestParam[2].includes('@')) {
                this.props.errorMessageAction('you must enter a valid email address')
            } else if (editRequestParam[1] === '') {
                this.props.errorMessageAction('you must enter a name')
            } else {
                this.props.editThisUserRequest(headline,editRequestParam[0],editRequestParam[1],editRequestParam[2],editRequestParam[3])
            }
        }
        else if(headline === EDIT_TOURNAMENT){
            const startday = Date.parse(editRequestParam[3])
            const endday = Date.parse(editRequestParam[4])

            const startDayToSend = moment(editRequestParam[3]).format('YYYY-MM-DD hh:mm:ss ')
            const endDayToSend = moment(editRequestParam[4]).format('YYYY-MM-DD hh:mm:ss')
            
            const findId = typeof editRequestParam[1] === 'string' ? this.props.groupsList.find(gName => { return gName.groupName === editRequestParam[1] }) : this.state.userDetailsArr[1].editInput
            const sendData = findId !== undefined ? findId.groupId :  this.state.userDetailsArr[1].editInput

            const tournamentId = this.props.tournament.tournamentId
            if(editRequestParam[0] === '') {
                this.props.errorMessageAction('you must enter a tournament name')
            } else if (today > startday) {
                this.props.errorMessageAction('the tournament start date must be later than today')
            } else if (startday > endday) {
                this.props.errorMessageAction('the tournament end date must be later than the start date')
            } else if (editRequestParam[5] === '') {
                this.props.errorMessageAction('you must enter a number of max events')
            }else {
                this.props.editThisTournamentRequest( tournamentId, editRequestParam[2], sendData, editRequestParam[0], startDayToSend, endDayToSend, editRequestParam[5])
            }
        } 
        else if(headline === EDIT_EVENT){
            const eventId = this.props.event.eventId
            const { event } = this.props
            const fill = event.eventResults.map(result => {return result })
            const idies = fill.filter(list => this.state.inputs.findIndex(id => id.userId === list.userId) === -1)
            const notState = idies.map(item => {return {userId: item.userId, result: item.result } })
            const concated = notState.concat(this.state.inputs)
            // const eventdate = Date.parse(editRequestParam[2])

            const eventStateDate = JSON.stringify(this.state.selectedDate)
            const eventStateDate1 = JSON.parse(eventStateDate)

            if(editRequestParam[0] === '') {
                this.props.errorMessageAction('you must enter the event name')
            }
             else if (today > eventStateDate) {

                this.props.errorMessageAction('you must enter a date later than today')
            }  
            else {
                this.props.editThisEventRequest(eventId, editRequestParam[0], editRequestParam[1], eventStateDate1, concated)
            } 

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
        const eventTypes = this.props.allEventTypesList.map((data, key) => { return { key: data.eventTypeId, value: data.eventTypeName } })
        // const tournId = this.props.tournById.groupId
        const groupsName = this.props.groupsList !== undefined ? this.props.groupsList.map((group) => { return {key: group.groupId, value: group.groupName }}) : null
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
                            : detail === 'Group Name'
                            ? <SelectIdComp 
                                onChange={(e) => this.editDetailInput(index, e)}
                                options={groupsName}
                                content={this.state.userDetailsArr[index].editInput}
                                selected={item.param}
                                placeholder={detail}
                            />
                            : detail === 'Event Type'
                            ? <SelectComp
                                onChange={(e) => this.editDetailInput(index, e)}
                                options={eventTypes}
                                content={this.state.userDetailsArr[index].editInput}
                                selected={item.param}
                                placeholder={detail}
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
    handleChange = (moment) => {
        this.setState({
          moment
        });
      }
    eventEditLine = (item, index) => {
        const { selectedDate } = this.state;
        const detail = item.detail
        const tournaments = this.props.allTournsList.map((game, index) => { return {key: game.tournamentId, value: game.tournamentName }})
        // const eventTypes = this.props.allEventTypesList.map((data, key) => { return { key: data.eventTypeId, value: data.eventTypeName } })
        
        return (
            <div key={index} className={detail === 'Event Users Results' ? classes.eventResWrapLine  : classes.wrappLine}>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? detail === 'Event Date' 
                    ? <div className={classes.EditCustomInput}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                        
                        <DateTimePicker
                            value={selectedDate}
                            onChange={this.handleDateChange}
                            showTodayButton
                        />
                        </MuiPickersUtilsProvider>
                    </div>
                    : <div className={classes.EditInput}>
                        { detail === 'Event Name' 
                            ? <InputComp 
                                inputType={'text'} 
                                name={detail} 
                                placeholder={detail} 
                                content={this.state.userDetailsArr[index].editInput} 
                                onChange={(e) => this.editDetailInput(index, e)} /> 
                            : detail === 'Tournament Name'
                            ? <InputComp 
                                inputType="text" 
                                name="tournament" 
                                placeholder={tournaments.tournamentName} 
                                content={this.state.userDetailsArr[index].editInput}
                                onChange={() => {}}
                                />
                            : detail === 'Event Users Results' 
                            ?  item.param.eventUsers.map((user) => {
                                const fill = item.param.eventResults.find(result => {return result.userId === user.userId})
                                return <div key={user.userId} className={classes.eventResult}>
                                    <span className={classes.name}>{user.name}</span>
                                    <InputComp 
                                        inputType="number" 
                                        name="result" 
                                        value={this.state.inputs === '' ? fill.result : this.state.inputs.result}
                                        placeholder={fill.result === null ? 'none' : fill.result.toString()} 
                                        onChange={(e) => this.editEventDetailInput(index, user, e)}
                                    />
                                </div>
                            }) 
                            : null
                        } 
                        </div> 
                    : <span className={classes.editLineInput}>
                        {detail === 'Event Date' 
                        ? moment(item.param).format('LLLL') 
                        : detail === 'Event Users Results' 
                        ? item.param.eventUsers.map((user) => {
                            const fill = item.param.eventResults.find(result => {return result.userId === user.userId})
                            return <div key={user.userId} className={classes.eventResult}>
                                <span className={classes.name}>{user.name}</span>
                                <span>score: <b> {fill.result === null ? 'none' : fill.result}</b></span>
                            </div>
                        })  
                        : item.param}
                    </span>
                }
                {this.editBtnFunc(item, index)}
            </div>
        )
    }

    userSummary = (headline, user, tournament, event) => {
        const headLine = headline;
        let name = ''
        if(headline === EDIT_USER){
            name = user !== null ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : null
        } else if( headline === EDIT_TOURNAMENT ){
            name = tournament !== null ? tournament.tournamentName : null
        } else if ( headline === EDIT_EVENT ){
            name = event !== null ? event.eventName : null
        }
        return (
            <div className={classes.Profile} >
                {<h1>{headline} {name}</h1>}
                {this.state.userDetailsArr.map((item, index) => { 
                    if(headline === EDIT_TOURNAMENT){
                        return this.editGameLine(item, index, headLine)
                    } else if( headline === EDIT || headline === YOUR_PROFILE ){
                        return this.detailLine(item, index, headLine)
                    } else if( headline === EDIT_EVENT ){
                        return this.eventEditLine(item, index, headLine)
                    } else if(headline === EDIT_USER){
                        return this.detailLine(item, index, headLine)
                    }
                })}
                {this.errorMessage()}
                {this.successMessage()}
                <span className={classes.SubmitAll}>
                {headline === EDIT_EVENT 
                ? 
                <Link to={`/tournament_page/${this.props.tournById.tournamentName}`} onClick={()=>this.getTournById(this.props.tournById.tournamentId)}>
                    <BtnComp className={classes.editBtn}  inputType="submit"   content='Save All Changes'  onClick={() => this.submitUserAditeChanges(headline)} />
                </Link>
                :<BtnComp className={classes.editBtn}  inputType="submit"   content='Save All Changes'  onClick={() => this.submitUserAditeChanges(headline)} />
                    }
                </span>
                {(headline !== 'Register' && headline !== 'Your Profile') ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                {(this.props.editThisItem || this.props.editThisGroup || this.props.editThisEvent) ? null : <span className={classes.changePass}  onClick={this.changePassBtn}>Change Password</span>}   
                {this.props.passwords ? <ChangePassword headline='Change Password' user={user.username} classStr='none' /> : null}
            </div>
        )
    }

    render() {
        console.log("EDIT PROPS",this.props)
        const { headline, user, tournament, group, event } = this.props
        return (
            <div className={classes.ProfileWrapper}>
                {this.userSummary(headline, user, tournament, group, event)}
                
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
        editThisEvent: state.editItemReducer.editThisEvent,
        allTournsList: state.allListReducer.allTournsList,
        allEventTypesList: state.allListReducer.allEventTypesList,
        tournById: state.allListReducer.tournById,
        groupsList: state.allListReducer.groupsList,
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
        editThisEventAction: payload => dispatch(editThisEventAction(payload)),
        tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),
        editThisUserRequest: (headline, userName, name, email, userType) => dispatch(editThisUserRequest(headline, userName, name, email, userType)),
        editThisEventRequest: (eventId, eventName, eventN, tournN, eventDate, eventResults) => dispatch(editThisEventRequest(eventId, eventName, eventN, tournN, eventDate, eventResults)),
        editThisTournamentRequest: (tournamentId, eventType, groupId, tournamentName, startDate, endDate, numberOfEvents) => dispatch(editThisTournamentRequest(tournamentId, eventType, groupId, tournamentName, startDate, endDate, numberOfEvents)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);