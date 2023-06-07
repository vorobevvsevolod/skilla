import React from 'react';
import styles from './styles.module.scss'
const ButtonNav = (props) => {
	return (
		<button className={styles.button}>
			<span>{props.title}</span>
			<img src={props.img} alt=""/>
		</button>
	);
};

export default ButtonNav;