import React, { Component } from 'react';
import { connect } from 'react-redux';
import { takeAllUsers, deleteUser } from '../../../actions/Api';
import { Link } from 'react-router-dom'
import classes from './AllUsersAdmin.scss';
import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import PropTypes from 'prop-types';
import Spinner from '../../UI/Spinner/Spinner';
import { addNewUserAction } from '../../../actions';
import Register from '../../Register';



export class AllUsers extends Component {
    static propTypes = {
        getAllUsers: PropTypes.func
    };
    constructor(props){
        super(props)
        this.state = {}

        this.deleteUserClick = this.deleteUserClick.bind(this)
    }
    componentDidMount(){
        this.props.takeAllUsers()
    }
    spinner = () => {
        if(this.props.usersList === null) {
            if (this.props.toggleSpinner) {
                return <Spinner />
            } else {
                return null
            }
        } else{
            return null
        }
    }
    addUserBtn = () => {
        this.props.addNewUserAction(true)
        document.addEventListener("click", (evt) => {
            const register = document.querySelector('.RegisterComp__Register___2-9vC')
            const btn = document.querySelector('.BtnComp__smallBtn___3Bub3')
            let targetEl = evt.target
            do {
                if (targetEl === register || targetEl === btn) {
                    return
                }
                // Go up the DOM
                targetEl = targetEl.parentNode;
            }
            while (targetEl)
            this.props.addNewUserAction(false)
        });
    }

    addUserComp = () => {
        return <Register headline='Add User' classStr='none' />
    }
    deleteUserClick = (userName) => {
        const someName = userName.username
        this.props.deleteUser(someName)
        
    }
    ulserList = () => {
        return this.props.allUsersList.map((item, index) => {
            return <li key={index}>
                <div className={classes.username}>{item.name}</div>
                <div className={classes.email}>{item.email}</div>
                <div className={classes.role}>{item.role === 'Admin' ? item.role = 'Admin' : item.role = '' }</div>
                <div className={classes.email}>{item.username}</div>
                 <Link to={`/edit_user/${item.username}`}><EditBtn inputType={'button'} content='Edit'/></Link>
                 <DeleteBtn onClick={() => this.deleteUserClick(item)} inputType={'button'} content='Delete'/>
            </li>
        })
    }
    
    render (){
        return (
            <div className={classes.usersWrapper}>
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
             </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allUsersList: state.userReducer.allUsersList,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner,
        addUser: state.addNewUserReducer.addUser,
        newUsers: state.userReducer.newUsers,
    }
}

const mapDispatchToProps = dispatch => {
    return{
       takeAllUsers: payload => dispatch(takeAllUsers(payload)),
       addNewUserAction: payload => dispatch(addNewUserAction(payload)),
       deleteUser: (userName) => dispatch(deleteUser(userName)) 
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
