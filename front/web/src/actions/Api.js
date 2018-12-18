import axios from 'axios';
import history from '../configuration/history';
import {
	getUserAction,
	catchErrorAction,
	toggleLoaderAction,
	addNewItemAction,
	getAllUsersAction,
	// changePassAction,
	successMessageAction,
	errorMessageAction,
	getAllRoles,
	takeMyHomeLeader,
	editThisItemAction
} from './index';
import {EDIT, USER_ROLE_ADMIN, YOUR_PROFILE} from '../configuration/config'

// const cors ='https://cors-anywhere.herokuapp.com/'
const cors =''
const url = 'https://localhost:44336/'
//const url = 'https://tma-api.azurewebsites.net/'


// login request
export const loginRequest = (userName, password) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'post',
			data: {
				username: userName,
				password: password
			},
			crossDomain: true,
			url: cors + url + 'Account/Login',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Accept': 'application/json, text/plain, */*',
				"cache-control": "no-cache",
				"Access-Control-Allow-Origin": "https://tma-api.azurewebsites.net/Account/Login",
				"Access-Control-Allow-Methods": 'POST, GET, OPTIONS, PUT, DELETE',
				"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
				'Access-Control-Allow-Credentials': 'true',
				'Allow': 'POST, GET, OPTIONS, PUT, DELETE'
			},
		})
		.then((response) => {
			if(response.data.message === 'Success') {
				return axios.post(cors + url + `Account/GetUserAsync?username=${userName}`)
					.then((response) => {
                        response.data["isCurrentUserAdminRole"] = response.data["role"] === USER_ROLE_ADMIN;
						sessionStorage.setItem('session', JSON.stringify(response.data));
						const session = JSON.parse(sessionStorage.getItem('session'));
						dispatch(getUserAction(session))
						return axios.post(cors + url + `Account/GetUserRoles`)
							.then((response) => {
								// const roles = response.data
								localStorage.setItem('localStoreRoles', JSON.stringify(response.data));
								const roles = JSON.parse(localStorage.getItem('localStoreRoles'));
								dispatch(getAllRoles(roles));
								
								return axios({
									method: 'POST',
									url: cors + url + 'Tournaments/GetHomeLeaderboards',
									headers: {'Content-Type': 'application/json; charset=UTF-8'},
									data: "'" + session.userId + "'"
								})
									.then((response) => {
										// const data = response.data.message
										// const allData = response.data
										localStorage.setItem('localStoreLeaderboarddData', JSON.stringify(response.data));
										const allData = JSON.parse(localStorage.getItem('localStoreLeaderboarddData'));
										dispatch(takeMyHomeLeader(allData))
										history.push({pathname: '/homeEvents', state: response.data})
										dispatch(toggleLoaderAction(false))
									})
									.catch((error) => {
										dispatch(catchErrorAction([ error ][ 0 ]))
										dispatch(errorMessageAction([ error ][ 0 ]))
										dispatch(toggleLoaderAction(false))
									});
							})
					
					})
			}else {
				const error = response.data.message
				dispatch(errorMessageAction(error))
				dispatch(toggleLoaderAction(false))
			}
			
			
		})
		.catch((error) => {
			dispatch(catchErrorAction([ error ][ 0 ]))
			dispatch(errorMessageAction(error[ 0 ]))
			dispatch(toggleLoaderAction(false))
		});
	}
};

// get user roles 
export const getAllRolesRequest = () => {
	return (dispatch) => {
		return axios.post(cors + url + `Account/GetUserRoles`)
			.then((response) => {
				const roles = response.data
				dispatch(getAllRoles(roles));
				dispatch(toggleLoaderAction(false))
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				// dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};


// register request
export const registerRequest = (email, password, confirmPassword, name, userType, userName, groupId) => {
	return (dispatch) => {
		return axios.post(cors + url + `Account/GetUserRoles`)
			.then((response) => {
				// const roles = response.data
				
				localStorage.setItem('localStoreRoles', JSON.stringify(response.data));
				const roles = JSON.parse(localStorage.getItem('localStoreRoles'));
				dispatch(getAllRoles(roles));
				dispatch(toggleLoaderAction(true))
				// return axios.post(cors + url + `Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}&groupId=${groupId}`)
				return axios({
					method: 'POST',
					headers: {'Content-Type': 'application/json; charset=UTF-8; multipart/form-data'},
					url: cors + url + 'Account/Register',
					data: {
						Email: email,
						Password: password,
						ConfirmPassword: confirmPassword,
						Name: name,
						Role: userType,
						Username: userName,
						GroupId: groupId
					}
				})
					.then((response) => {
						if (response.data.response === 'Success') {
							return axios.post(cors + url + `Account/GetUserAsync?username=${userName}`)
								.then((response) => {
									sessionStorage.setItem('session', JSON.stringify(response.data));
									const session = JSON.parse(sessionStorage.getItem('session'));
									dispatch(getUserAction(session))
									dispatch(toggleLoaderAction(false))
									history.push({pathname: '/homeEvents', state:[response.data]})
								})
								.catch((error) => {
									dispatch(catchErrorAction([error][0]))
									dispatch(errorMessageAction([error][0]))
									dispatch(toggleLoaderAction(false))
								});
						} else {
							const error = response.data.message
							dispatch(errorMessageAction(error))
							dispatch(toggleLoaderAction(false))
						}
					})
					.catch((error) => {
						dispatch(catchErrorAction([error][0]))
						dispatch(errorMessageAction([error][0]))
						dispatch(toggleLoaderAction(false))
					});
			})
	}
};




// add New-User Request
export const addNewUserRequest = (email, password, confirmPassword, name, userType, userName, groupId) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8; multipart/form-data'},
			url: cors + url + 'Account/Register',
			data: {
				Email: email,
				Password: password,
				ConfirmPassword: confirmPassword,
				Name: name,
				Role: userType,
				Username: userName,
				// avatar: image,
				GroupId: groupId
			}
		})
			.then((response) => {
				console.log('response', response)
				if (response.data.response === 'Success') {
					return axios.post(cors + url + `Account/GetUsers`)
						.then((response) => {
							const users = response.data
							dispatch(getAllUsersAction(users));
							history.push({pathname: '/all_users'});
							dispatch(addNewItemAction(false));
							dispatch(successMessageAction('User Added Successfuly'));
							dispatch(toggleLoaderAction(false))
						})
						.catch((error) => {
							dispatch(catchErrorAction([error][0]))
							dispatch(errorMessageAction([error][0]))
							dispatch(toggleLoaderAction(false))
						});
				} else {
					const error = response.data.message
					dispatch(errorMessageAction(error))
					dispatch(toggleLoaderAction(false))
				}
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction(error[0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// get all users
export const takeAllUsers = () => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios.post(cors + url + `Account/GetUsers`)
			.then((response) => {
				const users = response.data
				dispatch(getAllUsersAction(users));
				history.push({pathname: '/all_users'})
				dispatch(toggleLoaderAction(false))
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// edit User Request
export const editThisUserRequest = (headline, userName, name, email, image, userType) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8; multipart/form-data'},
			url: cors + url + 'Account/EditUser',
			data: {
				Email: email,
				Name: name,
				Role: userType,
				Username: userName,
				avatar: image,
			}
		})
			.then((response) => {
				if (response.data.response === 'Success') {
					if(headline === EDIT){
						return axios.post(cors + url + `Account/GetUsers`)
							.then((response) => {
								const users = response.data
								dispatch(getAllUsersAction(users));
								// history.push({pathname: '/all_users'})
								dispatch(editThisItemAction(false))
								dispatch(successMessageAction('User Edited Successfuly'))
								dispatch(toggleLoaderAction(false))
							})
							.catch((error) => {
								dispatch(errorMessageAction([error][0]))
								dispatch(toggleLoaderAction(false))
							});
					} else if( headline === YOUR_PROFILE ) {
						return axios.post(cors + url + `Account/GetUserAsync?username=${userName}`)
							.then((response) => {
								sessionStorage.setItem('session', JSON.stringify(response.data));
								const session = JSON.parse(sessionStorage.getItem('session'));
								dispatch(getUserAction(session))
								const user = response.data
								// dispatch(getUserAction(user));
								dispatch(successMessageAction(user.username + ' Profile Edited Successfuly'))
								dispatch(toggleLoaderAction(false))
							})
							.catch((error) => {
								dispatch(errorMessageAction([error][0]))
								dispatch(toggleLoaderAction(false))
							});
					}
				} else {
					const error = response.data.message
					dispatch(errorMessageAction(error))
					dispatch(toggleLoaderAction(false))
				}
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction(error[0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// delete user
export const DeleteUserRequest = (userName) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios.post(cors + url + `Account/DeleteUser?username=${userName}`)
			.then((response) => {
				if(response.data.response === 'Success') {
					const data = response.data.message
					dispatch(takeAllUsers())
					dispatch(successMessageAction(data))
					// history.push({pathname: '/all_users'})
					dispatch(toggleLoaderAction(false))
				}
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

//forgot pass request
export const forgotPassRequest = (email) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios.post(cors + url + `Account/ForgotPassword?Email=${email}`)
			.then((response) => {
				if (response.data.response === 'Success') {
					const data = response.data.message
					dispatch(successMessageAction(data))
					dispatch(toggleLoaderAction(false))
				} else {
					const error = response.data.message
					dispatch(errorMessageAction(error))
					dispatch(toggleLoaderAction(false))
				}
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// change Password Request
export const changePasswordRequest = (username, password, newPassword, confirmPassword) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios.post(cors + url + `Account/ChangePassword?Username=${username}&OldPassword=${password}&NewPassword=${newPassword}&ConfirmPassword=${confirmPassword}`)
			.then((response) => {
				if (response.data.response === 'Success') {
					const data = response.data.message
					// dispatch(changePassAction(data))
					dispatch(successMessageAction(data))
					dispatch(toggleLoaderAction(false))
				} else {
					const error = response.data.message
					dispatch(errorMessageAction(error))
					dispatch(toggleLoaderAction(false))
				}
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// get all users by app comp
export const appCallTakeAllUsers = () => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios.post(cors + url + `Account/GetUsers`)
			.then((response) => {
				const users = response.data
				dispatch(getAllUsersAction(users));
				dispatch(toggleLoaderAction(false))
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction(error[0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};




