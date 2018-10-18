import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import classes from '../../Games/TournamentPage/TournamentPage..scss';

import moment from 'moment'
import { EDIT_EVENT, ADD_EVENT, EDIT_TOURNAMENT, ADD_TOURNAMENT, DELETE_EVENT } from '../../../configuration/config'

import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import SelectComp from '../../UI/SelectComp/SelectComp'

import Register from '../../Register';
import UserSummary from '../../Users/UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';

import { takeAllTournaments, DeleteTournamentRequest, takeAllEvents } from '../../../actions/GamesApi';
import { editThisEventAction, addNewEventAction, addNewTournamentAction,  editThisItemAction, 
    successMessageAction, errorMessageAction, deleteConfirmMessageAction, sendEventDataAction }  from '../../../actions';
export class TournamentPage extends Component {

    static propTypes = {
        getAllUsers: PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = {
            tournamentInEditMode: null,
            tournamentForDelete: null,
            display: false,
            userDetailsArr: [],
            currentPage:'',
            eventInEditMode: null,
            eventForDelete: null,
            groupsListState: [],
            thisTournamentGroup: null
        }
        this.editTournamentBtn = this.editTournamentBtn.bind(this)
        // this.DeleteTournamentBtn = this.DeleteTournamentBtn.bind(this)

    }
    // componentDidUpdate(){
    //     this.props.takeAllEvents()
    // }
    componentWillMount(){
        this.setState({currentPage: this.props.tournById})
        if(this.props.allTournsList.length === 0 || this.props.allTournsList === undefined) {
            this.props.takeAllTournaments()
        } else {
            return null
        }
        
    }
    componentDidMount(){
        this.setState({groupsListState: this.props.groupsList})
        this.props.successMessageAction(null)
        if(this.props.allTournsList.length === 0 || this.props.allTournsList === undefined) {
            this.props.takeAllTournaments()
        } else {
            return null
        }
        
        
    }
    componentWillUnmount(){
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({tournamentForDelete: null})
        this.setState({tournamentInEditMode: null})
    }

    DeleteTournamentBtn = (item) => {
        this.setState({tournamentForDelete: item})
        this.setState({tournamentInEditMode: null})
        this.props.deleteConfirmMessageAction(true)
    }

    editTournamentBtn = (item) => {
        this.setState({tournamentInEditMode: item})
        setTimeout(() => {
            this.props.editThisItemAction(true)
        }, 200)

    }
    addEventBtn = (item) => {
        setTimeout(() => {
            this.props.addNewEventAction(true)
        }, 200)
    }
    // editDetailInput = (index, e) => {
    //     const details = Object.assign([], this.state.userDetailsArr)
    //         details[index] = e.target.value
    //     this.setState({
    //         userDetailsArr: details
    //     })
    // }
    // addTournamentBtn = () => {
    //     setTimeout(() => {
    //         this.props.addNewTournamentAction(true)
    //     }, 200)
    // }

    
    addTournamentComp = () => {
        return <Register headline={ADD_TOURNAMENT} classStr='none' />
    }
    addEventComp = () => {
        return <Register headline={ADD_EVENT} tourn={this.props.tournById} classStr='none' />
    }
    editEventComp = () => {
        return <UserSummary headline={EDIT_EVENT} event={this.state.eventInEditMode} tournament={null} user={null} group={null}/>
    }
    editTournamentComp = () => {
        return <UserSummary headline={EDIT_TOURNAMENT} event={null} tournament={this.props.tournById} user={null}  group={null}/>
    }
    successDeleteMessage = () => {
        return this.props.successMessage !== null 
        ? <p className={classes.success}>
            <span>{this.props.successMessage}
                <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
            </span>
        </p>
        : null 
    }
    errorDeleteMessage = () => {
        return this.props.errorMessage !== null 
        ? <p className={classes.errorPop}>
            <span>{this.props.errorMessage}
                <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
            </span>
        </p>
        : null 
    }

    closeMessage = () => {
        this.props.successMessageAction(null)
        this.props.errorMessageAction(null)
        this.props.editThisEventAction(null)
    }

