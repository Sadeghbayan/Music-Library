import React, {Component} from 'react';
import Header from "../Header/Header"
import Filter from "../Filter/Filter"
import styles from './Main.module.scss'

class Main extends Component {

	state = {
		activeStatus : false
	}

	render() {

		const handleClick = (active) => {
			this.setState({
				activeStatus: !this.state.activeStatus
			})
		}

		const { activeStatus } = this.state

		return (
				<div className={styles['main-wrapper']}>
					<Header/>
					<section>
						<Filter active={activeStatus} handleClick={handleClick} />
					</section>
				</div>
		);
	}
}

export default Main;
