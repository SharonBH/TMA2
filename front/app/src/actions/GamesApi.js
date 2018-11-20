import axios from 'axios';
// import history from '../configuration/history';
import {
    catchErrorAction,
    toggleLoaderAction,
    getAllToursAction,
    errorMessageAction,
    successMessageAction,
    addNewTournamentAction,
    addNewEventAction,
    getAllEventsAction,
    getAllEventTypesAction,
    getAllGroups,
    getTournByIdAction,
    addNewGroupAction,
    getTournByIdNoSAction,
    getGroupById,
    takeMyTournaments,
    getAllUsersAction,
    takeMyGroups,
    getLeaderboardsSAction,
    takeMyEvents,
    takeMyHomeLeader
} from './index';


// const cors = 'https://cors-anywhere.herokuapp.com/'
const cors = '';
const url = 'https://tma-api.azurewebsites.net/';



//////////  EVENTS   ///////////////

// get all events
// export const takeAllEvents = () => {
// 	return (dispatch) => {
// 		dispatch(toggleLoaderAction(true))
// 		return axios.post(cors + url + `Events/GetEvents`)
// 			.then((response) => {
// 				// if(response.data.response === 'Success') {
// 				// const data = response.data.message
// 				// dispatch(successMessageAction(data))
// 				const events = response.data
// 				dispatch(getAllEventsAction(events));
// 				return axios.post(cors + url + `Events/GetEventTypes`)
// 					.then((response) => {
//
// 						const eventTypes = response.data
// 						dispatch(getAllEventTypesAction(eventTypes));
// 						// history.push({pathname: '/all_events'})
// 						dispatch(toggleLoaderAction(false))
// 					})
// 					.catch((error) => {
// 						dispatch(catchErrorAction([error][0]))
// 						dispatch(errorMessageAction([error][0]))
// 						dispatch(toggleLoaderAction(false))
// 					});
// 				// }
// 			})
// 			.catch((error) => {
// 				dispatch(catchErrorAction([error][0]))
// 				dispatch(errorMessageAction([error][0]))
// 				dispatch(toggleLoaderAction(false))
// 			});
// 	}
// };

// delete event
export const DeleteEventRequest = (eventId, currentTournamentId) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			url: cors + url + 'Events/DeleteEvent',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			data: eventId
		})
			.then((response) => {
				if(response.data.response === 'Success') {
					const data = response.data.message
					dispatch(successMessageAction(data))
					// return axios.post(cors + url + `Events/GetEvents`)
						// .then((response) => {
						// 	const events = response.data
						// 	dispatch(getAllEventsAction(events))
						// 	// history.push({pathname: '/tournament_page'})
						//
						// 	dispatch(toggleLoaderAction(false))
							return axios.post(cors + url + `Events/GetEventTypes`)
								.then((response) => {
									const eventTypes = response.data
									window.location.reload()
									dispatch(getAllEventTypesAction(eventTypes));
									// history.push({pathname: '/all_events'})
									dispatch(toggleLoaderAction(false))
								})
								.catch((error) => {
									dispatch(catchErrorAction([error][0]))
									dispatch(errorMessageAction([error][0]))
									dispatch(toggleLoaderAction(false))
								// });
						})
						// .catch((error) => {
						// 	dispatch(catchErrorAction([error][0]))
						// 	dispatch(errorMessageAction([error][0]))
						// 	dispatch(toggleLoaderAction(false))
						// });
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

// add New-eVENT Request
export const addNewEventRequest = (EventName, Tournament, EventDate, usersWithResults) => {
	
	return (dispatch) => {
		dispatch(toggleLoaderAction(true));
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			url: cors + url + 'Events/CreateEvent',
			data: {
				eventName: EventName,
				tournamentName: Tournament,
				eventDate: EventDate,
				eventResults: usersWithResults
			}
		})
		.then((response) => {
			// dispatch(toggleLoaderAction(true));
			// if (response.data.response === 'Success') {
			// 	return axios.post(cors + url + `Events/GetEvents`)
			// 		.then((response) => {
			// 			const events = response.data;
						// history.push({pathname: '/tournament_page'})
						dispatch(addNewEventAction(false));
						// dispatch(getAllEventsAction(events));
						dispatch(successMessageAction('Event Added Successfuly'));
						dispatch(toggleLoaderAction(false));
						// setTimeout(() => {
						if(response.statusText === 'OK'){ window.location.reload()}
						
						//} , 1000);
					// })
					// .catch((error) => {
					// 	dispatch(catchErrorAction([error][0]));
					// 	dispatch(errorMessageAction([error][0]));
					// 	dispatch(toggleLoaderAction(false))
					// });
			// } else {
			// 	const error = response.data.message
			// 	dispatch(errorMessageAction(error))
			// 	dispatch(toggleLoaderAction(false))
			// }
		})
		.catch((error) => {
			dispatch(catchErrorAction([error][0]))
			dispatch(errorMessageAction([error][0]))
			dispatch(toggleLoaderAction(false))
		});
	}
}

// edit Event
export const editThisEventRequest = (eventID, eventName, tournN, eventDate, eventResults) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			url: cors + url + 'Events/EditEvent',
			data: {
				eventId: eventID,
				eventName: eventName,
				tournamentName: tournN,
				eventDate: eventDate,
				eventResults: eventResults
			}
		})
			.then((response) => {
				// dispatch(toggleLoaderAction(true))
				if (response.data.response === 'Success') {
					dispatch(successMessageAction('Event Edited Successfuly'))
					setTimeout((
						window.location.reload()
					),2000)
					// return axios.post(cors + url + `Events/GetEvents`)
					// 	.then((response) => {
					// 		const events = response.data
					// 		dispatch(getAllEventsAction(events));
					// 		window.location.reload()
					// 		// history.push({pathname: '/tournament_page/:tournamentName'})
					// 		dispatch(toggleLoaderAction(false))
					// 	})
					// 	.catch((error) => {
					// 		dispatch(errorMessageAction([error][0]))
					// 		dispatch(toggleLoaderAction(false))
					// 	});
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
}

// take all events by user id
export const takeMyEventsRequest = (userId) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			url: cors + url + 'Events/GetEventsByUserId',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			data: "'" + userId + "'"
		})
			.then((response) => {
				// const data = response.data.message
				const eventsData = response.data
				dispatch(takeMyEvents(eventsData))
				// dispatch(successMessageAction(data))
				dispatch(toggleLoaderAction(false))
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// take all events by user id
export const takeMyHomeLeaderboardRequest = (userId) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			url: cors + url + 'Tournaments/GetHomeLeaderboards',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			data: "'" + userId + "'"
		})
			.then((response) => {
				// const data = response.data.message
				const allData = response.data
				dispatch(takeMyHomeLeader(allData))
				// dispatch(successMessageAction(data))
				dispatch(toggleLoaderAction(false))
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// take all events by tournament id
export const tournEventsByIdRequest = (tournamentId) => {
	return (dispatch) => {
		// dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			url: cors + url + 'Events/GetEventsByTournamentId',
			data: tournamentId
		})
			.then((response) => {
				// const tournamentId = response.data
				const eventsById = response.data.length !== 0 ? response.data : [{eventName: "No Data"}]
				dispatch(getTournByIdNoSAction(eventsById))
				dispatch(toggleLoaderAction(false))
			})
	}
};



/////////////////////////////////////////
//////////  TOURNAMENTS   ///////////////

// get all tournaments
export const takeAllTournaments = () => {
	return (dispatch) => {
		// dispatch(toggleLoaderAction(true));
		return axios.post(cors + url + `Tournaments/GetTournaments`)
			.then((response) => {
				const tournaments = response.data;
				dispatch(getAllToursAction(tournaments));
				// history.push({pathname: '/all_tournaments'})
				return axios.post(cors + url + `Groups/GetGroups`)
					.then((response) => {
						const groups = response.data;
						dispatch(getAllGroups(groups));
						dispatch(toggleLoaderAction(false))
					})
					.catch((error) => {
						dispatch(catchErrorAction([error][0]));
						dispatch(errorMessageAction(error[0]));
						dispatch(toggleLoaderAction(false))
					});
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]));
				dispatch(errorMessageAction(error[0]));
				dispatch(toggleLoaderAction(false))
			});
	}
};

// delete tournament
export const DeleteTournamentRequest = (tournamentId) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			url: cors + url + 'Tournaments/DeleteTournament',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			data: tournamentId
		})
			.then((response) => {
				if(response.data.response === 'Success') {
					const data = response.data.message
					dispatch(successMessageAction(data))
					return axios.post(cors + url + `Tournaments/GetTournaments`)
						.then((response) => {
							const tournaments = response.data
							dispatch(getAllToursAction(tournaments))
							// history.push({pathname: '/all_tournaments'})
							
							window.location.reload()
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
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// add New Tournament
export const addNewTournamentRequest = (tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum, EventTypeName, groups) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true));
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			url: cors + url + 'Tournaments/CreateTournament',
			data: {
				tournamentName: tournamentName,
				eventTypeName: EventTypeName,
				startDate: tournamentStartDate,
				endDate: tournamentEndDate,
				numberOfEvents: eventsMaxNum,
				groupId: groups
			}
		})
			.then((response) => {
				if (response.data.response === 'Success') {
					return axios.post(cors + url + `Tournaments/GetTournaments`)
						.then((response) => {
							const tournaments = response.data;
							dispatch(getAllToursAction(tournaments));
							// history.push({pathname: '/tournament_page'})
							
							dispatch(addNewTournamentAction(false));
							dispatch(successMessageAction('Tournament Added Successfuly'));
							// dispatch(toggleLoaderAction(false))
							// setTimeout(() => {
							if(response.statusText === 'OK'){ window.location.reload()}
							// }, 1000)
						})
						.catch((error) => {
							dispatch(catchErrorAction([error][0]));
							dispatch(errorMessageAction([error][0]));
							dispatch(toggleLoaderAction(false))
						});
				} else {
					const error = response.data.message;
					dispatch(errorMessageAction(error));
					dispatch(toggleLoaderAction(false));
				}
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// get Tournament by tournament id
export const goToTournPageRequest = (tournamentId) => {
		return (dispatch) => {
			// dispatch(toggleLoaderAction(true));
			return axios({
				method: 'POST',
				url: cors + url + 'Tournaments/GetTournamentById',
				headers: {'Content-Type': 'application/json; charset=UTF-8'},
				data: tournamentId
			})
			.then((response) => {
				// localStorage.setItem('localStoreTournament', JSON.stringify(response.data));
				// const tournamentById = JSON.parse(localStorage.getItem('localStoreTournament'));
				dispatch(getTournByIdAction(response.data));
				dispatch(getLeaderboards(response.data));
				const groupId = response.data.groupId;
				return axios({
					method: 'POST',
					url: cors + url + 'Groups/GetGroupById',
					headers: {'Content-Type': 'application/json; charset=UTF-8'},
					data: groupId
				})
				.then((response) => {
					const groupById = response.data;
					dispatch(getGroupById(groupById));
					
					return axios
						.post(cors + url + `Events/GetEventTypes`)
				})
				.then((response) => {
					const eventTypes = response.data;
					dispatch(getAllEventTypesAction(eventTypes))
					if(response.statusText === 'OK') {
						dispatch(toggleLoaderAction(false))
					}
				})
							// return axios({
							// 	method: 'POST',
							// 	headers: {'Content-Type': 'application/json; charset=UTF-8'},
							// 	url: cors + url + 'Events/GetEventsByTournamentId',
							// 	data: tournamentId
							// })
							// 	.then((response) => {
									// const tournamentId = response.data;
									// dispatch(getTournByIdNoSAction(tournamentId));
									// history.push({pathname: '/all_events'})
									
									// return axios
									// 	.post(cors + url + `Groups/GetGroups`)
									// 	.then((response) => {
									// 		const groups = response.data;
									// 		dispatch(getAllGroups(groups));
										
										// })
										// .catch((error) => {
										// 	dispatch(catchErrorAction([ error ][ 0 ]));
										// 	dispatch(errorMessageAction(error[ 0 ]));
										// })
								// })
						
						.catch((error) => {
							dispatch(catchErrorAction([error][0]));
							dispatch(errorMessageAction(error[0]))
						})
					
				
				.catch((error) => {
					dispatch(catchErrorAction([error][0]));
					dispatch(errorMessageAction(error[0]))
				});
				
				
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]));
				dispatch(errorMessageAction(error[0]))
				
			});
		}
		
};

