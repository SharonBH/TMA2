import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from './error404.gif';
import { connect } from 'react-redux';
import classes from './NotFound.scss';

class NotFound extends Component {

    render() {
        return (
            <div className = {classes.NotFound}>
                <img src={img} alt='NotFound' />
                <div className={classes.error}>
                    <span className={classes.ErrorNum}>{this.props.catchErrorNum}</span>
                    <span>Got lost? how? why? ohhhhh.....</span>
                    <button><Link to='/home'>Take Me Home</Link></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        catchErrorNum: state.sharedReducer.catchErrorNum
    }
}

export default connect(mapStateToProps)(NotFound);