import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import users from '../../../configuration/config';
import classes from './AllUsersAdmin.scss';
import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
// import { getAllUsers } from '../../../actions/index';
// import PropTypes from 'prop-types';

export class AllUsersAdmin extends Component {
    // static propTypes = {
    //     getAllUsers: PropTypes.func
    // };
    ulserList = () => {
        return users.map((item, index) => {
            return <li key={index}>
                <div className={classes.username}>{item.name}</div>
                <div className={classes.email}>{item.email}</div>
                <div className={classes.role}>{item.role === 'admin' ? item.role = 'admin' : item.role = '' }</div>
                <EditBtn inputType={'button'} content='Edit'/>
                <DeleteBtn inputType={'button'} content='Delete'/>
            </li>
        })
    }
    clickAPI(){
        this.props.getAllUsers()
    }
    componentDidMount(){
        
    }
    render(){
        return (
            
            <div className={classes.usersWrapper}>
                <div className={classes.usersHead}>
                <button onClick={() => this.clickAPI()} >send</button>
                    <div className={classes.username}>Name</div>
                    <div className={classes.email}>Email</div>
                    <div className={classes.role}></div>
                    <Link to='/Register'><button>Add User</button></Link>
                </div>
                <ul className={classes.uesrsList}>{this.ulserList()}</ul>
            </div>
        )
    }
}


// const mapStateToProps = (state) => {
//     return {
//         newUsers: state.newUsers
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         getAllUsers: payload => dispatch(getAllUsers(payload))
//     }
// }

// export default connect(null, mapDispatchToProps)(AllUsersAdmin);
export default AllUsersAdmin