
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment'
import classes from '../../containers/MainPage/MainPage.scss';
import { takeMyEventsRequest } from '../../actions/GamesApi';
import { getAllRolesRequest } from '../../actions/Api';



export class HomeEvents extends Component {

    componentWillMount() {
        const userId = this.props.currentUser.userId
        setTimeout(() => {
            this.props.takeMyEventsRequest(userId)
        }, 200)
    }
    eventDateCheck = () => {

        this.props.myEventsById.map((item, index) => { 
            const parsedDate = Date.parse(item.eventDate)
            const today = Date.parse(new Date())
            // console.log('parsedDate', parsedDate)
            if(parsedDate < today) {
                return (
                    <li key={index}><div><p>{item.eventName}</p><p>{moment(parsedDate).format('DD-MM-YYYY')}</p></div></li>
                )
            } 
        })
        // console.log('222222', eventDate)
        // a.eventDate === today ? -1 :

        // const sortedEvents = this.props.myEventsById !== null ? eventDate.sort((a, today) => {
        //     return  a.eventDate < today ? 1 : -1
        // }) : null
        // console.log('sortedEvents', sortedEvents)
        // const startDateToCheck = Date.parse(this.state.selectedStartDate)
        // const endDateToCheck = Date.parse(this.state.selectedEndDate)
        // if (startDateToCheck >= endDateToCheck) {
        //     this.props.errorMessageAction('the tournament end date must be later than the start date')
        // }
    }
    
    futureEventsList = () => {
        return(
            <ul>
               { this.props.myEventsById.map((item, index) => { 
                    const parsedDate = Date.parse(item.eventDate)
                    const today = Date.parse(new Date())
                    if(parsedDate > today) {
                        return (
                            <li key={index}>
                                <div className={classes.eventData}>
                                    <p className={classes.eventName}><span>Event Name:</span>{item.eventName}</p>
                                    <p className={classes.eventDate}><span>Event Date:</span>{moment(parsedDate).format('DD-MM-YYYY HH:MM')}</p>
                                    <p><span>Users of Event:</span>{item.eventResults.map((user, i) => { return <i key={i}>{user.user.userName}</i>})}</p>
                                </div>
                            </li>
                        )
                    } 
                })
        }</ul>
        )
    }
    pastEventsList = () => {
        return(
            <ul>
               { this.props.myEventsById.map((item, index) => { 
                    const parsedDate = Date.parse(item.eventDate)
                    const today = Date.parse(new Date())
                    if(parsedDate < today) {
                        return (
                            <li key={index}>
                                <div className={classes.eventData}>
                                    <p className={classes.eventName}><span>Event Name:</span>{item.eventName}</p>
                                    <p className={classes.eventDate}><span>Event Date:</span>{moment(parsedDate).format('DD-MM-YYYY HH:MM')}</p>
                                    <p><span>Users of Event:</span>{item.eventResults.map((user, i) => { return <i key={i}>{user.user.userName}</i>})}</p>
                                </div>
                            </li>
                        )
                    } 
                })
        }</ul>
        )
    }
    render() {
        console.log('main props', this.props)
        return (
            <div className={classes.EventsPage}>
                <h1>Hello, you have some events</h1>
                <div className={classes.eventsTBLS}>
                    <div className={classes.eventsTable}>
                        <h4>Youre past events</h4>
                        <div>{this.pastEventsList()}</div>
                    </div>
                    <div className={classes.eventsTable}>
                        <h4>Youre future events</h4>
                        <div>{this.futureEventsList()}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser,
        myEventsById: state.allListReducer.myEventsById
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllRolesRequest: payload => dispatch(getAllRolesRequest(payload)),
        takeMyEventsRequest: payload => dispatch(takeMyEventsRequest(payload)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeEvents));