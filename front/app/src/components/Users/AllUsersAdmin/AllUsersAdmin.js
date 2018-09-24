import React, { Component } from 'react';
import { connect } from 'react-redux';
import { takeAllUsers, deleteUser } from '../../../actions/Api';
import { Link } from 'react-router-dom'
import classes from './AllUsersAdmin.scss';
import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import PropTypes from 'prop-types';
// import Spinner from '../../Spiner/Spiner';
import Spinner from '../../UI/Spinner/Spinner'



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
        if (this.props.toggleSpinner) {
            return <Spinner />
        } else {
            return null
        }
    }
    deleteUserClick = (userName) => {
        const someName = userName.username
        console.log('userName',someName)
        this.props.deleteUser(someName)
        
    }
    ulserList = () => {
        return this.props.allUsersList.map((item, index) => {
            // console.log('11111111',item)
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
        console.log('allUsersList',this.props.allUsersList)
        return (
                
            <div className={classes.usersWrapper}>

            {this.spinner()}
                 <div className={classes.usersHead}>
                     <div className={classes.username}>Name</div>
                     <div className={classes.email}>Email</div>
                     <div className={classes.role}></div>
                     <div className={classes.email}>userName</div>
                     <Link to='/Register'><button>Add User</button></Link>
                 </div>
                 
                 <ul className={classes.uesrsList}>{this.ulserList()}
                </ul>
             </div>
        
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allUsersList: state.userReducer.allUsersList,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner,
    }
}

const mapDispatchToProps = dispatch => {
    return{
       takeAllUsers: payload => dispatch(takeAllUsers(payload)),
       deleteUser: (userName) => dispatch(deleteUser(userName)) 
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);