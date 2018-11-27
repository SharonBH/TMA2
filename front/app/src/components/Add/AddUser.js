import {Component} from "react";
import { Link } from 'react-router-dom';
import history from "../../configuration/history";
import {ADD_USER, REGISTER} from "../../configuration/config";
import classes from "../Register/RegisterComp.scss";
import InputComp from "../UI/InputComp/InputComp";
import SelectIdComp from "../UI/SelectComp/SelectIdComp";
import BtnComp from "../UI/BtnComp/BtnComp";
import React from "react";
import {errorMessageAction, successMessageAction} from "../../actions";
import connect from "react-redux/es/connect/connect";
import {addNewUserRequest, registerRequest} from "../../actions/Api";


export class AddUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			name: '',
			userType: 'User',
			userName: '',
			groupId: '',
			
		}
	}
	onEmailChange = (e) => {this.setState({ email: e.target.value })};
	onPasswordChange = (e) => {this.setState({password: e.target.value})};
	onConfirmPasswordChange = (e) => {this.setState({confirmPassword: e.target.value})};
	onNameChange = (e) => { this.setState({ name: e.target.value})};
	onUserNameChange = (e) => { this.setState({userName: e.target.value})};
	onUserGroupChange = (e) => { this.setState({groupId: Number(e.target.value)})};
	
	addNewUser = (e, headline) => {
		e.preventDefault();
		const { email, password, confirmPassword, name, userType, userName, groupId } = this.state;
		const groupIdUrl = history.location.search;
		const urlsplit = groupIdUrl.split("=");
		const groupUrlId = urlsplit[urlsplit.length-1];
		
		const groupIdSend = this.props.headline === REGISTER || history.location.search === `groupId=${groupUrlId}` ? groupUrlId : groupId;
		
		if (userName === '') {
			this.props.errorMessageAction('you must enter a user name')
		} else if(!email.includes('@')) {
			this.props.errorMessageAction('you must enter a valid email address')
		} else if (name === '') {
			this.props.errorMessageAction('you must enter a name')
		}else if (password.length < 6) {
			this.props.errorMessageAction('password must have at least 6 characters')
		} else if (password !== confirmPassword) {
			this.props.errorMessageAction('confirm password doesn\'t match  password')
		}  else  {
			this.props.headline === ADD_USER
				? this.props.addNewUserRequest(email, password, confirmPassword, name, userType, userName, groupIdSend)
				: this.props.registerRequest(email, password, confirmPassword, name, userType, userName, groupIdSend)
			
		}
	};
	
	rgisterPage = (headline, classStr) => {
		
		const groupsName = this.props.groupsList !== null ? this.props.groupsList.map((group) => { return {key: group.groupId, value: group.groupName }}) : null;
		
		return (
			<div>
				<InputComp inputType="text" name="userName" placeholder="Username" onChange={this.onUserNameChange}/>
				<InputComp inputType="email" name="email" placeholder="eMail" onChange={this.onEmailChange}/>
				<InputComp inputType="text" name="name" placeholder="Name" onChange={this.onNameChange}/>
				<InputComp inputType="password" name="password" placeholder="Password" onChange={this.onPasswordChange}/>
				<InputComp inputType="password" name="ConfirmPassword" placeholder="ConfirmPassword" onChange={this.onConfirmPasswordChange}/>
				{this.props.headline === ADD_USER
					? <SelectIdComp
						onChange={this.onUserGroupChange}
						options={groupsName}
						placeholder={'Choose group'}
					/>
					: null
				}
				{this.props.headline === REGISTER
					? <div className={classes.saveButton + ' ' + classes.saveButtonRegister}><BtnComp
						inputType="submit"
						name="register"
						content='Save'
						onClick={(e) => this.addNewUser(e, headline) }
					/></div>
					:<div className={classes.saveButton}><BtnComp
						inputType="submit"
						name="register"
						content='Save'
						onClick={(e) => this.addNewUser(e, headline) }
					/></div>
				}
				{this.props.headline === REGISTER
					? <div className={classes.classStr}>
						<h3>Have a user? Keep Calm.</h3>
						<div className='loginLink'>
							<h2>And </h2>
							<Link to='/'><h2>Sign In</h2></Link>
						</div>
					</div>
					: null
				}
			</div>
		)
	};
	
	render(){
		console.log('add user props', this.props)
		return (this.rgisterPage())
	}
}
const mapStateToProps = (state) => {
	return {
		groupsList: state.allListReducer.groupsList
	}
};
const mapDispatchToProps = dispatch => {
	return {
		errorMessageAction: payload => dispatch(errorMessageAction(payload)),
		successMessageAction: (payload) => dispatch(successMessageAction(payload)),
		registerRequest: (email, password, confirmPassword, name, userType, userName, groupId) => dispatch(registerRequest(email, password, confirmPassword, name, userType, userName, groupId)),
		addNewUserRequest: (email, password, confirmPassword, name, userType, userName, groupId) => dispatch(addNewUserRequest(email, password, confirmPassword, name, userType, userName, groupId)),
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
