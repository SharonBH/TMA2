import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import classes from '../../Games/TournamentPage/TournamentPage..scss';

import moment from 'moment'


import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import SelectComp from '../../UI/SelectComp/SelectComp'

import Register from '../../Register';
import UserSummary from '../../Users/UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';

import { takeAllTournaments, DeleteTournamentRequest } from '../../../actions/GamesApi';
import { addNewItemAction, addNewEventAction, addNewTournamentAction,  editThisItemAction, successMessageAction, errorMessageAction, deleteConfirmMessageAction }  from '../../../actions';
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
        }
        this.editTournamentBtn = this.editTournamentBtn.bind(this)
        // this.DeleteTournamentBtn = this.DeleteTournamentBtn.bind(this)

    }

    componentWillMount(){
        this.setState({currentPage: this.props.tournById})
        if(this.props.allTournsList.length === 0 || this.props.allTournsList === undefined) {
            this.props.takeAllTournaments()
        } else {
            return null
        }
        
    }
    componentDidMount(){
        
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
        return <Register headline='Add Tournament' classStr='none' />
    }
    addEventComp = () => {
        return <Register headline='Add Event' tourn={this.props.tournById} classStr='none' />
    }
    editEventComp = () => {
        return <UserSummary headline='Edit Event' event={this.state.eventInEditMode} tournament={null} user={null}/>
    }
    editTournamentComp = () => {
        return <UserSummary headline='Edit Tournament' event={null} tournament={this.props.tournById} user={null}/>
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


    
    render (){
        console.log('tournament page state',this.state)
        console.log('tournament page props',this.props)
    
        const tournamentHeadig = this.props.location.pathname.slice(1)
        const currentTournament = this.props.tournById !== null ? this.props.tournById : null
        console.log('currentTournament',currentTournament)
        return (
            <div className={classes.tournPageWrapper}>
                {this.successDeleteMessage()}
                {this.errorDeleteMessage()}
                <div className={classes.headTPage}>
                    <h1>Tournament Name: {tournamentHeadig}</h1>
                    <div className={classes.tournPButtons}>
                        <Link className={classes.backBtn} to='/all_tournaments'><BtnComp content='Back to Tournaments List' inputType='button'/></Link>
                        <BtnComp content='Add Event' inputType='button' onClick={this.addEventBtn}/>
                        {/* <Link to={`/${currentTournament.tournamentName}/edit_tournament`}> */}
                        <BtnComp inputType="button" content='Edit Tournament' onClick={() => this.editTournamentBtn(currentTournament)}/>
                        {/* </Link> */}
                        
                    </div>
                </div>
                <div className={classes.tournTime}><h3>Tournament timing:</h3> <h4>from </h4> {moment(currentTournament.startDate).format('LLLL')} <h4>to </h4> {moment(currentTournament.endDate).format('LLLL')}</div>
                {/* <div className={classes.tournTime}><h3>Tournament timing:</h3> <h4>from </h4> {(currentTournament.startDate)} <h4>to </h4> {(currentTournament.endDate)}</div> */}
                <div>Maximum of events: {currentTournament.numberOfEvents}</div>
                <div>
                    <div className={classes.eventsTable}>
                        <h3>All events of tournament</h3>
                        <div><h4 className={classes.eventName}>Event Name</h4><h4 className={classes.eventDate}>Event Date</h4></div>
                        <ul>
                        {currentTournament.events.map((item, index) => {
                            return <li key={index}>
                                <div className={classes.eventName}>{item.eventName}</div>
                                <div className={classes.eventDate}>{moment(item.eventDate).format('LLLL')}</div>
                            </li>
                        })}
                        </ul>
                    </div>
                    <div className={classes.eventsTable}>
                        <h3>All users of tournament</h3>
                        <div><h4 className={classes.eventName}>User Name</h4><h4 className={classes.eventDate}>Event Date</h4></div>
                        <ul>
                        {currentTournament.events.map((item, index) => {
                            return <li key={index}>
                                <div className={classes.eventName}>{item.eventName}</div>
                                <div className={classes.eventDate}>{moment(item.eventDate).format('LLLL')}</div>
                            </li>
                        })}
                        </ul>
                    </div>
                </div>
                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editTournamentComp()}</div> : null}
                {this.props.addEvent ? <div className={classes.AddUser}>{this.addEventComp()}</div> : null}
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
        tournById: state.allListReducer.tournById,
        addItem: state.addNewItemReducer.addItem,
        addEvent: state.addNewItemReducer.addEvent,
        addTournament: state.addNewItemReducer.addTournament,
        editThisItem: state.editItemReducer.editThisItem,
        successMessage: state.sharedReducer.successMessage,
        errorMessage: state.sharedReducer.errorMessage,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage,

    }
}

const mapDispatchToProps = dispatch => {

    return{
        takeAllTournaments: payload => dispatch(takeAllTournaments(payload)),
        DeleteTournamentRequest: (item) => dispatch(DeleteTournamentRequest(item)),
        // addNewItemAction: payload => dispatch(addNewItemAction(payload)),
        addNewEventAction: payload => dispatch(addNewEventAction(payload)),
        addNewTournamentAction: payload => dispatch(addNewTournamentAction(payload)),
        editThisItemAction: payload => dispatch(editThisItemAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage);
