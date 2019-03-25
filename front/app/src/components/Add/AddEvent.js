import moment from "moment";
import classes from "../Register/RegisterComp.scss";
import InputComp from "../UI/InputComp/InputComp";
import {DateTimePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import {Link} from "react-router-dom";
import BtnComp from "../UI/BtnComp/BtnComp";
import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
// import { ADD_EVENT } from '../../configuration/config.js'
import { addNewEventRequest, editThisEventRequest, tournEventsByIdRequest} from "../../actions/GamesApi";
import {errorMessageAction, successMessageAction} from "../../actions";



export class AddEvent extends Component{
	constructor(props) {
        super(props);
        //console.log("AddEvent", this.props.eventDetils);
        if (this.props.eventDetils != undefined) {
            var details = this.props.eventDetils;
            let array = [];
            details.eventUsers.map(function (user) {
                
                const result = details.eventResults !== null || details.eventResults.length > 0 ? details.eventResults.find((userId) => {
                    return userId.userId === user.userId
                }) : null               
                array.push({ userId: user.userId, score: result == undefined ? null : result.result, username: user.username })
            })
            this.state = {
                EventId: details.eventId,
                EventName: details.eventName,
                Tournament: '',
                EventDate: '',
                EventsMaxNum: '',
                selectedDate: details.eventDate,
                addEventSelectedUsersList: [],
                searchUsers: '',
                searchUsersResult: [],
                addSearchUsersResult: array,
                isExistingEvent: true
            }
        }
        else {
            this.state = {
                EventId: null,
                EventName: '',
                Tournament: '',
                EventDate: '',
                EventsMaxNum: '',
                selectedDate: moment().format('YYYY-MM-DD, HH:MM'),
                addEventSelectedUsersList: [],
                searchUsers: '',
                searchUsersResult: [],
                addSearchUsersResult: [],
                eventUsers: [],
                eventUsersResults: [],
                isExistingEvent: false
            }
        }
	}
	onMaxNumChange = (e) => { this.setState({EventsMaxNum: e.target.value})};
	handleDateChange = (date) => {
		const dateMF = moment(date).format('MM DD YYYY, HH:mm:ss ');
		this.setState({ selectedDate: dateMF });
	};
	
	removeSelectedUser = (index) => {
        //let removeAddUser = [...this.state.addSearchUsersResult];
        console.log('removeSelectedUser');
		const fill = this.state.addSearchUsersResult.filter(item => item.userId !== index);
		this.setState({addSearchUsersResult: fill});
		
		if(this.props.tournById.eventTypeId === 1)  {
			const splited = this.state.EventName.split(' Vs. ');
			let removeNameFromArr = [ ...splited ];
			removeNameFromArr.splice(index, 1);
			const names = removeNameFromArr.join(' Vs. ');
			this.setState({EventName: names})
		}
		
	};
	addSearchUserResult = (user, e) => {
		const fill = this.state.addSearchUsersResult.filter(item => item.userId !== user.userId);
		const array = [...fill, {userId: user.userId, score: e.target.value, username: user.username}];
		array.sort((a, b) => {
			return a.username === b.username ? 0 : a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1;
		});
		this.setState({addSearchUsersResult: array});
	};
	
	onEventNameChange = (e) => {
		if(e){
			this.setState({EventName: e.target.value});
		}
	};
    addSearchUsers = (user) => {
        console.log('addSearchUsers');
		const fill = this.state.addSearchUsersResult.filter(item => String(item.userId) !== String(user.userId));
		const array = [...fill, {userId: user.userId, score: null, username: user.username}];
		const namesArray = [...fill, {userId: user.userId, score: null, username: user.username}];
		array.sort((a, b) => {
			return a.username === b.username ? 0 : a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1;
		});
		this.setState({addSearchUsersResult: namesArray});
		if(this.props.tournById.eventTypeId === 1) {
			if (this.onEventNameChange) {
				const name = namesArray !== ''
					? namesArray.map((user) => {
						return user.username
					})
					: this.state.EventName;
				const names = !name || name !== '' ? name.join(' Vs. ') : '';
				this.setState({EventName: names})
			}
		}

	};
	addNewEvent = (e) => {
		e.preventDefault();
        const { tournById, allEventTypesList } = this.props;
        
		const { EventName, selectedDate, addSearchUsersResult } = this.state;
        
        const TournamentId = tournById.tournamentId;
		const Tournament = tournById.tournamentName;
		const usersWithResults = [];
		addSearchUsersResult.map(user => {return usersWithResults.push({userId: user.userId, result: user.score})});
		if(EventName === '') {
			this.props.errorMessageAction('you must enter the name of this event')
		} else if (selectedDate === '') {
			this.props.errorMessageAction('you must enter the event date')
		} else if (usersWithResults.length < 2) {
			this.props.errorMessageAction('you must choose min of two users for this event')
		} else if (allEventTypesList.eventTypeName === 'FIFA' && usersWithResults.length > 2 && usersWithResults.length < 2) {
			this.props.errorMessageAction('in FIFA type must be two users for event')
        } else {
            if (this.state.isExistingEvent)
                this.props.editThisEventRequest(this.state.EventId, this.state.EventName, Tournament, moment(this.state.selectedDate).format('MM DD YYYY, HH:mm:ss '), usersWithResults, TournamentId)
            else {
                this.props.addNewEventRequest(EventName, Tournament, moment(this.state.selectedDate).format('MM DD YYYY, HH:mm:ss '), usersWithResults, TournamentId)
            }
		}
	};
	getTournById=(tournIdToPage)=>{
		this.props.tournEventsByIdRequest(tournIdToPage)
	};
	eventPage = (headline) => {
		const {tournById, groupById} = this.props;
        const { selectedDate, addSearchUsersResult } = this.state;
        
		/* const today = Date.parse(new Date());
		const eventday = Date.parse(selectedDate); */
		const arr = [...groupById.users];
		return (
		    <div>
                <InputComp inputType="text" name="tournament" placeholder={'Tournament Name'}
                           content={tournById.tournamentName} onChange={() => {
                }}/>
                <InputComp inputType="text" name="eventName" placeholder="Event Name" onChange={this.onEventNameChange}
                           content={this.state.EventName}/>
                           <span className={classes.eventsCount}>{addSearchUsersResult.length}</span>
                <div className={classes.usersAddedWrapper}>
                    {<span className={classes.searchResult}>select players from the tournament group</span>}

                    <ul className={classes.usersAddedWrapperList}>
                        {arr !== undefined ? arr.map((user, index) => {
                            const x = addSearchUsersResult !== null || addSearchUsersResult.length > 0 ? addSearchUsersResult.find((name) => {
                                return name.username === user.username
                            }) : null
                            return <li key={index}>
                                {addSearchUsersResult.length > 0 && x !== undefined
                                    ? <span className={classes.user + ' ' + classes.userResult} onClick={this.removeSelectedUser.bind(this, x.userId)}>
                                        <span className={classes.eventNames}>{x.username}</span>
                                        <InputComp inputType="number" name="userResult" placeholder="score" content={x.score}
                                                    onChange={this.addSearchUserResult.bind(this, x)} /> 
                                        <i className="far fa-times-circle"></i>
                                    </span>

                                    : <span className={classes.user} onClick={() => this.addSearchUsers(user)}>
                                        <span className={classes.eventNames}>{user.username}</span>
                                        <i className="far fa-plus-square"></i>
                                    </span>
                                }
                            </li>

                        }) : null
                        }
                    </ul>               
                </div>
                
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                        className={classes.timePicker}
                        value={this.state.selectedDate}
                        onChange={(date) => this.handleDateChange(date)}
                        showTodayButton
                        name="deteOfEvent"
                        placeholder={moment().format('MM DD YYYY, HH:mm:ss ')}
                        ampm={false}
                        format="MM DD YYYY, HH:mm "
                        label={'Event Time:'}
                    />
                </MuiPickersUtilsProvider>

                <Link to={`/tournament_page/${this.props.tournById.tournamentName}`}
                      onClick={() => this.getTournById(this.props.tournById.tournamentId)}>
                    <div className={classes.saveButton}><BtnComp
                        inputType="submit"
                        name="createEvent"
                        content='Save'
                        onClick={this.addNewEvent}
                    /></div>
                </Link>
        </div>
		)
	};
	
	render() {
		return this.eventPage()
	}
}

const mapStateToProps = (state) => {
	return {
		groupById: state.allListReducer.groupById,
		tournById:state.allListReducer.tournById,
		allEventTypesList: state.allListReducer.allEventTypesList		
	}
};
const mapDispatchToProps = dispatch => {
	return {
		errorMessageAction: payload => dispatch(errorMessageAction(payload)),
		successMessageAction: (payload) => dispatch(successMessageAction(payload)),
		addNewEventRequest: (EventName, Tournament, EventDate, usersWithResults, TournamentId) => dispatch(addNewEventRequest(EventName, Tournament, EventDate, usersWithResults, TournamentId)),
        editThisEventRequest: (eventId, eventName, eventN, tournN, eventDate, eventResults, tournamentId) => dispatch(editThisEventRequest(eventId, eventName, eventN, tournN, eventDate, eventResults, tournamentId)),
        tournEventsByIdRequest: (payload) => dispatch(tournEventsByIdRequest(payload)),
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);