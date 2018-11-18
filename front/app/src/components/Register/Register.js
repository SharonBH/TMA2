import React, { Component } from 'react';
import classes from './RegisterComp.scss';
// import {  appCallTakeAllEvents } from "../../actions/GamesApi";
import { successMessageAction, errorMessageAction, addNewItemAction, addNewEventAction, addNewTournamentAction, editThisGroupAction } from '../../actions';
import { connect } from 'react-redux';

import {ADD_TOURNAMENT, EDIT_GROUP, ADD_USER, REGISTER, ADD_NEW_GROUP, ADD_EVENT} from '../../configuration/config';
import AddEvent from '../Add/AddEvent.js'
import AddTournament from '../Add/AddTournament.js'
import AddUser from '../Add/AddUser.js'
import AddGroup from '../Add/AddGroup.js'


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    componentWillMount() {
        const { headline, group } = this.props;
        if(headline === ADD_TOURNAMENT) {
            // this.props.appCallTakeAllEvents()
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
		headline === ADD_EVENT
        ? this.props.addNewEventAction(false)
		: (headline === REGISTER || headline === ADD_USER || headline === ADD_NEW_GROUP  )
		? this.props.addNewItemAction(false)
		: headline === ADD_TOURNAMENT
		? this.props.addNewTournamentAction(false)
        : headline === EDIT_GROUP
        ? this.props.editThisGroupAction(false)
		
        : null
	};
	

    outputToRender = () => {
	    const { headline, classStr, group } = this.props;
    
        return <div className={classes.Register}>
                <h1>{headline}</h1>
                <form>
                    {headline === ADD_EVENT
                        ? <AddEvent/>
	                    : headline === EDIT_GROUP
		                    ? <AddGroup headline={headline} group={group}/>
                            : headline === ADD_TOURNAMENT
                                ? <AddTournament/>
                                : headline === REGISTER || headline === ADD_USER
                                    ? <AddUser headline={headline}/>
                                    : headline === ADD_NEW_GROUP
                                        ? <AddGroup headline={headline}/>
                                        : null
                    
                    }
                    {headline !== REGISTER
	                    ? <div className={classes.closePopBtn} onClick={()=>this.closePopUp(headline)}><span>Close</span></div>
                        : null
                    }
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
     
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);


