import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import BtnComp from '../UI/BtnComp/BtnComp';
import InputComp from '../UI/InputComp/InputComp';
import SelectComp from '../UI/SelectComp/SelectComp.js';
import { editProfileRequest } from '../../actions/Api';
import { editDeniedAction } from '../../actions';
import Spinner from '../UI/Spinner';

class UserSummary extends Component {

    constructor(props) {
        super(props)

        const name = this.props.user.name
        const username = this.props.user.username
        const email = this.props.user.email
        const password = this.props.user.password
        const role = this.props.user.role

        this.state = {
            userDetailsArr: [
                {edit: false, detail: 'Name', param: name, editInput: name},
                {edit: false, detail: 'User Name', param: username, editInput: username},
                {edit: false, detail: 'eMail', param: email, editInput: email},
                {edit: false, detail: 'Password', param: password, editInput: password},
                {edit: false, detail: 'User Type', param: role,  editInput: role}
            ],
        }
        this.editDetail = this.editDetailBtn.bind(this)
    }

    componentDidMount() {
        this.props.editDeniedAction(null)
    }

    editDetailBtn = (index) => {
        const details = Object.assign([], this.state.userDetailsArr)
        if(details[index].edit) {
            details[index].edit = false
        } else {
            details[index].edit = true
        }
        this.setState({userDetailsArr: details})
    }

    editDetailInput = (index, e) => {
        const details = Object.assign([], this.state.userDetailsArr)
            details[index].editInput = e.target.value
        this.setState({
            userDetailsArr: details
        })
    }
    
    submitAllChangesDetails = () => {
        this.props.editProfileRequest(
            this.state.userDetailsArr[0].editInput,
            this.state.userDetailsArr[1].editInput,
            this.state.userDetailsArr[2].editInput,
            this.state.userDetailsArr[3].editInput,
            this.state.userDetailsArr[4].editInput,
        )
    }

    detailLine = (item, index) => {
        const detail = item.detail
        const edit = item.edit
        return (
            <div key={index}>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? <div className={classes.EditInput}>
                        {
                            detail === 'User Type'
                            ? <SelectComp 
                                onChange={(e) => this.editDetailInput(index, e)}
                                options={['user', 'admin']}
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
                    : <span>{item.param}</span>
                }
                <div className={classes.EditBtn}>
                    <BtnComp 
                        className={classes.smallBtn} 
                        inputType="submit" 
                        content={edit ? 'Not Now' : 'Edit'} 
                        onClick={() => this.editDetailBtn(index)}
                    />
                </div>
            </div>
        )
    }

    errorMessage = () => {
        const error = this.props.errorMessage
        if (error !== null) {
            return <p>{error}</p>
        } else {
            return null
        }
    }

    spinner = () => {
        if (this.props.toggleSpinner) {
            return <Spinner />
        } else {
            return null
        }
    }

    userSummary = (headline, user) => {
        return (
            <div className={classes.Profile}>
                <h1>{headline} {user.name}</h1>
                {this.spinner()}
                {this.state.userDetailsArr.map((item, index) => {
                    return this.detailLine(item, index)
                })}
                {this.errorMessage()}
                <span className={classes.SubmitAll}>
                    <BtnComp 
                        className={classes.smallBtn} 
                        inputType="submit" 
                        content='Submit All Changes'
                        onClick={this.submitAllChangesDetails}
                    />
                </span>
            </div>
        )
    }

    render() {
        const { headline, user } = this.props
        console.log(user)
        return (
            <div className={classes.ProfileWrapper}>
                {this.userSummary(headline, user)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.editErrorMessageReducer.errorMessage,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editProfileRequest: (name, userName, email, password, userType) => dispatch(editProfileRequest(name, userName, email, password, userType)),
        editDeniedAction: payload => dispatch(editDeniedAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);