import {Component} from "react";
import { errorMessageAction, successMessageAction} from "../../actions";
import connect from "react-redux/es/connect/connect";
import {ADD_NEW_GROUP, EDIT_GROUP} from "../../configuration/config";
import classes from "../Register/RegisterComp.scss";
import InputComp from "../UI/InputComp/InputComp";
import BtnComp from "../UI/BtnComp/BtnComp";
import React from "react";
import {addNewGroupRequest, editGroupRequest, getAllGroupsRequest} from "../../actions/GamesApi";
import {appCallTakeAllUsers} from "../../actions/Api";



class AddGroup extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			groupName: '',
			searchUsers: '',
			searchUsersResult: [],
			addSearchUsersResult: [],
			usersIds: [],
			editGroupName: false,
			EventNameArr: []
		}
	}
	componentWillMount() {
		const { headline, group } = this.props;
		if(headline === EDIT_GROUP) {
			let usersList = [];
			group.users.map(user => {
				return usersList.push(user)
			});
			this.setState({addSearchUsersResult: usersList});
			this.setState({groupName: group.groupName})
		}
		else if(this.props.headline === ADD_NEW_GROUP) {
			this.props.appCallTakeAllUsers()
		}
		// else if(headline === ADD_TOURNAMENT) {
		//     this.props.appCallTakeAllEvents()
		// }
	}
	onGroupNameChange = (e) => { this.setState({groupName: e.target.value})};
	
	onSearchUsersChange = (e) => {
		this.setState({ searchUsersResult: [] });
		this.setState({searchUsers: e.target.value});
		
		setTimeout(() => {
			const { allList } = this.props
			
			allList.map((user) => {
				const searchFor = this.state.searchUsers;
				if(searchFor.length > 0 && ((user.username).toLowerCase()).includes(searchFor)) {
					let arr = [...this.state.searchUsersResult, user];
					
					const removeDuplicateArr = [...new Set(arr)];
					const fillt = removeDuplicateArr.filter((user) => {
						return !this.state.addSearchUsersResult.find(item => user.userId === item.userId );
					});
					return this.setState({searchUsersResult: fillt})
				}
			})
		}, 300)
	};
	addSearchUsers = (user) => {
		
		const fill = this.state.addSearchUsersResult.filter(item => String(item.userId) !== String(user.userId));

		const array = [...fill, {userId: user.userId, score: null, username: user.username}];
		// array.sort((a, b) => {
		// 	return a.username === b.username ? 0 : a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1;
		// });
		this.setState({addSearchUsersResult: array});
		

	};
	
	removeSelectedUser = (index) => {
		let removeAddUser = [...this.state.addSearchUsersResult];
		removeAddUser.splice(index, 1);
		this.setState({addSearchUsersResult: removeAddUser});
	};
	
	addNewGroup = (e) => {
		e.preventDefault();
		if(this.state.groupName === '') {
			this.props.errorMessageAction('group must have a name')
		} else if (this.state.addSearchUsersResult.length === 0) {
			this.props.errorMessageAction('select users for this group')
		} else {
			const { groupName, addSearchUsersResult} = this.state;
			let arr = [];
			addSearchUsersResult.map((user) => {
				return arr.push(user.userId)
			});
			const userID = this.props.currentUser.userId;
			this.props.addNewGroupRequest(groupName, arr, userID);
			this.setState({groupName: '', usersIds: [], searchUsers: '', searchUsersResult: [], addSearchUsersResult: []})
		}
	};
	
	
	
	CleaningInputFromUsers = () => {
		setTimeout(() => {
			this.setState({searchUsers: ''});
			this.setState({searchUsersResult: []})
		}, 200)
	};
	editBtnFunc = () => {
		return (
			<div className={classes.BTN}>
				<i className={
					this.state.editGroupName
						?   classes.active + ' fas fa-pen'
						:   classes.notActive + ' fas fa-pen'  }
				   onClick={() => this.editGroupNameBtn()}>
				</i>
			</div>
		)
	};
	addNewGroupPage = (headline, group) => {
		return (
			<div>
				{ this.props.headline === EDIT_GROUP
					?   <div className={classes.wrappLine}>
							<label className={classes.HeadLine} name={'Group Name'}>{'Group Name'}:</label>
							{
							this.state.editGroupName
								?   <div className={classes.EditInput}>
									<InputComp
										inputType={'text'}
										name={'Group Name'}
										placeholder={'Group Name'}
										content={this.state.groupName}
										onChange={(e) => this.onGroupNameChange(e)}
									/>
								</div>
								: <span className={classes.editLineInput}>{this.props.group.groupName}</span>
							}
							{this.editBtnFunc()}
						</div>
					:   <InputComp autoFocus={true} inputType="text" name="groupName"  placeholder="Group Name" onChange={this.onGroupNameChange}/>
				}
					<div className={classes.searchUsersWrapper}>
						<InputComp inputType="text" autoFocus={true} onBlur={this.CleaningInputFromUsers} content={this.state.searchUsers} name="Search User By UserName" placeholder="Search And Add Users" onChange={this.onSearchUsersChange}/>
						
						<div className={classes.usersWrapper} >
							{this.state.searchUsersResult.length > 0 ? <span className={classes.searchResult}>Search Result:</span> : null}
							{this.state.searchUsersResult.map((user, index) => (
								<span className={classes.user} key={index} onClick={() => this.addSearchUsers(user)}>
                                    {user.username}
									<i className="far fa-plus-square"></i>
                                </span>
							))}
						</div>
						<div className={classes.usersAddedWrapper}>
							{this.state.addSearchUsersResult.length > 0 || this.state.addSearchUsersResult !== undefined
								?   this.state.addSearchUsersResult.map((user, index) => {
                                return <span className={classes.user + ' ' + classes.userResult} key={index}>{user.username}
										{/* {headline === EDIT_GROUP ? user.username : user.username}  */}
										<i className="far fa-times-circle" onClick={() => this.removeSelectedUser(index)}></i>
                                        </span>
								})
								:   null}
						</div>
					</div>
				<div className={classes.saveButton}>
					<BtnComp
						inputType="submit"
						name="createGroup"
						content='Save'
						onClick={this.props.headline === ADD_NEW_GROUP ? this.addNewGroup : (e) => this.editGroup(e, this.props.group)}
					/>
				</div>
			</div>
		)
	};
	
	editGroup = (e, group) => {
		e.preventDefault();
		const { headline } = this.props;
		if(this.state.groupName === '') {
			this.props.errorMessageAction('group must have a name')
		} else if (this.state.addSearchUsersResult.length === 0) {
			this.props.errorMessageAction('select users for this group')
		} else {
			let userIds = [];
			const groupId = group.groupId;
			const groupName = this.state.groupName;
			

			this.state.addSearchUsersResult.map(user => {
				
				if(headline === EDIT_GROUP){
					return userIds.push(user.userId)
				}else{
					return userIds.push(user.userId)
				}
				
				// userIds.push(user.user.userId)
			});
			const userID = this.props.currentUser.userId;

			this.props.editGroupRequest(groupId, groupName, userIds, userID)
		}
		
	};
	
	
	
	editGroupNameBtn = () => {
		this.setState({editGroupName: !this.state.editGroupName})
	};
	
	
	render(){
		// console.log('add group',this.props)
		// console.log('add group state',this.state)
		return(
			this.addNewGroupPage()
		)
	}
}


const mapStateToProps = (state) => {
	return {
		currentUser: state.userReducer.currentUser,
		groupsList: state.allListReducer.groupsList,
		allList: state.allListReducer.allList,
	}
};
const mapDispatchToProps = dispatch => {
	return {
		errorMessageAction: payload => dispatch(errorMessageAction(payload)),
		successMessageAction: (payload) => dispatch(successMessageAction(payload)),
		getAllGroupsRequest: (payload) => dispatch(getAllGroupsRequest(payload)),
		// editThisGroupAction: (payload) => dispatch(editThisGroupAction(payload)),
		editGroupRequest: (groupId, groupName, userIds, userID) => dispatch(editGroupRequest(groupId, groupName, userIds, userID)),
		addNewGroupRequest: (groupName, usersIds, userID) => dispatch(addNewGroupRequest(groupName, usersIds, userID)),
		appCallTakeAllUsers: (payload) => dispatch(appCallTakeAllUsers(payload)),

	}
};
export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);