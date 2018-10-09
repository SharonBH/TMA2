import React, { Component} from 'react';
import classes from './HomePage.scss';
import { connect } from 'react-redux';
import { appCallTakeAllUsers } from '../../actions/Api';

export class HomePage extends Component {

    componentDidMount() {
        const user = this.props.currentUser
        if(user !== null && user !== undefined && user.role === 'Admin') {
            this.props.appCallTakeAllUsers()
        }
    }
    
    render(){
        return (
            <div className={classes.homePage}>
                <span>Hello on home page</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        appCallTakeAllUsers: payload => dispatch(appCallTakeAllUsers(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);