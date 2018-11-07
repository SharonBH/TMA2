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
// import SelectComp from '../../UI/SelectComp/SelectComp'
import Spinner from '../../UI/Spinner';

import Register from '../../Register';
import UserSummary from '../../Users/UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';

import { takeAllTournaments, DeleteTournamentRequest, takeAllEvents, appCallTakeAllEvents, tournEventsByIdRequest, goToTournPageRequest } from '../../../actions/GamesApi';
import { editThisEventAction, addNewEventAction, addNewTournamentAction,  editThisItemAction, 
    successMessageAction, errorMessageAction, deleteConfirmMessageAction, sendEventDataAction, sendEvetnMatchAction }  from '../../../actions';

    // const storage = JSON.parse(localStorage.getItem('localStoreTournament'));
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
        
    }

    componentWillMount(){
        const locationName = this.props.location.pathname
        const urlsplit = locationName.split("/");
        const action = urlsplit[urlsplit.length-1];
        const tourn = this.props.tournById !== null ? this.props.tournById : action
        const TourId = tourn.tournamentId
        if(tourn.tournamentName === action){
            (this.props.tournEventsByIdRequest(TourId)) 
        }
        this.setState({currentPage: this.props.tournById})
        this.props.appCallTakeAllEvents()
        if(this.props.allTournsList.length === 0 || this.props.allTournsList === undefined) {
            this.props.takeAllTournaments()
        }
        if(this.props.tournById === null || this.props.groupById === ''){
            this.props.goToTournPageRequest(TourId)
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
        this.setState({eventForDelete: item})
        this.setState({eventInEditMode: null})
        this.props.deleteConfirmMessageAction(true)
        
    }
    editEventBtn = (item, match) => {
        this.props.sendEventDataAction(item)
        this.props.sendEvetnMatchAction(match)
        this.setState({eventInEditMode: item})
        setTimeout(() => {
            this.props.editThisEventAction(true)
        }, 200)

    }
    eventsTable = () => {
        return (
            <div className={classes.eventsTable}>
                <div>
                    <h3>All events of tournament</h3>
                    <div className={classes.usersHead}>
                        <h4 className={classes.eventName}>Event Name</h4>
                        <h4 className={classes.eventDate}>Event Date</h4>
                        <h4 className={classes.usersInGame}>Users in Game</h4>
                        <h4 className={classes.turnPageEventsBTN}><span>buttons</span></h4>
                    </div>
                    <ul>
                    {(this.props.tournEventsByIdNoS !== undefined ) ? this.props.tournEventsByIdNoS.map((item, index) => {
                        console.log('TIME_',moment(item.eventDate, 'YYYY-MM-DDTHH:mm:ss').format('DD-Mo-YYYY, HH:mm A'))
                            return <li key={index}>
                                <div className={classes.eventName}>{item.eventName}</div>
                                <div className={classes.eventDate}>{moment(item.eventDate).format('DD-Mo-YYYY, HH:mm A')}</div>
                                <div className={classes.usersInGame}>
                                    <span className={classes.showUsers}>Hover to show</span>
                                    <ul className={classes.hiddenUsers}>
                                        {item.eventUsers.map((user, index) => {
                                            const fill = item.eventResults.find(result => {return result.userId === user.userId})
                                            return <li key={index}>
                                                <span>{user.name}</span>
                                                <span>{fill.result === null ? 'none' : fill.result}</span>
                                            </li>})} 
                                    </ul>
                                </div>
                                <div className={classes.turnPageEventsBTN}>
                                    <a className={classes.editBTN}><EditBtn inputType="submit" content='Edit' onClick={() => this.editEventBtn(item, this.props.match)}/></a>
                                    <div className={classes.deleteBTN}><DeleteBtn onClick={() => this.DeleteEventBtn(item.eventId)} inputType={'button'} content={`Delete`}/></div>
                                </div>
                            </li>
                    }) : null}
                    </ul>
                </div>
                {this.leaderBoardTable()}
            </div>
        )
    }
    leaderBoardTable = () => {
        const leaderUsers = this.props.leaderBoardData
        const sortedBoard = leaderUsers !== null ? leaderUsers.sort((a, b) => {
            return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
        }) : null
        return(
            <div>
                <h3>Leader Board of tournament</h3>
                <div className={classes.usersHead}>
                    <h4 className={classes.leaderBoardTD}>User Name</h4>
                    <h4 className={classes.leaderBoardTD}>Points</h4>
                    <h4 className={classes.leaderBoardTD}>Events</h4>
                </div>
                <ol>
                    {sortedBoard !== null ? sortedBoard.map((item, index) => {
                        return ( <li key={index}>
                                <div className={classes.leaderBoardTD}>{item.user.username}</div>
                                <div className={classes.leaderBoardTD}>{item.totalScores}</div>
                                <div className={classes.leaderBoardTD}>{item.numberOfEvents}</div>
                            </li>)
                    }) : null
                    
                }
                </ol>
            </div>
        )
    }
    usersTable = () => {
    const tournGroupById = this.props.groupById
    const gName = tournGroupById !== null ? tournGroupById.groupName : null
    const groupName = tournGroupById !== null ? tournGroupById.users : null
        return (
            <div className={classes.usersTable}>
                {this.turnPageInformation()}
                <div>
                <h3>All users of tournament</h3>
                <div className={classes.usersTBL}><h5 className={classes.groupName}>Group Name: </h5> <span>{gName}</span></div>
                <div className={classes.usersTBList}>
                    <h5 className={classes.eventDate}>Users:</h5>
                    <ul>
                    {groupName !== undefined ? groupName.map((item, index) => {
                        return(
                            <li key={index}>
                                {item.username}
                            </li>
                        )}) : null
                    }
                    </ul>
                </div>
                </div>
            </div>
        )
    }  
    turnamentHeadLine=()=>{
        const path = this.props.match.path === '/all_tournaments/:tournamentName'  ? '/all_tournaments' : '/my_tournaments'
        const currentTournament = this.props.tournById !== null ? this.props.tournById.tournamentName : null
        return(
        <div className={classes.headTPage}>
            <h1><span>Tournament Name: </span>{currentTournament}</h1>
            <div className={classes.tournPButtons}>
                {/* <BtnComp inputType="button" content='Leader Board' onClick={() => this.editTournamentBtn(currentTournament)}/> */}
                <BtnComp content='Add Event' inputType='button' onClick={this.addEventBtn}/>
                <BtnComp inputType="button" content='Edit Tournament' onClick={() => this.editTournamentBtn(currentTournament)}/>
                <Link className={classes.backBtn} to={`${path}`}><i className="far fa-arrow-alt-circle-right"></i><span>Back to Tournaments List</span></Link>
            </div>
        </div>
        )
    }
 
    spinner = () => {
        if (this.props.toggleSpinner) {
            return <Spinner />
        } else {
            return null
        }
    }
    turnPageInformation = () => {
        const tournData = this.props.tournById !== null ? this.props.tournById : this.spinner()
        const { eventTypeId, numberOfEvents, startDate, endDate  } =  tournData
        const eventTName = this.props.allEventTypesList !== undefined || this.props.allEventTypesList !== null ? this.props.allEventTypesList.find((event) => {return event.eventTypeId === eventTypeId} ) : null
        return(
            <div className={classes.tournTime}>
                <div className={classes.turnPageTiming}>
                    <h3>Tournament info:</h3> 
                    <span><h4>From: </h4><p> {moment(startDate).format('LL')}</p></span>
                    <span><h4>To: </h4><p> {moment(endDate).format('LL')}</p></span>
                </div>
                <div className={classes.turnPageTiming}><b>Maximum of events: </b>{numberOfEvents}</div>
                <div className={classes.turnPageTiming}><b>Type of Tournament: </b>{eventTName !== undefined ? eventTName.eventTypeName : null}</div>
            </div>
        )
    }
    render (){
        console.log('TOURN PAGE', this.props)
        return (
            <div className={classes.tournPageWrapper}>
                {this.successDeleteMessage()}
                {this.errorDeleteMessage()}
                <div className={classes.turnInfo}>
                    {this.turnamentHeadLine()}
                    
                </div>
                <div className={classes.TPageTables}>
                    {this.eventsTable()}
                    {this.usersTable()}
                </div>
                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editTournamentComp()}</div> : null}
                {this.props.addEvent ? <div className={classes.AddUser}>{this.addEventComp()}</div> : null}
                {this.props.editThisEvent ? <div className={classes.AddUser}>{this.editEventComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline={DELETE_EVENT} item={this.state.eventForDelete}/> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allTournsList: state.allListReducer.allTournsList,
        allEventsList: state.allListReducer.allEventsList,
        allEventTypesList: state.allListReducer.allEventTypesList,
        groupsList: state.allListReducer.groupsList,
        tournById: state.allListReducer.tournById,
        leaderBoardData: state.allListReducer.leaderBoardData,
        groupById: state.allListReducer.groupById,
        tournEventsByIdNoS: state.allListReducer.tournEventsByIdNoS,
        addItem: state.addNewItemReducer.addItem,
        addEvent: state.addNewItemReducer.addEvent,
        addTournament: state.addNewItemReducer.addTournament,
        editThisItem: state.editItemReducer.editThisItem,
        editThisEvent: state.editItemReducer.editThisEvent,
        successMessage: state.sharedReducer.successMessage,
        errorMessage: state.sharedReducer.errorMessage,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage,
        toggleSpinner: state.sharedReducer.toggleSpinner,


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
        sendEventDataAction: (payload) => dispatch(sendEventDataAction(payload)),
        sendEvetnMatchAction: (payload) => dispatch(sendEvetnMatchAction(payload)),
        appCallTakeAllEvents: payload => dispatch(appCallTakeAllEvents(payload)),
        tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),
        goToTournPageRequest: payload => dispatch(goToTournPageRequest(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage);