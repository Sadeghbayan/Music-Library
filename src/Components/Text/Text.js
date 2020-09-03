import React from 'react';
import styles from './Text.module.scss'

// Valid H Tags
const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

// Valid Text Style
const validStyle = ['uppercase', 'normal'];

const Text = ({
				children,
				headingLevel,
				textStyle
			  }) => {
	// check if heading level passed or not
	const safeHeading = headingLevel ? headingLevel.toLowerCase() : '';
	// check if the passed props is similar to what we define
	// if not we pass 'p' tag as a valid tag
	const Title = validHeadingLevels.includes(safeHeading) ? safeHeading : 'p';

	// check if textStyle passed or not
	const safeTextStyle = textStyle ? textStyle.toLowerCase() : '';
	// check if the passed props is similar to what we define
	// if not we pass 'normal' style as a valid style
	const textFromatStyle = validStyle.includes(safeTextStyle) ? styles[safeTextStyle] : 'normal';

	return (
		<Title className={textFromatStyle}>{children}</Title>
	)
}

export default Text;
