import React, { Component} from 'react';
import { connect } from 'react-redux';
import classes from './AllUsersAdmin.scss';
import Register from '../../Register';
import BtnComp from '../../UI/BtnComp/BtnComp';
import { usersListRequest, DeleteUserRequest } from '../../../actions/Api';
import Spinner from '../../UI/Spinner';
import UserSummary from '../../UserSummary';
import { addNewUserAction, editThisUserAction, getUsersListAction } from '../../../actions';

export class AllUsersAdmin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userInEditMode: null
        }
        this.editUserBtn = this.editUserBtn.bind(this)
        this.DeleteUserBtn = this.DeleteUserBtn.bind(this)
    }
    
    ulserList = () => {
        if(this.props.usersList === null) {
            return null
        } else {
            return this.props.usersList.map((item, index) => {
                return <li key={index}>
                    <div className={classes.username}>{item.name}</div>
                    <div className={classes.email}>{item.email}</div>
                    <div className={classes.role}>{item.role}</div>
                    <div id={index} className={classes.EditBtn}>
                        <BtnComp inputType="submit" content='Edit User' onClick={() => this.editUserBtn(item)}/>
                    </div>
                    <div id={index} className={classes.EditBtn}>
                        <BtnComp inputType="submit" content='Delete' onClick={() => this.DeleteUserBtn(item)}/>
                    </div>
                </li>
            })
        }
    }

    DeleteUserBtn = (item) => {
        this.setState({userInEditMode: null})
        this.props.DeleteUserRequest(item.username)
    }

    editUserBtn = (item) => {
        this.setState({userInEditMode: item})
        setTimeout(() => {
            this.closeWindowFunc()
            this.props.editThisUserAction(true)
        }, 200)
    }

    addUserBtn = () => {
        setTimeout(() => {
            this.closeWindowFunc()
            this.props.addNewUserAction(true)
        }, 200)
    }

    closeWindowFunc = () => {
            document.addEventListener("click", (evt) => {
            const edit = document.querySelector('.UserSummary__Profile___3JQE2')
            const addUser = document.querySelector('.RegisterComp__Register___2-9vC')
            const btn = document.querySelectorAll('.BtnComp__smallBtn___3Bub3')
            let targetEl = evt.target
            do {
                if (targetEl === addUser || targetEl === edit || targetEl === btn) {
                    return
                }
                // Go up the DOM
                targetEl = targetEl.parentNode;
            }
            while (targetEl)
            this.props.editThisUserAction(false)
            this.props.addNewUserAction(false)
        });
    }

    spinner = () => {
        if(this.props.usersList === null || this.state.userInEditMode === null) {
            if (this.props.toggleSpinner) {
                return <Spinner />
            } else {
                return null
            }
        } else{
            return null
        }
    }

    addUserComp = () => {
        return <Register headline='Add User' classStr='none' />
    }

    editUserComp = () => {
        return <UserSummary headline='Edit' user={this.state.userInEditMode}/>
    }

    componentDidMount() {
        this.props.usersListRequest()
    }

    render(){
        return (
            <div className={classes.usersWrapper}>
                <div className={classes.usersHead}>
                    <div className={classes.username}>Name</div>
                    <div className={classes.email}>Email</div>
                    <div className={classes.role}>User Type</div>
                    <BtnComp inputType="submit" content='Add User' onClick={this.addUserBtn}/>
                </div>
                {this.spinner()}
                <ul className={classes.uesrsList}>{this.ulserList()}</ul>
                {this.props.addUser ? <div className={classes.AddUser}>{this.addUserComp()}</div> : null}
                {this.props.editThisUser ? <div className={classes.AddUser}>{this.editUserComp()}</div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newUsers: state.userReducer.newUsers,
        addUser: state.addNewUserReducer.addUser,
        usersList: state.usersListReducer.usersList,
        editThisUser: state.editUserReducer.editThisUser,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewUserAction: payload => dispatch(addNewUserAction(payload)),
        usersListRequest: payload => dispatch(usersListRequest(payload)),
        editThisUserAction: payload => dispatch(editThisUserAction(payload)),
        getUsersListAction: payload => dispatch(getUsersListAction(payload)),
        DeleteUserRequest: payload => dispatch(DeleteUserRequest(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsersAdmin);
