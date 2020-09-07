import React, {Fragment} from 'react';
import styles from './Filter.module.scss'

const FilterItem = ({children}) => {
	return (
		<Fragment>
			<span className={styles.filterText}>{children}</span>
		</Fragment>
	)
}

export default FilterItem;
