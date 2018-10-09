import React, { Component } from 'react';
import { connect } from 'react-redux';
import { takeAllUsers, DeleteUserRequest } from '../../../actions/Api';
import { Link } from 'react-router-dom'
import classes from './AllUsersAdmin.scss';
import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import PropTypes from 'prop-types';
import Register from '../../Register';
import { deleteConfirmMessageAction } from '../../../actions';
import UserSummary from '../UserSummary';
import ConfirmMessage from '../../UI/ConfirmMessage';

import { addNewItemAction, editThisItemAction, successMessageAction, errorMessageAction }  from '../../../actions';
export class AllUsersAdmin extends Component {

    static propTypes = {
        getAllUsers: PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = {
            userInEditMode: null,
            userForDelete: null,
            display: false
        }
        this.editUserBtn = this.editUserBtn.bind(this)
        this.DeleteUserBtn = this.DeleteUserBtn.bind(this)
    }

    componentWillMount(){
        if(this.props.allList.length === 0) {
            this.props.takeAllUsers()
        } else {
            return null
        }
    }
    componentDidMount(){
        this.props.successMessageAction(null)
        this.props.takeAllUsers()
    }
    componentWillUnmount(){
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({userForDelete: null})
        this.setState({userInEditMode: null})
    }

    DeleteUserBtn = (item) => {
        this.setState({userForDelete: item})
        this.setState({userInEditMode: null})
        this.props.deleteConfirmMessageAction(true)

    }

    editUserBtn = (item) => {
        this.setState({userInEditMode: item})
        setTimeout(() => {
            this.props.editThisItemAction(true)
        }, 200)

    }

    addUserBtn = () => {
        setTimeout(() => {
            this.props.addNewItemAction(true)
        }, 200)
    }

    
    addUserComp = () => {
        return <Register headline='Add User' classStr='none' />
    }

    editUserComp = () => {
        return <UserSummary headline='Edit' tournament={null} event={null} user={this.state.userInEditMode}/>
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

    closeMessage = () => {
        this.props.successMessageAction(null)
    }


    ulserList = () => {
        return this.props.allList.map((item, index) => {
            return <li key={index}>
                <div className={classes.username}>{item.name}</div>
                <div className={classes.email}>{item.email}</div>
                <div className={classes.email}>{item.username}</div>
                <div className={classes.role}>{item.role}</div>
                <div id={index} className={classes.allUsButtons}>
                    <Link to={`/edit_user/${item.username}`}><EditBtn inputType="submit" content='Edit' onClick={() => this.editUserBtn(item)}/></Link>
                    <DeleteBtn onClick={() => this.DeleteUserBtn(item)} inputType={'button'} content='Delete'/>
                 </div>
            </li>
        })
    }
    
    render (){
        return (
            <div className={classes.usersWrapper}>
                {this.successDeleteMessage()}
                <div className={classes.usersHead}>
                    <div className={classes.username}>Name</div>
                    <div className={classes.email}>Email</div>
                    <div className={classes.email}>User Name</div>
                    <div className={classes.role}></div>
                    <div className={classes.addBtn}><BtnComp inputType="submit" content='Add User' onClick={this.addUserBtn}/></div>
                </div> 
                <ul className={classes.uesrsList}>{this.ulserList()}</ul>
                {this.props.addItem ? <div className={classes.AddUser}>{this.addUserComp()}</div> : null}
                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editUserComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline='delete user' user={this.state.userForDelete}/> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allList: state.allListReducer.allList,
        addItem: state.addNewItemReducer.addItem,
        editThisItem: state.editItemReducer.editThisItem,
        successMessage: state.sharedReducer.successMessage,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage
    }
}

const mapDispatchToProps = dispatch => {

    return{
        takeAllUsers: payload => dispatch(takeAllUsers(payload)),
        addNewItemAction: payload => dispatch(addNewItemAction(payload)),
        DeleteUserRequest: (item) => dispatch(DeleteUserRequest(item)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        editThisItemAction: payload => dispatch(editThisItemAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsersAdmin);
