import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from './error404.gif';
import { connect } from 'react-redux';
import classes from './NotFound.scss';

class NotFound extends Component {

    state = {
        error: this.props.catchErrorNum
    }

    render() {
        return (
            <div className = {classes.NotFound}>
                <img src={img} alt='NotFound' />
                <div className={classes.error}>
                    <span className={classes.ErrorNum}>{this.state.error}</span>
                    <span>Got lost? how? why? ohhhhh.....</span>
                    <button><Link to='/home'>Take Me Home</Link></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        catchErrorNum: state.errorReducer.catchErrorNum
    }
}

export default connect(mapStateToProps)(NotFound);