import classes from "./TournamentPage.scss";
import moment from "moment";
import EditBtn from "../../UI/BtnComp/EditBtn";
import DeleteBtn from "../../UI/BtnComp/DeleteBtn";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {tournEventsByIdRequest} from "../../../actions/GamesApi";
import SmallSpinner from "../../UI/SmallSpinner/SmallSpinner";
import Promise from "bluebird";



export class TournyPageLeaderBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leaderBoardData: []
		}
	}
	componentDidMount = () => {
		this.setStateAsync = Promise.promisify(this.setState);
		
		setTimeout(()=>{
			this.setStateAsync({
				leaderBoardData: this.props.leaderBoardData
			})
			
		}, 3000)

	}
	componentWillUnmount(){
		this.setState({leaderBoardData: []})
		
	}
	leaderBoardTable = () => {
		const leaderUsers = this.state.leaderBoardData
		
		
		const sortedBoard = leaderUsers.length !== 0 || leaderUsers !== null ? leaderUsers.sort((a, b) => {
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
					{
						// sortedBoard.user === 'No Data'
						// 	?
							sortedBoard.length !== 0
								? <ol>
									{sortedBoard !== null ? sortedBoard.map((item, index) => {
										return sortedBoard !== undefined && sortedBoard[0].user !== 'No Data'
											? <li key={index}>
												<div className={classes.leaderBoardTD}>{item.user.username}</div>
												<div className={classes.leaderBoardTD}>{item.totalScores}</div>
												<div className={classes.leaderBoardTD}>{item.numberOfEvents}</div>
											  </li>
											: <div key={index}>No Results</div>
										}) : null
										
										}
								</ol>
								
								: <ul className={classes.noresults}>
									<SmallSpinner/>
								</ul>
					}
			</div>
		)
	}
	render(){
		console.log('eventsLEADERBOARD list', this.props)
		console.log('eventsLEADERBOARD STATE list', this.state)
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
