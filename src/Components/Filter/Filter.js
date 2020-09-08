import React, {Fragment, useState, useContext, useEffect, useRef} from 'react';
import Level from "../Level/Level"
import { MainContext } from "../../Context/MainContext"
import styles from './Filter.module.scss'


const Filter = () => {
	const [filterStatus, setFilterStatus] = useState(false);
	const [selectedFilter, setFilterRange] = useState([]);
	const didMountRef = useRef(false);

	const {
		updateSongsList,
		setEnding,
		setStart,
		setFilter,
		setVisibilityFilter,
		setLoading
	} = useContext(MainContext)

	const handleStatus = () => {
		setFilterStatus(!filterStatus)
		setVisibilityFilter(!filterStatus)
		if (filterStatus) {
			didMountRef.current = true
		}
	}

	const selectFilter = (level) => {
		const index = selectedFilter.indexOf(level);
		if (index === -1) {
		// 	// if item doesn't exist push to array
			setFilterRange(selectedFilter => [...selectedFilter, level]);
		}
		else {
		// 	// if item exist remove the item and update the array
			const updatedArray = selectedFilter.filter(item => item !== level)
			setFilterRange(updatedArray);
		}
	}

	const displayRangeFilter = () => {
		// first check if the array has more than one item
		if (selectedFilter.length > 1) {
			const selected = selectedFilter.sort((a,b) => a - b);
			return `${selected[0]} - ${selected[selected.length - 1]}`
		} else {
			// if it has only one element no need for dash (-) anymore
			return selectedFilter[0]
		}
	}

	//fetch data based on level

	const fetchDataBasedOnLevel = async () => {
		if (selectedFilter.length > 0) {
			updateSongsList([])
			setEnding(10)
			setStart(0)
			//add `level=` before each item
			const newLineOflevels = selectedFilter.map(item => 'level=' + item).join('&')
			setFilter(newLineOflevels)
		}
	}

	useEffect(() => {
		if (didMountRef.current) {
			fetchDataBasedOnLevel();
		} else {
			didMountRef.current = true;
		}
	}, [selectedFilter])

	return(
		<Fragment>
			<div className={`${styles.filter} filter--outside`}>
				<div className={styles['filter-top-info']} onClick={handleStatus}>
					<span className={styles.filterText}> {filterStatus ? 'Hide Filter' : 'Filter By Level'}</span>
					{!filterStatus && selectedFilter.length ? (
						<span className={styles['range']}> {displayRangeFilter()} </span>
					) : null}
					<span
						className={`${styles.filterImage} 
						${!filterStatus && selectedFilter.length ? styles['filter-image-active']: ''}`}
					>
					</span>
				</div>
				<div className={`${styles['filter-levels']} ${filterStatus ? styles['visible'] : styles['hide']}`}>
					{[...Array(15).keys()].map(i => (
						<Level key={i} levelNumber={i+1} clickHandler={selectFilter} />
					))}
				</div>

			</div>
		</Fragment>
	)
}

export default Filter;
