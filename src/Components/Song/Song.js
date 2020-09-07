import React, {Fragment, useContext} from 'react';
import { MainContext } from "../../Context/MainContext";
import Text from "../Text/Text";
import Level from "../Level/Level";
import Heart from "../Heart/Heart";
import defaultImage from "../../assets/defaultImage.png"
import styles from './Song.module.scss'

const Song = ({
				info,
				className
			   }) => {

	const { loading, songsList } = useContext(MainContext);

	// to add default image for broken images
	const addDefaultSrc = (e) => {
		e.target.src = defaultImage;
	}

	const handleClickOnHeart = () => {
		console.log("clocked")
	}

	return (
		<Fragment>
			<div className={`${styles['song']} ${styles[className]}`}>
				<div className={styles['song-info']}>
					<div className={styles['song-image']}>
						<img onError={addDefaultSrc} src={info.images} alt={info.title}/>
					</div>
					<div className={styles['song-details']}>
						<Text headingLevel="h5"> {info.title} </Text>
						<Text headingLevel="p">{info.artist}</Text>
					</div>
				</div>
				<div className={styles['song-action']}>
					<div className={styles['song-level']}>
						<Level levelNumber={info.level} />
					</div>
					<div className={styles['song-heart']}>
						<Heart makeFavorite={handleClickOnHeart} />
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Song;
