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
//import { it } from "date-fns/esm/locale";
// import Promise from "bluebird";


export class EventsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tournEventsByIdNoS: [],
			eventInEditMode: null,
			eventForDelete: null,
			eventsListState: [],
            sortItem: 'eventName',
            toggleSort: true
		}
	}
	componentWillMount(){
		const { currentTournamentId } = this.props
		
		if( currentTournamentId !== undefined ){
			this.props.tournEventsByIdRequest(currentTournamentId)
		}
	}
	
	componentWillReceiveProps(nextProps) {
		const { tournEventsByIdNoS } = nextProps;
		if (this.props.tournEventsByIdNoS !== tournEventsByIdNoS) {
			
			this.setState({tournEventsByIdNoS: tournEventsByIdNoS});

            const events = this.state.tournEventsByIdNoS
            const sortedItem = this.state.sortItem
            events.sort((a, b) => {
                return a[sortedItem] === b[sortedItem] ? 0 : a[sortedItem].toLowerCase() < b[sortedItem].toLowerCase() ? -1 : 1;
            });
		}
		
	}
	componentDidMount = () => {
		// this.setStateAsync = Promise.promisify(this.setState);
		//
		// setTimeout(()=>{
		// 	this.setStateAsync({
		// 		tournEventsByIdNoS: this.props.tournEventsByIdNoS
		// 	})
		//
		// }, 3000)
		
	}
	componentWillUnmount(){
		this.setState({tournEventsByIdNoS: []})
		
	}


	DeleteEventBtn = (item, currentTournamentId) => {
		// const TId = parseInt(currentTournamentId)
	    this.setState({eventForDelete: item})
	    this.setState({eventInEditMode: null})
		this.props.deleteEventAction(item)
	    this.props.deleteConfirmMessageAction(true)

	}
	
    editEventBtn = (item, match) => {
        if (typeof this.props.editEventFunc === 'function') {
            this.props.editEventFunc(item);
        }
        setTimeout(() => {
            this.props.editThisEventAction(true)
        }, 200)
	}
    sortTTTT = (events, sortBy, upDown) => {
        const { toggleSort } = this.state
        const x = toggleSort ? 1 : -1
        const y = toggleSort ? -1 : 1

        events.sort((a, b) => {
            if(a[sortBy] !== b[sortBy]){
                if(a === isNaN && b === isNaN){
                    if(a[sortBy].toLowerCase() < b[sortBy].toLowerCase()){
                        return x
                    }else{
                        return y
                    }
                }else{
                    if(a[sortBy] < b[sortBy]){
                        return x
                    }else{
                        return y
                    }
                }
            }
        });

    }
    Sort = (item) => {
        const events = this.state.tournEventsByIdNoS

        const { sortItem, toggleSort } = this.state
        const sortBy = item.target.id;
        this.setState({sortItem: sortBy})

        const attrId = document.getElementById(sortItem)
        const upDown = toggleSort ? 'down' : 'up'
        document.getElementById(sortBy).setAttribute('i-attribute', upDown === 'down' || upDown === 'none' ? 'down' : 'up');
        if(sortItem === sortBy){
            this.setState({toggleSort: !toggleSort});
            attrId.setAttribute('i-attribute', upDown === 'down' || upDown === 'none' ? 'down' : 'up');
            this.sortTTTT(events, sortBy, upDown)
        }
        else{
            this.setState({toggleSort: false});
            attrId.setAttribute('i-attribute', 'none');
            this.sortTTTT(events, sortBy, upDown)
        }



        this.setState({sortevents: events});
    }
	eventsTable = () => {
		const { currentTournamentId, tournEventsByIdNoS } = this.props
		const nomEvents = tournEventsByIdNoS.length
		// const item = (this.state.tournEventsByIdNoS !== undefined || this.state.tournEventsByIdNoS.length !== 0)  ? this.state.tournEventsByIdNoS.map((item) => { return item }) : null
		const item = (this.state.tournEventsByIdNoS !== undefined || this.state.tournEventsByIdNoS.length !== 0)  ? this.state.tournEventsByIdNoS : null
		const x = item.some((o) => {return o["eventName"] === "No Data"})
		return (
				<div className={classes.wrapList}>
					{/* <h3>All events of tournament
						{x ? <span className={classes.eventsCount}>0</span> : <span className={classes.eventsCount}>{nomEvents}</span>}
					</h3> */}
					<div className={classes.topLine}>
					<div className={classes.userHead}>
						<h4 className={classes.eventName} i-attribute="down" id={'eventName'} onClick={(item) => this.Sort(item)}  >Events</h4>
						<h4 className={classes.eventName} i-attribute="none" id={'eventDate'} onClick={(item) => this.Sort(item)}>Date</h4>
						<h4 className={classes.eventName} i-attribute="down" id={'eventUsers'} onClick={(item) => this.Sort(item)} >Winner</h4>
						{/* {this.props.isCurrentUserAdminRole && <h4 className={classes.turnPageEventsBTN}><span>buttons</span></h4>} */}
						{x ? <span className={classes.eventsCount}>0</span> : <span className={classes.eventsCount}>{nomEvents}</span>}
					</div>
					{this.state.tournEventsByIdNoS.length !== 0
						?
						<ul>
							{(this.state.tournEventsByIdNoS !== undefined || this.state.tournEventsByIdNoS.length !== 0)  ? this.state.tournEventsByIdNoS.map((item, index) => {
							const sortedBoard = item.eventUsers !== undefined  ? item.eventUsers.sort((a, b) => {
                            const fillA = item.eventResults.find(result => {
                                return result.userId === a.userId
                            })
							const fillB = item.eventResults.find(result => {
                                    return result.userId === b.userId
                            })
                            return fillA.result === fillB.result ? 0 : fillA.result < fillB.result ? 1 : -1;
                        }) : undefined
                            const winner = sortedBoard !== undefined ? sortedBoard[sortedBoard.length -1] : undefined;
							let profileImage = undefined;
							if (winner !== undefined) {
                                profileImage = winner.avatar === undefined || winner.avatar === null ?
                                    <i className="fas fa-user-circle"></i> :
                                    <img alt='' src={`data:image/jpeg;base64,` + `${winner.avatar}`}/>;
                                }
                                const winnerName = winner != undefined ? winner.username : "";
								 return item.eventName !== 'No Data'
								? <li key={index}>
										 <div className={classes.eventName}>{item.eventName}</div>
										<div
											className={classes.eventDate}>{moment(item.eventDate).format('DD-Mo-YYYY, HH:mm A')}</div>
										<div className={classes.usersInGame}>
											{/*<span className={classes.showUsers}>Hover to show</span>*/}
											<ul className={classes.hiddenUsers}>
                                                <li>
                                                    <div className={classes.avatarWrap}>
                                                        <span className={classes.userAvatar}>{profileImage}</span>
                                                        <p className={classes.avatarName}
                                                             show={true}>{winnerName}</p>
                                                    </div>
                                                </li>
											</ul>
										</div>
                                         {this.props.isCurrentUserAdminRole &&
										<div className={classes.turnPageEventsBTN}>
											<a className={classes.editBTN}><EditBtn inputType="submit" content='Edit'
											                                        onClick={() => this.editEventBtn(item, this.props.match)}/></a>
											<div className={classes.deleteBTN}><DeleteBtn
												onClick={() => this.DeleteEventBtn(item.eventId, currentTournamentId)}
												inputType={'button'}
												content={`Delete`}/></div>
										</div>
                                          }
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
				</div>
				
				
		)
	};
	render(){
		
		 console.log('events list', this.props)
		// console.log('events list state', this.state)
		return	this.eventsTable()
	}
}

const mapStateToProps = (state) => {
	return {
		tournEventsByIdNoS: state.allListReducer.tournEventsByIdNoS,
        currentUser: state.userReducer.currentUser,
	}
};

const mapDispatchToProps = dispatch => {
	
	return{
		tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),
		deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload)),
		sendEventDataAction: (payload) => dispatch(sendEventDataAction(payload)),
		sendEvetnMatchAction: (payload) => dispatch(sendEvetnMatchAction(payload)),
		editThisEventAction: payload => dispatch(editThisEventAction(payload)),
		deleteEventAction: payload => dispatch(deleteEventAction(payload))
        
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
