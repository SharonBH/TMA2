import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import users from '../../../configuration/config';
import classes from './AllUsersAdmin.scss';

export class AllUsersAdmin extends Component {
    addUser = () => {

    }
    ulserList = () => {
        return users.map((item, index) => {
            return <li key={index}>
                <div className={classes.username}>{item.name}</div>
                <div className={classes.email}>{item.email}</div>
                <div className={classes.role}>{item.role === 'admin' ? item.role = 'admin' : item.role = '' }</div>
                <button>Edit</button>
                <button>Delete</button>
            </li>
        })
    }


    render(){
        return (
            
            <div className={classes.usersWrapper}>
                <div className={classes.usersHead}>
                    <div className={classes.username}>Name</div>
                    <div className={classes.email}>Email</div>
                    <div className={classes.role}></div>
                    <Link to='/createNewUser'><button>Add User</button></Link>
                </div>
                <ul className={classes.uesrsList}>{this.ulserList()}</ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        newUsers: state.newUsers
    }
}

const mapDispatchToProps = dispatch => {
    return{

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllUsersAdmin);
