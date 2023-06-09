import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import moment from 'moment'
import { Link } from 'react-router-dom'
import BtnComp from '../../UI/BtnComp/BtnComp';
import OutlineBtn from '../../UI/BtnComp/OutlineBtn';
import InputComp from '../../UI/InputComp/InputComp';
import SelectComp from '../../UI/SelectComp/SelectComp.js';
import SelectIdComp from '../../UI/SelectComp/SelectIdComp.js';
import { changePasswordRequest, editThisUserRequest, getAllRolesRequest } from '../../../actions/Api';
import { editThisTournamentRequest, editThisEventRequest, tournEventsByIdRequest } from '../../../actions/GamesApi';
import ChangePassword from '../../ChangePassword/ChangePassword';
import { changePassOpenAction, successMessageAction, errorMessageAction, editThisItemAction, editThisEventAction }  from '../../../actions';
import { EDIT_TOURNAMENT, YOUR_PROFILE, EDIT, EDIT_EVENT, EDIT_USER } from '../../../configuration/config';
import defaultUser from '../../../default-user.png'
// import axios from 'axios'

import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker, DatePicker } from 'material-ui-pickers';

class UserSummary extends Component {

    constructor(props) {
        super(props);       
        this.state = {
            currentUser: '',
            changePassword: false,
            inputs: [],
            userDetailsArr: this.detailsToState(),
            selectedDate: '',
            selectedStartDate: '',
            selectedEndDate: '',
	        uploading: false,
	        images: null,
	        file: '',
	        imagePreviewUrl: defaultUser
        };
        this.editDetail = this.editDetailBtn.bind(this)
    }
    componentWillMount = () => {
        if(this.props.headline === EDIT_EVENT){
            this.setState({selectedDate: this.props.eventDataArr.eventDate})
        }
        this.props.getAllRolesRequest()
        const tournamentData = this.props.tournById
        if(this.props.headline === EDIT_TOURNAMENT){
            if(this.state.selectedStartDate === ''){
                this.setState({ selectedStartDate: moment(tournamentData.startDate).format('LLLL')  })
            } 
            if(this.state.selectedEndDate === '') {
                this.setState({ selectedEndDate: moment(tournamentData.endDate).format('LLLL')  })
            }
        }
    }

    componentWillUnmount() {
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({changePassword: false})
    }
    handleDateChange = (date) => { this.setState({ selectedDate: date }); }
    handleDateTournStartChange = (date) => { this.setState({ selectedStartDate: date }); }
    handleDateTournEndChange = (date) => { this.setState({ selectedEndDate: date }); }
    handleChange = (moment) => { this.setState({ moment }); }
    
