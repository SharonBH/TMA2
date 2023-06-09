
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment'
import classes from '../../containers/MainPage/MainPage.scss';
import {takeAllTournaments, takeMyHomeLeaderboardRequest} from '../../actions/GamesApi';
import { getAllRolesRequest } from '../../actions/Api';
//import Spinner from '../UI/Spinner'
//import SmallSpinner from "../UI/SmallSpinner/SmallSpinner";


export class HomeEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
    //componentWillMount() {
	   // const userId = this.props.currentUser.userId
	   // this.props.takeMyHomeLeaderboardRequest(userId)
    //    setTimeout(() => {
    //        this.props.takeAllTournaments()
    //    }, 200)
	   // if(this.props.currentUser !== null &&  this.props.allMyHomeData === ''){
		  //  const userId = this.props.currentUser.userId
		  //  setTimeout(() => {
			 //   this.props.takeMyHomeLeaderboardRequest(userId)
		  //  }, 200)
	   // }
    //}
	//componentWillReceiveProps(nextProps) {
	//	const HomeData = this.props.allMyHomeData
	//	const { allMyHomeData } = nextProps;
	//	if( HomeData !== allMyHomeData ) {
	//		this.setState({
	//			groupById: this.props.groupById,
	//		});
	//	}
	//}
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
    
    //futureEventsList = () => {
    //    const {next} =  this.props.allMyHomeData

    //    const fill = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentId === (next.nextEvent === null ? null : next.nextEvent.tournamentId)}): null
    //    const filltournamentName = fill !== undefined ? fill.tournamentName : '';
    //    return(
    //        <div>
    //            {next.nextEvent === null ? <span className={classes.noResults}>No Future events</span>
    //            :
    //            <div className={classes.eventData}>
    //                <p className={classes.eventName}><span>Event Name:</span>{next.nextEvent.eventName}</p>
    //                <p className={classes.eventName}><span>Tournament Name:</span>{next.nextEvent.tournamentName}</p>
    //                <p className={classes.eventDate}><span>Event Date:</span>{moment(next.nextEvent.eventDate).format('DD-MM-YYYY HH:MM')}</p>
    //            </div>
    //            }
    //    </div>
    //    )
    //}
    //pastEventsList = () => {
    //    const {past} =  this.props.allMyHomeData;
    //    const fill = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentId === (past.pastEvent === null ? null : past.pastEvent.tournamentId)}): null;
    //    const filltournamentName = fill !== undefined ? fill.tournamentName : '';

    //    return(
    //        <div>
    //            {past.pastEvent === null ? <span className={classes.noResults}>No Past events</span>
    //            :
    //            <div className={classes.eventData}>
    //                <p className={classes.eventName}><span>Event Name:</span>{past.pastEvent.eventName}</p>
    //                <p className={classes.eventName}><span>Tournament Name:</span>{past.pastEvent.tournamentName}</p>
    //                <p className={classes.eventDate}><span>Event Date:</span>{moment(past.pastEvent.eventDate).format('DD-MM-YYYY HH:MM')}</p>
 
    //            </div>
    //            }
    //    </div>
    //    )
    //};
    
    //pastEventTableOutput = () => {
    //    const {past} =  this.props.allMyHomeData
    //    const pastTournament = this.props.allTournsList !== undefined ? this.props.allTournsList.find(result => {return result.tournamentName === (past.pastEvent === null ? null : past.pastEvent.tournamentName)}): null
	
	   // const mapedBoard = past.pastLeaderboard !== undefined ? past.pastLeaderboard.map((item) => { return item }) : null;
	   // const sortedBoard = mapedBoard.sort((a, b) => {
    //        return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
    //    })
    //    return (
    //        <div className={classes.leaderTop}>
    //            <p>{pastTournament.tournamentName}</p>
    //            <div className={classes.leaderTableHead}>
    //                <b>User</b>
    //                <b>Events</b>
    //                <b>Scores</b>
    //            </div>
    //            <ul>{sortedBoard.map((user, i) => {
    //                const profileImage = user.user.avatar === undefined || user.user.avatar === null ? <i className="fas fa-user-circle"></i> : <img alt={`${user.user.username}`} src={`data:image/jpeg;base64,` + `${user.user.avatar}`} />
    //                    return <li key={i}>
	   //                     <div>
		  //                      <p><span>
				//                        {<span className={classes.profileAvatar}>
				//	                        {profileImage}
				//                        </span>}
			 //                       </span>
			 //                       <span>
			 //                       {user.user.username}</span></p>
	   //                         <p><span>{user.numberOfEvents}</span></p>
	   //                         <p><span>{user.totalScores}</span></p>
    //                        </div>
    //                    </li>
    //                })}
    //            </ul>
    //        </div>
    //    )
    //};

	nextEventTableOutput = () => {
	    let allLeaderboards = [];
	    if(this.props.allMyHomeData === null || this.props.allMyHomeData === undefined || this.props.allMyHomeData.length === 0) {
            return (<span className={classes.noResults}>No leaderboards yet...</span>);
        }
	    else {

            this.props.allMyHomeData.map((item) => {
                if (item.leaderboards.length > 0) {
                    const nextTournamentName = item.nextEvent != null ? item.nextEvent.tournamentName : null;
                    const tournamentTypeId = item.nextEvent != null ? item.nextEvent.tournamentTypeId : null;
                    const sortedBoard = item.leaderboards !== undefined ? item.leaderboards.sort((a, b) => {
                        return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
                    }) : null;
                    allLeaderboards.push(
                        <div>
                            <div className={classes.leaderTop}>
                                <p>{nextTournamentName}</p>
                                <div className={classes.leaderTableHead}>
                                    <b>User Name</b>
                                    <b>Number of Events</b>
                                    <b>Total Scores</b>
                                    {tournamentTypeId == 1 &&
                                        [<b>Goals Scored</b>,
                                        <b>Goals Against</b>,
                                        <b>Goals Difference</b>,
                                        <b>Success %</b>]
                                    }
                                </div>
                                <ul>{sortedBoard.map((user, index) => {
                                    //console.log(index);
                                    const profileImage = user.user.avatar === undefined || user.user.avatar === null ?
                                        <i className="fas fa-user-circle"></i> :
                                        <img alt={`${user.user.username}`} src={`data:image/jpeg;base64,` + `${user.user.avatar}`} />
                                    return <li key={index}>
                                        <div>
                                            <p><span>
			                        {<span className={classes.profileAvatar}>
				                        {profileImage}
			                        </span>}
		                        </span><span>{user.user.username}</span></p>
                                            <p><span>{user.numberOfEvents}</span></p>
                                            <p><span>{user.totalScores}</span></p>
                                            {tournamentTypeId == 1 &&
                                                [
                                                <p><span>{user.goalsScored}</span></p>,
                                                <p><span>{user.goalsAgainst}</span></p>,
                                                <p><span>{user.goalsDifference}</span></p>,
                                                <p><span>{(user.successPercentage * 100).toFixed(0)+'%'}</span></p>
                                                ]}
                                        </div>
                                    </li>
                                })}
                                </ul>
                            </div>
                            <div className={classes.eventsTBLS}>
                                <div className={classes.eventsTable}>
                                    <div>Next event:
                                        <div>
                                            {item.nextEvent === null ?
                                                <span className={classes.noResults}>No Future events</span>
                                                : item.nextEvent.eventName !== null ?
                                                    <div className={classes.eventData}>
                                                        <p className={classes.eventName}>
                                                            <span>Event Name:</span>{item.nextEvent.eventName}
                                                        </p>
                                                        <p className={classes.eventName}>
                                                            <span>Tournament Name:</span>{item.nextEvent.tournamentName}
                                                        </p>
                                                        <p className={classes.eventDate}>
                                                            <span>Event Date:</span>{moment(item.nextEvent.eventDate).format('DD-MM-YYYY HH:MM')}
                                                        </p>
                                                    </div> :
                                                    <span className={classes.noResults}>No Future events</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            });
        }
        return allLeaderboards;
    };

    leaderboardTable = () => {
        return (
            <div className={classes.leaderBoardTables}>

                {this.nextEventTableOutput()}
            </div>
        )
    }

	timeout = () => {
		// const {past, next} =  this.props.allMyHomeData
		// console.log(past.pastEvent, next.nextEvent)
		// setTimeout((
		//
		// ), 5000)
	}

    render() {
        return (
            <div className={classes.EventsPage}>
                <div>
                    <h1>My Leaderboards</h1>
                    {this.leaderboardTable()}
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
	    // getCurrentUser: payload => dispatch(getCurrentUser(payload)),
	    takeMyHomeLeaderboardRequest: payload => dispatch(takeMyHomeLeaderboardRequest(payload)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeEvents));