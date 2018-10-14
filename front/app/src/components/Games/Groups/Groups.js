import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import classes from './Groups.scss';
import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import SelectComp from '../../UI/SelectComp/SelectComp'
import Register from '../../Register';
import UserSummary from '../../Users/UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';
import { getAllGroupsRequest } from '../../../actions/GamesApi';
import { addNewItemAction, editThisItemAction, successMessageAction, errorMessageAction, deleteConfirmMessageAction }  from '../../../actions';
import moment from 'moment';

export class Groups extends Component {

    static propTypes = {
        getAllGroupsRequest: PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = {
            groupForDelete: null,
            groupInEditMode: null,
        }
        // this.editTournamentBtn = this.editTournamentBtn.bind(this)
        // this.DeleteTournamentBtn = this.DeleteTournamentBtn.bind(this)
    }

    componentWillMount(){
        if(this.props.groupsList === null) {
            this.props.getAllGroupsRequest()
        } else {
            return null
        }
    }

    componentWillUnmount(){
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
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

    DeleteGoupBtn = (item) => {
        this.setState({groupForDelete: item})
        this.setState({groupInEditMode: null})
        this.props.deleteConfirmMessageAction(true)
    }

    // editTournamentBtn = (item) => {
    //     this.setState({tournamentInEditMode: item})
    //     setTimeout(() => {
    //         console.log(item)
    //         this.props.editThisItemAction(true)
    //     }, 200)

    // }
    // editDetailInput = (index, e) => {
    //     const details = Object.assign([], this.state.userDetailsArr)
    //         details[index] = e.target.value
    //     this.setState({
    //         userDetailsArr: details
    //     })
    // }
    
    // editTournamentComp = () => {
    //     return <UserSummary headline='Edit Tournament' event={null} tournament={this.state.tournamentInEditMode} user={null}/>
    // }

    addNewGroupBtn = () => {
        setTimeout(() => {
            this.props.addNewItemAction(true)
        }, 200)
    }

    addGroupComp = () => {
        return <Register headline='Add New Group' classStr='none' />
    }

    tableHeader = () => (
        <div className={classes.Head}>
            <div className={classes.headline}>Group Name</div>
            <div className={classes.headline}>Created Date</div>
            <div className={classes.users}>Group Users</div>
            <div className={classes.addBtn}><BtnComp inputType="submit" content='Add New Group' onClick={this.addNewGroupBtn}/></div>
        </div>
    )

    groupsList = () => {
        return this.props.groupsList !== null ? this.props.groupsList.map((group, index) => { 
            const usersInGroup = []
            group.usersGroups.forEach((user) => usersInGroup.push({value: user.user.name}))
            return <li key={group.groupId}>
                <div className={classes.groupName}>{group.groupName}</div>
                <div className={classes.createdDate}>{moment(group.createdDate).format('LLLL')}</div>
                <div>
                    <div className={classes.select}>
                        <SelectComp 
                            options={usersInGroup}
                            placeholder={"see all users"}
                            name={'event'}
                            onChange={(e) => this.editDetailInput(index, e)}   
                        />
                    </div>
                </div>

                <div id={index} className={classes.allUsButtons}>
                    <Link to={`/edit_tournament/${group.tournamentName}`}><EditBtn inputType="submit" content='Edit' onClick={() => this.editTournamentBtn(group)}/></Link>
                    <DeleteBtn onClick={() => this.DeleteGoupBtn(group)} inputType={'button'} content='Delete'/>
                 </div>
            </li>
        })
        : null
    }

    render() {
        return (
            <div className={classes.groupsTable}>
                {this.successDeleteMessage()}
                {this.errorDeleteMessage()}
                {this.tableHeader()}
                <ul className={classes.groupsList}>{this.groupsList()}</ul>
                {this.props.addItem ? <div className={classes.AddUser}>{this.addGroupComp()}</div> : null}

                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editTournamentComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline='delete group' item={this.state.groupForDelete}/> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groupsList: state.allListReducer.groupsList,
        successMessage: state.sharedReducer.successMessage,
        errorMessage: state.sharedReducer.errorMessage,
        addItem: state.addNewItemReducer.addItem,
        editThisItem: state.editItemReducer.editThisItem,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage
    }
}

const mapDispatchToProps = dispatch => {

    return{
        getAllGroupsRequest: (payload) => dispatch(getAllGroupsRequest(payload)),
        addNewItemAction: payload => dispatch(addNewItemAction(payload)),
        editThisItemAction: payload => dispatch(editThisItemAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);