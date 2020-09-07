import React from 'react';
import Text from '../Text/Text'
import CenterLayout from "../Layout/CenterLayout/CenterLayout"
import HeroImage from "../HeroImage/HeroImage"
import Search from "../Search/Search"
import styles from './Header.module.scss'
const Header = () => {
	return (
		<header className={styles.header}>
			<HeroImage />
			<CenterLayout mode="center">
				<Text headingLevel="h1" textStyle="uppercase"> New Songs Delivered Every Week </Text>
				<Text headingLevel="h6"> Here are the most recent additions to the Yousician App. Start playing today!</Text>
				<Search />
			</CenterLayout>
		</header>
	)
}

export default Header;
