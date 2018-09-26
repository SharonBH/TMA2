import React, { Component } from 'react';
import { connect } from 'react-redux';
import { takeAllUsers } from '../../../actions/Api';
import { Link } from 'react-router-dom'
import classes from './AllUsersAdmin.scss';
import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import PropTypes from 'prop-types';
import Register from '../../Register';
import { DeleteUserRequest } from '../../../actions/Api';
import Spinner from '../../UI/Spinner';
import EditUser from '../EditUser/EditUser';
import { addNewUserAction, editThisUserAction}  from '../../../actions';
// import {  getUsersListAction } from '../../../actions';



export class AllUsersAdmin extends Component {
    static propTypes = {
        getAllUsers: PropTypes.func
    };
    constructor(props) {
        super(props)
        this.state = {
            userInEditMode: null,
            display: false
        }
        this.editUserBtn = this.editUserBtn.bind(this)
        this.DeleteUserBtn = this.DeleteUserBtn.bind(this)
    }
    
    // ulserList = () => {
    //     if(this.props.usersList === null) {
    //         return null
    //     } else {
    //         return this.props.usersList.map((item, index) => {
    //             return <li key={index}>
    //                 <div className={classes.username}>{item.name}</div>
    //                 <div className={classes.email}>{item.email}</div>
    //                 <div className={classes.role}>{item.role}</div>
    //                 <div id={index} className={classes.EditBtn}>
    //                     <BtnComp inputType="submit" content='Edit User' onClick={() => this.editUserBtn(item)}/>
    //                 </div>
    //                 <div id={index} className={classes.EditBtn}>
    //                     <BtnComp inputType="submit" content='Delete' onClick={() => this.DeleteUserBtn(item)}/>
    //                 </div>
    //             </li>
    //         })
    //     }
    // }

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
    closeMessage = () => {
        this.setState({ display: true });
    }
    addUserComp = () => {
        return <Register headline='Add User' classStr='none' />
    }

    editUserComp = () => {
        return <EditUser headline='Edit' user={this.state.userInEditMode}/>
    }
    successDeleteMessage = () => {
        return this.props.message !== '' 
        ? <p className={classes.success} style={{display: this.state.display ? 'none' : 'block' }}>
            <span>{this.props.message}
                <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
            </span>
        </p>
        : null 
    }

    componentDidMount(){
        this.props.takeAllUsers()
    }

    ulserList = () => {
        return this.props.allUsersList.map((item, index) => {
            return <li key={index}>
                <div className={classes.username}>{item.name}</div>
                <div className={classes.email}>{item.email}</div>
                <div className={classes.role}>{item.role === 'Admin' ? item.role = 'Admin' : item.role = '' }</div>
                <div className={classes.email}>{item.username}</div>
                <div id={index}>
                {/* <EditBtn inputType="submit" content='Edit' onClick={() => this.editUserBtn(item.username)}/> */}
                 <Link to={`/edit_user/${item.username}`}><EditBtn inputType={'button'} content='Edit'/></Link>
                 </div>
                 <DeleteBtn onClick={() => this.DeleteUserBtn(item)} inputType={'button'} content='Delete'/>
            </li>
        })
    }
    
    render (){
        return (
            <div className={classes.usersWrapper}>
                {this.successDeleteMessage()}
                {this.spinner()}
                <div className={classes.usersHead}>
                    <div className={classes.username}>Name</div>
                    <div className={classes.email}>Email</div>
                    <div className={classes.role}></div>
                    <div className={classes.email}>userName</div>
                    <BtnComp inputType="submit" content='Add User' onClick={this.addUserBtn}/>
                </div> 
                <ul className={classes.uesrsList}>{this.ulserList()}</ul>
                {this.props.addUser ? <div className={classes.AddUser}>{this.addUserComp()}</div> : null}


                {this.props.editThisUser ? <div className={classes.AddUser}>{this.editUserComp()}</div> : null}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        allUsersList: state.userReducer.allUsersList,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner,
        addUser: state.addNewUserReducer.addUser,
        editThisUser: state.editUserReducer.editThisUser,
        newUsers: state.userReducer.newUsers,
        message: state.userReducer.message,
// =======
        // usersList: state.usersListReducer.usersList,
        
// >>>>>>> ad4a9475ebd43fe2e51768b0f2756d585a03e341
    }
}

const mapDispatchToProps = dispatch => {

    return{
       takeAllUsers: payload => dispatch(takeAllUsers(payload)),
       addNewUserAction: payload => dispatch(addNewUserAction(payload)),
       DeleteUserRequest: payload => dispatch(DeleteUserRequest(payload)),
    //    deleteUser: (userName) => dispatch(deleteUser(userName)),
    //    getUsersListAction: payload => dispatch(getUsersListAction(payload)),


        // usersListRequest: payload => dispatch(usersListRequest(payload)),
        editThisUserAction: payload => dispatch(editThisUserAction(payload)),

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllUsersAdmin);
