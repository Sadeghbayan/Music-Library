import React, {Fragment, useState, useRef, useEffect} from 'react';
import Level from "../Level/Level"
import styles from './Filter.module.scss'

const Filter = ({children, active, handleClick}) => {
	const [filterStatus, setFilterStatus] = useState(false);
	const [selectedFilter, setFilterRange] = useState([]);
	const filterStatusRef = useRef(false)

	const handleStatus = () => {
		setFilterStatus(!filterStatus)
	}

	const selectFilter = (level) => {
		const index = selectedFilter.indexOf(level);
		if (index === -1) {
		// 	// if item doesn't exist push to array
			setFilterRange(oldArray => [...oldArray, level]);
		}
		else {
		// 	// if item exist remove the item and update the array
			const updatedArray = selectedFilter.splice(index, 1)
			setFilterRange(updatedArray);
		}
	}

	const displayRangeFilter = () => {
		// first check if the array has more than one item
		if (selectedFilter.length > 1) {
			const selected = selectedFilter.sort((a,b) => {
				return a - b
			});
			return `${selected[0]} - ${selected[selected.length - 1]} `
		} else {
			// if it has only one element no need for dash (-) anymore
			return selectedFilter[0]
		}
	}

	useEffect(() => {
		filterStatusRef.current = filterStatus
		handleClick(filterStatus)
	}, [filterStatus, selectedFilter])

	return(
		<Fragment>
			<div className={styles.filter} onClick={handleStatus}>
				<div className={styles['filter-top-info']}>
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
