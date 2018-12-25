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
import { ADD_USER, EDIT, DELETE_USER } from '../../../configuration/config'
import { getAllGroupsRequest } from "../../../actions/GamesApi";
import { addNewItemAction, editThisItemAction, successMessageAction, errorMessageAction }  from '../../../actions';
import SmallSpinner from "../../UI/SmallSpinner";
import moment from 'moment';
export class AllUsersAdmin extends Component {

    static propTypes = {
        getAllUsers: PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = {
            userInEditMode: null,
            userForDelete: null,
            display: false,
	        sortList: [],
	        sortItem: 'name',
	        toggleSort: true,
         
         
        }
        this.editUserBtn = this.editUserBtn.bind(this)
        // this.addUserBtn = this.addUserBtn.bind(this)
        this.DeleteUserBtn = this.DeleteUserBtn.bind(this)
    }

    componentWillMount(){
        if(this.props.allList.length === 0) {
            this.props.takeAllUsers()
        }

    }
    componentDidMount(){
        this.props.successMessageAction(null)
        this.props.getAllGroupsRequest()
	    
    }
    
	componentWillReceiveProps(nextProps) {
		const { allList } = nextProps;
		
		if (this.props.allList !== allList) {
			const { sortedItem } = this.state
			this.props.allList.sort((a, b) => {
				return a[sortedItem] === b[sortedItem] ? 0 : a[sortedItem].toLowerCase() < b[sortedItem].toLowerCase() ? -1 : 1;
			});
			this.setState({sortList: this.props.allList});
		}
		
	}
    
    
    componentWillUnmount(){
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({userForDelete: null})
        this.setState({userInEditMode: null})
    }
    
	sortTTTT = (sortList, sortBy, upDown) => {
		const { toggleSort } = this.state
  
		const x = toggleSort ? 1 : -1
		const y = toggleSort ? -1 : 1
		sortList.sort((a, b) => {
			if(a[sortBy] !== b[sortBy]){
                if(a[sortBy].toLowerCase() < b[sortBy].toLowerCase()){
                    return x
                }else{
                    return y
                }
			}
		});
		
	}
	Sort = (item) => {
		const { sortItem, toggleSort, sortList } = this.state
		const sortBy = item.target.id;
		this.setState({sortItem: sortBy})
		const attrId = document.getElementById(sortItem)
		const upDown = toggleSort ? 'down' : 'up'
		document.getElementById(sortBy).setAttribute('i-attribute', upDown === 'down' || upDown === 'none' ? 'down' : 'up');
		if(sortItem === sortBy){
			this.setState({toggleSort: !toggleSort});
			attrId.setAttribute('i-attribute', upDown === 'down' || upDown === 'none' ? 'down' : 'up');
			this.sortTTTT(sortList, sortBy, upDown)
		}
		else{
			this.setState({toggleSort: false});
			attrId.setAttribute('i-attribute', 'none');
			this.sortTTTT(sortList, sortBy, upDown)
		}
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
        // setTimeout(() => {
            this.props.addNewItemAction(true)
        // }, 200)
    }

    
    addUserComp = () => {
        return <Register headline={ADD_USER} classStr='none' />
    }

    editUserComp = () => {
        return <UserSummary headline={EDIT} tournament={null} event={null} user={this.state.userInEditMode}/>
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
        // this.setState({successMSG: !this.state.successMSG})
        this.props.successMessageAction(null)
        // this.props.addNewItemAction(false)
    }
	

    
    
    ulserList = () => {
        return this.state.sortList.map((item, index) => {
            //console.log(item.createdate);
            return <li key={index}>
	            <Link to={`/edit_user/${item.username}`}  onClick={() => this.editUserBtn(item)}>
                <div className={classes.username}>{item.name}</div>
                <div className={classes.email}>{item.email}</div>
                    <div className={classes.email + ' ' + classes.hide}>{item.username}</div>
                    <div className={classes.email + ' ' + classes.hide}>{moment(Date.parse(item.createdate)).format('DD-MM-YYYY')}</div>
                    <div className={classes.role + ' ' + classes.hide}>{item.role}</div>
                <div className={classes.allUsButtons} id={index}>
                    <EditBtn inputType="submit" content='Edit' onClick={() => this.editUserBtn(item)}/>
                    {/*NOT DELETE_____ <DeleteBtn onClick={() => this.DeleteUserBtn(item)} inputType={'button'} content='Delete'/> */}
                 </div>
	            </Link>
            </li>
        })
    }
    
    render (){
        
	    
        // console.log('user list ', this.props)
	    // console.log('user list state', this.state)
        return (
            <div className={classes.usersWrapper}>
                <div className={classes.usersListHead}>
	                <h1>Users List</h1>
	                {this.props.currentUser !== null && this.props.currentUser !== undefined && this.props.currentUser.role === 'Admin'
		                ? <div className={classes.addBtn}><BtnComp inputType="submit" content='Add User' onClick={this.addUserBtn}/></div>
		                : null
	                }
                </div>
                
                {this.successDeleteMessage()}
                <div className={classes.usersHead}>
                    <div className={classes.username} i-attribute="none" id={'name'} onClick={(item) => this.Sort(item)}>Name</div>
                    <div className={classes.email} i-attribute="none" id={'email'} onClick={(item) => this.Sort(item)}>Email</div>
                    <div className={classes.email + ' ' + classes.hide} i-attribute="none" id={'username'} onClick={(item) => this.Sort(item)}>User Name</div>
                    <div className={classes.email + ' ' + classes.hide} i-attribute="none" id={'createdate'} onClick={(item) => this.Sort(item)}>Date Created</div>
                    <div className={classes.role +' '+ classes.hide} i-attribute="none" id={'role'} onClick={(item) => this.Sort(item)}>Role</div>
                    <div className={classes.allUsButtons}></div>
                    
                </div>
	            {this.state.sortList.length !== 0
                ? <ul className={classes.uesrsList}>{this.ulserList()}</ul>
	            : <ul className={classes.noresults}><SmallSpinner/></ul>}
                {this.props.addItem ? <div className={classes.AddUser}>{this.addUserComp()}</div> : null}
                {this.props.editThisItem ? <div className={classes.AddUser}>{this.editUserComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline={DELETE_USER} user={this.state.userForDelete}/> : null}
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
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage,
        currentUser: state.userReducer.currentUser
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
        getAllGroupsRequest: payload => dispatch(getAllGroupsRequest(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsersAdmin);
