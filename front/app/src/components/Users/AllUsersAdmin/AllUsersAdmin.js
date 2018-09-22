import React, { Component} from 'react';
import { connect } from 'react-redux';
import classes from './AllUsersAdmin.scss';
import Register from '../../Register';
import BtnComp from '../../UI/BtnComp/BtnComp';
import { addNewUserAction } from '../../../actions';
import { usersListRequest } from '../../../actions/Api';
import Spinner from '../../UI/Spinner';

export class AllUsersAdmin extends Component {
    
    ulserList = () => {
        if(this.props.usersList === null) {
            return null
        } else {
            return this.props.usersList.map((item, index) => {
                return <li key={index}>
                    <div className={classes.username}>{item.name}</div>
                    <div className={classes.email}>{item.email}</div>
                    <div className={classes.role}>{item.role === 'admin' ? item.role = 'admin' : item.role = 'User' }</div>
                    <button>Edit</button>
                    <button>Delete</button>
                </li>
            })
        }
    }

    spinner = () => {
        if (this.props.toggleSpinner) {
            return <Spinner />
        } else {
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

    componentDidMount() {
        this.props.usersListRequest()
    }

    render(){
        console.log(this.props.usersList)
        return (
            <div className={classes.usersWrapper}>
                <div className={classes.usersHead}>
                    <div className={classes.username}>Name</div>
                    <div className={classes.email}>Email</div>
                    <div className={classes.role}>role</div>
                    <BtnComp inputType="submit" content='Add User' onClick={this.addUserBtn}/>
                </div>
                {this.spinner()}
                <ul className={classes.uesrsList}>{this.ulserList()}</ul>
                {this.props.addUser ? <div className={classes.AddUser}>{this.addUserComp()}</div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newUsers: state.userReducer.newUsers,
        addUser: state.addNewUserReducer.addUser,
        usersList: state.usersListReducer.usersList,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewUserAction: payload => dispatch(addNewUserAction(payload)),
        usersListRequest: payload => dispatch(usersListRequest(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsersAdmin);
