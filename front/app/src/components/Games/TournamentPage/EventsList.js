import classes from "./TournamentPage..scss";
import moment from "moment";
import EditBtn from "../../UI/BtnComp/EditBtn";
import DeleteBtn from "../../UI/BtnComp/DeleteBtn";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {tournEventsByIdRequest} from "../../../actions/GamesApi";



export class EventsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tournEventsByIdNoS: []
		}
	}
	componentWillMount(){
		const { currentTournamentId, currentTournamentName } = this.props
		
		console.log('events list currentTournament', currentTournamentId)
		if( currentTournamentId !== undefined ){
			this.props.tournEventsByIdRequest(currentTournamentId)
			
		}
		
	}
	componentDidMount = () => {
		// if(this.props.tournEventsByIdNoS.length !== 0 ){
			this.setState({tournEventsByIdNoS: this.props.tournEventsByIdNoS})
		// }
	}
	componentWillUnmount = () => {
	
	}
	eventsTable = () => {
		
		return (
			<div>
				<div>
					<h3>All events of tournament</h3>
					<div className={classes.usersHead}>
						<h4 className={classes.eventName}>Event Name</h4>
						<h4 className={classes.eventDate}>Event Date</h4>
						<h4 className={classes.usersInGame}>Users in Game</h4>
						<h4 className={classes.turnPageEventsBTN}><span>buttons</span></h4>
					</div>
					{this.props.tournEventsByIdNoS.length !== 0
						?
						<ul>
							{(this.props.tournEventsByIdNoS !== undefined) ? this.props.tournEventsByIdNoS.map((item, index) => {
								return <li key={index}>
									<div className={classes.eventName}>{item.eventName}</div>
									<div
										className={classes.eventDate}>{moment(item.eventDate).format('DD-Mo-YYYY, HH:mm A')}</div>
									<div className={classes.usersInGame}>
										<span className={classes.showUsers}>Hover to show</span>
										<ul className={classes.hiddenUsers}>
											{item.eventUsers.map((user, index) => {
												const fill = item.eventResults.find(result => {
													return result.userId === user.userId
												})
												return <li key={index}>
													<span>{user.name}</span>
													<span>{fill.result === null ? 'none' : fill.result}</span>
												</li>
											})}
										</ul>
									</div>
									<div className={classes.turnPageEventsBTN}>
										<a className={classes.editBTN}><EditBtn inputType="submit" content='Edit'
										                                        onClick={() => this.editEventBtn(item, this.props.match)}/></a>
										<div className={classes.deleteBTN}><DeleteBtn
											onClick={() => this.DeleteEventBtn(item.eventId)} inputType={'button'}
											content={`Delete`}/></div>
									</div>
								</li>
							}) : null}
						</ul>
						: <ul className={classes.noresults}><p>No events</p></ul>
					}
				</div>
				
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

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
