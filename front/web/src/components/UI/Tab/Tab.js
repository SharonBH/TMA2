import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from '../BtnComp/BtnComp.scss';

export class Tab extends Component {
	
	static propTypes = {
		inputType: PropTypes.oneOf(['submit', 'button']).isRequired,
		onClick: PropTypes.func,
		content: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		disabled: PropTypes.bool
	};
	
	render(){
		return (
			<div className={classes.tabElement} >
				
				<input
					className={classes.tabBtn}
					type={this.props.inputType}
					value={this.props.content}
					onClick={this.props.onClick}
					disabled={this.props.disabled}
				/>
			</div>
		)
	}
}

export default Tab;