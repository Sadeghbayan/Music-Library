import React, {Fragment, useState, useContext} from 'react';
import SearchIcon from '../../assets/icons/search.svg'
import styles from './Search.module.scss'
import {MainContext} from "../../Context/MainContext";

const Search = () => {
	const [search, setInput] = useState("");

	const {
		setEnding,
		setStart,
		setSearchQuery,
		updateSongsList
	} = useContext(MainContext)

	const handleSubmit = (e) => {
		e.preventDefault();
		updateSongsList([])
		setEnding(10)
		setStart(0)
		//add `level=` before each item
		const newLineOflevels = "search_like="+search
		setSearchQuery(newLineOflevels)
	}

	return (
		<Fragment>
			<form className={styles['search-form']} onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search for songs by artist or title"
					value={search}
					onChange={e => setInput(e.target.value)}
				/>
				<input type="submit" value="Submit" style={{backgroundImage: `url(${SearchIcon})`}}/>
			</form>

		</Fragment>
	)
}

export default Search;