    getTournById=(tournIdToPage)=>{
        this.props.tournEventsByIdRequest(tournIdToPage)
    }
    detailsToState = () => {
        const headline = this.props.headline
        if(headline === EDIT_TOURNAMENT){
            const tournamentData = this.props.tournById
            const grName = this.props.groupById

            const eventTName = (this.props.allEventTypesList !== undefined || this.props.allEventTypesList !== null)
                ? this.props.allEventTypesList.find((event) => {
                    return event.eventTypeId === tournamentData.eventTypeId
                }) 
                : null
            const eventN = eventTName.eventTypeName
            const tournamentName = tournamentData.tournamentName
            const groupName = grName.groupName
            const startDate = moment(tournamentData.startDate).format('MMMM Do YYYY') 
            const endDate =  moment(tournamentData.endDate).format('MMMM Do YYYY') 
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
            const role = userData.role
	        const image =  ''
            return ( [
                {edit: false, detail: 'User Name', param: username, editInput: username},
                {edit: false, detail: 'Name', param: name, editInput: name},
                {edit: false, detail: 'eMail', param: email, editInput: email},
	            {edit: false, detail: 'Profile Image', param: image,  editInput: image},
                {edit: false, detail: 'User Type', param: role,  editInput: role},
            ])
        } else if( headline === EDIT_EVENT ){
            const eventData = this.props.eventDataArr
            const TournamName = this.props.allTournsList.find((tourn) => {
                return tourn.tournamentName === eventData.tournamentName}
            )
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
	imageUpload = (e) => {
		e.preventDefault();
		let preview = document.querySelector('img');
		let file    = document.querySelector('input[type=file]').files[0];
		let reader  = new FileReader();
		reader.onloadend = () => {
			preview.src = reader.result;
			this.setState({
                file: file.name,
                imagePreviewUrl: preview.src
           });
		}
		if (file) {
			reader.readAsDataURL(file);
		} else {
			preview.src = "";
		}
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
        const { currentUser } = this.props
        if (item.detail === 'User Name') {
            return null;
        }

        if((item.detail === 'User Type' && currentUser.role === 'Admin') || item.detail !== 'User Type'){
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
            return <p className={classes.error}>
	            <span>{error}
		            <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
            </span></p>
        } else {
            return null
        }
    }

    successMessage = () => {
        const success = this.props.successMessage
        if (success !== null) {
            this.props.errorMessageAction(null)
            return <p className={classes.success}>
	            <span>{success}
		            <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
            </span></p>
        } else {
            return null
        }
    }
	closeMessage = () => {
		this.props.successMessageAction(null)
		this.props.errorMessageAction(null)
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
	    
        // const today = Date.parse(new Date())
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth()+1; //January is 0!
        const yyyy = today.getFullYear();
        const todayDate = mm + dd + yyyy;
        const editRequestParam = []
        
        const imageData = this.state.imagePreviewUrl
	    
     
	    const imgsplit = imageData.split(",");
	    const imgState = imgsplit[imgsplit.length-1]

     
	    const imgToSend = imgState  === '' ? null : imgState
        this.state.userDetailsArr.map((item) => {
          return  editRequestParam.push(item.editInput) 
        })
        
        if(headline === EDIT || headline === YOUR_PROFILE) {
            if(!editRequestParam[2].includes('@')) {
                this.props.errorMessageAction('you must enter a valid email address')
            } else if (editRequestParam[1] === '') {
                this.props.errorMessageAction('you must enter a name')
            } else {

                this.props.editThisUserRequest(headline,editRequestParam[0],editRequestParam[1],editRequestParam[2],imgToSend,editRequestParam[4])
            }
        }
        else if(headline === EDIT_TOURNAMENT){
            const startDayToSend = moment(this.state.selectedStartDate).format('YYYY-MM-DD')
            const endDayToSend = moment(this.state.selectedEndDate).format('YYYY-MM-DD')
            //console.log("submitUserAditeChanges props ", this.props);
            const eventCount = this.props.tournament.events.length;

            const q = new Date(this.state.selectedStartDate)
            const qdd = q.getDate();
            const qmm = q.getMonth()+1; //January is 0!
            const qyyyy = q.getFullYear();
            const qstartDate = qmm + qdd + qyyyy;

            const end = new Date(this.state.selectedEndDate)
            const edd = end.getDate();
            const emm = end.getMonth()+1; //January is 0!
            const eyyyy = end.getFullYear();
            const eEndDate = emm + edd + eyyyy;

            // const startDateToCheck = Date.parse(this.state.selectedStartDate)
            // const endDateToCheck = Date.parse(this.state.selectedEndDate)
            
            const findId = typeof editRequestParam[1] === 'string' ? this.props.groupsList.find(gName => { return gName.groupName === editRequestParam[1] }) : this.state.userDetailsArr[1].editInput
            const sendData = findId !== undefined ? findId.groupId :  this.state.userDetailsArr[1].editInput
            
            const tournamentId = this.props.tournament.tournamentId
            if (editRequestParam[0] === '') {
                this.props.errorMessageAction('you must enter a tournament name')
                //} else if (today > q){
                //    this.props.errorMessageAction('the tournament start date must start from today')
            } else if (eEndDate > q) {
                this.props.errorMessageAction('the tournament end date must be later than the start date')
            } else if (eventCount > 0 && editRequestParam[5] !== null && parseInt(editRequestParam[5]) < eventCount) {
                this.props.errorMessageAction("Max event can't be less then existing event")
            } else {
                this.props.editThisTournamentRequest( tournamentId, editRequestParam[2], sendData, editRequestParam[0], startDayToSend, endDayToSend, editRequestParam[5])
            } 

            
        } 
        else if(headline === EDIT_EVENT){
            const eventId = this.props.eventDataArr.eventId;
            const { eventDataArr, tournById } = this.props;
            const tournamentIdToSend = tournById.tournamentId
            const fill = eventDataArr.eventResults.map(result => {return result });
            const idies = fill.filter(list => this.state.inputs.findIndex(id => id.userId === list.userId) === -1);
            const notState = idies.map(item => {return {userId: item.userId, result: item.result } });
            const concated = notState.concat(this.state.inputs);
	        const TName = this.props.eventDataArr.tournamentName;
            const dateToSend = moment(this.state.selectedDate).format('YYYY-MM-DD HH:mm');
            if(editRequestParam[0] === '') {
                this.props.errorMessageAction('you must enter the event name')
            }
             else if (today > dateToSend) {
                this.props.errorMessageAction('you must enter a date later than today')
            }  
            else {
                this.props.editThisEventRequest(eventId, editRequestParam[0], TName, dateToSend, concated, tournamentIdToSend)
            } 

        }
    }
	
    detailLine = (item, index, headline) => {

        const detail = item.detail
        const { allRoles, currentUser } = this.props
        const roles = allRoles !== null ? allRoles.map((role, index) => { return {key: role.roleId, value: role.roleName }}) : null

        return (
            
             <div key={index} className={(headline === YOUR_PROFILE && currentUser.role === 'User' && detail === 'User Type') || (headline === EDIT && detail === 'Profile Image') ? classes.wrappLineNone : classes.wrappLine}>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? <div className={classes.EditInput}>
                        {
                           detail === 'User Type'  
                            ? <SelectComp
                                onChange={(e) => this.editDetailInput(index, e)}
                                options={roles}
                                placeholder='Select User Type'
                            />
                            : headline === YOUR_PROFILE && detail === 'Profile Image'
                               ? <div className={classes.inputWpapp}><InputComp
                                   inputType={'file'}
                                   id="file"
                                   name="file"
                                   content={this.state.userDetailsArr[index].editInput}
                                   onChange={(e)=>this.imageUpload(e)}
                                   // multiple
                               /><label htmlFor="file">{this.state.file === '' ? ' Select file ': this.state.file  }</label>
                               </div>
                               : <div><InputComp
                                inputType={'text'}
                                name={detail}
                                placeholder={detail}
                                content={this.state.userDetailsArr[index].editInput}
                                onChange={(e) => this.editDetailInput(index, e)}
                                />
                               </div>
                        }
                        </div>
                    : headline === EDIT ? <span className={classes.editLineInput}>{item.param}</span> : <span>{item.param}</span>
                }
                {this.editBtnFunc(item, index)}
            </div>
        )
    }
    
    editGameLine = (item, index) => {
        
        const eventCount = this.props.tournament.events.length;

        const eventTypes = this.props.allEventTypesList.map((data, key) => { return { key: data.eventTypeId, value: data.eventTypeName } })
        // const tournId = this.props.tournById.groupId
        const groupsName = this.props.groupsList !== undefined ? this.props.groupsList.map((group) => { return {key: group.groupId, value: group.groupName }}) : null
        const detail = item.detail
        const { selectedEndDate, selectedStartDate } = this.state;
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
                            : detail === 'Tournament Name' 
                            ? <InputComp
                                inputType={'text'}
                                name={detail}
                                placeholder={detail}
                                content={this.state.userDetailsArr[index].editInput}
                                onChange={(e) => this.editDetailInput(index, e)}
                            />
                            : <div className={classes.EditCustomInput}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                            
                                <DatePicker
                                    value={detail === 'Start Date' ? selectedStartDate : selectedEndDate}
                                    onChange={detail === 'Start Date' ? this.handleDateTournStartChange : this.handleDateTournEndChange}
                                    showTodayButton
                                    // label={detail === 'Start Date' ? 'Start Date:' : 'End Date:'}
                                />
                            </MuiPickersUtilsProvider>
                            </div>
                            
                        } 
                      </div> 
                    : <span className={classes.editLineInput}>{item.param}</span>
                }
                {
                    eventCount > 0 && (detail === 'Start Date' || detail === 'Event Type' || detail === 'Group Name') ?
                        <div className={classes.BTN}></div> : this.editBtnFunc(item, index)
                }
            </div>
        )
    }
    
    eventEditLine = (item, index) => {
        const { selectedDate } = this.state;
        const detail = item.detail
        const tournaments = this.props.allTournsList.map((game, index) => { return {key: game.tournamentId, value: game.tournamentName }})
        // const eventTypes = this.props.allEventTypesList.map((data, key) => { return { key: data.eventTypeId, value: data.eventTypeName } })
        
        return (
            <div key={index} className={detail === 'Event Users Results' ? classes.eventResWrapLine  : detail === 'Tournament Name' ? [classes.wrappLine , classes.wrappLineHide].join(' ') : classes.wrappLine }>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? detail === 'Event Date' 
                    ? <div className={classes.EditCustomInput}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DateTimePicker
                                value={selectedDate}
                                onChange={this.handleDateChange}
                                ampm={false}
                                format="MM DD YYYY, HH:mm"
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
                                    <div className={classes.eventResInp}>
                                        <InputComp
                                            inputType="number"
                                            name="result"
                                            value={this.state.inputs === '' ? fill.result : this.state.inputs.result}
                                            placeholder={fill.result === null ? '-' : fill.result.toString()}
                                            onChange={(e) => this.editEventDetailInput(index, user, e)}
                                        />
                                    </div>
                                </div>
                            }) 
                            : null
                        } 
                        </div> 
                    : <span className={classes.editLineInput}>
                            {detail === 'Event Date' 
                        ? moment(item.param).format('MMMM Do YYYY, HH:mm') 
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
        const {tournById, currentUser} = this.props
                
	    const profileImage = currentUser.avatar === undefined || currentUser.avatar === null ?  <img alt="" src={this.state.defaultUser} /> : <img alt="" src={`data:image/jpeg;base64,`+`${currentUser.avatar}`} />
        let name = ''
        if(headline === EDIT_USER){
            name = user !== null ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : null
        } else if( headline === EDIT_TOURNAMENT ){
            name = tournament !== null ? ' - '+tournament.tournamentName : null
        } else if ( headline === EDIT_EVENT ){
            name = event !== null ? event.eventName : null
        }
        const path = this.props.editThisEventMatch.path === `/all_tournaments/:tournamentName=${tournById.tournamentId}` ? '/all_tournaments' : '/my_tournaments'
        const tournaments = this.props.allTournsList.map((game, index) => { return {key: game.tournamentId, value: game.tournamentName }})
        return (
            <div className={classes.Profile} >
                {<h1>
	                {headline === YOUR_PROFILE ? <div className={classes.profileAvatar}>{profileImage}</div> : null}
                    {headline} {name}
                    {headline === EDIT_EVENT ? <span> by {this.props.tournById.tournamentName}</span> : null}
                    
                </h1>}
                <div className={classes.innerWrapper}>
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
                         {(this.props.editThisItem || this.props.editThisGroup || this.props.editThisEvent) ? null : <OutlineBtn inputType={'button'} className={classes.changePass}  onClick={this.changePassBtn} content={'Change Password'}/>}
                        {headline === EDIT_EVENT
                        ?
                        <Link to={`${path}/${this.props.tournById.tournamentName}=${tournById.tournamentId}`} onClick={()=>this.getTournById(this.props.tournById.tournamentId)}>
                            <BtnComp className={classes.editBtn}  inputType="submit"   content='Save'  onClick={() => this.submitUserAditeChanges(headline)} />
                        </Link>
                        :<BtnComp className={classes.editBtn}  inputType="submit"   content='Save'  onClick={() => this.submitUserAditeChanges(headline)} />
                        }
	                   
                    </span>
                    {(headline !== 'Register' && headline !== 'Your Profile') ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                    
                    {this.props.passwords ? <ChangePassword headline='Change Password' user={user.username} classStr='none' /> : null}
                </div>
            </div>
        )
    }

    render() {    
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
        groupById: state.allListReducer.groupById,
        allRoles: state.allListReducer.allRoles,
        editThisEventMatch: state.editItemReducer.editThisEventMatch,
	    eventMatch: state.editItemReducer.eventMatch,
	    eventDataArr: state.allListReducer.eventDataArr,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePassOpenAction: payload => dispatch(changePassOpenAction(payload)),
        changePasswordRequest: (username, password, newPassword, confirmPassword) => dispatch(changePasswordRequest(username, password, newPassword, confirmPassword)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        editThisItemAction: (payload) => dispatch(editThisItemAction(payload)),
        editThisEventAction: payload => dispatch(editThisEventAction(payload)),
        getAllRolesRequest: payload => dispatch(getAllRolesRequest(payload)),
        tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),
        editThisUserRequest: (headline, userName, name, email, image, userType) => dispatch(editThisUserRequest(headline, userName, name, email, image, userType)),
        editThisEventRequest: (eventId, eventName, eventN, tournN, eventDate, eventResults, tournamentId) => dispatch(editThisEventRequest(eventId, eventName, eventN, tournN, eventDate, eventResults, tournamentId)),
        editThisTournamentRequest: (tournamentId, eventType, groupId, tournamentName, startDate, endDate, numberOfEvents) => dispatch(editThisTournamentRequest(tournamentId, eventType, groupId, tournamentName, startDate, endDate, numberOfEvents)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);