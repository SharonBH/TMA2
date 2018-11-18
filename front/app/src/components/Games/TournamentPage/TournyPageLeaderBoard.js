import classes from "./TournamentPage.scss";
import moment from "moment";
import EditBtn from "../../UI/BtnComp/EditBtn";
import DeleteBtn from "../../UI/BtnComp/DeleteBtn";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {tournEventsByIdRequest} from "../../../actions/GamesApi";
import SmallSpinner from "../../UI/SmallSpinner/SmallSpinner";



export class TournyPageLeaderBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentWillMount(){
	
	}
	leaderBoardTable = () => {
		const leaderUsers = this.props.leaderBoardData;
		const sortedBoard = leaderUsers !== null ? leaderUsers.sort((a, b) => {
			return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
		}) : null
		return(
			<div>
				<h3>Leader Board of tournament</h3>
				<div className={classes.usersHead}>
					<h4 className={classes.leaderBoardTD}>User Name</h4>
					<h4 className={classes.leaderBoardTD}>Points</h4>
					<h4 className={classes.leaderBoardTD}>Events</h4>
				</div>
				{sortedBoard.length !== 0
					?
					<ol>
						{sortedBoard !== null ? sortedBoard.map((item, index) => {
							return ( <li key={index}>
								<div className={classes.leaderBoardTD}>{item.user.username}</div>
								<div className={classes.leaderBoardTD}>{item.totalScores}</div>
								<div className={classes.leaderBoardTD}>{item.numberOfEvents}</div>
							</li>)
						}) : null
						
						}
					</ol>
					: <ul className={classes.noresults}>
						<SmallSpinner/>
						{/*<p>No results</p>*/}
					</ul>}
			</div>
		)
	}
	render(){
		// console.log('events list', this.props)
		return	this.leaderBoardTable()
	}
}

const mapStateToProps = (state) => {
	return {
		leaderBoardData: state.allListReducer.leaderBoardData,
	}
};

const mapDispatchToProps = dispatch => {
	
	return{
		// tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),
		
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TournyPageLeaderBoard);
