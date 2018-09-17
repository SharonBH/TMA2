import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import users from '../../../helpers/config'

export class AllUsersAdmin extends Component {
    addUser = () => {

    }
    ulserList = () => {
        return users.map((item, index) => {
            return <li key={index}>
                <div className='username'>{item.name}</div>
                <div className='email'>{item.email}</div>
                <div className='role'>{item.role === 'admin' ? item.role = 'admin' : item.role = '' }</div>
                <button>Edit</button>
                <button>Delete</button>
            </li>
        })
    }


    render(){
        return (
            <div className='users-wrapper'>
                <div className='users-head'>
                    <div className='username'>Name</div>
                    <div className='email'>Email</div>
                    <div className='role'></div>
                    <Link to='/createNewUser'><button>Add User</button></Link>
                </div>
                <ul className='uesrsList'>{this.ulserList()}</ul>
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
