import axios from 'axios';
import history from '../configuration/history';
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
    getGroupById
} from './index';

// const cors = 'https://cors-anywhere.herokuapp.com/'
const cors = ''
const url = 'https://tma-api.azurewebsites.net/'

// get all tournaments
export const takeAllTournaments = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Tournaments/GetTournaments`)
            .then((response) => {
                    const tournaments = response.data
                    dispatch(getAllToursAction(tournaments));
                    // history.push({pathname: '/all_tournaments'})
                    return axios.post(cors + url + `Groups/GetGroups`)
                        .then((response) => {
                                const groups = response.data
                                dispatch(getAllGroups(groups));
                                dispatch(toggleLoaderAction(false))
                        })
                        .catch((error) => {
                            dispatch(catchErrorAction([error][0]))
                            dispatch(errorMessageAction(error[0]))
                            dispatch(toggleLoaderAction(false))
                        });  
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction(error[0]))
                dispatch(toggleLoaderAction(false))
            });  
    }
};

// get all events
export const takeAllEvents = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Events/GetEvents`)
            .then((response) => {
                // if(response.data.response === 'Success') {
                    // const data = response.data.message
                    // dispatch(successMessageAction(data))
                    const events = response.data
                    dispatch(getAllEventsAction(events));
                    return axios.post(cors + url + `Events/GetEventTypes`)
                    .then((response) => {
                        
                        const eventTypes = response.data
                        console.log('response2', eventTypes)
                        
                        dispatch(getAllEventTypesAction(eventTypes));
                        // history.push({pathname: '/all_events'})
                        dispatch(toggleLoaderAction(false))
                    })
                    .catch((error) => {
                        dispatch(catchErrorAction([error][0]))
                        dispatch(errorMessageAction([error][0]))
                        dispatch(toggleLoaderAction(false))
                    });
                // }  
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))
            });  
    }
};

// delete tournament
export const DeleteTournamentRequest = (tournamentId) => {
    return (dispatch) => {
        console.log('tournamentId', tournamentId)
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
                    history.push({pathname: '/all_tournaments'})
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

// delete event
export const DeleteEventRequest = (eventId) => {
    return (dispatch) => {
        console.log('eventId', eventId)
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
                return axios.post(cors + url + `Events/GetEvents`)
                .then((response) => {
                    const events = response.data
                    dispatch(getAllEventsAction(events))
                    // history.push({pathname: '/tournament_page'})
                    
                    dispatch(toggleLoaderAction(false))
                    return axios.post(cors + url + `Events/GetEventTypes`)
                    .then((response) => {
                        
                        const eventTypes = response.data
                        console.log('response2', eventTypes)
                        window.location.reload()
                        dispatch(getAllEventTypesAction(eventTypes));
                        // history.push({pathname: '/all_events'})
                        dispatch(toggleLoaderAction(false))
                    })
                    .catch((error) => {
                        dispatch(catchErrorAction([error][0]))
                        dispatch(errorMessageAction([error][0]))
                        dispatch(toggleLoaderAction(false))
                    });
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

// add New-Tournament Request
export const addNewTournamentRequest = (tournamentName, tournamentStartDate, tournamentEndDate, eventsMaxNum, EventTypeName, groups) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
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
                        const tournaments = response.data
                        dispatch(getAllToursAction(tournaments));
                        // history.push({pathname: '/tournament_page'})
                        dispatch(addNewTournamentAction(false))
                        dispatch(successMessageAction('Tournament Added Successfuly'))
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
// add New-eVENT Request
export const addNewEventRequest = (EventName, Tournament, EventDate, usersWithResults) => {
    
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
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
            dispatch(toggleLoaderAction(true))
            if (response.data.response === 'Success') {
                return axios.post(cors + url + `Events/GetEvents`)
                    .then((response) => {
                        const events = response.data
                        dispatch(getAllEventsAction(events));
                        // history.push({pathname: '/tournament_page'})
                        window.location.reload()
                        dispatch(addNewEventAction(false))
                        dispatch(successMessageAction('Event Added Successfuly'))
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
}

// edit User Request
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


// edit Event
export const editThisEventRequest = (eventID, eventName, tournN, eventDate, eventResults) => {
    return (dispatch) => {
        console.log('API', eventID, eventName, tournN, eventDate, eventResults)
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
            dispatch(toggleLoaderAction(true))
            if (response.data.response === 'Success') {
                dispatch(successMessageAction('Event Edited Successfuly'))
                return axios.post(cors + url + `Events/GetEvents`)
                .then((response) => {
                    const events = response.data
                    dispatch(getAllEventsAction(events));
                    window.location.reload()
                    // history.push({pathname: '/tournament_page/:tournamentName'})
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
}
// get all tournaments by app comp
export const appCallTakeAllTournaments = () => {
    return (dispatch) => {
        return axios.post(cors + url + `Tournaments/GetTournaments`)
            .then((response) => {
                const tournaments = response.data
                dispatch(getAllToursAction(tournaments));
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction(error[0]))
            });  
    }
};

// get all events by main page comp
export const appCallTakeAllEvents = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Events/GetEventTypes`)
            .then((response) => {
                const eventTypes = response.data
                dispatch(getAllEventTypesAction(eventTypes));
                dispatch(toggleLoaderAction(false))
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction(error[0]))
                dispatch(toggleLoaderAction(false))
            });
    }
};
// get all groups by main page comp
export const appCallgetAllGroupsRequest = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Groups/GetGroups`)
        
            .then((response) => {
                    const groups = response.data
                    dispatch(getAllGroups(groups));
                    dispatch(toggleLoaderAction(false))
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction(error[0]))
                dispatch(toggleLoaderAction(false))
            });  
    }
};
export const tournEventsByIdRequest = (tournamentId) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios({
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            url: cors + url + 'Events/GetEventsByTournamentId',
            data: tournamentId
        })
        .then((response) => {
            const tournamentId = response.data
            dispatch(getTournByIdNoSAction(tournamentId))
            dispatch(toggleLoaderAction(false))
        })
    }
}
// get Tournament By Id
export const goToTournPageRequest = (tournamentId) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios({
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            url: cors + url + 'Tournaments/GetTournamentById',
            data: tournamentId
        })
        .then((response) => {
            localStorage.setItem('localStoreTournament', JSON.stringify(response.data));
            const tournamentById = JSON.parse(localStorage.getItem('localStoreTournament'));
            const groupId = response.data.groupId
            dispatch(getTournByIdAction(tournamentById));

            return axios({
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8'},
                url: cors + url + 'Groups/GetGroupById',
                data: groupId
            })
            .then((response) => {
                const groupById = response.data;
                dispatch(getGroupById(groupById));
                dispatch(toggleLoaderAction(false));
                return axios.post(cors + url + `Groups/GetGroups`)
                .then((response) => {
                        const groups = response.data
                        dispatch(getAllGroups(groups));
                })
                .catch((error) => {
                    dispatch(catchErrorAction([error][0]))
                    dispatch(errorMessageAction(error[0]))
                
                })
            }).catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction(error[0]))
            
            });

        })
        .catch((error) => {
            dispatch(catchErrorAction([error][0]))
            dispatch(errorMessageAction(error[0]))
        
        });
    }
};

// get all groups
export const getAllGroupsRequest = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Groups/GetGroups`)
            .then((response) => {
                    const groups = response.data
                    dispatch(getAllGroups(groups));
                    history.push({pathname: '/groups'})
                    dispatch(toggleLoaderAction(false))
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
                        history.push({pathname: '/groups'})
                        // window.location.reload()
                        dispatch(addNewGroupAction(false))
                        dispatch(successMessageAction('Group Added Successfuly'))
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
}

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
                        history.push({pathname: '/groups'})
                        dispatch(successMessageAction('Groups removed Successfuly'))
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
                dispatch(successMessageAction('Group Edited Successfuly'))
                return axios.post(cors + url + `Groups/GetGroups`)
                .then((response) => {
                    const groups = response.data
                        dispatch(getAllGroups(groups));
                        history.push({pathname: '/groups'})
                        dispatch(successMessageAction('Groups Was Edited Successfully'))
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
}