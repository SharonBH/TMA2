import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import classes from '../../Users/AllUsersAdmin/AllUsersAdmin.scss';

import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import SelectComp from '../../UI/SelectComp/SelectComp'

import Register from '../../Register';
import UserSummary from '../../Users/UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';

import { takeAllTournaments, DeleteTournamentRequest } from '../../../actions/GamesApi';
import { addNewItemAction, editThisItemAction, successMessageAction, errorMessageAction, deleteConfirmMessageAction }  from '../../../actions';
export class TournamentsList extends Component {

    static propTypes = {
        getAllUsers: PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = {
            tournamentInEditMode: null,
            tournamentForDelete: null,
            display: false,
            userDetailsArr: []
        }
        this.editTournamentBtn = this.editTournamentBtn.bind(this)
        this.DeleteTournamentBtn = this.DeleteTournamentBtn.bind(this)
    }

    componentWillMount(){
        if(this.props.allTournsList.length === 0 || this.props.allTournsList === undefined) {
            this.props.takeAllTournaments()
        } else {
            return null
        }
    }
    componentDidMount(){
        this.props.successMessageAction(null)
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
        this.setState({tournamentForDelete: item})
        this.setState({tournamentInEditMode: null})
        this.props.deleteConfirmMessageAction(true)
    }

    editTournamentBtn = (item) => {
        this.setState({tournamentInEditMode: item})
        setTimeout(() => {
            console.log(item)
            this.props.editThisItemAction(true)
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
        setTimeout(() => {
            this.props.addNewItemAction(true)
        }, 200)
    }

    
    addTournamentComp = () => {
        return <Register headline='Add Tournament' classStr='none' />
    }

    editTournamentComp = () => {
        return <UserSummary headline='Edit Tournament' tournament={this.state.tournamentInEditMode} user={null}/>
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

    closeMessage = () => {
        this.props.successMessageAction(null)
        this.props.errorMessageAction(null)
    }

    tournamentList = () => {
        const allTous = this.props.allTournsList !== undefined ? this.props.allTournsList.map((item) => { return item}) : null
        const events = events === undefined ? ['no events'] : allTous.map((item) => { return item.eventName});
        return this.props.allTournsList !== undefined ? this.props.allTournsList.map((item, index) => {        
          
          return <li key={index}>
                <div className={classes.username}>{item.tournamentName}</div>
                <div className={classes.email}>{item.startDate}</div>
                <div className={classes.email}>{item.endDate}</div>
                <div className={classes.role}>{item.isDeleted}</div>
                <div className={classes.select}>
                    <SelectComp 
                        options={events}
                        placeholder={"Choose event"}
                        name={'event'}
                        onChange={(e) => this.editDetailInput(index, e)}   
                    />
                </div>
                <div id={index} className={classes.allUsButtons}>
                    <Link to={`/edit_tournament/${item.tournamentName}`}><EditBtn inputType="submit" content='Edit' onClick={() => this.editTournamentBtn(item)}/></Link>
                    <DeleteBtn onClick={() => this.DeleteTournamentBtn(item.tournamentId)} inputType={'button'} content='Delete'/>
                 </div>
            </li>
        })
        : null
    }
    
    render (){
        // console.log(this.props)
        return (
            <div className={classes.usersWrapper}>
                {this.successDeleteMessage()}
                {this.errorDeleteMessage()}
                <div className={classes.usersHead}>
                    <div className={classes.username}>Tournament Name</div>
                    <div className={classes.email}>Start Date</div>
                    <div className={classes.email}>End Date</div>
                    <div className={classes.role}></div>
                    <div className={classes.email}>Events</div>
                    <div className={classes.addBtn}><BtnComp inputType="submit" content='Add Tournament' onClick={this.addTournamentBtn}/></div>
                </div> 
                <ul className={classes.uesrsList}>{this.tournamentList()}</ul>
                {this.props.addItem ? <div className={classes.AddUser}>{this.addTournamentComp()}</div> : null}
                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editTournamentComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline='delete tournament' item={this.state.tournamentForDelete}/> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allTournsList: state.allListReducer.allTournsList,
        addItem: state.addNewItemReducer.addItem,
        editThisItem: state.editItemReducer.editThisItem,
        successMessage: state.sharedReducer.successMessage,
        errorMessage: state.sharedReducer.errorMessage,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage
    }
}

const mapDispatchToProps = dispatch => {

    return{
        takeAllTournaments: payload => dispatch(takeAllTournaments(payload)),
        DeleteTournamentRequest: (item) => dispatch(DeleteTournamentRequest(item)),
        addNewItemAction: payload => dispatch(addNewItemAction(payload)),
        editThisItemAction: payload => dispatch(editThisItemAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsList);
