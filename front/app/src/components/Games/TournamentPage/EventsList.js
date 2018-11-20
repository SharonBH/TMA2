import classes from "./TournamentPage.scss";
import moment from "moment";
import EditBtn from "../../UI/BtnComp/EditBtn";
import DeleteBtn from "../../UI/BtnComp/DeleteBtn";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {tournEventsByIdRequest} from "../../../actions/GamesApi";
import {
	deleteConfirmMessageAction,
	editThisEventAction,
	sendEventDataAction,
	sendEvetnMatchAction,
	deleteEventAction
} from "../../../actions";
import SmallSpinner from '../../UI/SmallSpinner'
import Promise from "bluebird";


export class EventsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tournEventsByIdNoS: [],
			eventInEditMode: null,
			eventForDelete: null,
		}
	}
	componentWillMount(){
		const { currentTournamentId, currentTournamentName } = this.props
		
		if( currentTournamentId !== undefined ){
			this.props.tournEventsByIdRequest(currentTournamentId)
			
		}
		
	}
	componentDidMount = () => {
		this.setStateAsync = Promise.promisify(this.setState);
		
		setTimeout(()=>{
			this.setStateAsync({
				tournEventsByIdNoS: this.props.tournEventsByIdNoS
			})
			
		}, 3000)
		
	}
	componentWillUnmount(){
		this.setState({tournEventsByIdNoS: []})
		
	}


	DeleteEventBtn = (item) => {
	    this.setState({eventForDelete: item})
	    this.setState({eventInEditMode: null})
		this.props.deleteEventAction(item)
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
		const { currentTournamentId } = this.props
		return (
				<div>
					<h3>All events of tournament</h3>
					<div className={classes.usersHead}>
						<h4 className={classes.eventName}>Event Name</h4>
						<h4 className={classes.eventDate}>Event Date</h4>
						<h4 className={classes.usersInGame}>Users in Game</h4>
						<h4 className={classes.turnPageEventsBTN}><span>buttons</span></h4>
					</div>
					{this.state.tournEventsByIdNoS.length !== 0
						?
						<ul>
							{(this.state.tournEventsByIdNoS !== undefined || this.state.tournEventsByIdNoS.length !== 0)  ? this.state.tournEventsByIdNoS.map((item, index) => {
								 return item.eventName !== 'No Data'
								? <li key={index}>
										 <div className={classes.eventName}>{item.eventName}</div>
										<div
											className={classes.eventDate}>{moment(item.eventDate).format('DD-Mo-YYYY, HH:mm A')}</div>
										<div className={classes.usersInGame}>
											<span className={classes.showUsers}>Hover to show</span>
											<ul className={classes.hiddenUsers}>
												{item.eventUsers !== undefined ? item.eventUsers.map((user, index) => {
													const fill = item.eventResults.find(result => {
														return result.userId === user.userId
													})
													return <li key={index}>
														<span>{user.name}</span>
														<span>{fill.result === null ? 'none' : fill.result}</span>
													</li>
												}) : null}
											</ul>
										</div>
										<div className={classes.turnPageEventsBTN}>
											<a className={classes.editBTN}><EditBtn inputType="submit" content='Edit'
											                                        onClick={() => this.editEventBtn(item, this.props.match)}/></a>
											<div className={classes.deleteBTN}><DeleteBtn
												onClick={() => this.DeleteEventBtn(item.eventId, currentTournamentId)}
												inputType={'button'}
												content={`Delete`}/></div>
										</div>
									</li>
								: <div key={index}>No Events</div>
								
							}) : null}
						</ul>
						: <ul className={classes.noresults}>
							<SmallSpinner/>
							{/*<p>No events</p>*/}
						</ul>
					}
				</div>
				
		)
	};
	render(){
		
		console.log('events list', this.props)
		console.log('events list state', this.state)
		return	this.eventsTable()
	}
}

const mapStateToProps = (state) => {
	return {
		tournEventsByIdNoS: state.allListReducer.tournEventsByIdNoS,
	}
};

const mapDispatchToProps = dispatch => {
	
	return{
		tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),
		deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload)),
		sendEventDataAction: (payload) => dispatch(sendEventDataAction(payload)),
		sendEvetnMatchAction: (payload) => dispatch(sendEvetnMatchAction(payload)),
		editThisEventAction: payload => dispatch(editThisEventAction(payload)),
		deleteEventAction: payload => dispatch(deleteEventAction(payload)),

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
