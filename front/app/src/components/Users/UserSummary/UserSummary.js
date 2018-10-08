import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import BtnComp from '../../UI/BtnComp/BtnComp';
import InputComp from '../../UI/InputComp/InputComp';
import SelectComp from '../../UI/SelectComp/SelectComp.js';
import {  changePasswordRequest, editThisUserRequest } from '../../../actions/Api';
import {  editThisTournamentRequest } from '../../../actions/GamesApi';
import ChangePassword from '../../ChangePassword/ChangePassword';
import { changePassOpenAction, successMessageAction, errorMessageAction, editThisItemAction }  from '../../../actions';

class UserSummary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentUser: '',
            changePassword: false,
            // password: password,
            userDetailsArr: this.detailsToState()
        }
        this.editDetail = this.editDetailBtn.bind(this)
    }
    detailsToState = () => {
        const headline = this.props.headline
        if(headline === 'Edit Tournament'){
            const tournamentData = this.props.tournament
            const tournamentName = tournamentData.tournamentName
            const startDate = tournamentData.startDate
            const endDate = tournamentData.endDate
            const numberOfEvents = tournamentData.numberOfEvents
            return ([
                    {edit: false, detail: 'Tournament Name', param: tournamentName, editInput: tournamentName},
                    {edit: false, detail: 'Start Date', param: startDate, editInput: startDate},
                    {edit: false, detail: 'End Date', param: endDate, editInput: endDate},
                    {edit: false, detail: 'Max Events', param: numberOfEvents,  editInput: numberOfEvents},
                ])
        } else {
            const userData = this.props.user
            const name = userData.name
            const username = userData.username
            const email = userData.email
            const password = userData.password
            const role = userData.role
            return ( [
                    {edit: false, detail: 'User Name', param: username, editInput: username},
                    {edit: false, detail: 'Name', param: name, editInput: name},
                    {edit: false, detail: 'eMail', param: email, editInput: email},
                    {edit: false, detail: 'User Type', param: role,  editInput: role},
                ])
        }
    }
    componentWillUnmount() {
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({changePassword: false})
    }

    editDetailBtn = (index) => {
        const details = Object.assign([], this.state.userDetailsArr)
        if(details[index].edit) { details[index].edit = false} 
        else { details[index].edit = true }
        this.setState({userDetailsArr: details})
    }

    editDetailInput = (index, e) => {
        const details = Object.assign([], this.state.userDetailsArr)
        details[index].editInput = e.target.value
        this.setState({ userDetailsArr: details })
    }
  
    changePassword = () => {
        setTimeout(() => {
            this.setState({changePassword: true})
        }, 200)
    }

    editBtnFunc = (item, index) => {
        if(item.detail === 'Name' || item.detail === 'eMail' || (this.props.editThisItem && item.detail !== 'User Name' )) {
            return (
                <div className={classes.BTN}>
                    <i className={ 
                        item.edit 
                            ?  classes.active + ' fas fa-pen' 
                            : classes.notActive + ' fas fa-pen'  } 
                        onClick={() => this.editDetailBtn(index)}>
                    </i>
                </div> 
            )
        } else {
            return null
        }
    }
    
    errorMessage = () => {
        const error = this.props.errorMessage
        if (error !== null) {
            return <p className={classes.error}>{error}</p>
        } else {
            return null
        }
    }
    successMessage = () => {
        const success = this.props.successMessage
        if (success !== null) {
            this.props.errorMessageAction(null)
            return <p className={classes.success}>{success}</p>
        } else {
            return null
        }
    }

    changePassBtn = (username) => {
        this.props.successMessageAction(null)
        this.props.errorMessageAction(null)
        setTimeout(() => {
            this.props.changePassOpenAction(true)
            this.setState({username: username})
        }, 200)
    }

    closePopUp = () => {
        this.props.editThisItemAction(false)
    }

    submitUserAditeChanges = (headline) => {

        
        const editRequestParam = [
            headline,
            this.state.userDetailsArr[0].editInput,
            this.state.userDetailsArr[1].editInput,
            this.state.userDetailsArr[2].editInput,
            this.state.userDetailsArr[3].editInput,
        ]
        if(headline === 'Edit Tournament'){
            const tournamentId = this.props.tournament.tournamentId
            this.props.editThisTournamentRequest(tournamentId, editRequestParam[0], editRequestParam[1], editRequestParam[2], editRequestParam[3], editRequestParam[4])
        } else{
          this.props.editThisUserRequest(editRequestParam[0],editRequestParam[1],editRequestParam[2],editRequestParam[3],editRequestParam[4])
        }  
        
    }
    detailLine = (item, index, headline) => {

        const detail = item.detail
        return (

            <div key={index} className={classes.wrappLine}>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? <div className={classes.EditInput}>
                        {
                            detail === 'User Type'
                            ? <SelectComp 
                                onChange={(e) => this.editDetailInput(index, e)}
                                options={['User', 'Admin']}
                                placeholder='Select User Type'
                            />
                            : <InputComp 
                                inputType={'text'}
                                name={detail} 
                                placeholder={detail} 
                                content={this.state.userDetailsArr[index].editInput}
                                onChange={(e) => this.editDetailInput(index, e)}
                            />
                        } 
                      </div> 
                    : headline === "Edit" ? <span className={classes.editLineInput}>{item.param}</span> : <span>{item.param}</span>
                }
                {this.editBtnFunc(item, index)}
            </div>
        )
    }
    editGameLine = (item, index) => {
        const allTous = this.props.allTournsList !== undefined ? this.props.allTournsList.map((item) => { return item}) : null
        const events = events === undefined ? ['no events'] : allTous.map((item) => { return item.eventName});
        const detail = item.detail
        return (

            <div key={index} className={classes.wrappLine}>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? <div className={classes.EditInput}>
                        {
                            detail === 'Max Events'
                            ? <SelectComp 
                                onChange={(e) => this.editDetailInput(index, e)}
                                options={events}
                                placeholder='Select Max Number of Events'
                            />
                            : <InputComp 
                                inputType={detail === 'Tournament Name' ? 'text' : 'date'}
                                name={detail} 
                                placeholder={detail} 
                                content={this.state.userDetailsArr[index].editInput}
                                onChange={(e) => this.editDetailInput(index, e)}
                            /> 
                        } 
                      </div> 
                    : <span className={classes.editLineInput}>{item.param}</span>
                }
                {this.editBtnFunc(item, index)}
            </div>
        )
    }
    userSummary = (headline, user, tournament) => {
        const headLine = headline;
        let name = ''
        let tourn = ''
        if(headline !== 'Edit Tournament'){
             name = user !== null ?  user.name.charAt(0).toUpperCase() + user.name.slice(1) : null
        } else {
            tourn = tournament !== null ? tournament.tournamentName : null
        }
        
        return (
            <div className={classes.Profile} >
                {headline === 'Edit Tournament' ? <h1>{headline} {tourn}</h1> : <h1>{headline} {name}</h1>}
                {this.state.userDetailsArr.map((item, index) => { 
                    if(headline === 'Edit Tournament'){
                    return this.editGameLine(item, index, headLine)
                    } else{
                        return this.detailLine(item, index, headLine)
                    }
                })}
                {this.errorMessage()}
                {this.successMessage()}
                <span className={classes.SubmitAll}>
                    <BtnComp 
                        className={classes.editBtn} 
                        inputType="submit" 
                        content='Save All Changes'
                        onClick={() => this.submitUserAditeChanges(headline)}
                    />
                </span>
                {(headline !== 'Register' && headline !== 'Your Profile') ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                {this.props.editThisItem ? null : <span className={classes.changePass}  onClick={this.changePassBtn}>Change Password</span>}   
                {this.props.passwords ? <ChangePassword headline='Change Password' user={user.username} classStr='none' /> : null}
                
            </div>
        )
    }

    render() {
        console.log('state', this.state)
        console.log('111', this.props)
        const { headline, user, tournament } = this.props
        return (
            <div className={classes.ProfileWrapper}>
                {this.userSummary(headline, user, tournament)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.sharedReducer.errorMessage,
        successMessage: state.sharedReducer.successMessage,
        passwords: state.userReducer.passwords,
        currentUser: state.userReducer.currentUser,
        editThisItem: state.editItemReducer.editThisItem,
        allTournsList: state.allListReducer.allTournsList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePassOpenAction: payload => dispatch(changePassOpenAction(payload)),
        changePasswordRequest: (username, password, newPassword, confirmPassword) => dispatch(changePasswordRequest(username, password, newPassword, confirmPassword)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        editThisItemAction: (payload) => dispatch(editThisItemAction(payload)),
        editThisUserRequest: (headline, userName, name, email, userType) => dispatch(editThisUserRequest(headline, userName, name, email, userType)),
        editThisTournamentRequest: (tournamentId, headline, tournamentName, startDate, endDate, numberOfEvents) => dispatch(editThisTournamentRequest(tournamentId, headline, tournamentName, startDate, endDate, numberOfEvents)),
        

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);