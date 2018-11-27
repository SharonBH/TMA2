import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import classes from './Groups.scss';
import EditBtn  from '../../UI/BtnComp/EditBtn';
import DeleteBtn from '../../UI/BtnComp/DeleteBtn';
import BtnComp from '../../UI/BtnComp/BtnComp';
import SelectComp from '../../UI/SelectComp/SelectComp'
import Register from '../../Register';
import ConfirmMessage from '../../UI/ConfirmMessage';
import LinkPopup from './LinkPopup'
import { EDIT_GROUP, ADD_NEW_GROUP, DELETE_GROUP } from '../../../configuration/config'
import { getAllGroupsRequest, takeMyGroupsRequest } from '../../../actions/GamesApi';
// import { takeAllUsers } from '../../../actions/Api';
import { addNewItemAction, editThisGroupAction, successMessageAction, errorMessageAction, deleteConfirmMessageAction, takeGroupIdPop, takeGroupIdPopAction }  from '../../../actions';
import moment from 'moment';
import SmallSpinner from "../../UI/SmallSpinner/SmallSpinner";
export class Groups extends Component {
    static propTypes = {
        groupsList: PropTypes.array,
        successMessage: PropTypes.string,
        errorMessage: PropTypes.string,
        addItem: PropTypes.bool,
        editThisGroup: PropTypes.bool,
        deleteUserConfirmMessage: PropTypes.bool,
        getAllGroupsRequest: PropTypes.func
    };
    constructor(props) {
        super(props)
        this.state = {
            groupForDelete: null,
            groupInEditMode: null,
	        buttonStatus: true,
	        sortList: [],
	        sortItem: 'groupName',
	        toggleSort: true,
	        groupsList: [],
	        groupsDataById: []
        }
    }

    componentWillMount(){
        const userID = this.props.currentUser.userId;
        this.props.takeMyGroupsRequest(userID);
        if(this.props.groupsList === null) {
            this.props.getAllGroupsRequest()
        } else {
            return null
        }
    }

	componentWillReceiveProps(nextProps) {
  
		const { groupsList, groupsDataById } = nextProps;
		this.setState({groupsList: groupsList, groupsDataById: groupsDataById});
		
		const groups = this.props.match.url === '/all_groups' ? this.props.groupsList : this.props.groupsDataById
		groups !== null ? groups.sort((a, b) => {
			const sortedItem = this.state.sortItem
            return a[sortedItem] === b[sortedItem] ? 0 : a[sortedItem].toLowerCase() < b[sortedItem].toLowerCase() ? -1 : 1;
        }) : null
	}
	
