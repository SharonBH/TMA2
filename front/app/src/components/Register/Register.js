import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './RegisterComp.scss';
import { registerRequest, addNewUserRequest, appCallTakeAllUsers } from "../../actions/Api";
import { addNewTournamentRequest, addNewEventRequest, addNewGroupRequest, editGroupRequest, appCallTakeAllEvents, tournEventsByIdRequest } from "../../actions/GamesApi";
import { successMessageAction, errorMessageAction, addNewItemAction, addNewEventAction, addNewTournamentAction, editThisGroupAction } from '../../actions';
import { connect } from 'react-redux';
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';
import SelectComp from '../UI/SelectComp/SelectComp';
import SelectIdComp from '../UI/SelectComp/SelectIdComp';
import moment from 'moment';
import {ADD_TOURNAMENT, EDIT_GROUP, ADD_USER, REGISTER, ADD_NEW_GROUP, ADD_EVENT} from '../../configuration/config';


import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
// import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { DateTimePicker, DatePicker } from 'material-ui-pickers';

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
            EventTypeName:'',
            TournamentStartDate: '',
            TournamentEndDate: '',
            EventsMaxNum: '',
            groups: '',

            EventName: '',
            Tournament: '',
            EventDate: '',
            selectedDate: moment().format('YYYY-MM-DD, HH:MM'),
            addEventSelectedUsersList: [],
            

            groupName: '',
            searchUsers: '',
            searchUsersResult: [],
            addSearchUsersResult: [],
            usersIds: [],
            editGroupName: false,

            
            
        }
    }
    componentWillMount() {
        const { headline, group } = this.props
        if(headline === EDIT_GROUP) {
            let usersList = []
            group.users.map(user => {
                usersList.push(user)
            })
            this.setState({addSearchUsersResult: usersList})
            this.setState({groupName: group.groupName})
        }
        else if(headline === ADD_NEW_GROUP) {
            this.props.appCallTakeAllUsers()
        }
        else if(headline === ADD_TOURNAMENT) {
            this.props.appCallTakeAllEvents()
        }
        this.state.TournamentStartDate === '' ?  this.setState({ TournamentStartDate: moment().format('LLLL')  }) : null

        this.state.TournamentEndDate === '' ?  this.setState({ TournamentEndDate: moment().format('LLLL')  }) : null
    }

    componentWillUnmount(){
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        // this.setState({addEventSelectedUsersList: []})

    }

    onEmailChange = (e) => {this.setState({ email: e.target.value })}
    onPasswordChange = (e) => {this.setState({password: e.target.value})}
    onConfirmPasswordChange = (e) => {this.setState({confirmPassword: e.target.value})}
    onNameChange = (e) => { this.setState({ name: e.target.value})}
    onUserNameChange = (e) => { this.setState({userName: e.target.value})}

    onTournamentNameChange = (e) => { this.setState({TournamentName: e.target.value})}
    onTypeOfEventChange = (e) => { this.setState({EventTypeName: e.target.value})}
    // onStartDateChange = (e) => {this.setState({TournamentStartDate: Date.now(e.target.value)})}
    // onEndDateChange = (e) => { this.setState({TournamentEndDate: new Date(e.target.value)})}

    onStartDateChange = (date) => {this.setState({TournamentStartDate: new Date(date )});}
    onEndDateChange = (eDate) => { this.setState({TournamentEndDate: new Date(eDate ) });}

    onMaxNumChange = (e) => { this.setState({EventsMaxNum: e.target.value})}

    onEventNameChange = (e) => { this.setState({EventName: e.target.value})}
    onTournamentChange = (e) => { this.setState({Tournament: e.target.value})}
    // onDateOfEventChange = (e) => { this.setState({EventDate: new Date(e.target.value)})}
    handleDateChange = (date) => { this.setState({ selectedDate: new Date(date )}); }
    
    onGroupNameChange = (e) => { this.setState({groupName: e.target.value})}
    onGroupsChange = (e) => { this.setState({groups: e.target.value})}

    onSearchUsersChange = (e) => { 
        this.setState({ searchUsersResult: [] })
        this.setState({searchUsers: e.target.value})

        setTimeout(() => {
            this.props.allList.map((user) => {
                const searchFor = this.state.searchUsers
                if(searchFor.length > 0 && ((user.username).toLowerCase()).includes(searchFor)) {
                    let arr = [...this.state.searchUsersResult, user]
                    const removeDuplicateArr = [...new Set(arr)]
                    this.setState({searchUsersResult: removeDuplicateArr})
                }
            })
        }, 300)
    }

    getTournById=(tournIdToPage)=>{
        this.props.tournEventsByIdRequest(tournIdToPage)
    }


    addSearchUserResult = (user, e) => {
        const fill = this.state.addSearchUsersResult.filter(item => item.user.userId !== user.user.userId)
        const array = [...fill, {user: user.user, score: e.target.value}]
        array.sort((a, b) => {
            return a.username === b.username ? 0 : a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1;
        })
        this.setState({addSearchUsersResult: array})
    }
    addSearchUsers = (user) => {
        // const { EventDate } = this.state
        // const {groupById} = this.props

        const fill = this.state.addSearchUsersResult.filter(item => String(item.userId) !== String(user.userId))
        const array = [...fill, {userId: user.userId, score: null, username: user.username}]

        array.sort((a, b) => {
            return a.username === b.username ? 0 : a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1;
        })
        this.setState({addSearchUsersResult: array})


        // if(EventDate === '') {
        //     this.props.errorMessageAction('you must first enter a date for this event')
        // } else {
            
        // }
    }
    addNewGroup = (e) => {
        e.preventDefault()
        if(this.state.groupName === '') {
            this.props.errorMessageAction('group must have a name')
        } else if (this.state.addSearchUsersResult.length === 0) {
            this.props.errorMessageAction('select users for this group')
        } else {
            const { groupName, addSearchUsersResult} = this.state
        let arr = []
        addSearchUsersResult.map((user) => {
            arr.push(user.userId)
        })
        this.props.addNewGroupRequest(groupName, arr)
        this.setState({groupName: '', usersIds: [], searchUsers: '', searchUsersResult: [], addSearchUsersResult: []})
        }
    }
    addNewUser = (e, headline) => {
        const { email, password, confirmPassword, name, userType, userName } = this.state
        e.preventDefault()
        if(!email.includes('@')) {
            this.props.errorMessageAction('you must enter a valid email address')
        } else if (password.length < 6) {
            this.props.errorMessageAction('password must have at least 6 characters')
        } else if (password !== confirmPassword) {
            this.props.errorMessageAction('confirm password doesn\'t match  password')
        } else if (name === '') {
            this.props.errorMessageAction('you must enter a name')
        } else if (userName === '') {
            this.props.errorMessageAction('you must enter a user name')
        } else {
            headline === ADD_USER 
            ? this.props.addNewUserRequest(email, password, confirmPassword, name, userType, userName)
            : this.props.registerRequest(email, password, confirmPassword, name, userType, userName) 
        }
    }

    addNewTournament = (e) => {
        const { TournamentName, TournamentStartDate, TournamentEndDate, EventsMaxNum, EventTypeName, groups } = this.state
        e.preventDefault()
        const today = Date.parse(new Date())
        const startday = Date.parse(TournamentStartDate)
        const endday = Date.parse(TournamentEndDate)
        if(TournamentName === '') {
            this.props.errorMessageAction('you must enter a tournament name')
        } else if (groups === '') {
            this.props.errorMessageAction('you must choose a group of users')
        } else if (EventTypeName === '') {
            this.props.errorMessageAction('you must choose event type')
        } else if (TournamentStartDate === '' || TournamentEndDate === '') {
            this.props.errorMessageAction('you must enter the tournament start & end dates')
        } else if (today > startday) {
            this.props.errorMessageAction('the tournament start date must be later than today')
        } else if (startday > endday) {
            this.props.errorMessageAction('the tournament end date must be later than the start date')
        } else if (EventsMaxNum === '') {
            this.props.errorMessageAction('you must enter a number of max events')
        } else {
            this.props.addNewTournamentRequest(TournamentName, moment(TournamentStartDate).format('YYYY-MM-DD hh:mm:ss '), moment(TournamentEndDate).format('YYYY-MM-DD hh:mm:ss '), EventsMaxNum, EventTypeName, groups)
        }
    } 

    addNewEvent = (e) => {
        e.preventDefault()
        const {tourn} = this.props
        const { EventName, selectedDate, addSearchUsersResult } = this.state

        const Tournament = tourn.tournamentName
        const usersWithResults = []
        addSearchUsersResult.map(user => {usersWithResults.push({userId: user.userId, result: user.score})})
        if(EventName === '') {
            this.props.errorMessageAction('you must enter the name of this event')
        } else if (selectedDate === '') {
            this.props.errorMessageAction('you must enter the event date')
        } else if (usersWithResults.length < 2) {
            this.props.errorMessageAction('you must choose min of two users for this event')
        } else {
            this.props.addNewEventRequest(EventName, Tournament,  moment(this.state.selectedDate).format('YYYY-MM-DD, HH:MM'), usersWithResults)
        }
    }

    removeSelectedUser = (index) => {
        let removeAddUser = [...this.state.addSearchUsersResult]
        removeAddUser.splice(index, 1)
        this.setState({addSearchUsersResult: removeAddUser})
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
        // console.log('close', this.props)
        // const heading = this.props.headline
        this.props.addNewEventAction(false)
        this.props.addNewItemAction(false)
        this.props.addNewTournamentAction(false)
        this.props.editThisGroupAction(false)
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
                        onClick={(e, headline) => this.addNewUser(e, headline)}
                    />}
                    {headline === 'Add User' ? <div className={classes.closePopBtn} onClick={()=>this.closePopUp()}><span>Close</span></div> : null}
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

    tournamentFage = (headline) => {
        const eventTypes = this.props.allEventTypesList.map((event, index) => { return {key: event.eventTypeId, value: event.eventTypeName }})
        const groupL = this.props.groupsList !== null ? this.props.groupsList.map((group) => { return {key: group.groupId, value: group.groupName }}) : <div className={classes.error}>Wait for all data</div>

        return (
            <div className={classes.Register}>
                <h1>{headline}</h1>
                <form>
                    <InputComp inputType="text" name="tournamentName" placeholder="Tournament Name" onChange={this.onTournamentNameChange}/>
                    {/* <InputComp inputType="text" name="typeEvent" placeholder="Type of Event" onChange={this.onTypeOfEventChange}/> */}
                    <div className={classes.select}>
                        <SelectIdComp 
                            key={groupL}
                            options={groupL}
                            placeholder={'Choose group'}
                            name={'groups'}
                            onChange={(e) => this.onGroupsChange(e)}   
                        />
                    </div>
                    <div className={classes.select}>
                        <SelectComp 
                            key={eventTypes}
                            options={eventTypes}
                            placeholder={'Tournament Type'}
                            name={'eventType'}
                            onChange={(e) => this.onTypeOfEventChange(e)}   
                        />
                    </div>


                    {/* <InputComp inputType="date" name="startDate" placeholder="Start Date" onChange={this.onStartDateChange} />
                    <InputComp inputType="date" name="endDate" placeholder="End Date" onChange={this.onEndDateChange} /> */}
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            className={classes.timePicker}
                            value={this.state.TournamentStartDate}
                            onChange={(date)=> this.onStartDateChange(date)}
                            showTodayButton
                            name="startDate" 
                            placeholder={'Start Date'}
                            format="MMM Do YYYY"
                            label='Start Date:'
                        /> 
                        <DatePicker
                            className={classes.timePicker}
                            value={this.state.TournamentEndDate}
                            onChange={(eDate)=> this.onEndDateChange(eDate)}
                            showTodayButton
                            name="endDate" 
                            placeholder={'End Date' }
                            format="MMM Do YYYY"
                            label='End Date:'
                        />
                    </MuiPickersUtilsProvider>
                    <InputComp inputType="number" name="maxNumOfEvents" placeholder="Maximum number Of Events" onChange={this.onMaxNumChange}/>
                    {this.errorMessage()}
                    {this.successMessage()}
                    {<BtnComp 
                        inputType="submit" 
                        name="createTour" 
                        content={headline} 
                        onClick={this.addNewTournament}
                    /> }
                    {headline === ADD_TOURNAMENT ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                </form>
            </div>
        )
    }
    eventUsersPlaying = () => {
        const { EventDate, addSearchUsersResult } = this.state
        const today = Date.parse(new Date())
        const eventday = Date.parse(EventDate)
        if(addSearchUsersResult.length > 0) {
            return addSearchUsersResult.map((user, index) => {
                return <span className={classes.user +' '+classes.userResult} key={index}>
                    {user.username}
                    {today > eventday ? <InputComp inputType="number" name="userResult" placeholder="score" onChange={this.addSearchUserResult.bind(this, user)}/> : null}
                    <i className="far fa-times-circle" onClick={() => this.removeSelectedUser(index)}></i>
                </span>
            })
        } else {
            return null
        }
    }
    
    eventFage = (headline) => {
        
        const selectedDate = moment(this.state.selectedDate).format('YYYY-MM-DD,HH:MM');
        const {tourn, groupById} = this.props
        const arr = [...groupById.users]
        arr.sort((a, b) => { return a.username === b.username ? 0 : a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1;})
        return (
            <div className={classes.Register}>
                <h1>{headline}</h1>
                <form>
                    <InputComp inputType="text" name="tournament" placeholder={'Tournament Name'} content={tourn.tournamentName} onChange={() => {}}/>
                    <InputComp inputType="text" name="eventName" placeholder="Event Name" onChange={this.onEventNameChange}/>
                    {/* <InputComp inputType="datetime-local" name="deteOfEvent" placeholder="Date Of Event" onChange={this.onDateOfEventChange}/> */}
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        
                        <DateTimePicker
                            className={classes.timePicker}
                            value={selectedDate}
                            onChange={(date)=> this.handleDateChange(date)}
                            showTodayButton
                            name="deteOfEvent" 
                            placeholder={moment().format('LLLL') }
                            ampm={false}
                            label={'Event Time:'}
                        />
                        </MuiPickersUtilsProvider>
                    <div className={classes.usersAddedWrapper}>
                        {<span className={classes.searchResult}>selected players for this event</span>}
                        {this.eventUsersPlaying()}
                    </div>
                    <div className={classes.usersAddedWrapper} >
                        {<span className={classes.searchResult}>select players from the tournament group</span>}
                        {arr !== undefined ? arr.map((user, index) => {
                        return (
                            <span className={classes.user} key={index} onClick={() => this.addSearchUsers(user)}>
                                {user.username}
                                <i className="far fa-plus-square"></i>
                            </span>      
                         ) }): null}
                    </div>
                    {this.errorMessage()}
                    {this.successMessage()}
                    {headline === ADD_EVENT
                    ? 
                    <Link to={`/tournament_page/${this.props.tourn.tournamentName}`} onClick={()=>this.getTournById(this.props.tourn.tournamentId)}>
                    <BtnComp
                        inputType="submit" 
                        name="createEvent" 
                        content={headline} 
                        onClick={this.addNewEvent}
                    /></Link>
                    : <BtnComp
                        inputType="submit" 
                        name="createEvent" 
                        content={headline} 
                        onClick={this.addNewEvent}
                    /> }
                    
                    {headline === ADD_EVENT ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                </form>
            </div>
        )
    }

    CleaningInputFromUsers = () => {
        setTimeout(() => {
            this.setState({searchUsers: ''})
            this.setState({searchUsersResult: []})
        }, 200)
    }
    
    addNewGroupPage = (headline, group) => {
        return (
            <div className={classes.Register}>
                <h1>{headline} {headline === EDIT_GROUP ? group.groupName : null}</h1>
                <form>
                    
                    {
                        headline === EDIT_GROUP
                        ?   <div className={classes.wrappLine}>
                                <label className={classes.HeadLine} name={'Group Name'}>{'Group Name'}:</label>
                                {
                                    this.state.editGroupName
                                    ?   <div className={classes.EditInput}>
                                            <InputComp 
                                                inputType={'text'}
                                                name={'Group Name'} 
                                                placeholder={'Group Name'} 
                                                content={this.state.groupName} 
                                                onChange={(e) => this.onGroupNameChange(e)}
                                            />
                                        </div> 
                                    : <span className={classes.editLineInput}>{this.props.group.groupName}</span>
                                }
                                {this.editBtnFunc()}
                            </div>
                        :   <InputComp autoFocus={true} inputType="text" name="groupName" placeholder="Group Name" onChange={this.onGroupNameChange}/>
                    }
                    <div className={classes.searchUsersWrapper}>
                        <InputComp inputType="text" autoFocus={true} onBlur={this.CleaningInputFromUsers} content={this.state.searchUsers} name="Search User By UserName" placeholder="Search And Add Users" onChange={this.onSearchUsersChange}/>
                        <div className={classes.usersAddedWrapper}>
                            {this.state.addSearchUsersResult.length > 0 || this.state.addSearchUsersResult !== undefined
                                ?   this.state.addSearchUsersResult.map((user, index) => {
                                        return <span className={classes.user} key={index}>{user.username}
                                         {/* {headline === EDIT_GROUP ? user.username : user.username}  */}
                                            <i className="far fa-times-circle" onClick={() => this.removeSelectedUser(index)}></i>
                                        </span>
                                    })
                                :   null}
                        </div>
                        <div className={classes.usersWrapper} >
                            {this.state.searchUsersResult.length > 0 ? <span className={classes.searchResult}>Search Result:</span> : null}
                            {this.state.searchUsersResult.map((user, index) => (  
                                <span className={classes.user} key={index} onClick={() => this.addSearchUsers(user)}>
                                    {user.username}
                                    <i className="far fa-plus-square"></i>
                                </span>      
                            ))}
                        </div>
                    </div>
                    {this.errorMessage()}
                    {this.successMessage()}
                    <BtnComp 
                        inputType="submit" 
                        name="createGroup" 
                        content={headline} 
                        onClick={headline === ADD_NEW_GROUP ? this.addNewGroup : (e) => this.editGroupRequest(e, group)}
                    />
                    {(headline === ADD_NEW_GROUP || headline === EDIT_GROUP) ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                </form>
            </div>
        )
    }

    editGroupRequest = (e, group) => {
        e.preventDefault()
        const { headline } = this.props
        if(this.state.groupName === '') {
            this.props.errorMessageAction('group must have a name')
        } else if (this.state.addSearchUsersResult.length === 0) {
            this.props.errorMessageAction('select users for this group')
        } else {
            let userIds = []
            const groupId = group.groupId
            const groupName = this.state.groupName
            this.state.addSearchUsersResult.map(user => {
                
                if(headline === EDIT_GROUP){
                   return userIds.push(user.userId)
                }else{
                   return userIds.push(user.userId)
                }
                
                // userIds.push(user.user.userId)
            })
            this.props.editGroupRequest(groupId, groupName, userIds)
        }
        
    }

    editBtnFunc = () => {
        return (
            <div className={classes.BTN}>
                <i className={ 
                    this.state.editGroupName 
                    ?   classes.active + ' fas fa-pen' 
                    :   classes.notActive + ' fas fa-pen'  } 
                    onClick={() => this.editGroupNameBtn()}>
                </i>
            </div> 
        )
    }

    editGroupNameBtn = () => {
        this.setState({editGroupName: !this.state.editGroupName})
    }    

    outputToRender = () => {
        const { headline, classStr, group } = this.props
        if(headline === REGISTER || headline === ADD_USER){
           return this.rgisterFage(headline, classStr)
        } else if(headline === ADD_TOURNAMENT){
            return this.tournamentFage(headline)
        } else if( headline === ADD_EVENT ){
            return this.eventFage(headline)
        } else if( headline === ADD_NEW_GROUP ){
            return this.addNewGroupPage(headline)
        } else if( headline === EDIT_GROUP ){
            return this.addNewGroupPage(headline, group)
        }
    }
    
    render() {
        console.log('this.state.groupName',  this.props)
        return (
            <div className={classes.RegisterWrapper}>
                {this.outputToRender()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.sharedReducer.errorMessage,
        successMessage: state.sharedReducer.successMessage,
        allTournsList: state.allListReducer.allTournsList,
        allEventTypesList: state.allListReducer.allEventTypesList,
        allList: state.allListReducer.allList,
        groupsList: state.allListReducer.groupsList,
        groupById: state.allListReducer.groupById,
        tournByIdNoS: state.allListReducer.tournByIdNoS,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: (payload) => dispatch(successMessageAction(payload)),
        registerRequest: (email, password, confirmPassword, name, userType, userName) => dispatch(registerRequest(email, password, confirmPassword, name, userType, userName)),
        addNewUserRequest: (email, password, confirmPassword, name, userType, userName) => dispatch(addNewUserRequest(email, password, confirmPassword, name, userType, userName)),
        addNewTournamentRequest: (tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum, EventTypeName, groups) => dispatch(addNewTournamentRequest(tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum, EventTypeName, groups)),
        addNewEventRequest: (EventName, Tournament, EventDate, usersWithResults) => dispatch(addNewEventRequest(EventName, Tournament, EventDate, usersWithResults)),
        addNewItemAction: (payload) => dispatch(addNewItemAction(payload)),
        addNewGroupRequest: (groupName, usersIds) => dispatch(addNewGroupRequest(groupName, usersIds)),        
        addNewEventAction: (payload) => dispatch(addNewEventAction(payload)),
        addNewTournamentAction: (payload) => dispatch(addNewTournamentAction(payload)),
        editThisGroupAction: (payload) => dispatch(editThisGroupAction(payload)),
        editGroupRequest: (groupId, groupName, userIds) => dispatch(editGroupRequest(groupId, groupName, userIds)),
        appCallTakeAllUsers: (payload) => dispatch(appCallTakeAllUsers(payload)),
        appCallTakeAllEvents: (payload) => dispatch(appCallTakeAllEvents(payload)),
        tournEventsByIdRequest: (payload) => dispatch(tournEventsByIdRequest(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);