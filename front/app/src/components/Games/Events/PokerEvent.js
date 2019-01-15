import React, { Component } from 'react';
import classes from '../../Register/RegisterComp.scss';
// import {  appCallTakeAllEvents } from "../../actions/GamesApi";
import { successMessageAction, errorMessageAction, addNewItemAction, addNewEventAction, addNewTournamentAction, editThisGroupAction, editThisEventAction } from '../../../actions';
import { connect } from 'react-redux';

import {ADD_EVENT, EDIT_EVENT } from '../../../configuration/config';
import AddEvent from '../../Add/AddEvent.js'


class PokerEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
  
    componentWillUnmount(){
        this.props.errorMessageAction(null);
        this.props.successMessageAction(null)
    }
  

	errorMessage = () => {
		const error = this.props.errorMessage;
		if (error !== null) {
			return <p className={classes.error}>{error}</p>
		} else {
			return null
		}
	};
	
	successMessage = () => {
		const success = this.props.successMessage;
		if (success !== null) {
			this.props.errorMessageAction(null);
			return <p className={classes.success}>{success}</p>
		} else {
			return null
		}
	};
	
    closePopUp = (headline) => {
        headline === ADD_EVENT ? this.props.addNewEventAction(false) : this.props.editThisEventAction(false);
        // this.props.addNewEventAction(false) : headline === EDIT_EVENT ? this.props.addNewEventAction(false) : null;

        //Change id to Edit Event
    };

    outputToRender = () => {
	    const { headline, group } = this.props;
        console.log("event", this.props.event);
        return <div className={classes.Register}>
                <h1>{headline}</h1>
                <form>
                <AddEvent eventDetils={this.props.event}/>
                    <div className={classes.closePopBtn} onClick={()=>this.closePopUp(headline)}><span>Close</span></div>
                    {this.errorMessage()}
                    {this.successMessage()}
                </form>
            </div>

	       
    };
    
    render() {
        return (
            <div className={classes.RegisterWrapper}>
                {this.outputToRender()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.sharedReducer.errorMessage,
        successMessage: state.sharedReducer.successMessage,
        allTournsList: state.allListReducer.allTournsList,
        allEventTypesList: state.allListReducer.allEventTypesList,
        groupsList: state.allListReducer.groupsList,
        groupById: state.allListReducer.groupById,
        tournByIdNoS: state.allListReducer.tournByIdNoS,
        groupsDataById: state.allListReducer.groupsDataById,
        currentUser: state.userReducer.currentUser,
	    addGroup: state.addNewItemReducer.addGroup
    }
};

const mapDispatchToProps = dispatch => {
    return {
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: (payload) => dispatch(successMessageAction(payload)),
        addNewItemAction: (payload) => dispatch(addNewItemAction(payload)),
        addNewEventAction: (payload) => dispatch(addNewEventAction(payload)),
        addNewTournamentAction: (payload) => dispatch(addNewTournamentAction(payload)),
        // appCallTakeAllEvents: (payload) => dispatch(appCallTakeAllEvents(payload)),
	    editThisGroupAction: (payload) => dispatch(editThisGroupAction(payload)),
        editThisEventAction: (payload) => dispatch(editThisEventAction(payload))
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PokerEvent);


