import React from 'react';
import styles from './HeroImage.module.scss'
import heroImage2x from "../../assets/yousician-hero@2x.png";
import heroImage3x from "../../assets/yousician-hero@3x.png";
import heroImage from "../../assets/yousician-hero.png";
import heroMobileImage2x from "../../assets/yousician-hero-mobile@2x.png";
import heroMobileImage3x from "../../assets/yousician-hero-mobile@3x.png";


const HeroImage = () => {

	return (
		<picture className={styles['hero-image']}>
			<source
				media="(min-width: 1200px)"
				srcSet={`${heroImage2x} 2x, ${heroImage3x} 3x`}
				type="image/webp"
			/>
			<source
				media="(min-width: 900px)"
				srcSet={`${heroImage} 1x, ${heroImage2x} 2x`}
				type="image/webp"
			/>
			<source
				media="(min-width: 601px)"
				srcSet={`${heroImage} 1x, ${heroImage2x} 2x`}
				type="image/webp"
			/>
			<source
				srcSet={`${heroMobileImage2x} 1x, ${heroMobileImage3x} 2x`}
				type="image/webp"
			/>
			<img
				srcSet={`${heroImage} 600w,
            ${heroImage2x} 900w,
            ${heroImage3x} 1440w`}
				src={heroImage} //This is the file that loads in the browser
				type="image/jpeg"
				alt="image description"
			/>
		</picture>
	)
}

export default HeroImage;
