import {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {errorMessageAction, successMessageAction} from "../../actions";
import { addNewTournamentRequest } from "../../actions/GamesApi";
import moment from "moment";
import classes from "../Register/RegisterComp.scss";
import InputComp from "../UI/InputComp/InputComp";
import SelectIdComp from "../UI/SelectComp/SelectIdComp";
import SelectComp from "../UI/SelectComp/SelectComp";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import BtnComp from "../UI/BtnComp/BtnComp";
import {ADD_TOURNAMENT} from "../../configuration/config";
import React from "react";


export class AddTournament extends Component{
	constructor(props) {
		super(props);
		this.state = {
			TournamentName:'',
			EventTypeName:'',
			TournamentStartDate: '',
			TournamentEndDate: '',
			groups: '',

		}
	}
	
	componentWillMount() {
		if (this.state.TournamentStartDate === '') {
			this.setState({TournamentStartDate: moment().format('LLLL')})
		}
		if (this.state.TournamentEndDate === '') {
			this.setState({TournamentEndDate: moment().add(1, 'year').format('LLLL')})
		}
	}
	onTournamentNameChange = (e) => { this.setState({TournamentName: e.target.value})};
	onTypeOfEventChange = (e) => { this.setState({EventTypeName: e.target.value})};
	onStartDateChange = (date) => {this.setState({TournamentStartDate: new Date(date )});};
	onEndDateChange = (eDate) => { this.setState({TournamentEndDate: new Date(eDate ) });};
	onGroupsChange = (e) => { this.setState({groups: e.target.value})};
	
	addNewTournament = (e) => {
		const { TournamentName, TournamentStartDate, TournamentEndDate, EventsMaxNum, EventTypeName, groups } = this.state;
		e.preventDefault();
		const today = new Date();
		const dd = today.getDate();
		const mm = today.getMonth()+1; //January is 0!
		const yyyy = today.getFullYear();
		const todayDate = mm + dd + yyyy;
		
		const q = new Date(TournamentStartDate);
		const qdd = q.getDate();
		const qmm = q.getMonth()+1; //January is 0!
		const qyyyy = q.getFullYear();
		const qstartDate = qmm + qdd + qyyyy;
		
		const end = new Date(TournamentEndDate);
		const edd = end.getDate();
		const emm = end.getMonth()+1; //January is 0!
		const eyyyy = end.getFullYear();
		const eEndDate = emm + edd + eyyyy;
		
		if(TournamentName === '') {
			this.props.errorMessageAction('you must enter a tournament name')
		} else if (groups === '') {
			this.props.errorMessageAction('you must choose a group of users')
		} else if (EventTypeName === '') {
			this.props.errorMessageAction('you must choose event type')
		} else if (TournamentStartDate === '' || TournamentEndDate === '') {
			this.props.errorMessageAction('you must enter the tournament start & end dates')
		} else if (qstartDate < todayDate ) {
			this.props.errorMessageAction('the tournament start date must be later than today')
		} else if (qstartDate > eEndDate) {
			this.props.errorMessageAction('the tournament end date must be later than the start date')
		}  else {
			this.props.addNewTournamentRequest(TournamentName, moment(TournamentStartDate).format('YYYY-MM-DD hh:mm:ss '), moment(TournamentEndDate).format('YYYY-MM-DD hh:mm:ss '), EventsMaxNum, EventTypeName, groups)
		}
	};
	
	tournamentPage = (headline) => {
		const eventTypes = this.props.allEventTypesList.map((event, index) => { return {key: event.eventTypeId, value: event.eventTypeName }});
		const groupsArr = this.props.groupsDataById !== '' && this.props.currentUser.role === 'User' ? this.props.groupsDataById : this.props.groupsList;
		const groupL = groupsArr !== null ? groupsArr.map((group) => { return {key: group.groupId, value: group.groupName }}) : null;
		
		return (<div>
					<InputComp
						inputType="text"
						name="tournamentName"
						placeholder="Tournament Name"
						onChange={this.onTournamentNameChange}
					/>
					<div className={classes.select}>
						<SelectIdComp
							key={groupL}
							options={groupL}
							placeholder={'Choose group'}
							name={'groups'}
							onChange={(e) => this.onGroupsChange(e)}
						/>
					</div>
					<div className={classes.select}>
						<SelectComp
							key={eventTypes}
							options={eventTypes}
							placeholder={'Tournament Type'}
							name={'eventType'}
							onChange={(e) => this.onTypeOfEventChange(e)}
						/>
					</div>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<DatePicker
							className={classes.timePicker}
							value={this.state.TournamentStartDate}
							onChange={(date)=> this.onStartDateChange(date)}
							showTodayButton
							name="startDate"
							placeholder={'Start Date'}
							format="MMM Do YYYY"
							label='Start Date:'
						/>
						<DatePicker
							className={classes.timePicker}
							value={this.state.TournamentEndDate}
							onChange={(eDate)=> this.onEndDateChange(eDate)}
							showTodayButton
							name="endDate"
							placeholder={'End Date' }
							format="MMM Do YYYY"
							label='End Date:'
						/>
					</MuiPickersUtilsProvider>
					<InputComp
						inputType="number"
						name="maxNumOfEvents"
						placeholder="Maximum number Of Events"
						onChange={this.onMaxNumChange}
					/>
					{<BtnComp
						inputType="submit"
						name="createTour"
						content={ADD_TOURNAMENT}
						onClick={this.addNewTournament}
					/> }
				</div>
		)
	};
	render(){
		console.log('tourny', this.props)
		return this.tournamentPage()
	}
}
const mapStateToProps = (state) => {
	return {
		allEventTypesList: state.allListReducer.allEventTypesList,
		groupsDataById: state.allListReducer.groupsDataById,
		currentUser: state.userReducer.currentUser,
		groupsList: state.allListReducer.groupsList,
		
	}
};
const mapDispatchToProps = dispatch => {
	return {
		errorMessageAction: payload => dispatch(errorMessageAction(payload)),
		successMessageAction: (payload) => dispatch(successMessageAction(payload)),
		addNewTournamentRequest: (tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum, EventTypeName, groups) => dispatch(addNewTournamentRequest(tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum, EventTypeName, groups)),
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTournament);