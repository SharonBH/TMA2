import React, { Component } from 'react';
import Promise from "bluebird";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment'

import classes from '../../Games/TournamentPage/TournamentPage.scss';

import { EDIT_EVENT, ADD_EVENT, EDIT_TOURNAMENT, DELETE_EVENT, USER_ROLE_ADMIN, POKER_LOWER } from '../../../configuration/config'

// import EditBtn  from '../../UI/BtnComp/EditBtn';
// import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import OutlineBtn from '../../UI/BtnComp/OutlineBtn';
// import SelectComp from '../../UI/SelectComp/SelectComp'

import Register from '../../Register';
import PokerEvent from '../Events/PokerEvent'; 

import UserSummary from '../../Users/UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';
import EventsList  from './EventsList.js'
import FifaEventsList  from './FifaEventsList.js'
import TournyPageLeaderBoard  from './TournyPageLeaderBoard.js'
import FifaTournyPageLeaderBoard  from './FifaTournyPageLeaderBoard.js'

import { takeAllTournaments, goToTournPageRequest, getAllGroupsRequest, CreateTournamentPresetsResponse  } from '../../../actions/GamesApi';
import {
	addNewEventAction,
	editThisItemAction,
	successMessageAction,
	errorMessageAction,
    toggleLoaderAction
} from '../../../actions';
import SmallSpinner from "../../UI/SmallSpinner";


export class TournamentPage extends Component {

    static propTypes = {
        getAllUsers: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.editTournamentBtn = this.editTournamentBtn.bind(this)
        const locationName = this.props.location.pathname;
        const urlsplit = locationName.split("=");
        const type = urlsplit[urlsplit.length - 2]
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
	        tournById: [],
	        groupById: [],
	        allEventTypesList: [],
	        allTournsList: [],
	        buttonStatus: true,
            isCurrentUserAdminRole: false,
            tournamentType: type.toString().toLowerCase()
        }
        this.setEventInEditMode = this.setEventInEditMode.bind(this);
    }
    componentDidMount() {
        const isCurrentUserAdminRole = this.props.currentUser.role == USER_ROLE_ADMIN;
        this.setState({isCurrentUserAdminRole: isCurrentUserAdminRole})
    }

    componentWillMount(){

	    this.props.groupById.length !== 0 ? this.props.toggleLoaderAction(false) : this.props.toggleLoaderAction(true)
     
	    this.setStateAsync = Promise.promisify(this.setState);
	    this.props.getAllGroupsRequest()
	    this.props.successMessageAction(null);
	    
        const locationName = this.props.location.pathname;
        const urlsplit = locationName.split("=");
        const action = urlsplit[ urlsplit.length - 1 ];
        this.props.goToTournPageRequest(action);
	    this.setState({tournById: this.props.tournById});
	    
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
	componentWillReceiveProps(nextProps) {
		const tournamentGroup = this.props.groupById
		const gameTypes = this.props.allEventTypesList
		const allTournaments = this.props.allTournsList
		const allGroups = this.props.groupsList
		const tournByIdProp = this.props.tournById
		
		const { allEventTypesList, allTournsList, groupsList, groupById, tournById } = nextProps;
		
		if( allTournaments !== allTournsList || tournamentGroup !== groupById ||
			gameTypes !== allEventTypesList || allGroups !== groupsList || tournById !== tournByIdProp) {
			
			this.setState({
				groupById: this.props.groupById,
				allEventTypesList: this.props.allEventTypesList,
				allTournsList: this.props.allTournsList,
				groupsList: this.props.groupsList,
				tournById: this.props.tournById
			});
		}
		
	}

    componentWillUnmount(){
        this.props.errorMessageAction(null);
        this.props.successMessageAction(null);
        this.setState({tournamentForDelete: null,tournamentInEditMode: null});
        
	    this.setState({
		    tournById: [],
		    groupById: [],
		    allEventTypesList: [],
		    allTournsList: [],
		    groupsList: []
	    });
    }

    setEventInEditMode(event) {
        this.setState({ eventInEditMode: event })
    }

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

    addRoundBtn = (tournId) => {
        setTimeout(() => {
            this.props.addRoundAction(tournId)
        }, 200)
    }

    

    addEventComp = () => {
        const locationName = this.props.location.pathname;
        const urlsplit = locationName.split("=");
        const type = urlsplit[urlsplit.length - 2];
        if (type == 'Poker') {
            return <PokerEvent headline={ADD_EVENT} tourn={this.state.tournById} classStr='none' />
        }
        else {    
            return <Register headline={ADD_EVENT} tourn={this.state.tournById} classStr='none' />
        }
    }
    editEventComp = () => {        
        if (this.state.tournamentType == POKER_LOWER) {
            return <PokerEvent headline={EDIT_EVENT} tourn={this.state.tournById} classStr='none' event={this.state.eventInEditMode} />
        }
        else {
            return <UserSummary headline={EDIT_EVENT} event={this.state.eventInEditMode} tournament={null} user={null} group={null} />
        }
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
        const type = urlsplit[ urlsplit.length - 2 ];
	    const action = urlsplit[ urlsplit.length - 1 ];
       if(type == 'Poker') {
           return (
            <div className = {classes.eventsTable} >
               < EventsList
                       match={this.props.match}
                       currentTournamentId={action}
                       currentTournamentName={currentTournament}
                       isCurrentUserAdminRole={this.state.isCurrentUserAdminRole}
                       editEventFunc={this.setEventInEditMode}

           />
           < TournyPageLeaderBoard
           currentTournamentId = {action}
           currentTournamentName = {currentTournament}
           />
           </div>
       )
       }
        else return(
            <div className={classes.eventsTable}>
            <FifaEventsList
                match={this.props.match}
                currentTournamentId={action}
                currentTournamentName={currentTournament}
                isCurrentUserAdminRole = {this.state.isCurrentUserAdminRole}
            />
        < FifaTournyPageLeaderBoard  currentTournamentId={action} currentTournamentName={currentTournament}/>
        </div>
        )
    };
 
    usersTable = () => {
	    const currentTournament = this.props.tournById !== null || this.props.tournById !== undefined ? this.props.tournById.tournamentName : null
	    const currentTournamentProp = this.props.tournById !== null || this.props.tournById !== undefined ? this.props.tournById.tournamentName : null
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
	                    
		                    <h3>{gName}</h3>
	                    <div className={classes.wrapList}>
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
			                        {(currentTournament !== undefined && currentTournament === currentTournamentProp)
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
                </div>
            )
    };
    turnamentHeadLine=()=>{
        const path = this.props.match.path === '/all_tournaments/:tournamentName'  ? '/all_tournaments' : '/my_tournaments'
        const currentTournament = this.state.tournById !== null || this.state.tournById !== undefined ? this.state.tournById.tournamentName : null
        return(
        <div className={classes.headTPage}>
            <div className={classes.tournPButtons}>
	            <Link className={classes.backBtn} to={`${path}`}><i className="fas fa-arrow-left"></i><span>Back to Tournaments List</span></Link>
                {this.state.isCurrentUserAdminRole && <OutlineBtn
		            inputType="button"
		            content='Edit Tournament'
		            onClick={() => this.editTournamentBtn(currentTournament)}
		            // disabled={this.state.groupsList !== null || this.state.groupsList.length !== 0 || this.state.allEventTypesList !== null || this.state.allEventTypesList.length !== 0 ? !this.state.buttonStatus : this.state.buttonStatus}
	            /> }
                {this.state.isCurrentUserAdminRole && <BtnComp
	                content='Add Event'
	                inputType='button'
	                onClick={this.addEventBtn}
	                // disabled={this.state.groupsList !== null || this.state.groupsList.length !== 0   ? !this.state.buttonStatus : this.state.buttonStatus}
                />}
                {this.state.isCurrentUserAdminRole && this.props.tournById.tournamentTypeId == 1 && <BtnComp
                    content='Add Round'
                    inputType='button'
                        onClick={() => this.addRoundBtn(this.props.tournById.tournamentId)}
                
                />}

                    
                
            </div>
	        <h1>
		        { currentTournament !== undefined
			        ? <span> {currentTournament}</span>
			        : <div className={classes.typeNameSpinner}><SmallSpinner/></div>
			
		        }
	        </h1>
        </div>
        )
    }
    
    turnPageInformation = () => {
        const url = this.props.match.url;
        const urlsplit = url.split("/");
        const action = urlsplit[urlsplit.length-1];
	    const currentTournament = this.state.tournById !== null || this.state.tournById !== undefined ? this.state.tournById.tournamentName : null
	    const currentTournamentProp = this.props.tournById !== null || this.props.tournById !== undefined ? this.props.tournById.tournamentName : null
	    const urlsplit2 = url.split("/");
	    const urlsplit3 = urlsplit2[2].split('=');
	    const action2 = urlsplit3[ urlsplit3.length - 2 ];
	    
        const allT = this.state.allTournsList.find((item) => { return item.tournamentName === action});
        const tournData = this.state.tournById !== null || this.state.tournById.length !== 0 ? this.state.tournById : allT;
        const { eventTypeId, numberOfEvents, startDate, endDate  } =  tournData;
        const sDate = this.state.tournById.length !== 0 ? moment(startDate).format('LL') : '';
	    const eDate = this.state.tournById.length !== 0 ? moment(endDate).format('LL') : '';
        const eventTName = this.state.allEventTypesList !== undefined || this.state.allEventTypesList !== null ? this.state.allEventTypesList.find((event) => {return event.eventTypeId === eventTypeId} ) : null
        return(
            <div className={classes.tournTime}>
	            <h3>Tournament info:</h3>
	            <div className={classes.wrapList}>
                <div className={classes.turnPageTiming}>
	                
	                {(currentTournament !== undefined && currentTournament === currentTournamentProp)
	                ?
                        <div>
			                <span><h4>From: </h4><p> {sDate}</p></span>
	                        <span><h4>To: </h4><p> {eDate}</p></span>
		                    <div className={classes.turnPageTiming}><b>Maximum of events: </b>{numberOfEvents === null ? 'Unlimited' : numberOfEvents}</div>
		                </div>
	                : <SmallSpinner/>
                    }
                </div>
	            <div className={classes.turnPageTiming}><b>Type of Game: </b>{eventTName !== undefined ? eventTName.eventTypeName : <div className={classes.typeNameSpinner}><SmallSpinner/></div>}</div>
	            </div>
            </div>
        )
    }
    render() {
        //console.log("this.state.eventForDelete", this.state.eventForDelete);

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
        );
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
        currentUser: state.userReducer.currentUser,
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
        addRoundAction: payload => dispatch(CreateTournamentPresetsResponse(payload)),
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