import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './RegisterComp.scss';
import { registerRequest, addNewUserRequest } from "../../actions/Api";
import { addNewTournamentRequest, addNewEventRequest, addNewGroupRequest, editGroupRequest } from "../../actions/GamesApi";
import { successMessageAction, errorMessageAction, addNewItemAction, addNewEventAction, addNewTournamentAction, editThisGroupAction } from '../../actions';
import { connect } from 'react-redux';
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';
import SelectComp from '../UI/SelectComp/SelectComp';

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
            EventsMaxNum: '',

            EventName: '',
            // EventTypeName:'',
            Tournament: '',
            EventDate: '',

            groupName: '',
            searchUsers: '',
            searchUsersResult: [],
            addSearchUsersResult: [],
            usersIds: [],
            editGroupName: false
        }
    }

    onEmailChange = (e) => {this.setState({ email: e.target.value })}
    onPasswordChange = (e) => {this.setState({password: e.target.value})}
    onConfirmPasswordChange = (e) => {this.setState({confirmPassword: e.target.value})}
    onNameChange = (e) => { this.setState({ name: e.target.value})}
    onUserNameChange = (e) => { this.setState({userName: e.target.value})}

    onTournamentNameChange = (e) => { this.setState({TournamentName: e.target.value})}
    onStartDateChange = (e) => { this.setState({TournamentStartDate: e.target.value})}
    onEndDateChange = (e) => { this.setState({TournamentEndDate: e.target.value})}
    onMaxNumChange = (e) => { this.setState({EventsMaxNum: e.target.value})}

    onEventNameChange = (e) => { this.setState({EventName: e.target.value})}
    // onTypeOfEventChange = (e) => { this.setState({EventTypeName: e.target.value})}
    onTournamentChange = (e) => { this.setState({Tournament: e.target.value})}
    onDateOfEventChange = (e) => { this.setState({EventDate: e.target.value})}

    onGroupNameChange = (e) => { this.setState({groupName: e.target.value})}

    onSearchUsersChange = (e) => { 
        this.setState({ searchUsersResult: [] })
        this.setState({searchUsers: e.target.value})
        setTimeout(() => {
            this.props.allList.map((user) => {
                const searchFor = this.state.searchUsers
                if(searchFor.length > 0 && (user.username).includes(searchFor)) {
                    let arr = [...this.state.searchUsersResult, user]
                    const removeDuplicateArr = [...new Set(arr)]
                    this.setState({searchUsersResult: removeDuplicateArr})
                }
            })
        }, 300)
    }

    addSearchUsers = (user) => {
        const fill = this.state.addSearchUsersResult.filter(item => String(item.userId) !== String(user.userId))
        const arr = [...fill, user]
        this.setState({addSearchUsersResult: arr})
    }

    removeSelectedUser = (index) => {
        let removeAddUser = [...this.state.addSearchUsersResult]
        removeAddUser.splice(index, 1)
        this.setState({addSearchUsersResult: removeAddUser})
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

    componentWillMount() {
        const { headline, group } = this.props
        if(headline === 'Edit Group') {
            let usersList = []
            group.users.map(user => {
                usersList.push(user)
            })
            this.setState({addSearchUsersResult: usersList})
            this.setState({groupName: group.groupName})
        }
    }

    componentWillUnmount(){
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
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
            headline === 'Register' 
            ? this.props.registerRequest(email, password, confirmPassword, name, userType, userName) 
            : this.props.addNewUserRequest(email, password, confirmPassword, name, userType, userName)
        }
    }

    addNewTournament = (e) => {
        const { tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum } = this.state
        e.preventDefault()
        
        this.props.addNewTournamentRequest(tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum)
    }

    addNewEvent = (e) => {
        const {tourn} = this.props
        const { EventName, EventDate, EventTypeName } = this.state
        const Tournament = tourn.tournamentName
        e.preventDefault()

        this.props.addNewEventRequest(EventName, Tournament, EventDate)
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
                        onClick={this.addNewTournament}
                    />}
                    {headline === 'Add Tournament' ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                </form>
            </div>
        )
    }

    eventFage = (headline) => {
        const {tourn} = this.props
        const tournaments = this.props.allTournsList.map((game, index) => { return {key: game.tournamentId, value: game.tournamentName }})
        return (
            <div className={classes.Register}>
                <h1>{headline}</h1>
                <form>
                    <InputComp inputType="text" name="eventName" placeholder="Event Name" onChange={this.onEventNameChange}/>
                    {/* <InputComp inputType="text" name="typeEvent" placeholder="Type of Event" onChange={this.onTypeOfEventChange}/> */}
                    {/* <span className={classes.TName}>{tourn.tournamentName}</span> */}
                    <div className={classes.select}>
                        <SelectComp 
                            key={tournaments}
                            options={tournaments}
                            placeholder={tourn.tournamentName}
                            name={'tournament'}
                            onChange={(e) => this.onTournamentChange(e)}   
                        />
                    </div>
                    <InputComp inputType="date" name="deteOfEvent" placeholder="dateOfEvent" onChange={this.onDateOfEventChange}/>
                    {this.errorMessage()}
                    {this.successMessage()}
                    {<BtnComp 
                        inputType="submit" 
                        name="createEvent" 
                        content={headline} 
                        onClick={this.addNewEvent}
                    />}
                    {headline === 'Add Event' ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
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
                <h1>{headline} {headline === 'Edit Group' ? group.groupName : null}</h1>
                <form>
                    {this.errorMessage()}
                    {this.successMessage()}
                    {
                        headline === 'Edit Group'
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
                                    : <span className={classes.editLineInput}>{this.state.groupName}</span>
                                }
                                {this.editBtnFunc()}
                            </div>
                        :   <InputComp inputType="text" name="groupName" placeholder="Group Name" onChange={this.onGroupNameChange}/>
                    }
                    <div className={classes.searchUsersWrapper}>
                        <InputComp inputType="text" onBlur={this.CleaningInputFromUsers} content={this.state.searchUsers} name="Search User By UserName" placeholder="Search And Add Users" onChange={this.onSearchUsersChange}/>
                        <div className={classes.usersAddedWrapper}>
                            {this.state.addSearchUsersResult.length > 0 
                                ?   this.state.addSearchUsersResult.map((user, index) => {
                                        return <span className={classes.user} key={index}>
                                            {user.username} 
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
                    <BtnComp 
                        inputType="submit" 
                        name="createGroup" 
                        content={headline} 
                        onClick={headline === 'Add New Group' ? this.addNewGroup : (e) => this.editGroupRequest(e, group)}
                    />
                    {(headline === 'Add New Group' || headline === 'Edit Group') ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                </form>
            </div>
        )
    }

    editGroupRequest = (e, group) => {
        e.preventDefault()
        if(this.state.groupName === '') {
            this.props.errorMessageAction('group must have a name')
        } else if (this.state.addSearchUsersResult.length === 0) {
            this.props.errorMessageAction('select users for this group')
        } else {
            let userIds = []
            const groupId = group.groupId
            const groupName = this.state.groupName
            this.state.addSearchUsersResult.map(user => {
            userIds.push(user.userId)
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
        if(headline === 'Register' || headline === 'Add User'){
           return this.rgisterFage(headline, classStr)
        } else if(headline === 'Add Tournament'){
            return this.tournamentFage(headline)
        } else if( headline === 'Add Event' ){
            return this.eventFage(headline)
        } else if( headline === 'Add New Group' ){
            return this.addNewGroupPage(headline)
        } else if( headline === 'Edit Group' ){
            return this.addNewGroupPage(headline, group)
        }
    }
    render() {
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerRequest: (email, password, confirmPassword, name, userType, userName) => dispatch(registerRequest(email, password, confirmPassword, name, userType, userName)),
        addNewUserRequest: (email, password, confirmPassword, name, userType, userName) => dispatch(addNewUserRequest(email, password, confirmPassword, name, userType, userName)),
        addNewTournamentRequest: (tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum) => dispatch(addNewTournamentRequest(tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum)),
        addNewEventRequest: (EventName, Tournament, EventDate) => dispatch(addNewEventRequest(EventName, Tournament, EventDate)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: (payload) => dispatch(successMessageAction(payload)),
        addNewItemAction: (payload) => dispatch(addNewItemAction(payload)),
        addNewGroupRequest: (groupName, usersIds) => dispatch(addNewGroupRequest(groupName, usersIds)),        
        addNewEventAction: (payload) => dispatch(addNewEventAction(payload)),
        addNewTournamentAction: (payload) => dispatch(addNewTournamentAction(payload)),
        editThisGroupAction: (payload) => dispatch(editThisGroupAction(payload)),
        editGroupRequest: (groupId, groupName, userIds) => dispatch(editGroupRequest(groupId, groupName, userIds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);