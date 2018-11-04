import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment'

import classes from '../../Users/AllUsersAdmin/AllUsersAdmin.scss';
import { EDIT_EVENT, ADD_EVENT, EDIT_TOURNAMENT, ADD_TOURNAMENT, DELETE_TOURNAMENT } from '../../../configuration/config'

import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import SelectComp from '../../UI/SelectComp/SelectComp'

import Register from '../../Register';
import UserSummary from '../../Users/UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';


import { takeAllTournaments, DeleteTournamentRequest, goToTournPageRequest, tournEventsByIdRequest, takeMyTournamentsRequest } from '../../../actions/GamesApi';
import { addNewItemAction, addNewEventAction, addNewTournamentAction, 
     editThisItemAction, successMessageAction, errorMessageAction, deleteConfirmMessageAction }  from '../../../actions';
export class TournamentsList extends Component {

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
            someId:'',
            tournamentID:''
        }
        // this.editTournamentBtn = this.editTournamentBtn.bind(this)
        this.DeleteTournamentBtn = this.DeleteTournamentBtn.bind(this)
    }

    componentWillMount(){
        if(this.props.allTournsList.length === 0 || this.props.allTournsList === undefined) {
            this.props.takeAllTournaments()
        } else {
            return null
        }
    }
    componentDidMount(){
        this.props.successMessageAction(null)
        const userID = this.props.currentUser.userId
        this.props.takeMyTournamentsRequest(userID)
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

    // editTournamentBtn = (item) => {
    //     this.setState({tournamentInEditMode: item})

    //     setTimeout(() => {
    //         console.log(item)
    //         this.props.editThisItemAction(true)
    //     }, 200)

    // }
    addEventBtn = (item) => {
        setTimeout(() => {
            this.setState({tournamentID: item})
            this.props.addNewEventAction(true) 
        }, 200)
    }
    editDetailInput = (index, e) => {
        const details = Object.assign([], this.state.userDetailsArr)
            details[index] = e.target.value
        this.setState({
            userDetailsArr: details
        })
    }
    addTournamentBtn = () => {
        setTimeout(() => {
            this.props.addNewTournamentAction(true)
        }, 200)
    }

    
    addTournamentComp = () => {
        return <Register headline={ADD_TOURNAMENT} classStr='none' />
    }
    addEventComp = () => {
        return <Register headline={ADD_EVENT} tourn={this.state.tournamentID} classStr='none' />
    }
    // editTournamentComp = () => {
    //     return <UserSummary headline={EDIT_TOURNAMENT} event={null} tournament={this.state.tournamentInEditMode} user={null} group={null}/>
    // }

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
    getTournById=(tournIdToPage)=>{
        this.setState({someId: tournIdToPage})
        this.props.tournEventsByIdRequest(tournIdToPage)
        this.props.goToTournPageRequest(tournIdToPage)
        
        

    }
    closeMessage = () => {
        this.props.successMessageAction(null)
        this.props.errorMessageAction(null)
    }
    
    pathChanger = (item) => {
        //const { match } = this.props;
        const path = this.props.match.url
        switch (path) {
            case "/my_tournaments":
            return  <Link to={path +`/${item.tournamentName}`} onClick={()=>this.getTournById(item.tournamentId)}>{item.tournamentName}</Link> 
            // break;
            case "/all_tournaments":
            return <Link to={path +`/${item.tournamentName}`} onClick={()=>this.getTournById(item.tournamentId)}>{item.tournamentName}</Link> 
            // break;
           default:
         }
    }

    tournamentList = () => {
        const path = this.props.match.url
        const tournaments = this.props.match.url === '/all_tournaments' ? this.props.allTournsList : this.props.tournsDataById
        return tournaments !== undefined ? tournaments.map((item, index) => {        
            // const eventTName = this.props.allEventTypesList !== undefined ? this.props.allEventTypesList.find((event) => {return event.eventTypeId === item.eventTypeId} ): null
            // const eventN = eventTName !== undefined ?  Object.values(eventTName)[1] : null
            return <li key={index}>
                <div className={classes.username}>
                { this.pathChanger(item) }
                </div>
                <div className={classes.email}>{moment(item.startDate).format('LL')}</div>
                <div className={classes.email}>{moment(item.endDate).format('LL')}</div>
                <div className={classes.role}>{item.numberOfEvents}</div>
                <div className={classes.role}>{item.eventTypeName}</div>
                <div id={index} className={classes.allUsButtons}>
                    {/* <Link to={`/tournament_page/${item.tournamentName}`}><EditBtn inputType="submit" content='Add Event' onClick={() => this.addEventBtn(item)}/></Link> */}
                    {/* <Link to={`/edit_tournament/${item.tournamentName}`}><EditBtn inputType="submit" content='Edit' onClick={() => this.editTournamentBtn(item)}/></Link> */}
                    <DeleteBtn onClick={() => this.DeleteTournamentBtn(item.tournamentId)} inputType={'button'} content='Delete'/>
                 </div>
            </li>
        })
        : null
    }
    
    render (){
        console.log('TOURN LIST PROPS ', this.props)
        return (
            <div className={classes.usersWrapper}>
                <div>
                <h1>Tournaments List</h1>
                {this.successDeleteMessage()}
                {this.errorDeleteMessage()}
                <div className={classes.usersHead}>
                    <div className={classes.username}>Tournament Name</div>
                    <div className={classes.email}>Start Date</div>
                    <div className={classes.email}>End Date</div>
                    <div className={classes.role}>Max Events</div>
                    <div className={classes.role}>Event Type</div>
                    <div className={classes.addBtn}><BtnComp inputType="submit" content='Add Tournament' onClick={this.addTournamentBtn}/></div>
                </div> 
                </div>
                <ul className={classes.uesrsList}>{this.tournamentList()}</ul>
                {this.props.addItem ? <div className={classes.AddUser}>{this.addTournamentComp()}</div> : null}
                {this.props.addEvent ? <div className={classes.AddUser}>{this.addEventComp()}</div> : null}
                {this.props.addTournament ? <div className={classes.AddUser}>{this.addTournamentComp()}</div> : null}
                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editTournamentComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline={DELETE_TOURNAMENT} item={this.state.tournamentForDelete}/> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allTournsList: state.allListReducer.allTournsList,
        allEventTypesList: state.allListReducer.allEventTypesList,
        tournsDataById: state.allListReducer.tournsDataById,
        addItem: state.addNewItemReducer.addItem,
        addEvent: state.addNewItemReducer.addEvent,
        addTournament: state.addNewItemReducer.addTournament,
        editThisItem: state.editItemReducer.editThisItem,
        successMessage: state.sharedReducer.successMessage,
        errorMessage: state.sharedReducer.errorMessage,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage,
        currentUser: state.userReducer.currentUser

    }
}

const mapDispatchToProps = dispatch => {

    return{
        takeAllTournaments: payload => dispatch(takeAllTournaments(payload)),
        takeMyTournamentsRequest: payload => dispatch(takeMyTournamentsRequest(payload)),
        DeleteTournamentRequest: (item) => dispatch(DeleteTournamentRequest(item)),
        // addNewItemAction: payload => dispatch(addNewItemAction(payload)),
        addNewEventAction: payload => dispatch(addNewEventAction(payload)),
        addNewTournamentAction: payload => dispatch(addNewTournamentAction(payload)),
        editThisItemAction: payload => dispatch(editThisItemAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload)),
        goToTournPageRequest: payload => dispatch(goToTournPageRequest(payload)),
        tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),

        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsList);
