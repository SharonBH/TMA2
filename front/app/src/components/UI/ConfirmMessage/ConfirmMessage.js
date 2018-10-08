import React, { Component } from 'react';
import { connect } from 'react-redux';
import BtnComp from '../BtnComp/BtnComp';
import { signOutConfirmMessageAction, deleteConfirmMessageAction, getUserAction } from '../../../actions';
import { DeleteUserRequest } from '../../../actions/Api';
import { DeleteTournamentRequest } from '../../../actions/GamesApi';
import classes from './ConfirmMessage.scss';
import history from '../../../configuration/history';
import Zoom from 'react-reveal/Zoom';

class ConfirmMessage extends Component {

    componentDidMount() {
        document.addEventListener("click", (evt) => {
            const confirmMessageWrapper = document.querySelector('.ConfirmMessage__ConfirmMessageWrapper___3lYEo')
            const confirmMessage = document.querySelector('.ConfirmMessage__ConfirmMessage___Y5-uk')
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
        switch(headline) {
            case 'delete user':
                this.props.DeleteUserRequest(user.username)
                break
            case 'delete tournament':
                this.props.DeleteTournamentRequest(itemForDel.tournamentId)
                break
            case 'sign out':
                this.props.getUserAction(null)
                localStorage.clear();
                sessionStorage.clear();
                history.push({pathname: '/'})
                break
            default: 
        }
        this.denied()
    }

    popUpContent = () => {
        const { headline, user, item } = this.props
        const itemForDel = this.props.allTournsList.find(id => { return id.tournamentId === item})
        console.log('cnfirm____________',this.props)
        const name = headline === 'delete user' ? user.username : itemForDel.tournamentName
        
        
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
        allTournsList: state.allListReducer.allTournsList
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signOutConfirmMessageAction: payload => dispatch(signOutConfirmMessageAction(payload)),
        deleteConfirmMessageAction: payload => dispatch(deleteConfirmMessageAction(payload)),
        DeleteUserRequest: payload => dispatch(DeleteUserRequest(payload)),
        DeleteTournamentRequest: payload => dispatch(DeleteTournamentRequest(payload)),
        getUserAction: payload => dispatch(getUserAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmMessage);