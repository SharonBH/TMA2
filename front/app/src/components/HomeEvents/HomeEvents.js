
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment'
import classes from '../../containers/MainPage/MainPage.scss';
import { takeAllTournaments } from '../../actions/GamesApi';
import { getAllRolesRequest } from '../../actions/Api';
import Spinner from '../UI/Spinner'


export class HomeEvents extends Component {

    componentWillMount() {
        setTimeout(() => {
            this.props.takeAllTournaments()

        }, 200)
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
        const filltournamentName = fill !== undefined ? fill.tournamentName : ''
        console.log('next', fill)

        return(
            
            <div>
                {next.nextEvent === null ? <span className={classes.noResults}>No Future events</span>
                :
                <div className={classes.eventData}>
                    <p className={classes.eventName}><span>Event Name:</span>{next.nextEvent.eventName}</p>
                    <p className={classes.eventName}><span>Tournament Name:</span>{filltournamentName}</p>
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
        console.log('next', past)

        return(
            <div>
                {past.pastEvent === null ? <span className={classes.noResults}>No Past events</span>
                :
                <div className={classes.eventData}>
                    <p className={classes.eventName}><span>Event Name:</span>{past.pastEvent.eventName}</p>
                    <p className={classes.eventName}><span>Tournament Name:</span>{filltournamentName}</p>
                    <p className={classes.eventDate}><span>Event Date:</span>{moment(past.pastEvent.eventDate).format('DD-MM-YYYY HH:MM')}</p>
 
                </div>
                }
        </div>
        )
    };
    
    pastEventTableOutput = () => {
        const {past} =  this.props.allMyHomeData
        const pastTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentId === (past.pastEvent === null ? null : past.pastEvent.tournamentId)}): null
        
       
        // const reducedT = ''
        const sortedBoard = past.pastLeaderboard !== null ? past.pastLeaderboard.sort((a, b) => {
            return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
        }) : null;
        console.log('leader sort', sortedBoard)
        return (
            <div className={classes.leaderTop}>
                <p>{pastTournament.tournamentName}</p>
                <div className={classes.leaderTableHead}>
                    <b>User Name</b>
                    <b>Number of Events</b>
                    <b>Total Scores</b>
                </div>
                <ul>{sortedBoard.map((user, i) => { 
                        return <li key={i}><div>
                            <p><span>{user.user.userName}</span></p>
                            <p><span>{user.numberOfEvents}</span></p>
                            <p><span>{user.totalScores}</span></p>
                        </div></li>
                    })}
                </ul>
            </div>
        )
    };
	nextEventTableOutput = () => {
		const {next} =  this.props.allMyHomeData
		const nextTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentId === (next.nextEvent === null ? null : next.nextEvent.tournamentId)}): null
		const sortedBoard = next.nextLeaderboard !== null ? next.nextLeaderboard.sort((a, b) => {
			return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
		}) : null;
		console.log('leader sort', sortedBoard)
		return (
			<div className={classes.leaderTop}>
				<p>{nextTournament.tournamentName}</p>
				<div className={classes.leaderTableHead}>
					<b>User Name</b>
					<b>Number of Events</b>
					<b>Total Scores</b>
				</div>
				<ul>{sortedBoard.map((user, i) => {
					return <li key={i}><div>
						<p><span>{user.user.userName}</span></p>
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
        const pastTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentId === (past.pastEvent === null ? null : past.pastEvent.tournamentId)}): null
        const nextTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentId === (next.nextEvent === null ? null : next.nextEvent.tournamentId)}): null
        console.log('tournaments', pastTournament, '===' ,nextTournament)
        // const reducedT = ''
        // const sortedBoard = past.pastLeaderboard !== null ? past.pastLeaderboard.sort((a, b) => {
        //     return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
        // }) : null
        if(pastTournament !== undefined && nextTournament !== undefined ){
            if(pastTournament.tournamentId === nextTournament.tournamentId){
                console.log('reducedT', pastTournament.tournamentName);
                return this.pastEventTableOutput()
            }else if(pastTournament.tournamentId !== nextTournament.tournamentId){
	            return (
		            <div className={classes.doubleBoard}>
                        <div>{this.pastEventTableOutput()}</div>
			            <div>{this.nextEventTableOutput()}</div>
		            </div>
	            )
            }
            
        }else if(pastTournament !== undefined && nextTournament === undefined){
	        console.log('reducedT', pastTournament.tournamentName);
	        
            return this.pastEventTableOutput()
        }
        
    }

    render() {

        console.log('main props', this.props.allMyHomeData)
        return (
            <div className={classes.EventsPage}>
                <div>
                    <h1>Hello, your leader board</h1>
                    {this.leaderboardTable()}

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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeEvents));