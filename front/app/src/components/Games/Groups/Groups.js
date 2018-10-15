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
import ConfirmMessage from '../../UI/ConfirmMessage';
import { EDIT_GROUP, ADD_NEW_GROUP, DELETE_GROUP } from '../../../configuration/config'
import { getAllGroupsRequest } from '../../../actions/GamesApi';
import { addNewItemAction, editThisGroupAction, successMessageAction, errorMessageAction, deleteConfirmMessageAction }  from '../../../actions';
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

    editGroupBtn = (group) => {
        this.setState({groupInEditMode: group})
        setTimeout(() => {
            this.props.editThisGroupAction(true)
        }, 200)
    }
    
    editGroupComp = () => {
        return <Register headline={EDIT_GROUP} classStr='none' group={this.state.groupInEditMode}/>
    }

    addNewGroupBtn = () => {
        setTimeout(() => {
            this.props.addNewItemAction(true)
        }, 200)
    }

    addGroupComp = () => {
        return <Register headline={ADD_NEW_GROUP} classStr='none' />
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
            group.users.forEach((user) => usersInGroup.push({value: user.username}))
            return <li key={group.groupId}>
                <div className={classes.groupName}>{group.groupName}</div>
                <div className={classes.createdDate}>{moment(group.createdDate).format('LLLL')}</div>
                <div>
                    <div className={classes.select}>
                        <SelectComp 
                            options={usersInGroup}
                            placeholder={"see all users"}
                            name={'event'}
                            onChange={() => {}}
                        />
                    </div>
                </div>
                <div id={index} className={classes.allUsButtons}>
                    <Link to={`/groups/${group.groupName}`}><EditBtn inputType="submit" content='Edit' onClick={() => this.editGroupBtn(group)}/></Link>
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
                {this.props.editThisGroup ? <div className={classes.AddUser}>{this.editGroupComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline={DELETE_GROUP} item={this.state.groupForDelete}/> : null}
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
        editThisGroup: state.editItemReducer.editThisGroup,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage,
    }
}

const mapDispatchToProps = dispatch => {

    return{
        getAllGroupsRequest: (payload) => dispatch(getAllGroupsRequest(payload)),
        addNewItemAction: payload => dispatch(addNewItemAction(payload)),
        editThisGroupAction: payload => dispatch(editThisGroupAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);