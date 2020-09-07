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
		setFilterStatus(selectedFilter.push(level))
	}

	const displayRangeFilter = () => {
		const selected = selectedFilter.sort((a,b) => {
			return a - b
		});
		return `${selected[0]} - ${selected[selected.length - 1]} `
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
					<span className={`${styles.filterImage} ${!filterStatus && selectedFilter.length ? styles['filter-image-active']: ''}`}></span>
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
