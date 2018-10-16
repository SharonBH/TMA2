import React, { Component } from 'react';
import { connect } from 'react-redux';
import BtnComp from '../BtnComp/BtnComp';
import { signOutConfirmMessageAction, deleteConfirmMessageAction, getUserAction } from '../../../actions';
import { DeleteUserRequest } from '../../../actions/Api';
import { DeleteTournamentRequest, DeleteEventRequest, DeleteGroupRequest } from '../../../actions/GamesApi';
import classes from './ConfirmMessage.scss';
import history from '../../../configuration/history';
import Zoom from 'react-reveal/Zoom';
import { DELETE_EVENT, DELETE_GROUP, DELETE_TOURNAMENT, DELETE_USER, SING_OUT } from '../../../configuration/config'

class ConfirmMessage extends Component {

    componentDidMount() {
        document.addEventListener("click", (evt) => {
            const confirmMessageWrapper = document.querySelector('.ConfirmMessage__ConfirmMessageWrapper___2SxOr')
            const confirmMessage = document.querySelector('.ConfirmMessage__ConfirmMessage___195l6')
            let targetEl = evt.target
            do { 
               if (targetEl === confirmMessageWrapper) {
                    this.denied()
                } else if(targetEl === confirmMessage) {
                    return
                }
                // Go up the DOM
                targetEl = targetEl.parentNode;
            }
            while (targetEl)
        });
    }

    componentWillUnmount() {
        this.denied()
        document.removeEventListener("click", (evt) => {})
    }

    denied = () => {
        this.props.signOutConfirmMessageAction(false)
        this.props.deleteConfirmMessageAction(false)
    }

    approve = (headline, user ) => {
        const { item } = this.props
        const itemForDel = this.props.allTournsList.find(id => { return id.tournamentId === item})
        const eventForDel = this.props.allEventsList.find(id => { return id.eventId === item})
        switch(headline) {
            case DELETE_USER:
                this.props.DeleteUserRequest(user.username)
                break
            case DELETE_TOURNAMENT:
                this.props.DeleteTournamentRequest(itemForDel.tournamentId)
                break
            case DELETE_EVENT:
                this.props.DeleteEventRequest(eventForDel.eventId)
                break
            case SING_OUT:
                this.props.getUserAction(null)
                localStorage.clear();
                sessionStorage.clear();
                history.push({pathname: '/'})
                break
            case DELETE_GROUP:
                this.props.DeleteGroupRequest(item.groupId)
                break
            default: 
        }
        this.denied()
    }

    popUpContent = () => {
        const { headline, user, item } = this.props
        const itemForDel = this.props.allTournsList.find(id => { return id.tournamentId === item})
        const eventForDel = this.props.tournById.events.find(id => { return id.eventId === item})
        let name = ''
        
        // headline === 'delete user' ? user.username : itemForDel.tournamentName
        if(headline === DELETE_USER){
            name = user.username
        } else if(headline === DELETE_TOURNAMENT){
            name =  itemForDel.tournamentName
        } else if (headline === SING_OUT){
            name = ''
        }else if(headline === DELETE_EVENT){
            name =  eventForDel.eventName
        }else if(headline === DELETE_GROUP){
            name =  item.groupName
        }

        return (
            <div className={classes.ConfirmMessageWrapper}>
                <Zoom duration={500}>
                    <div className={classes.ConfirmMessage}>
                        <p>Are you sure you want to {headline} {name}</p>
                        <div className={classes.btm}>
                            <BtnComp inputType="submit" name="Approve" content="Approve" onClick={() => this.approve(headline, user)}/>
                            <BtnComp inputType="submit" name="Denied" content="Denied" onClick={this.denied}/>
                        </div>
                    </div>
                </Zoom>
            </div>
        );
    }

    render() {
        return (
            this.popUpContent()
        )
    }
}
const mapStateToProps = (state) => {
    return {
        allList: state.allListReducer.allList,
        allTournsList: state.allListReducer.allTournsList,
        allEventsList: state.allListReducer.allEventsList,
        tournById: state.allListReducer.tournById,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signOutConfirmMessageAction: payload => dispatch(signOutConfirmMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload)),
        DeleteUserRequest: payload => dispatch(DeleteUserRequest(payload)),
        DeleteTournamentRequest: payload => dispatch(DeleteTournamentRequest(payload)),
        DeleteEventRequest: payload => dispatch(DeleteEventRequest(payload)),
        getUserAction: payload => dispatch(getUserAction(payload)),
        DeleteGroupRequest: payload => dispatch(DeleteGroupRequest(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmMessage);