import React, { Component } from 'react';
import Promise from "bluebird";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment'

import classes from '../../Games/TournamentPage/TournamentPage.scss';

import { EDIT_EVENT, ADD_EVENT, EDIT_TOURNAMENT, ADD_TOURNAMENT, DELETE_EVENT } from '../../../configuration/config'

import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
// import SelectComp from '../../UI/SelectComp/SelectComp'

import Register from '../../Register';
import UserSummary from '../../Users/UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';
import EventsList  from './EventsList.js'
import TournyPageLeaderBoard  from './TournyPageLeaderBoard.js'

import { takeAllTournaments, DeleteTournamentRequest, takeAllEvents, appCallTakeAllEvents, tournEventsByIdRequest, goToTournPageRequest, getAllGroupsRequest } from '../../../actions/GamesApi';
import {
	editThisEventAction,
	addNewEventAction,
	addNewTournamentAction,
	editThisItemAction,
	successMessageAction,
	errorMessageAction,
	deleteConfirmMessageAction,
	sendEventDataAction,
	sendEvetnMatchAction,
	toggleLoaderAction
} from '../../../actions';
import Spinner from "../../UI/Spinner";
import SmallSpinner from "../../UI/SmallSpinner";

    // const storage = JSON.parse(localStorage.getItem('localStoreTournament'));
export class TournamentPage extends Component {

