import React from 'react';
import classes from './Groups.scss';
import { connect } from 'react-redux';
import { takeGroupIdPopAction }  from '../../../actions';

class LinkPopup extends React.Component {

    closeMessage = (item) => {
        this.props.takeGroupIdPopAction(false)
    }
    render() {
      return (
        <div className={classes.popupLink}>
          <div className={classes.popup_inner}>
            <span>{`https://tma-front.azurewebsites.net/register?groupId=${this.props.groupId}`}</span>
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