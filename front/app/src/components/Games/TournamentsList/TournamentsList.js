import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment'

import classes from '../../Users/AllUsersAdmin/AllUsersAdmin.scss';
import { ADD_EVENT, ADD_TOURNAMENT, DELETE_TOURNAMENT, USER_ROLE_ADMIN } from '../../../configuration/config'

import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import Tab from '../../UI/Tab/Tab';

import Register from '../../Register';
import ConfirmMessage from '../../UI/ConfirmMessage';

import { takeAllTournaments, DeleteTournamentRequest, goToTournPageRequest, tournEventsByIdRequest, takeMyTournamentsRequest, takeMyGroupsRequest, mainPageGetAllGroupsRequest, CreateTournamentPresetsResponse } from '../../../actions/GamesApi';
import { addNewEventAction, addNewTournamentAction, 
     editThisItemAction, successMessageAction, errorMessageAction, deleteConfirmMessageAction }  from '../../../actions';
import SmallSpinner from "../../UI/SmallSpinner/SmallSpinner";


export class TournamentsList extends Component {
    static propTypes = {
        allTournsList: PropTypes.array,
        allEventTypesList: PropTypes.array,
        tournsDataById: PropTypes.array,
        currentUser: PropTypes.object,
        errorMessage: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ]),
        successMessage: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ]),
        addItem: PropTypes.bool,
        addTournament: PropTypes.bool,
        addEvent: PropTypes.bool,
        deleteUserConfirmMessage: PropTypes.bool,
        errorDeleteMessage: PropTypes.func,
        successDeleteMessage: PropTypes.func,
        tournamentList: PropTypes.func,
        addTournamentComp: PropTypes.func,
        addEventComp: PropTypes.func,
        isCurrentUserAdminRole: PropTypes.bool,

    };

    constructor(props) {
        super(props)
        this.state = {
            tournamentInEditMode: null,
            tournamentForDelete: null,
            display: false,
            userDetailsArr: [],
            someId:'',
            tournamentID:'',
	        buttonStatus: true,
	        changeList: 'FIFA',
	        allTournaments: [],
	        myTournaments: [],
	        // sorttournaments: [],
            sortItem: 'tournamentName',
            toggleSort: true,
	        tournaments: '',
            isCurrentUserAdminRole: false,
        }
        this.DeleteTournamentBtn = this.DeleteTournamentBtn.bind(this)
    }



	componentWillReceiveProps(nextProps) {
        const allTournaments = this.props.allTournsList
        const myTournaments = this.props.tournsDataById

        const isCurrentUserAdminRole = this.props.currentUser.role === USER_ROLE_ADMIN;
        this.setState({isCurrentUserAdminRole: isCurrentUserAdminRole});

		const { allTournsList, tournsDataById } = nextProps;
		if( allTournaments !== allTournsList || myTournaments !== tournsDataById ){

			this.setState({allTournaments: nextProps.allTournsList, myTournaments: nextProps.tournsDataById});
			
			// const tournaments = this.props.match.url === '/all_tournaments' ? this.state.allTournaments : this.state.myTournaments
			const tournaments = this.props.match.url === '/all_tournaments' ? allTournsList : tournsDataById
			const sortedItem = this.state.sortItem
            tournaments.sort((a, b) => {
			    return a[sortedItem] === b[sortedItem] ? 0 : a[sortedItem].toLowerCase() < b[sortedItem].toLowerCase() ? -1 : 1;
			});
			this.props.match.url === '/all_tournaments'
			? this.setState({allTournaments: tournaments})
			: this.setState({myTournaments: tournaments})
        }

	}



    componentDidMount(){
	    
        this.props.successMessageAction(null)
        const userID = this.props.currentUser.userId
        this.props.takeMyTournamentsRequest(userID)
        if(this.props.allTournsList.length === 0 || this.props.allTournsList === undefined) {
            this.props.takeAllTournaments()
        } else {
            return null
        }
	    
    }
    componentWillUnmount(){
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({tournamentForDelete: null})
        this.setState({tournamentInEditMode: null})
    }

    DeleteTournamentBtn = (item) => {
    	console.log(item)
        this.setState({tournamentForDelete: item})
        this.setState({tournamentInEditMode: null})
        this.props.deleteConfirmMessageAction(true)
    }

    addEventBtn = (item) => {
        setTimeout(() => {
            this.setState({tournamentID: item})
            this.props.addNewEventAction(true) 
        }, 200)
    }

    editDetailInput = (index, e) => {
        const details = Object.assign([], this.state.userDetailsArr)
            details[index] = e.target.value
        this.setState({
            userDetailsArr: details
        })
    }

    addTournamentBtn = () => {
        const userID = this.props.currentUser.userId;
	    // this.props.mainPageGetAllGroupsRequest();
        setTimeout(() => {
            this.props.addNewTournamentAction(true);
            this.props.takeMyGroupsRequest(userID)
	        
        }, 200)
    }

    
    addTournamentComp = () => {
        return <Register headline={ADD_TOURNAMENT} classStr='none' />
    }

    addEventComp = () => {
        return <Register headline={ADD_EVENT} tourn={this.state.tournamentID} classStr='none' />
    }

    successDeleteMessage = () => {
        return this.props.successMessage !== null 
          ? <p className={classes.success}>
                <span>{this.props.successMessage}
                    <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
                </span>
            </p>
          : null 
    }

    errorDeleteMessage = () => {
        return this.props.errorMessage !== null 
          ? <p className={classes.errorPop}>
                <span>{this.props.errorMessage}
                    <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
                </span>
            </p>
          : null 
    }
    getTournById=(tournIdToPage)=>{
        this.setState({someId: tournIdToPage})
        this.props.tournEventsByIdRequest(tournIdToPage)
        // this.props.goToTournPageRequest(tournIdToPage)
    }
    closeMessage = () => {
        this.props.successMessageAction(null)
        this.props.errorMessageAction(null)
    }
    
    pathChanger = (item) => {
        const path = this.props.match.url;
        switch (path) {
            case "/my_tournaments":
                return this.tournamentList();
                break;
            // return  <Link to={path +`/${item.tournamentName}=${item.tournamentId}`} onClick={()=>this.getTournById(item.tournamentId)}>{item.tournamentName}</Link>
            case "/all_tournaments":
                return this.tournamentList();
                break;
            // return <Link to={path +`/${item.tournamentName}=${item.tournamentId}`} onClick={()=>this.getTournById(item.tournamentId)}>{item.tournamentName}</Link>
            default:
                return this.tournamentList();
                break;
        }
    }
    
    sortTTTT = (tournaments, sortBy, upDown) => {
	    const { toggleSort } = this.state
        const x = toggleSort ? 1 : -1
	    const y = toggleSort ? -1 : 1
	    
	    tournaments.sort((a, b) => {
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
		const tournaments = this.props.match.url === '/all_tournaments' ? this.state.allTournaments : this.state.myTournaments
  
		const { sortItem, toggleSort } = this.state
		const sortBy = item.target.id;
		this.setState({sortItem: sortBy})
  
		const attrId = document.getElementById(sortItem)
        const upDown = toggleSort ? 'down' : 'up'
		document.getElementById(sortBy).setAttribute('i-attribute', upDown === 'down' || upDown === 'none' ? 'down' : 'up');
        if(sortItem === sortBy){
            this.setState({toggleSort: !toggleSort});
	        attrId.setAttribute('i-attribute', upDown === 'down' || upDown === 'none' ? 'down' : 'up');
	        this.sortTTTT(tournaments, sortBy, upDown)
        }
		else{
	        this.setState({toggleSort: false});
	        attrId.setAttribute('i-attribute', 'none');
	        this.sortTTTT(tournaments, sortBy, upDown)
        }
		
		
		
		this.setState({sorttournaments: tournaments});
	}
    tournamentList = () => {

	    const tournaments = this.props.match.url === '/all_tournaments' ? this.state.allTournaments : this.state.myTournaments
	    const path = this.props.match.url
	    const now = new Date();
     
	    const sortedList = tournaments.filter((tourny) =>  tourny.eventTypeName === this.state.changeList)
        return sortedList !== undefined ? sortedList.map((item, index) => {
            const end = new Date(item.endDate)
            const eEndDate = Date.parse(end)
            const todayDate = Date.parse(now)

            return <li key={index} className={eEndDate <= todayDate ? classes.notActive : null}>
	            <Link to={path +`/${item.tournamentName}=${item.tournamentId}`} onClick={()=>this.getTournById(item.tournamentId)}>
                    <div className={classes.username}>
                        {/*{ this.pathChanger(item) }*/}
                        <span>{item.tournamentName}</span>
                    </div>
                    <div className={classes.email +' '+ classes.hide870}><span>{moment(item.startDate).format('Do MMM YYYY')}</span></div>
                    <div className={classes.email}><span>{moment(item.endDate).format('Do MMM YYYY')}</span></div>
                    <div className={classes.role +' '+ classes.hide}><span>{item.eventsCount}</span></div>
                    <div className={classes.role +' '+ classes.hide}><span>{item.numberOfEvents !== null ? item.numberOfEvents : 'Unlimited' }</span></div>
                    <div className={classes.role +' '+ classes.hide}><span>{item.eventTypeName}</span></div>

                </Link>
	            <div id={index} className={classes.allUsButtons}>
                {this.state.isCurrentUserAdminRole && <DeleteBtn onClick={() => this.DeleteTournamentBtn(item.tournamentId)} inputType={'button'} content='Delete'/>  }
		            {/*{*/}
		            {/*item.eventsCount !== null || item.eventsCount == 0*/}
		            {/*? <div onClick={() => this.presetEvents(item.tournamentId)}>preset</div>*/}
		            {/*: null*/}
		            {/*}*/}
	
	            </div>
            </li>
	         
            
        })
        : null
    };
	changeList = (item) => {
	    this.setState({changeList: item.target.value})
    }
    
	countOfOject = (obj, type) => {
        const z = obj !== undefined ? obj.filter((item) => {return item.eventTypeName === type}) : null
        const num = z.length
        return num
	}
    render (){


	    // console.log('tList', this.props)
	    // console.log('tList state', this.state)
	    // const { toggleSort, sortItem } = this.state

	    const tournaments = this.props.match.url === '/all_tournaments' ? this.props.allTournsList : this.props.tournsDataById
	    const fifaNum = this.countOfOject(tournaments, 'FIFA')
        const pokerNum = this.countOfOject(tournaments, 'Poker')
        const path = this.props.match.url;

        const addTournamentButton = (this.state.isCurrentUserAdminRole &&
                <BtnComp
                    inputType="submit"
                    content='Add Tournament'
                    onClick={this.addTournamentBtn}
                    disabled={this.props.allTournsList.length !== 0 || this.props.allEventTypesList.length !== 0 ? !this.state.buttonStatus : this.state.buttonStatus}
                    />
                );
        // console.log("allTournaments : " , this.state.allTournaments.length);
        // console.log("myTournaments : " , this.state.myTournaments.length);
        // console.log('tournyList', this.props)
	    // console.log('tournyList state', this.state)
        return (
            <div className={classes.usersWrapper}>
                <div>
                    <div className={classes.topLine}>
	                    <h1>Tournaments List</h1>
                        <div className={classes.sortTabs}>
                            <div className={this.state.changeList === 'FIFA' ? classes.active : null }>
                                <Tab
                                inputType={'button'}
                                content={'FIFA'}
                                onClick={(item) => this.changeList(item)}
                            /><span className={classes.tournsCount}>{fifaNum}</span></div>
                            <span className={classes.space}></span>
                            <div className={this.state.changeList === 'Poker' ? classes.active : null }>
                                <Tab
                                inputType={'button'}
                                content={'Poker'}
                                onClick={(item) => this.changeList(item)}
                            /><span className={classes.tournsCount}>{pokerNum}</span></div>
                        </div>
                        <div className={classes.addBtn}>
                            {addTournamentButton}
                        </div>
                    </div>
                    {this.successDeleteMessage()}
                    {this.errorDeleteMessage()}
                    <div className={classes.usersHead}>
                        {/*<div className={classes.username} id={'tournamentName'} onClick={(item) => this.Sort(item)}>Tournament Name <i id={'q'+this.parentNode} className={this.state.arrow}></i></div>*/}

                        <div className={classes.username} i-attribute="down" id={'tournamentName'} onClick={(item) => this.Sort(item)} > Tournament Name </div>
                        <div className={classes.email +' '+ classes.hide870} i-attribute="none" id={'startDate'} onClick={(item) => this.Sort(item)}>Start Date </div>
                        <div className={classes.email} i-attribute="none" id={'endDate'} onClick={(item) => this.Sort(item)}>End Date </div>
                        <div className={classes.role +' '+ classes.hide} i-attribute="none" id={'eventsCount'} onClick={(item) => this.Sort(item)}>Num of Events </div>
                        <div className={classes.role +' '+ classes.hide} i-attribute="none" id={'numberOfEvents'} onClick={(item) => this.Sort(item)}>Max Events</div>
                        <div className={classes.role +' '+ classes.hide} i-attribute="none" id={'eventTypeName'} onClick={(item) => this.Sort(item)}>Game Type </div>

	                    <div className={classes.allUsButtons}></div>
                    </div>
                </div>
                {

                    path === "/all_tournaments" && this.state.allTournaments.length !== 0
                    || path === "/my_tournaments" && this.state.myTournaments.length !== 0

                        ?
                        <ul className={classes.uesrsList}>{this.pathChanger()}</ul>
	                :   <ul className={classes.uesrsListSpinner}><SmallSpinner/></ul>
                }

                {this.props.addItem ? <div className={classes.AddUser}>{this.addTournamentComp()}</div> : null}
                {this.props.addEvent ? <div className={classes.AddUser}>{this.addEventComp()}</div> : null}
                {this.props.addTournament ? <div className={classes.AddUser}>{this.addTournamentComp()}</div> : null}
                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editTournamentComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline={DELETE_TOURNAMENT} item={this.state.tournamentForDelete}/> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allTournsList: state.allListReducer.allTournsList,
        allEventTypesList: state.allListReducer.allEventTypesList,
        tournsDataById: state.allListReducer.tournsDataById,
	    tournById: state.allListReducer.tournById,
        addItem: state.addNewItemReducer.addItem,
        addEvent: state.addNewItemReducer.addEvent,
        addTournament: state.addNewItemReducer.addTournament,
        editThisItem: state.editItemReducer.editThisItem,
        successMessage: state.sharedReducer.successMessage,
        errorMessage: state.sharedReducer.errorMessage,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage,
        currentUser: state.userReducer.currentUser,
	    tournEventsByIdNoS: state.allListReducer.tournEventsByIdNoS,

    }
}

const mapDispatchToProps = dispatch => {

    return{
        takeAllTournaments: payload => dispatch(takeAllTournaments(payload)),
        takeMyTournamentsRequest: payload => dispatch(takeMyTournamentsRequest(payload)),
        DeleteTournamentRequest: (item) => dispatch(DeleteTournamentRequest(item)),
        addNewEventAction: payload => dispatch(addNewEventAction(payload)),
        addNewTournamentAction: payload => dispatch(addNewTournamentAction(payload)),
        editThisItemAction: payload => dispatch(editThisItemAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload)),
        goToTournPageRequest: payload => dispatch(goToTournPageRequest(payload)),
        tournEventsByIdRequest: payload => dispatch(tournEventsByIdRequest(payload)),
        takeMyGroupsRequest: payload => dispatch(takeMyGroupsRequest(payload)),
	    mainPageGetAllGroupsRequest: payload => dispatch(mainPageGetAllGroupsRequest(payload)),
	    CreateTournamentPresetsResponse: payload => dispatch(CreateTournamentPresetsResponse(payload)),

        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsList);