	sortTTTT = (groups, sortBy, upDown) => {
		const { toggleSort } = this.state
		
		const x = toggleSort ? 1 : -1
		const y = toggleSort ? -1 : 1
		groups.sort((a, b) => {
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
		const groups = this.props.match.url === '/all_groups' ? this.state.groupsList : this.state.groupsDataById
  
		this.setState({sortItem: sortBy, sortList: groups})
		const { sortItem, toggleSort, sortList } = this.state
		const sortBy = item.target.id;
		this.setState({sortItem: sortBy})
		const attrId = document.getElementById(sortItem)
		const upDown = toggleSort ? 'down' : 'up'
		document.getElementById(sortBy).setAttribute('i-attribute', upDown === 'down' || upDown === 'none' ? 'down' : 'up');
		if(sortItem === sortBy){
			this.setState({toggleSort: !toggleSort});
			attrId.setAttribute('i-attribute', upDown === 'down' || upDown === 'none' ? 'down' : 'up');
			this.sortTTTT(groups, sortBy, upDown)
		}
		else{
			this.setState({toggleSort: false});
			attrId.setAttribute('i-attribute', 'none');
			this.sortTTTT(groups, sortBy, upDown)
		}
	}
    componentWillUnmount(){
        this.props.errorMessageAction(null);
        this.props.successMessageAction(null);
    }

    successDeleteMessage = () => {
        return this.props.successMessage !== null 
          ? <p className={classes.success}>
                <span className={classes.successMessage}>{this.props.successMessage}
                    <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
                </span>
            </p>
          : null 
    }
    errorDeleteMessage = () => {
        return this.props.errorMessage !== null 
          ? <p className={classes.errorPop}>
                <span>{this.props.errorMessage}
                    <span onClick={this.closeMessage} className={classes.closeBTN }>x</span>
                </span>
            </p>
          : null 
    }

    closeMessage = () => {
        this.props.successMessageAction(null)
        this.props.errorMessageAction(null)
    }

    DeleteGoupBtn = (item) => {
        this.setState({groupForDelete: item})
        this.setState({groupInEditMode: null})
        this.props.deleteConfirmMessageAction(true)
    }

    editGroupBtn = (group) => {
	    this.props.editThisGroupAction(true);
        this.setState({groupInEditMode: group});
       
    };
    
    

    addNewGroupBtn = () => {
        setTimeout(() => {
            this.props.addNewItemAction(true)
        }, 200)
    };
    
    addGroupComp = () => {
        return <Register headline={ADD_NEW_GROUP} classStr='none' />
    };
	editGroupComp = () => {
		return <Register headline={EDIT_GROUP} classStr='none' group={this.state.groupInEditMode}/>
	};
	
    tableHeader = () => {
	    // const groups = this.props.match.url === '/all_groups' ? this.props.groupsList : this.props.groupsDataById
	    return (
		    <div className={classes.Head}>
			    <div className={classes.headline} i-attribute="down" id={'groupName'} onClick={(item) => this.Sort(item)}>Group Name</div>
			    <div className={classes.headline} i-attribute="none" id={'createdDate'} onClick={(item) => this.Sort(item)}>Created Date</div>
			    <div className={classes.users} id={'users'}>Group Users</div>
			    <div className={classes.addBtn} ></div>
		    </div>)
    }
    groupsList = () => {
        const groups = this.props.match.url === '/all_groups' ? this.state.groupsList : this.state.groupsDataById
        return groups !== null ? groups.map((group, index) => { 
            const usersInGroup = []
            group.users.forEach((user) => usersInGroup.push({key: user.userId, value: user.username}))
            return <li key={group.groupId}>
                <div className={classes.groupName}>{group.groupName}</div>
                <div className={classes.createdDate}>{moment(group.createdDate).format('LL')}</div>
                <div>
                    <div className={classes.select}>
                        <SelectComp
                            options={usersInGroup}
                            placeholder={"group users list"}
                            name={'event'}
                            onChange={() => {}}
                        />
                    </div>
                </div>
                <div id={index} className={classes.allUsButtons}>
                    {/*<Link to={`/all_groups/${group.groupName}`}><EditBtn inputType="submit" content='Edit' onClick={() => this.editGroupBtn(group)}/></Link>*/}
	                <Link to={`/all_groups/${group.groupName}`}><EditBtn inputType="submit" content='Edit' onClick={() => this.editGroupBtn(group)}/></Link>
                    <DeleteBtn onClick={() => this.DeleteGoupBtn(group)} inputType={'button'} content='Delete'/>
                    <BtnComp onClick={() => this.togglePopup(group.groupId)} inputType={'button'} content='Link to copy'/>
                 </div>
            </li>
        })
        : null
    }

    togglePopup(groupId) {
        // this.setState({ showPopup: !this.state.showPopup });
        this.props.takeGroupIdPopAction(true)
        this.props.takeGroupIdPop(groupId)
      }

    render() {
        console.log('groups props', this.props)
	    console.log('groups state', this.state)
	    const groups = this.props.match.url === '/all_groups' ? this.state.groupsList : this.state.groupsDataById
        return (
            <div className={classes.groupsTable}>
                {this.successDeleteMessage()}
                {this.errorDeleteMessage()}
                <div className={classes.listHeadLine}>
                    <h1>Groups List</h1>
	                <div className={classes.addBtn}>
		                <BtnComp
			                inputType="submit"
			                content='Add New Group'
			                onClick={this.addNewGroupBtn}
			                disabled={groups !== null && groups.length !== 0  ? !this.state.buttonStatus : this.state.buttonStatus}
		                />
	                </div>
                </div>
                {this.tableHeader()}
                {groups !== null && groups.length !== 0
                  ?  <ul className={classes.groupsList}>{this.groupsList()}</ul>
                  : <ul className={classes.groupsListSpinner}><SmallSpinner/></ul>
                }
                {this.props.addItem ? <div className={classes.AddUser}>{this.addGroupComp()}</div> : null}
                {this.props.editThisGroup ? <div className={classes.AddUser}>{this.editGroupComp()}</div> : null}
                {this.props.deleteUserConfirmMessage ? <ConfirmMessage headline={DELETE_GROUP} item={this.state.groupForDelete}/> : null}
                {this.props.groupIdAction ? <LinkPopup className={classes.AddUser}></LinkPopup> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser,
        groupsList: state.allListReducer.groupsList,
        groupsDataById: state.allListReducer.groupsDataById,
        allList: state.allListReducer.allList,
        successMessage: state.sharedReducer.successMessage,
        errorMessage: state.sharedReducer.errorMessage,
        addItem: state.addNewItemReducer.addItem,
        groupIdAction: state.addNewItemReducer.groupIdAction,
        editThisGroup: state.editItemReducer.editThisGroup,
        groupId: state.allListReducer.groupId,
        deleteUserConfirmMessage: state.confirmMessageReducer.deleteUserConfirmMessage,
    }
}

const mapDispatchToProps = dispatch => {

    return{
        getAllGroupsRequest: (payload) => dispatch(getAllGroupsRequest(payload)),
        takeMyGroupsRequest: (payload) => dispatch(takeMyGroupsRequest(payload)),
        takeGroupIdPop: (payload) => dispatch(takeGroupIdPop(payload)),
        takeGroupIdPopAction: (payload) => dispatch(takeGroupIdPopAction(payload)),
        addNewItemAction: payload => dispatch(addNewItemAction(payload)),
        editThisGroupAction: payload => dispatch(editThisGroupAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);