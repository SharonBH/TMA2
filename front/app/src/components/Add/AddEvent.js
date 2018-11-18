import moment from "moment";
import classes from "../Register/RegisterComp.scss";
import InputComp from "../UI/InputComp/InputComp";
import {DateTimePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import {Link} from "react-router-dom";
import BtnComp from "../UI/BtnComp/BtnComp";
import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import { ADD_EVENT } from '../../configuration/config.js'
import {addNewEventRequest, tournEventsByIdRequest} from "../../actions/GamesApi";
import {errorMessageAction, successMessageAction} from "../../actions";



export class AddEvent extends Component{
	constructor(props) {
		super(props);
		this.state = {
			EventName: '',
			Tournament: '',
			EventDate: '',
			EventsMaxNum: '',
			selectedDate: moment().format('YYYY-MM-DD, HH:MM'),
			addEventSelectedUsersList: [],
			searchUsers: '',
			searchUsersResult: [],
			addSearchUsersResult: [],
			
		}
	}
	onMaxNumChange = (e) => { this.setState({EventsMaxNum: e.target.value})};
	handleDateChange = (date) => {
		const dateMF = moment(date).format('MM DD YYYY, hh:mm:ss ');
		this.setState({ selectedDate: dateMF });
	};
	
	removeSelectedUser = (index) => {
		let removeAddUser = [...this.state.addSearchUsersResult];
		removeAddUser.splice(index, 1);
		this.setState({addSearchUsersResult: removeAddUser});
		
		const splited = this.state.EventName.split(' Vs. ');
		let removeNameFromArr = [...splited];
		removeNameFromArr.splice(index, 1);
		const names = removeNameFromArr.join(' Vs. ') ;
		this.setState({EventName: names})
		
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
			this.setState({EventName: e.target.value})
		}
	};
	addSearchUsers = (user) => {
		const fill = this.state.addSearchUsersResult.filter(item => String(item.userId) !== String(user.userId));
		const array = [...fill, {userId: user.userId, score: null, username: user.username}];
		const namesArray = [...fill, {userId: user.userId, score: null, username: user.username}];
		array.sort((a, b) => {
			return a.username === b.username ? 0 : a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1;
		});
		this.setState({addSearchUsersResult: namesArray});

		
		if(this.onEventNameChange){
			const name = namesArray !== ''
				? namesArray.map((user) => {return user.username})
				: this.state.EventName;
			const names = !name || name !== '' ? name.join(' Vs. ') : '';
			this.setState({EventName: names})
		}

	};
	eventUsersPlaying = () => {
		const { selectedDate, addSearchUsersResult } = this.state;
		const today = Date.parse(new Date());
		const eventday = Date.parse(selectedDate);
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
	};
	addNewEvent = (e) => {
		e.preventDefault();
		const {tournById, allEventTypesList} = this.props;
		const { EventName, selectedDate, addSearchUsersResult } = this.state;
		
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
		}else {
			 this.props.addNewEventRequest(EventName, Tournament,  moment(this.state.selectedDate).format('MM DD YYYY, hh:mm:ss '), usersWithResults)
		}
	};
	getTournById=(tournIdToPage)=>{
		this.props.tournEventsByIdRequest(tournIdToPage)
	};
	eventPage = (headline) => {
		const {tournById, groupById} = this.props;
		const arr = [...groupById.users];
		return ( <div>
					<InputComp inputType="text" name="tournament" placeholder={'Tournament Name'} content={tournById.tournamentName} onChange={() => {}}/>
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
					<InputComp inputType="text" name="eventName" placeholder="Event Name" onChange={this.onEventNameChange} content={this.state.EventName}/>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<DateTimePicker
							className={classes.timePicker}
							value={this.state.selectedDate}
							onChange={(date)=> this.handleDateChange(date)}
							showTodayButton
							name="deteOfEvent"
							placeholder={moment().format('MM DD YYYY, hh:mm:ss ') }
							ampm={false}
							format="MM DD YYYY, hh:mm:ss "
							label={'Event Time:'}
						/>
					</MuiPickersUtilsProvider>
					<div className={classes.usersAddedWrapper}>
						{<span className={classes.searchResult}>selected players for this event</span>}
						{this.eventUsersPlaying()}
					</div>
					<Link to={`/tournament_page/${this.props.tournById.tournamentName}`} onClick={()=>this.getTournById(this.props.tournById.tournamentId)}>
						<BtnComp
							inputType="submit"
							name="createEvent"
							content={ADD_EVENT}
							onClick={this.addNewEvent}
						/>
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
		allEventTypesList: state.allListReducer.allEventTypesList,
		
		// allTournsList: state.allListReducer.allTournsList,
		// allList: state.allListReducer.allList,
		// groupsList: state.allListReducer.groupsList,
		// tournByIdNoS: state.allListReducer.tournByIdNoS,
		// groupsDataById: state.allListReducer.groupsDataById,
		// currentUser: state.userReducer.currentUser
	}
};
const mapDispatchToProps = dispatch => {
	return {
		errorMessageAction: payload => dispatch(errorMessageAction(payload)),
		successMessageAction: (payload) => dispatch(successMessageAction(payload)),
		addNewEventRequest: (EventName, Tournament, EventDate, usersWithResults) => dispatch(addNewEventRequest(EventName, Tournament, EventDate, usersWithResults)),
		tournEventsByIdRequest: (payload) => dispatch(tournEventsByIdRequest(payload)),
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);