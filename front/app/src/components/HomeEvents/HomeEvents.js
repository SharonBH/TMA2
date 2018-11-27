
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment'
import classes from '../../containers/MainPage/MainPage.scss';
import {takeAllTournaments, takeMyHomeLeaderboardRequest} from '../../actions/GamesApi';
import { getAllRolesRequest } from '../../actions/Api';
import Spinner from '../UI/Spinner'
import SmallSpinner from "../UI/SmallSpinner/SmallSpinner";


export class HomeEvents extends Component {

    componentWillMount() {
        setTimeout(() => {
            this.props.takeAllTournaments()

        }, 200)
	    if(this.props.currentUser !== null &&  this.props.allMyHomeData === ''){
		    const userId = this.props.currentUser.userId
		    setTimeout(() => {
			    this.props.takeMyHomeLeaderboardRequest(userId)
		    }, 200)
	    }
    }
    eventDateCheck = () => {
        this.props.myEventsById.map((item, index) => { 
            const parsedDate = Date.parse(item.eventDate)
            const today = Date.parse(new Date())
            if(parsedDate < today) {
                return (
                    <li key={index}><div><p>{item.eventName}</p><p>{moment(parsedDate).format('DD-MM-YYYY')}</p></div></li>
                )
            } 
        })
    }
    
