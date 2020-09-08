import React, {useEffect, useState} from 'react';
import styles from './Level.module.scss'


const levelPattern = [
	{id:1, color: '#6fc13e', strokeArray: '12.5, 254'},
	{id:2, color: '#6fc13e', strokeArray: '31.5, 254'},
	{id:3, color: '#6fc13e', strokeArray: '45.5, 254'},
	{id:4, color: '#6fc13e', strokeArray: '62.5, 254'},
	{id:5, color: '#6fc13e', strokeArray: '81.5, 201'},
	{id:6, color: '#ff8e00', strokeArray: '81.5, 201', strokeArrayNextCircle: '19.5, 284'},
	{id:7, color: '#ff8e00', strokeArray: '81.5, 201', strokeArrayNextCircle: '30.5, 284'},
	{id:8, color: '#ff8e00', strokeArray: '81.5, 201', strokeArrayNextCircle: '42.5, 284'},
	{id:9, color: '#ff8e00', strokeArray: '81.5, 201', strokeArrayNextCircle: '62.5, 284'},
	{id:10, color: '#ff8e00', strokeArray: '81.5, 201', strokeArrayNextCircle: '88.5, 284'},
	{id:11, color: '#dc001c', strokeArray: '81.5, 201', strokeArrayNextCircle: '88.5, 284', strokeArrayLastCircle: '12.5, 303'},
	{id:12, color: '#dc001c', strokeArray: '81.5, 201', strokeArrayNextCircle: '88.5, 284', strokeArrayLastCircle: '31.5, 303'},
	{id:13, color: '#dc001c', strokeArray: '81.5, 201', strokeArrayNextCircle: '88.5, 284', strokeArrayLastCircle: '45.5, 284'},
	{id:14, color: '#dc001c', strokeArray: '81.5, 201', strokeArrayNextCircle: '88.5, 284', strokeArrayLastCircle: '62.5, 284'},
	{id:15, color: '#dc001c', strokeArray: '81.5, 201', strokeArrayNextCircle: '88.5, 284', strokeArrayLastCircle: '81.5, 284'},
]


const Level = ({
				   levelNumber,
					clickHandler
				 }) => {

	const [activeStatus, setActiveStatus] = useState(false);
	const [pattern, setPattern] = useState([]);

	const handleClickFromOutside = (e) => {
		clickHandler(levelNumber)
		e.stopPropagation();
		setActiveStatus(!activeStatus)
	}

	useEffect(() => {
		const setLevelPattern = () => {
			const patternIsFind = levelPattern.filter(item => {
				return item.id === levelNumber
			})
			setPattern(patternIsFind)
		}

		setLevelPattern();
	}, [])

	return (
		<div className={`level-container--outside ${styles['level-container']} ${activeStatus ? styles['level-active'] : ''}` } onClick={handleClickFromOutside}>
			<div className={styles['level-container-inner']}>
				<div className={styles['level-number']}>
					{levelNumber}
				</div>
				<div className={styles['level-indicator']}>
					<svg viewBox='0 0 100 100' className={styles['svg']}>
						<circle className={styles['svg-gray']} cx='50' cy='50' r='45'/>
						<circle className={styles['svg-red']} cx='50' cy='50' r='45'/>
						<circle className={styles['svg-blue']} cx='50' cy='50' r='45'/>
						<circle className={styles['svg-orange']} cx='50' cy='50' r='45'/>
						{/*1-4*/}
						<circle className={styles['svg-green']}
								cx='50' cy='50'
								r='45'
								stroke={pattern[0] ? pattern[0].color : null}
								strokeDasharray={pattern[0] ? pattern[0].strokeArray : null}
						/>
						{pattern[0] && pattern[0].id > 5 ? (
							<circle className={styles['svg-blue-next']}
									cx='50' cy='50'
									r='45'
									stroke={pattern[0] ? pattern[0].color : null}
									strokeDasharray={pattern[0] && pattern[0].id > 5 ? pattern[0].strokeArrayNextCircle : null}
							/>
						) : null}
						{pattern[0] && pattern[0].id > 10 ? (
							<circle className={styles['svg-red-last']}
									cx='50' cy='50'
									r='45'
									stroke={pattern[0] ? pattern[0].color : null}
									strokeDasharray={pattern[0] && pattern[0].id > 5 ? pattern[0].strokeArrayLastCircle : null}
							/>
						) : null}

					</svg>
				</div>
			</div>
		</div>
	)
}

export default Level;
