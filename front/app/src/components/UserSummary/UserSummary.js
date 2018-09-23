import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import BtnComp from '../UI/BtnComp/BtnComp';
import InputComp from '../UI/InputComp/InputComp';

class UserSummary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userDetailsArr: [
                {detail: 'Name', param: this.props.currentUser.name, edit: false},
                {detail: 'UserName', param: this.props.currentUser.username, edit: false},
                {detail: 'eMail', param: this.props.currentUser.email, edit: false},
                {detail: 'Password', param: this.props.currentUser.password, edit: false},
                {detail: 'UserType', param: this.props.currentUser.role, edit: false}
            ]
        }
        this.editDetail = this.editDetail.bind(this)
    }

    editDetail = (index) => {
        const details = Object.assign([], this.state.userDetailsArr)
        if(details[index].edit) {
            details[index].edit = false
        } else {
            details[index].edit = true
        }
        console.log(details)
        this.setState({userDetailsArr: details})
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
                        <InputComp 
                            name={detail} 
                            placeholder={detail} 
                            content={item.param}
                        />
                      </div> 
                    : <span>{item.param}</span>
                }
                <div className={classes.EditBtn}>
                    <BtnComp 
                        className={classes.smallBtn} 
                        inputType="submit" 
                        content={edit ? 'submit' : 'Edit'} 
                        onClick={this.editDetail.bind(this, index, detail, edit)}
                    />
                </div>
            </div>
        )
    }

    userSummary = (headline) => {
        const currentUser = this.props.currentUser
        return (
            <div className={classes.Profile}>
                <h1>{currentUser.name} {headline}</h1>
                {this.state.userDetailsArr.map((item, index) => {
                    return this.detailLine(item, index)
                })}
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
        const { headline } = this.props
        return (
            <div className={classes.ProfileWrapper}>
                {this.userSummary(headline)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.UserLogInReducer.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);