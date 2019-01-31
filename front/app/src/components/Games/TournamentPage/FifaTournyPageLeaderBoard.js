import classes from "./TournamentPage.scss";
import registerClasses from '../../Register/RegisterComp.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SmallSpinner from "../../UI/SmallSpinner/SmallSpinner";
import { FifaEventsList } from "./FifaEventsList";
import { tournEventsByIdRequest } from "../../../actions/GamesApi";

export class FifaTournyPageLeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaderBoardData: [],
            userId: undefined
        }
    }
    componentWillReceiveProps(nextProps) {
        const { leaderBoardData } = nextProps;
        if (this.props.leaderBoardData !== leaderBoardData) {

            this.setState({ leaderBoardData: leaderBoardData });
        }

    }
    componentWillUnmount() {
        this.setState({ leaderBoardData: [] })

    }
    
    userEventsComp = (userId) => {
        const eventUserStyle = { maxWidth: '65%' };
        return <div className={classes.AddUser}>
            <div className={registerClasses.RegisterWrapper}>
                <div className={registerClasses.Register} style={eventUserStyle}>
                    <h1>User Events</h1>
                    <form>
                        <FifaEventsList
                            match={this.props.match}
                            currentTournamentId={this.props.currentTournamentId}
                            currentTournamentName={this.props.currentTournamentName}
                            isCurrentUserAdminRole={false}
                            userId={userId}
                            tournEventsByIdRequest={tournEventsByIdRequest}
                            tournEventsByIdNoS={this.props.tournEventsByIdNoS}
                        />
                        <div className={registerClasses.closePopBtn} onClick={() => this.setState({ userId: undefined })}><span>Close</span></div>
                    </form>
                </div>
            </div>
        </div>
    }
    leaderBoardTable = () => {
        const leaderUsers = this.state.leaderBoardData


        const sortedBoard = leaderUsers.length !== 0 || leaderUsers !== null ? leaderUsers.sort((a, b) => {
            return a.totalScores === b.totalScores ? 0 : a.totalScores < b.totalScores ? 1 : -1;
        }) : null

        return (
            <div>
                {this.state.userId != undefined ? <div className={classes.tournPageWrapper}>{this.userEventsComp(this.state.userId)}</div> : null}
                <h3>Leaderboard</h3>
                <div className={classes.wrapList}>
                    <div className={classes.usersHead}>
                        <h4 className={classes.leaderBoardTD}>User</h4>
                        <h4 className={classes.leaderBoardTD}>Points</h4>
                        <h4 className={classes.leaderBoardTD}>Events</h4>
                        <h4 className={classes.leaderBoardTD}>Goals Scored</h4>
                        <h4 className={classes.leaderBoardTD}>Goals Against</h4>
                        <h4 className={classes.leaderBoardTD}>Goals Difference</h4>
                        <h4 className={classes.leaderBoardTD}>Success %</h4>
                    </div>
                    {
                        sortedBoard.length !== 0
                            ? <ol>
                                {sortedBoard !== null ? sortedBoard.map((item, index) => {
                                    const profileImage = item.user.avatar === undefined || item.user.avatar === null ? <i className="fas fa-user-circle"></i> : <img alt='' src={`data:image/jpeg;base64,` + `${item.user.avatar}`} />
                                    const fifaStyle = { width: '14.28%' };
                                    return sortedBoard !== undefined && sortedBoard[0].user !== 'No Data'
                                        ? <li key={index}>
                                            <div style={fifaStyle} className={classes.leaderBoardTD}>
                                                <span className={classes.nameLine}>
                                                    <span className={classes.profileImage}>{profileImage}
                                                    </span>
                                                    <span onClick={() => { this.setState({ userId: item.user.userId }) }}>{item.user.username}                                                         
                                                    </span>
                                                </span>
                                            </div>
                                            <div style={fifaStyle} className={classes.leaderBoardTD}>{item.totalScores}</div>
                                            <div style={fifaStyle} className={classes.leaderBoardTD}>{item.numberOfEvents}</div>
                                            <div style={fifaStyle} className={classes.leaderBoardTD}>{item.goalsScored}</div>
                                            <div style={fifaStyle} className={classes.leaderBoardTD}>{item.goalsAgainst}</div>
                                            <div style={fifaStyle} className={classes.leaderBoardTD}>{item.goalsDifference}</div>
                                            <div style={fifaStyle} className={classes.leaderBoardTD}>{(item.successPercentage * 100).toFixed(2) + '%'}</div>
                                        </li>
                                        : <div key={index}>No Results</div>
                                }) : null

                                }
                            </ol>
                            : <ul className={classes.noresults}>
                                <SmallSpinner />
                            </ul>
                    }
                </div>
            </div>
        )
    }
    render() {
        return this.leaderBoardTable()
    }
}

const mapStateToProps = (state) => {
    return {
        leaderBoardData: state.allListReducer.leaderBoardData,
    }
};

const mapDispatchToProps = dispatch => {

    return {
         tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FifaTournyPageLeaderBoard);
