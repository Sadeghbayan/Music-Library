import React from 'react';
import styles from './CenterLayout.module.scss'

// Define valid mode
const validMode = ['row', 'column']

const CenterLayout = ({
				  children,
				  mode
			  }) => {

	// check if mode passed or not
	const safeMode = mode ? mode.toLowerCase() : '';
	// check if the passed props is similar to what we define
	// if not we pass 'center-wrapper--row' class as a valid class
	const flexDirectionClass = validMode.includes(safeMode) ? styles['center-wrapper--column'] : 'center-wrapper--row';

	return (
		<div className={`${styles['center-wrapper']} ${flexDirectionClass}`}>{children}</div>
	)
}

export default CenterLayout;