    futureEventsList = () => {
        const {next} =  this.props.allMyHomeData
        
        const fill = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentId === (next.nextEvent === null ? null : next.nextEvent.tournamentId)}): null
        const filltournamentName = fill !== undefined ? fill.tournamentName : '';
        return(
            <div>
                {next.nextEvent === null ? <span className={classes.noResults}>No Future events</span>
                :
                <div className={classes.eventData}>
                    <p className={classes.eventName}><span>Event Name:</span>{next.nextEvent.eventName}</p>
                    <p className={classes.eventName}><span>Tournament Name:</span>{next.nextEvent.tournamentName}</p>
                    <p className={classes.eventDate}><span>Event Date:</span>{moment(next.nextEvent.eventDate).format('DD-MM-YYYY HH:MM')}</p>
                </div>
                }
        </div>
        )
    }
    pastEventsList = () => {
        const {past} =  this.props.allMyHomeData;
        const fill = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentId === (past.pastEvent === null ? null : past.pastEvent.tournamentId)}): null;
        const filltournamentName = fill !== undefined ? fill.tournamentName : '';

        return(
            <div>
                {past.pastEvent === null ? <span className={classes.noResults}>No Past events</span>
                :
                <div className={classes.eventData}>
                    <p className={classes.eventName}><span>Event Name:</span>{past.pastEvent.eventName}</p>
                    <p className={classes.eventName}><span>Tournament Name:</span>{past.pastEvent.tournamentName}</p>
                    <p className={classes.eventDate}><span>Event Date:</span>{moment(past.pastEvent.eventDate).format('DD-MM-YYYY HH:MM')}</p>
 
                </div>
                }
        </div>
        )
    };
    
    pastEventTableOutput = () => {
        const {past} =  this.props.allMyHomeData
        const pastTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentName === (past.pastEvent === null ? null : past.pastEvent.tournamentName)}): null
	
	    const mapedBoard = past.pastLeaderboard !== undefined ? past.pastLeaderboard.map((item) => { return item }) : null;
	    const sortedBoard = mapedBoard.sort((a, b) => {
            return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
        })
		console.log('sortedBoard', sortedBoard)
        return (
            <div className={classes.leaderTop}>
                <p>{pastTournament.tournamentName}</p>
                <div className={classes.leaderTableHead}>
                    <b>User Name</b>
                    <b>Number of Events</b>
                    <b>Total Scores</b>
                </div>
                <ul>{sortedBoard.map((user, i) => {
	                console.log('user', user)
	                const profileImage = user.user.avatar === undefined || user.user.avatar === null ? <i className="fas fa-user-circle"></i> : <img src={`data:image/jpeg;base64,`+`${user.user.avatar}`} />
                        return <li key={i}>
	                        <div>
		                        <p><span>
				                        {<span className={classes.profileAvatar}>
					                        {profileImage}
				                        </span>}
			                        </span>
			                        <span>
			                        {user.user.username}</span></p>
	                            <p><span>{user.numberOfEvents}</span></p>
	                            <p><span>{user.totalScores}</span></p>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        )
    };
	nextEventTableOutput = () => {
		const {next} =  this.props.allMyHomeData
		const nextTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentName === (next.nextEvent === null ? null : next.nextEvent.tournamentName)}): null
		const sortedBoard = next.nextLeaderboard !== undefined ? next.nextLeaderboard.sort((a, b) => {
			return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
		}) : null;
		return (
			<div className={classes.leaderTop}>
				<p>{nextTournament.tournamentName}</p>
				<div className={classes.leaderTableHead}>
					<b>User Name</b>
					<b>Number of Events</b>
					<b>Total Scores</b>
				</div>
				<ul>{sortedBoard.map((user, i) => {
					const profileImage = user.user.avatar === undefined || user.user.avatar === null ? <i className="fas fa-user-circle"></i> : <img src={`data:image/jpeg;base64,`+`${user.user.avatar}`} />
					return <li key={i}><div>
						<p><span>
			                        {<span className={classes.profileAvatar}>
				                        {profileImage}
			                        </span>}
		                        </span><span>{user.user.userName}</span></p>
						<p><span>{user.numberOfEvents}</span></p>
						<p><span>{user.totalScores}</span></p>
					</div></li>
				})}
				</ul>
			</div>
		)
    };
	

    leaderboardTable = () => {
        const {past, next} =  this.props.allMyHomeData
        const pastTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentName === (past.pastEvent === null ? null : past.pastEvent.tournamentName)}): null
        const nextTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentName === (next.nextEvent === null ? null : next.nextEvent.tournamentName)}): null

        if(pastTournament !== undefined && nextTournament !== undefined ){
	        if(pastTournament.tournamentId === nextTournament.tournamentId){
                return  this.pastEventTableOutput()
            }else if(pastTournament.tournamentId !== nextTournament.tournamentId){
	            return (
		            <div className={classes.doubleBoard}>
                        <div>{this.pastEventTableOutput()}</div>
			            <div>{this.nextEventTableOutput()}</div>
		            </div>
	            )
            }
        }else if(pastTournament !== undefined && nextTournament === undefined){
            return this.pastEventTableOutput()
        }
        
    }

    render() {
    	console.log('home page____', this.props)
	    const {past, next} =  this.props.allMyHomeData
	    const pastTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentName === (past.pastEvent === null ? null : past.pastEvent.tournamentName)}): null
	    const nextTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentName === (next.nextEvent === null ? null : next.nextEvent.tournamentName)}): null
	    console.log('home page_1___', pastTournament, nextTournament)
	    console.log('home page_2___', past, next)
        return (
            <div className={classes.EventsPage}>
                <div>
                    <h1>Hello, your leader board</h1>
	                <div className={classes.leaderBoardTables}>
                        {pastTournament !== undefined || nextTournament !== undefined
                        	? this.leaderboardTable()
                            :  <div className={classes.smallSpinner}><SmallSpinner/></div>
                        }
	                </div>
                </div>
                <div>
                    <h1>You have some events</h1>
                    <div className={classes.eventsTBLS}>
                        <div className={classes.eventsTable}>
                            <h4>Youre past event</h4>
                            <div>{this.pastEventsList()}</div>
                        </div>
                        <div className={classes.eventsTable}>
                            <h4>Youre future event</h4>
                            <div>{this.futureEventsList()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser,
        myEventsById: state.allListReducer.myEventsById,
        allMyHomeData: state.allListReducer.allMyHomeData,
        allTournsList: state.allListReducer.allTournsList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllRolesRequest: payload => dispatch(getAllRolesRequest(payload)),
        takeAllTournaments: payload => dispatch(takeAllTournaments(payload)),
	    takeMyHomeLeaderboardRequest: payload => dispatch(takeMyHomeLeaderboardRequest(payload)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeEvents));