import axios from 'axios';
import history from '../configuration/history';
import {
    catchErrorAction,
    toggleLoaderAction,
    getAllToursAction,
    errorMessageAction,
    successMessageAction,
    addNewItemAction,
    getAllEventsAction,
    getAllEventTypesAction
} from './index';

// get all tournaments
export const takeAllTournaments = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Tournaments/GetTournaments`)
            .then((response) => {
                    const tournaments = response.data
                    dispatch(getAllToursAction(tournaments));
                    history.push({pathname: '/all_tournaments'})
                    dispatch(toggleLoaderAction(false))
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))
            });  
    }
};

// get all events
export const takeAllEvents = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Events/GetEvents`)
            .then((response) => {
                console.log('response', response)
                // if(response.data.response === 'Success') {
                    // const data = response.data.message
                    // dispatch(successMessageAction(data))
                    const events = response.data
                    dispatch(getAllEventsAction(events));
                    return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Events/GetEventTypes`)
                    .then((response) => {
                        
                        const eventTypes = response.data
                        console.log('response2', eventTypes)
                        
                        dispatch(getAllEventTypesAction(eventTypes));
                        history.push({pathname: '/all_events'})
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
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Tournaments/DeleteTournament',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: tournamentId
        })
        .then((response) => {
            if(response.data.response === 'Success') {
                const data = response.data.message
                dispatch(successMessageAction(data))
                return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Tournaments/GetTournaments`)
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
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Events/DeleteEvent',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            data: eventId
        })
        .then((response) => {
            if(response.data.response === 'Success') {
                const data = response.data.message
                dispatch(successMessageAction(data))
                return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Events/GetEvents`)
                .then((response) => {
                    const events = response.data
                    dispatch(getAllEventsAction(events))
                    history.push({pathname: '/all_events'})
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

// add New-User Request
export const addNewTournamentRequest = (tournamentName, startDate, endDate, numberOfEvents) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios({
            method: 'post',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            url: 'https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Tournaments/CreateTournament',
            data: {
                tournamentName: tournamentName,
                startDate: startDate,
                endDate: endDate,
                numberOfEvents: numberOfEvents
            }
        })
        .then((response) => {
            console.log('2222222', response)
            if (response.data.response === 'Success') {
                return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Tournaments/GetTournaments`)
                    .then((response) => {
                        const tournaments = response.data
                        dispatch(getAllToursAction(tournaments));
                        // history.push({pathname: '/all_tournaments'})
                        dispatch(addNewItemAction(false))
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

export const addNewEventRequest = (EventName, EventType, Tournament, EventDate) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios({
            method: 'post',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            url: 'https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Events/CreateEvent',
            data: {
                eventName: EventName,
                eventTypeName: EventType,
                tournamentName: Tournament,
                eventDate: EventDate
            }
        })
        .then((response) => {
            console.log('2222222', response)
            if (response.data.response === 'Success') {
                return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Events/GetEvents`)
                    .then((response) => {
                        const events = response.data
                        dispatch(getAllEventsAction(events));
                        // history.push({pathname: '/all_tournaments'})
                        dispatch(addNewItemAction(false))
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
export const editThisTournamentRequest = ( tournamentId, heading, tournamentName, startDate, endDate, numberOfEvents) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        console.log(tournamentId)
        return axios({
            method: 'post',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            url: 'https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Tournaments/EditTournament',
            data: {
                tournamentId: tournamentId,
                tournamentName: tournamentName,
                startDate: startDate,
                endDate: endDate,
                numberOfEvents: numberOfEvents
            }
        })
        .then((response) => {
            if (response.data.response === 'Success') {
                dispatch(successMessageAction('Tournament Edited Successfuly'))
                return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Tournaments/GetTournaments`)
                .then((response) => {
                    const tournaments = response.data
                    dispatch(getAllToursAction(tournaments));
                    history.push({pathname: '/all_tournaments'})
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