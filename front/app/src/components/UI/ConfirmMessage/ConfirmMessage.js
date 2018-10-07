import React, { Component } from 'react';
import { connect } from 'react-redux';
import BtnComp from '../UI/BtnComp/BtnComp';
import { signOutConfirmMessageAction, deleteUserConfirmMessageAction, getUserAction } from '../../actions';
import { DeleteUserRequest } from '../../actions/Api';
import classes from './ConfirmMessage.scss';
import history from '../../configuration/history';
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
        this.props.deleteUserConfirmMessageAction(false)
    }

    approve = (headline, user) => {
        switch(headline) {
            case 'delete user':
                this.props.DeleteUserRequest(user.username)
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

    render() {
        const { headline, user } = this.props
        return (
            <div className={classes.ConfirmMessageWrapper}>
                <Zoom duration={500}>
                    <div className={classes.ConfirmMessage}>
                        <p>Are you sure you want to {headline} {user.username}</p>
                        <div className={classes.btm}>
                            <BtnComp inputType="submit" name="Approve" content="Approve" onClick={() => this.approve(headline, user)}/>
                            <BtnComp inputType="submit" name="Denied" content="Denied" onClick={this.denied}/>
                        </div>
                    </div>
                </Zoom>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOutConfirmMessageAction: payload => dispatch(signOutConfirmMessageAction(payload)),
        deleteUserConfirmMessageAction: payload => dispatch(deleteUserConfirmMessageAction(payload)),
        DeleteUserRequest: payload => dispatch(DeleteUserRequest(payload)),
        getUserAction: payload => dispatch(getUserAction(payload)),
    }
}

export default connect(null, mapDispatchToProps)(ConfirmMessage);