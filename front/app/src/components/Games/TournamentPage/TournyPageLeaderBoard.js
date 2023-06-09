import classes from "./TournamentPage.scss";
// import moment from "moment";
// import EditBtn from "../../UI/BtnComp/EditBtn";
// import DeleteBtn from "../../UI/BtnComp/DeleteBtn";
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {tournEventsByIdRequest} from "../../../actions/GamesApi";
import SmallSpinner from "../../UI/SmallSpinner/SmallSpinner";
// import Promise from "bluebird";



export class TournyPageLeaderBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leaderBoardData: []
		}
	}
	componentWillReceiveProps(nextProps) {
		const { leaderBoardData } = nextProps;
		if (this.props.leaderBoardData !== leaderBoardData) {
			
			this.setState({leaderBoardData: leaderBoardData});
		}
		
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
				<h3>Leaderboard</h3>
				<div className={classes.wrapList}>
				<div className={classes.usersHead}>
					<h4 className={classes.leaderBoardTD}>User</h4>
					<h4 className={classes.leaderBoardTD}>Points</h4>
					<h4 className={classes.leaderBoardTD}>Events</h4>
				</div>
					{
						sortedBoard.length !== 0
							? <ol>
								{sortedBoard !== null ? sortedBoard.map((item, index) => {
									const profileImage = item.user.avatar === undefined || item.user.avatar === null ? <i className="fas fa-user-circle"></i> : <img alt='' src={`data:image/jpeg;base64,`+`${item.user.avatar}`} />
									const pokerStyle = {width: '33%'};
									return sortedBoard !== undefined && sortedBoard[0].user !== 'No Data'
										? <li key={index}>
											<div style={pokerStyle} className={classes.leaderBoardTD}><span className={classes.nameLine}><span className={classes.profileImage}>{profileImage}</span><span>{item.user.username}</span></span></div>
											<div style={pokerStyle} className={classes.leaderBoardTD}>{item.totalScores}</div>
											<div style={pokerStyle} className={classes.leaderBoardTD}>{item.numberOfEvents}</div>
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
			</div>
		)
	}
	render(){
		// console.log('eventsLEADERBOARD list', this.props)
		// console.log('eventsLEADERBOARD STATE list', this.state)
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
