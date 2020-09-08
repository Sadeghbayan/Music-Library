import React, {Fragment, useEffect, useState} from 'react';
import {URL} from "../../Helper"
import styles from './Heart.module.scss'

const Heart = ({
				   favStatus,
				   songId,
				   favId,
				   makeFavorite
			   }) => {

	const [fav, setFav] = useState(favStatus)

	const makeFavoriteAction = () => {
		setFavonSong()
	}

	const setFavonSong = async () => {
	//
		const songFormat = {"songId": songId}
	// 	//if favStatus is not true it means that song should be set to favorite if not we delete it
		if(!fav) {
			fetch(URL + "favorites", {
				method: 'post',
				body:JSON.stringify(songFormat)
			}).then(response => response.json()
			).then(function(data) {
				makeFavorite(data.id)
				setFav(true)
			});
		}else {
			fetch(URL + "favorites/" + favId, {
				method: 'Delete',
			}).then(function(response) {
			}).then(function(data) {
				setFav(!fav)
			});
		}
	}

	useEffect(() => {
		setFav(favStatus);
	},[favStatus])

	// change heart image per click
	const checkHeartStatus = () => {
		return fav ? styles['heartFilled'] : ''
	}

	return (
		<Fragment>
			{/*{console.log(favStatus)}*/}
			<div className={`${styles['heart']} ${checkHeartStatus()}`} onClick={makeFavoriteAction}></div>
		</Fragment>
	)
}

export default Heart;
