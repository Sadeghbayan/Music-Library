import React, {useState, useEffect, useRef, useCallback} from 'react';
import { Ellipsis } from 'react-spinners-css';
import Header from "../Header/Header"
import Filter from "../Filter/Filter"
import CenterLayout from "../Layout/CenterLayout/CenterLayout";
import Song from "../Song/Song"
import { MainContext } from "../../Context/MainContext"
import styles from './Main.module.scss'
import { URL } from "../../Helper"

const { Provider } = MainContext;

// color for loading
const color = "#939393"


export default function Main() {

	const [songsList, updateSongsList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [start, setStart] = useState(0);
	const [end, setEnding] = useState(10);
	const [filter, setFilter] = useState('');
	const [filterStatus, setVisibilityFilter] = useState('');
	const [favorites, setFavorites] = useState([]);
	const [needsUpdate, setUpdate] = useState(false);
	const [query, setSearchQuery] = useState('');

	// to check if scroll receives end of the page
	const observer = useRef()
	const lastSongElementRef = useCallback(node => {
		if (loading) return
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setEnding(end => end + 10)
				setStart(start => start + 10)
			}
		})
		if (node) observer.current.observe(node)
	}, [loading])


	//gather needed information to be hold by Context
	const value = {
		loading,
		setLoading,
		songsList,
		updateSongsList,
		start,
		end,
		setEnding,
		setStart,
		filter,
		setFilter,
		setVisibilityFilter,
		filterStatus,
		setSearchQuery,
	}

	const fetchData = async () => {
		setLoading(true);
		try {
			const makeQuery = query ? `&${query}` : ''
			const filterQuery = filter ? `&${filter}`: ''
			const response = await fetch(URL + `songs?_start=${start}&_end=${end}${filterQuery}${makeQuery}`);
			const data = await response.json();
			if(filter){
				const sortedData = data.sort((a, b) => a.level - b.level);
				updateSongsList(songsList => [...songsList,...sortedData]);
			}else {
				updateSongsList(songsList => [...songsList,...data]);
			}
			setLoading(false)
			setUpdate(!needsUpdate)
		} catch (e) {
			console.error(e);
		}
	}

	const fetchFavoritesData = async () => {
		setLoading(true);
		try {
			const response = await fetch(URL + `favorites`);
			const data = await response.json();
			setFavorites(favorites => [...favorites,...data])
			const fav = {fav:true}
			let mergeFavWithSongs = songsList.map(item => {
				let item2 = favorites.find(i2 => i2.songId === item.id);
				return item2 ? { ...item, ...fav, ...{favId:item2.id} } : item;
			});
			updateSongsList(mergeFavWithSongs)
			setLoading(false);
		} catch (e) {
			console.error(e);
		}
	}

	useEffect(() => {
		fetchFavoritesData();
	},[needsUpdate])


	useEffect(() => {
			fetchData();
	}, [start, filter, query]);


	return (
		<Provider value={value}>
			<div className={styles['main-wrapper']}>
				<Header/>
				<section>
					<CenterLayout mode="no-padding">
						<Filter />
						<div className={styles['songs-wrapper']}>

							{songsList.map((item, index) => {
								if (songsList.length === index + 1 && songsList.length > 6) {
									return <Song ref={lastSongElementRef} key={item.id} info={item} className={index % 2 ? 'even' : 'odd'} />
								} else {
									return <Song key={index} info={item} className={index % 2 ? 'even' : 'odd'} />
								}
							})}

							{loading &&
							<div className={styles['loading']}>
								<Ellipsis color={color} size={50} />
							</div>}
						</div>
					</CenterLayout>
				</section>
			</div>
		</Provider>
	);
}

