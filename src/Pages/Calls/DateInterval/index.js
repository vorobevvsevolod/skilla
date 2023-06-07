import React, { useState } from 'react';
import styles from './styles.module.scss'
import {OpenedPopup} from "../index";
function DateInterval() {
	const {setDate, date} = React.useContext(OpenedPopup)
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	
	React.useEffect(() => {
		let dateCopy = date;
		console.log(dateCopy);
		if(dateCopy.start !== startDate) setDate({start: startDate, end: dateCopy.end});
	}, [startDate]);
	
	React.useEffect(() => {
		let dateCopy = date;
		
		if(dateCopy.end !== endDate) setDate({start: dateCopy.start, end: endDate});
	}, [endDate]);
	
	
	return (
		<div>
			<span className={styles.text}>начало</span>
			<input className={styles.inputSimvol} type="date" onChange={(event) => setStartDate(event.target.value)}/>
			
			<span className={styles.text}>Конец</span>
			<input className={styles.inputSimvol} type="date" onChange={(event) => setEndDate(event.target.value)}/>
		</div>
	);
}

export default DateInterval;