    DeleteEventBtn = (item) => {
        // console.log('delete', item)
        this.setState({eventForDelete: item})
        this.setState({eventInEditMode: null})
        this.props.deleteConfirmMessageAction(true)
        
    }
    editEventBtn = (item) => {
        this.props.sendEventDataAction(item)
        this.setState({eventInEditMode: item})
        setTimeout(() => {
            this.props.editThisEventAction(true)
        }, 200)

    }
    eventsTable = () => {
        // const currentTournament = this.props.tournById !== null ? this.props.tournById : null
        const currentTournament = this.state.currentPage !== null ? this.state.currentPage : null
        return (
            <div className={classes.eventsTable}>
                <h3>All events of tournament</h3>
                <div><h4 className={classes.eventName}>Event Name</h4><h4 className={classes.eventDate}>Event Date</h4></div>
                <ul>
                {currentTournament.events.map((item, index) => {
                    return <li key={index}>
                        <div className={classes.eventName}>{item.eventName}</div>
                        <div className={classes.eventDate}>{moment(item.eventDate).format('LLLL')}</div>
                        <Link className={classes.editBTN} to={`/edit_event/${item.eventName}`}><EditBtn inputType="submit" content='Edit' onClick={() => this.editEventBtn(item)}/></Link>
                        <div className={classes.deleteBTN}><DeleteBtn onClick={() => this.DeleteEventBtn(item.eventId)} inputType={'button'} content={`${item.eventId}Delete`}/></div>
                    </li>
                })}
                </ul>
            </div>
        )
    }
    usersTable = () => {
   // group.users.forEach((user) => usersInGroup.push({key: user.userId, value: user.username}))
    // const currentTournament = this.props.tournById !== null ? this.props.tournById : null
    const currentTournament = this.state.currentPage !== null ? this.state.currentPage : null

    // let tournGroup = this.props.groupsList !== null ? this.props.groupsList.find((item) => { return item.groupId === currentTournament.groupId}) : null
    const tournGroup = this.props.groupsList !== null ? this.props.groupsList.find((item) => { return item.groupId === currentTournament.groupId}) : null
    const gName = this.props.groupsList !== null ? tournGroup.groupName : null
    // const gName = tournGroup !== undefined || tournGroup !== null ?  Object.values(tournGroup)[1] : null
    console.log('tournGroup, ', gName)
        return (
            <div className={classes.eventsTable}>
                <h3>All users of tournament</h3>
                <div><h5 className={classes.groupName}>Group Name</h5> <span>{gName}</span></div>
                 
                <div>
                    <h5 className={classes.eventDate}>Users</h5>
                    <ul>
                    {tournGroup !== null ? tournGroup.users.map((item, index) => {
                            return(
                                <li key={index}>
                                    {item.username}
                                </li>
                            )
                    }) : null
                }
                    </ul>
                </div>
                <ul>
                </ul>
            </div>
        )
    }
    
    render (){
        console.log('tournament page state',this.props)
        // console.log('tournament page props',this.state.currentPage)
    
        // const tournamentHeadig = this.props.location.pathname.slice(1)
        const currentTournament = this.props.tournById !== null ? this.props.tournById.tournamentName : null
        // const eventItem = currentTournament.events.map((event) => {return event.eventId})

        return (
            <div className={classes.tournPageWrapper}>
                {this.successDeleteMessage()}
                {this.errorDeleteMessage()}
                <div className={classes.headTPage}>
                    <h1>Tournament Name: {currentTournament}</h1>
                    <div className={classes.tournPButtons}>
                        <Link className={classes.backBtn} to='/all_tournaments'><BtnComp content='Back to Tournaments List' inputType='button'/></Link>
                        <BtnComp content='Add Event' inputType='button' onClick={this.addEventBtn}/>
                        {/* <Link to={`/${currentTournament.tournamentName}/edit_tournament`}> */}
                        <BtnComp inputType="button" content='Edit Tournament' onClick={() => this.editTournamentBtn(currentTournament)}/>
                        {/* </Link> */}
                        
                    </div>
                </div>
                <div className={classes.tournTime}><h3>Tournament timing:</h3> <h4>from </h4> {moment(currentTournament.startDate).format('LLLL')} <h4>to </h4> {moment(currentTournament.endDate).format('LLLL')}</div>
                <div>Maximum of events: {currentTournament.numberOfEvents}</div>
                <div className={classes.TPageTables}>
                    {this.eventsTable()}
                    {this.usersTable()}
                </div>
                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editTournamentComp()}</div> : null}
                {this.props.addEvent ? <div className={classes.AddUser}>{this.addEventComp()}</div> : null}
                {this.props.editThisEvent ? <div className={classes.AddUser}>{this.editEventComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline={DELETE_EVENT} item={this.state.eventForDelete}/> : null}
                {/* {this.props.addItem ? <div className={classes.AddUser}>{this.addTournamentComp()}</div> : null} */}
                {/* 
                {this.props.addTournament ? <div className={classes.AddUser}>{this.addTournamentComp()}</div> : null}
                
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline='delete tournament' item={this.state.tournamentForDelete}/> : null}  */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allTournsList: state.allListReducer.allTournsList,
        allEventsList: state.allListReducer.allEventsList,
        groupsList: state.allListReducer.groupsList,
        tournById: state.allListReducer.tournById,
        addItem: state.addNewItemReducer.addItem,
        addEvent: state.addNewItemReducer.addEvent,
        addTournament: state.addNewItemReducer.addTournament,
        editThisItem: state.editItemReducer.editThisItem,
        editThisEvent: state.editItemReducer.editThisEvent,
        successMessage: state.sharedReducer.successMessage,
        errorMessage: state.sharedReducer.errorMessage,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage,

    }
}

const mapDispatchToProps = dispatch => {

    return{
        takeAllTournaments: payload => dispatch(takeAllTournaments(payload)),
        takeAllEvents: payload => dispatch(takeAllEvents(payload)),
        DeleteTournamentRequest: (item) => dispatch(DeleteTournamentRequest(item)),
        editThisEventAction: payload => dispatch(editThisEventAction(payload)),
        addNewEventAction: payload => dispatch(addNewEventAction(payload)),
        addNewTournamentAction: payload => dispatch(addNewTournamentAction(payload)),
        editThisItemAction: payload => dispatch(editThisItemAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload)),

        sendEventDataAction: payload => dispatch(sendEventDataAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage);