import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTournamentTandCRequest } from '../../../actions/GamesApi';
import BtnComp from '../../UI/BtnComp/BtnComp';
import classes from './Modal.scss';
import CKEditor from 'react-ckeditor-component';


class Modal extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        tournament: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            text: null,
            tournament: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ text: nextProps.text });
        this.setState({ tournament: nextProps.tournament });
    }

    saveTandC = (item) => {
        const tournamentId = item.tournamentId
        const termsAndConditions = this.state.text 
        if (this.state.text !== item.termsAndConditions) {
            this.props.editTournamentTandCRequest(tournamentId, item.eventTypeName, item.groupId, item.tournamentName, item.startDate, item.endDate, item.numberOfEvents, termsAndConditions)
            this.props.onClose()
        }
        
    }

    handleInputChange(evt) {
        var newContent = evt.editor.getData();
        this.setState({text: newContent});
    }

    render() {
    if(!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: 'fixed',
      top: 100,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)'
    };

      const modalStyle = {
      position: 'relative',
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 700,
      height: 480,
      margin: '0 auto',
      padding: 30
        };

        const btnWidthStyle = {
            width: '80px'
        }


        return (
      <div className="backdrop" style={backdropStyle}>

        <div className="modal" style={modalStyle}>
                <h1>Edit TandC of: {this.state.tournament.tournamentName}</h1>
                <div> 
                    <CKEditor activeClass="editor" content={this.state.text} events={{ "change": (evt)=> this.handleInputChange(evt) }} />
                </div>             
                    <span className={classes.SubmitAll}>
                        <BtnComp className={classes.editBtn} style={btnWidthStyle} content='Save' onClick={() => this.saveTandC(this.state.tournament)} />
                        </span>
                <div className={classes.closePopBtn} onClick={this.props.onClose}><span>Close</span></div>
            </div>
                </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
  children: PropTypes.node
};

const mapDispatchToProps = dispatch => {
    return {
        editTournamentTandCRequest: (tournamentId, eventType, groupId, tournamentName, startDate, endDate, numberOfEvents, termsAndConditions) => dispatch(editTournamentTandCRequest(tournamentId, eventType, groupId, tournamentName, startDate, endDate, numberOfEvents, termsAndConditions)),
    }
}


export default connect(undefined, mapDispatchToProps)(Modal);