    static propTypes = {
        getAllUsers: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            tournamentInEditMode: null,
            tournamentForDelete: null,
            display: false,
            userDetailsArr: [],
            currentPage:'',
            eventInEditMode: null,
            eventForDelete: null,
            groupsList: [],
            thisTournamentGroup: null,
	
	        // tournEventsByIdNoS: [],
	        // leaderBoardData: [],
	        tournById: [],
	        groupById: [],
	        allEventTypesList: [],
	        allTournsList: [],
	        buttonStatus: true
        }
        this.editTournamentBtn = this.editTournamentBtn.bind(this)
	    
    }
	// spinner = () => {
	// 	if (this.props.toggleSpinner) {
	// 		return <Spinner />
	// 	} else {
	// 		return null
	// 	}
	// };
    componentWillMount(){
	    this.props.groupById.length !== 0 ? this.props.toggleLoaderAction(false) : this.props.toggleLoaderAction(true)
     
	    this.setStateAsync = Promise.promisify(this.setState);
	    this.props.getAllGroupsRequest()
	    this.props.successMessageAction(null);
	    
        const locationName = this.props.location.pathname;
        const urlsplit = locationName.split("=");
        const action = urlsplit[ urlsplit.length - 1 ];
        // if ((this.props.tournById.length === 0)) {
            this.props.goToTournPageRequest(action);
        // }
	    this.setState({currentPage: this.props.tournById});
	    
	    setTimeout(()=>{
	        this.setStateAsync({
		        tournById: this.props.tournById,
		        // tournEventsByIdNoS: this.props.tournEventsByIdNoS,
		        // leaderBoardData: this.props.leaderBoardData,
		        groupById: this.props.groupById,
		        allEventTypesList: this.props.allEventTypesList,
		        allTournsList: this.props.allTournsList,
		        groupsList: this.props.groupsList
	        })

	        }, 3000)
    }

    componentWillUnmount(){
        this.props.errorMessageAction(null);
        this.props.successMessageAction(null);
        this.setState({tournamentForDelete: null});
        this.setState({tournamentInEditMode: null});

	    this.setState({
		    tournById: [],
		    groupById: [],
		    allEventTypesList: [],
		    allTournsList: [],
		    groupsList: []
	    });
    }

    // DeleteTournamentBtn = (item) => {
    //     this.setState({tournamentForDelete: item})
    //     this.setState({tournamentInEditMode: null})
    //     this.props.deleteConfirmMessageAction(true)
    // }

    editTournamentBtn = (item) => {
        this.setState({tournamentInEditMode: item})
        setTimeout(() => {
            this.props.editThisItemAction(true)
        }, 200)

    }
    addEventBtn = (item, headline) => {
        setTimeout(() => {
            this.props.addNewEventAction(true)
        }, 200)
    }
    // addTournamentComp = () => {
    //     return <Register headline={ADD_TOURNAMENT} classStr='none' />
    // }
    addEventComp = () => {
        return <Register headline={ADD_EVENT} tourn={this.state.tournById} classStr='none' />
    }
    editEventComp = () => {
        return <UserSummary headline={EDIT_EVENT} event={this.state.eventInEditMode} tournament={null} user={null} group={null}/>
    }
    editTournamentComp = () => {
        return <UserSummary headline={EDIT_TOURNAMENT} event={null} tournament={this.state.tournById} user={null}  group={null}/>
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

    // DeleteEventBtn = (item) => {
    //     this.setState({eventForDelete: item})
    //     this.setState({eventInEditMode: null})
    //     this.props.deleteConfirmMessageAction(true)
    //
    // }
    // editEventBtn = (item, match) => {
    //     this.props.sendEventDataAction(item)
    //     this.props.sendEvetnMatchAction(match)
    //     this.setState({eventInEditMode: item})
    //     setTimeout(() => {
    //         this.props.editThisEventAction(true)
    //     }, 200)
    //
    // }
    eventsTable = () => {
	    const currentTournament = this.props.tournById !== null || this.props.tournById !== undefined ? this.props.tournById.tournamentName : null
	    const locationName = this.props.location.pathname;
	    const urlsplit = locationName.split("=");
	    const action = urlsplit[ urlsplit.length - 1 ];
        return (
		         <div className={classes.eventsTable}>
			         <EventsList match={this.props.match} currentTournamentId={action} currentTournamentName={currentTournament}/>
			         <TournyPageLeaderBoard  currentTournamentId={action} currentTournamentName={currentTournament}/>
                </div>
        )
    };
 
    usersTable = () => {
	    const currentTournament = this.props.tournById !== null || this.props.tournById !== undefined ? this.props.tournById.tournamentName : null
	    const locationName = this.props.location.pathname;
	    const urlsplit2 = locationName.split("/");
	    const urlsplit3 = urlsplit2[2].split('=');
	    const action2 = urlsplit3[ urlsplit3.length - 2 ];
        const tournGroupById = this.state.groupById
        const gName = tournGroupById !== null && this.state.groupById !== '' ? tournGroupById.groupName : <div className={classes.typeNameSpinner}><SmallSpinner /></div>
        const groupName = tournGroupById !== null ? tournGroupById.users : null
            return (
                <div className={classes.usersTable}>
                    {this.turnPageInformation()}
                    <div>
                    <h3>All users of tournament</h3>
                    <div className={classes.usersTBL}>
	                    <h5 className={classes.groupName}>Group Name:
		                    {
	                            gName !== undefined
			                        ? <span>{gName}</span>
				                    : <div className={classes.typeNameSpinner}><SmallSpinner /></div>
		                    }
                        </h5>
                    </div>
                    <div className={classes.usersTBList}>
                        <h5 className={classes.eventDate}>Users:</h5>
                        <ul>
	                        {(currentTournament !== undefined && currentTournament === action2)
	                        ? groupName !== undefined  ? groupName.map((item, index) => {
		                        return(
		                        <li key={index}>
		                            {item.username}
		                        </li>
		                        )}) : <SmallSpinner/>
	                        : <SmallSpinner/>
	                        }
                        </ul>
                    </div>
                    </div>
                </div>
            )
    };
    turnamentHeadLine=()=>{
        const path = this.props.match.path === '/all_tournaments/:tournamentName'  ? '/all_tournaments' : '/my_tournaments'
        const currentTournament = this.state.tournById !== null || this.state.tournById !== undefined ? this.state.tournById.tournamentName : null
        return(
        <div className={classes.headTPage}>
            <h1><span>Tournament Name:</span>
	            { currentTournament !== undefined
		            ? <span> {currentTournament}</span>
		            : <div className={classes.typeNameSpinner}><SmallSpinner/></div>
		            
	            }
             
            </h1>
            <div className={classes.tournPButtons}>
                <BtnComp
	                content='Add Event'
	                inputType='button'
	                onClick={this.addEventBtn}
	                disabled={this.state.groupsList !== null || this.state.groupsList.length !== 0   ? !this.state.buttonStatus : this.state.buttonStatus}
                />
                <BtnComp
	                inputType="button"
	                content='Edit Tournament'
	                onClick={() => this.editTournamentBtn(currentTournament)}
	                disabled={this.state.groupsList !== null || this.state.groupsList.length !== 0 || this.state.allEventTypesList.length !== 0 ? !this.state.buttonStatus : this.state.buttonStatus}
                />
                <Link className={classes.backBtn} to={`${path}`}><i className="far fa-arrow-alt-circle-right"></i><span>Back to Tournaments List</span></Link>
            </div>
        </div>
        )
    }
    
    turnPageInformation = () => {
        const url = this.props.match.url;
        const urlsplit = url.split("/");
        const action = urlsplit[urlsplit.length-1];
	    const currentTournament = this.props.tournById !== null || this.props.tournById !== undefined ? this.props.tournById.tournamentName : null
	    const urlsplit2 = url.split("/");
	    const urlsplit3 = urlsplit2[2].split('=');
	    const action2 = urlsplit3[ urlsplit3.length - 2 ];
	    
        const allT = this.props.allTournsList.find((item) => { return item.tournamentName === action});
        const tournData = this.props.tournById !== null || this.props.tournById.length !== 0 ? this.props.tournById : allT;
        const { eventTypeId, numberOfEvents, startDate, endDate  } =  tournData;
        const sDate = this.props.tournById.length !== 0 ? moment(startDate).format('LL') : '';
	    const eDate = this.props.tournById.length !== 0 ? moment(endDate).format('LL') : '';
        const eventTName = this.props.allEventTypesList !== undefined || this.props.allEventTypesList !== null ? this.props.allEventTypesList.find((event) => {return event.eventTypeId === eventTypeId} ) : null
        return(
            <div className={classes.tournTime}>
                <div className={classes.turnPageTiming}>
	                <h3>Tournament info:</h3>
	                {(currentTournament !== undefined && currentTournament === action2)
	                ?
                        <div>
			                <span><h4>From: </h4><p> {sDate}</p></span>
	                        <span><h4>To: </h4><p> {eDate}</p></span>
		                    <div className={classes.turnPageTiming}><b>Maximum of events: </b>{numberOfEvents === null ? 'Unlimited' : numberOfEvents}</div>
		                </div>
	                : <SmallSpinner/>
                    }
                </div>
	            <div className={classes.turnPageTiming}><b>Type of Tournament: </b>{eventTName !== undefined ? eventTName.eventTypeName : <div className={classes.typeNameSpinner}><SmallSpinner/></div>}</div>
            </div>
        )
    }
    render (){
	    console.log('TPAGE'  , this.props)
	    console.log('TPAGE STATE'  , this.state)
        return (
            <div className={classes.tournPageWrapper}>
                {/*{this.spinner()}*/}
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
        // leaderBoardData: state.allListReducer.leaderBoardData,
        groupById: state.allListReducer.groupById,
        // tournEventsByIdNoS: state.allListReducer.tournEventsByIdNoS,
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
};

const mapDispatchToProps = dispatch => {

    return{
        takeAllTournaments: payload => dispatch(takeAllTournaments(payload)),
	    getAllGroupsRequest: payload => dispatch(getAllGroupsRequest(payload)),
        // takeAllEvents: payload => dispatch(takeAllEvents(payload)),
        // DeleteTournamentRequest: (item) => dispatch(DeleteTournamentRequest(item)),
        // editThisEventAction: payload => dispatch(editThisEventAction(payload)),
        addNewEventAction: payload => dispatch(addNewEventAction(payload)),
        // addNewTournamentAction: payload => dispatch(addNewTournamentAction(payload)),
        editThisItemAction: payload => dispatch(editThisItemAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        // deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload)),
        // sendEventDataAction: (payload) => dispatch(sendEventDataAction(payload)),
        // sendEvetnMatchAction: (payload) => dispatch(sendEvetnMatchAction(payload)),
        // appCallTakeAllEvents: payload => dispatch(appCallTakeAllEvents(payload)),
        // tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),
        goToTournPageRequest: payload => dispatch(goToTournPageRequest(payload)),
	    toggleLoaderAction: payload => dispatch(toggleLoaderAction(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage);