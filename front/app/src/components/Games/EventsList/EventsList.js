import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import classes from '../../Users/AllUsersAdmin/AllUsersAdmin.scss';

import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import SelectComp from '../../UI/SelectComp/SelectComp'

import Register from '../../Register';
import UserSummary from '../../Users/UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';

import { takeAllTournaments, DeleteEventRequest, takeAllEvents } from '../../../actions/GamesApi';
import { addNewItemAction, editThisItemAction, successMessageAction, errorMessageAction, deleteConfirmMessageAction }  from '../../../actions';
export class EventsList extends Component {

    static propTypes = {
        getAllUsers: PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = {
            eventInEditMode: null,
            eventForDelete: null,
            display: false,
            userDetailsArr: [],
            allEventTypesList: []
        }
        this.editEventBtn = this.editEventBtn.bind(this)
        this.DeleteEventBtn = this.DeleteEventBtn.bind(this)
    }

    componentWillMount(){
        if(this.props.allEventsList.length === 0 || this.props.allEventsList === undefined) {
            this.props.takeAllEvents()
        } else {
            return null
        }
        
        
    }
    componentDidMount(){
        this.props.successMessageAction(null)
        if(this.props.allEventsList.length === 0 || this.props.allEventsList === undefined) {
            this.props.takeAllEvents()
            
        } else {
            return null
        }
        if(this.props.allTournsList.length === 0 || this.props.allTournsList === undefined) {
            this.props.takeAllTournaments()
        } else {
            return null
        }
        
    }

    componentWillUnmount(){
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({eventForDelete: null})
        this.setState({eventInEditMode: null})
    }

    DeleteEventBtn = (item) => {
        this.setState({eventForDelete: item})
        this.setState({eventInEditMode: null})
        this.props.deleteConfirmMessageAction(true)
    }

    editEventBtn = (item) => {
        this.setState({eventInEditMode: item})
        setTimeout(() => {
            this.props.editThisItemAction(true)
        }, 200)

    }
    editDetailInput = (index, e) => {
        const details = Object.assign([], this.state.userDetailsArr)
            details[index] = e.target.value
        this.setState({
            userDetailsArr: details
        })
    }
    addEventBtn = () => {
        setTimeout(() => {
            this.props.addNewItemAction(true)
        }, 200)
    }

    
    addEventComp = () => {
        return <Register headline='Add Event' classStr='none' />
    }

    editEventComp = () => {
        return <UserSummary headline='Edit Event' event={this.state.eventInEditMode} tournament={null} user={null}/>
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

    eventList = () => {
            
        return this.props.allEventsList !== undefined ? this.props.allEventsList.map((item, index) => {   
            const eventTName = this.props.allEventTypesList !== undefined ? this.props.allEventTypesList.find((event) => {return event.eventTypeId === item.eventTypeId} ): null
            const eventN = eventTName !== undefined ?  Object.values(eventTName)[1] : null

            const TournamName = this.props.allEventTypesList !== undefined ? this.props.allTournsList.find((tourn) => {return tourn.tournamentId === item.tournamentId}): null
            const tournN = TournamName !== undefined ?  Object.values(TournamName)[1] : null
        
            return <li key={index}>
                    <div className={classes.username}>{item.eventName}</div>
                    <div className={classes.email}>{eventN}</div>
                    <div className={classes.email}>{tournN}</div>
                    <div className={classes.role}>{item.eventDate}</div>
                    <div id={index} className={classes.allUsButtons}>
                        <Link to={`/edit_event/${item.eventName}`}><EditBtn inputType="submit" content='Edit' onClick={() => this.editEventBtn(item)}/></Link>
                        <DeleteBtn onClick={() => this.DeleteEventBtn(item.eventId)} inputType={'button'} content='Delete'/>
                    </div>

                </li>
        })
        : null
    }
    
    render (){
        return (
            <div className={classes.usersWrapper}>
                {this.successDeleteMessage()}
                {this.errorDeleteMessage()}
                <div className={classes.usersHead}>
                    <div className={classes.username}>Event Name</div>
                    <div className={classes.email}>Type of Event</div>
                    <div className={classes.email}>Tournir Name</div>
                    <div className={classes.role}>Date of Event</div>
                    <div className={classes.addBtn}><BtnComp inputType="submit" content='Add Event' onClick={this.addEventBtn}/></div>
                </div> 
                <ul className={classes.uesrsList}>{this.eventList()}</ul>
                {this.props.addItem ? <div className={classes.AddUser}>{this.addEventComp()}</div> : null}
                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editEventComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline='Delete Event' item={this.state.eventForDelete}/> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allEventsList: state.allListReducer.allEventsList,
        allTournsList: state.allListReducer.allTournsList,
        allEventTypesList: state.allListReducer.allEventTypesList,
        addItem: state.addNewItemReducer.addItem,
        editThisItem: state.editItemReducer.editThisItem,
        successMessage: state.sharedReducer.successMessage,
        errorMessage: state.sharedReducer.errorMessage,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage,
        
    }
}

const mapDispatchToProps = dispatch => {

    return{
        takeAllEvents: payload => dispatch(takeAllEvents(payload)),
        takeAllTournaments: payload => dispatch(takeAllTournaments(payload)),
        DeleteEventRequest: (item) => dispatch(DeleteEventRequest(item)),
        addNewItemAction: payload => dispatch(addNewItemAction(payload)),
        editThisItemAction: payload => dispatch(editThisItemAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
