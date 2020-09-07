import React, {Fragment, useState} from 'react';
import styles from './Heart.module.scss'

const Heart = ({
				   makeFavorite
			   }) => {

	const [fav, setFav] = useState(false)

	const makeFavoriteAction = () => {
		setFav(!fav)
	}

	// change heart image per click
	const checkHeartStatus = () => {
		return fav ? styles['heartFilled'] : ''
	}

	return (
		<Fragment>
			<div className={`${styles['heart']} ${checkHeartStatus()}`} onClick={makeFavoriteAction}></div>
		</Fragment>
	)
}

export default Heart;
