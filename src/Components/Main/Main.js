import React, {Component} from 'react';
import Header from "../Header/Header"
import styles from './Main.module.scss'

class Main extends Component {

	render() {
		return (
				<div className={styles['main-wrapper']}>
					<Header/>
					<section>

					</section>
				</div>
		);
	}
}

export default Main;
