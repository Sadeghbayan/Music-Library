import React, {Fragment,useState, useEffect} from 'react';
import { Ellipsis } from 'react-spinners-css';
import Header from "../Header/Header"
import Filter from "../Filter/Filter"
import CenterLayout from "../Layout/CenterLayout/CenterLayout";
import Song from "../Song/Song"
import { MainContext } from "../../Context/MainContext"
import styles from './Main.module.scss'

const { Provider } = MainContext;

// color for loading
const color = "#939393"

const Main = () => {

	const [activeStatus, setActiveStatus] = useState(false);
	const [songsList, updateSongsList] = useState([]);
	const [loading, setLoading] = useState(true);

	//gather needed information to be hold by Context
	const value = {
		loading,
		songsList,
		activeStatus
	}

	const handleClick = () => {
		setActiveStatus(!activeStatus)
	}

	useEffect(() => {
		const fetchData = async () => {
			const url = "http://localhost:3004/";
			try {
				const response = await fetch(url + 'songs?_start=23&_end=33');
				const data = await response.json();
				updateSongsList(data)
				setLoading(false)
			} catch (e) {
				console.error(e);
			}
		}

		fetchData();
	}, []);


	return (
			<Provider value={value}>
				<div className={styles['main-wrapper']}>
					<Header/>
					<section>
						<CenterLayout mode="column">
							<Filter active={activeStatus} handleClick={handleClick} />
							<div className={styles['songs-wrapper']}>
								{loading ?
									<div className={styles['loading']}>
										<Ellipsis color={color} size={50} />
									</div> :
									<Fragment>
										{songsList.map((item, index) =>
											<Song key={item.id} info={item} className={index % 2 ? 'even' : 'odd'} />
										)}
									</Fragment>
								}
							</div>
						</CenterLayout>
					</section>
				</div>
			</Provider>
	);
}

export default Main;
