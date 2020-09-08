import React from 'react';
import styles from './CenterLayout.module.scss'

// Define valid mode
const validMode = ['center', 'no-padding']

const CenterLayout = ({
				  children,
				  mode
			  }) => {

	// check if mode passed or not
	const safeMode = mode ? mode.toLowerCase() : '';
	// check if the passed props is similar to what we define
	// if not we pass 'wrapper--normal' class as a valid class
	const defineClass = validMode.includes(safeMode) ? styles[safeMode] : 'wrapper--normal';
	return (
		<div className={`${styles['center-wrapper']} ${defineClass}`}>{children}</div>
	)
}

export default CenterLayout;
