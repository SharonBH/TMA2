import React, { Component } from 'react';
import MDSpinner from "react-md-spinner";
import styles from '../Spinner/Spinner.scss'

class SmallSpinner extends Component {
	
	render() {
		return (
			<div className={styles.smallspinnerWrapper}>
				{/*<div className={styles.spinnerBg}></div>*/}
				<MDSpinner
					size={20}
					duration={2500}
					color1={'#03a3d0'}
					color2={'#d65000'}
					color3={'#03a3d0'}
					color4={'#999999'}
					borderSize={4}
					style={{'margin': '10px'}}
				/>
			</div>
		);
	}
}

export default SmallSpinner;