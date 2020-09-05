import React, {Fragment, useState, useContext} from 'react';
import SearchIcon from '../../assets/icons/search.svg'
import styles from './Search.module.scss'

const Search = () => {
	const [search, setInput] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(search)
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