// edit Tournament
export const editThisTournamentRequest = ( tournamentId, eventType, groupId, tournamentName, startDate, endDate, numberOfEvents) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			url: cors + url + 'Tournaments/EditTournament',
			data: {
				tournamentId: tournamentId,
				tournamentName: tournamentName,
				EventTypeName : eventType,
				groupId: groupId,
				startDate: startDate,
				endDate: endDate,
				numberOfEvents: numberOfEvents
			}
		})
			.then((response) => {
				
				if (response.data.response === 'Success') {
					dispatch(successMessageAction('Tournament Edited Successfuly'))
					return axios.post(cors + url + `Tournaments/GetTournaments`)
						.then((response) => {
							dispatch(successMessageAction('Tournament Edited Successfuly'))
							const tournaments = response.data
							dispatch(getAllToursAction(tournaments));
							// history.push({pathname: '/:tournamentName'})
							dispatch(toggleLoaderAction(false))
						})
						.catch((error) => {
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
	}
};


/////////////////////////////////////////
//////////  LEADERBOARD   ///////////////

export const getLeaderboards = (tournamentId) => {
	return (dispatch) => {
		// dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			url: cors + url + 'Tournaments/GetLeaderboards',
			data: tournamentId.tournamentId
		})
			.then((response) => {
				const data = response.data
				const leaderList = data.length !== 0 ? data : [{user: "No Data"}]
				dispatch(getLeaderboardsSAction(leaderList))
				dispatch(toggleLoaderAction(false))
			})
	}
};

////////////////////////////////////
//////////  GROUPS   ///////////////

// get all groups
export const getAllGroupsRequest = () => {
	return (dispatch) => {
		// dispatch(toggleLoaderAction(true))
		return axios.post(cors + url + `Groups/GetGroups`)
			.then((response) => {
				const groups = response.data
				dispatch(getAllGroups(groups));
				// history.push({pathname: '/all_groups'})
				return axios.post(cors + url + `Account/GetUsers`)
					.then((response) => {
						const users = response.data
						dispatch(getAllUsersAction(users));
						dispatch(toggleLoaderAction(false))
					})
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				// dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// get all groups by main page comp
export const mainPageGetAllGroupsRequest = () => {
	return (dispatch) => {
		return axios.post(cors + url + `Groups/GetGroups`)
			.then((response) => {
				const groups = response.data
				dispatch(getAllGroups(groups));
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
			});
	}
};

// add New Group Request
export const addNewGroupRequest = (groupName, usersIds) => {
	
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			url: cors + url + 'Groups/CreateGroup',
			data: {
				groupName: groupName,
				userIds: usersIds
			}
		})
			.then((response) => {
				if (response.data.response === 'Success') {
					return axios.post(cors + url + `Groups/GetGroups`)
						.then((response) => {
							const groups = response.data
							dispatch(getAllGroups(groups));
							// history.push({pathname: '/all_groups'})
							// window.location.reload()
							
							dispatch(addNewGroupAction(false))
							dispatch(successMessageAction('Group Added Successfuly'))
							setTimeout(() => { if(response.statusText === 'OK'){ window.location.reload()}}, 1000)
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
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// delete group
export const DeleteGroupRequest = (groupId) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			url: cors + url + 'Groups/DeleteGroup',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			data: groupId
		})
			.then((response) => {
				if(response.data.response === 'Success') {
					const data = response.data.message
					dispatch(successMessageAction(data))
					return axios.post(cors + url + `Groups/GetGroups`)
						.then((response) => {
							const groups = response.data
							dispatch(getAllGroups(groups));
							// history.push({pathname: '/all_groups'})
							// window.location.reload()
							dispatch(successMessageAction('Groups removed Successfuly'))
							setTimeout(() => { if(response.statusText === 'OK'){ window.location.reload()}}, 1000)
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
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// edit group
export const editGroupRequest = (groupId, groupName, userIds) => {
	return (dispatch) => {
		dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			url: cors + url + 'Groups/EditGroup',
			data: {
				groupId: groupId,
				groupName: groupName,
				userIds: userIds
			}
		})
			.then((response) => {
				if (response.data.response === 'Success') {
					return axios.post(cors + url + `Groups/GetGroups`)
						.then((response) => {
							const groups = response.data
							dispatch(getAllGroups(groups));
							// history.push({pathname: '/all_groups'})
							// window.location.reload()
							dispatch(successMessageAction('Groups Was Edited Successfully'))
							setTimeout(() => { if(response.statusText === 'OK'){ window.location.reload()}}, 1000)
							dispatch(toggleLoaderAction(false))
						})
						.catch((error) => {
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
	}
};

// take all groups by user id
export const takeMyTournamentsRequest = (userId) => {
	return (dispatch) => {
		// dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			url: cors + url + 'Tournaments/GetUserTournaments',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			data: "'" + userId + "'"
		})
			.then((response) => {
				// const data = response.data.message
				const tournsData = response.data
				dispatch(takeMyTournaments(tournsData))
				// dispatch(successMessageAction(data))
				dispatch(toggleLoaderAction(false))
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};

// take all groups by user id
export const takeMyGroupsRequest = (userId) => {
	return (dispatch) => {
		// dispatch(toggleLoaderAction(true))
		return axios({
			method: 'POST',
			url: cors + url + 'Groups/GetUserGroups',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			data: "'" + userId + "'"
		})
			.then((response) => {
				// const data = response.data.message
				const groupsData = response.data
				dispatch(takeMyGroups(groupsData))
				// dispatch(successMessageAction(data))
				dispatch(toggleLoaderAction(false))
			})
			.catch((error) => {
				dispatch(catchErrorAction([error][0]))
				dispatch(errorMessageAction([error][0]))
				dispatch(toggleLoaderAction(false))
			});
	}
};


/////////////////////////////////////
//////////  GENERAL   ///////////////
//
//
// // get all tournaments by app comp
// export const appCallTakeAllTournaments = () => {
//     return (dispatch) => {
//         return axios.post(cors + url + `Tournaments/GetTournaments`)
//             .then((response) => {
//                 const tournaments = response.data
//                 dispatch(getAllToursAction(tournaments));
//             })
//             .catch((error) => {
//                 dispatch(catchErrorAction([error][0]))
//                 dispatch(errorMessageAction(error[0]))
//             });
//     }
// };
// // get all events by main page comp
// export const appCallTakeAllEvents = () => {
//     return (dispatch) => {
//         dispatch(toggleLoaderAction(true))
//         return axios.post(cors + url + `Events/GetEventTypes`)
//             .then((response) => {
//                 const eventTypes = response.data
//                 dispatch(getAllEventTypesAction(eventTypes));
//                 dispatch(toggleLoaderAction(false))
//             })
//             .catch((error) => {
//                 dispatch(catchErrorAction([error][0]))
//                 dispatch(errorMessageAction(error[0]))
//                 dispatch(toggleLoaderAction(false))
//             });
//     }
// };
// // get all groups by main page comp
// export const appCallgetAllGroupsRequest = () => {
//     return (dispatch) => {
//         dispatch(toggleLoaderAction(true))
//         return axios.post(cors + url + `Groups/GetGroups`)
//
//             .then((response) => {
//                     const groups = response.data
//                     dispatch(getAllGroups(groups));
//                     dispatch(toggleLoaderAction(false))
//             })
//             .catch((error) => {
//                 dispatch(catchErrorAction([error][0]))
//                 dispatch(errorMessageAction(error[0]))
//                 dispatch(toggleLoaderAction(false))
//             });
//     }
// };
//













