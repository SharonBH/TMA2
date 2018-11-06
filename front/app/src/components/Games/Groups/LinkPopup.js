import React, { Component } from 'react';
import classes from './Groups.scss';
import { connect } from 'react-redux';
import { takeGroupIdPopAction }  from '../../../actions';

class LinkPopup extends React.Component {

    closeMessage = (item) => {
        console.log('2342342')
        this.props.takeGroupIdPopAction(false)
    }
    render() {
      return (
        <div className={classes.popupLink}>
          <div className={classes.popup_inner}>
            <span>{`https://tma-front.azurewebsites.net?groupId=${this.props.groupId}`}</span>
            <span onClick={()=>this.closeMessage()} className={classes.closeBTN }>x</span>
          </div>
        </div>
      );
    }
  }
    const mapStateToProps = (state) => {
        return {
            groupId: state.allListReducer.groupId,  
        } 
    }
    const mapDispatchToProps = dispatch => {
        return{
            takeGroupIdPopAction: (payload) => dispatch(takeGroupIdPopAction(payload)),
        }
    }

  export default connect(mapStateToProps, mapDispatchToProps)(LinkPopup);