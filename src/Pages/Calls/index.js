import React from 'react';
import styles from './styles.module.scss'
import Sort from "./Sort";
import DateInterval from "./DateInterval";

export const Context = React.createContext(null);
const Calls = () => {
	const [opened, setOpened] = React.useState("");
	const [in_out, setIn_out] = React.useState(null);
	const [date, setDate] = React.useState({start: "", end: ""});
	const [calls, setCalls] = React.useState([]);
	
	function changeInOut(itemTitle) {
		switch (itemTitle){
			case "Исходящие": setIn_out(1); break;
			case "Входящие": setIn_out(0); break;
			case "Все типы": setIn_out(null); break;
		}
	}
	
	function parsingTime (time){
		if(time === 0) return "";
		for (let minute = 0; time >= 0; minute++) {
			time -= 60;
			if(time <= 0 ) if(time + 60 < 10) return `${minute}:0${time + 60}`; else return `${minute}:${time + 60}`
		}
	}
	
	function getDateRange(duration) {
		
		const start = new Date();
		if(duration !== "сегодня"){
			switch (duration) {
				case '3 дня':
					start.setDate(start.getDate() - 3);
					break;
				case 'Неделя':
					start.setDate(start.getDate() - 7);
					break;
				case 'Месяц':
					start.setMonth(start.getMonth() - 1);
					break;
				case 'Год':
					start.setFullYear(start.getFullYear() - 1);
					break;
			}
		}
		
		
		const end = new Date();
			function FormatDate (date){
				const year = date.getFullYear();
				const month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
				const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
				return `${year}-${month}-${day}`;
			}
			
		
		if(duration !== "сегодня") setDate({start: FormatDate(start), end: FormatDate(end)}); else return FormatDate(start);
	}
	
	function formatPhoneNumber(phoneNumber) {
		const countryCode = "+7";
		const areaCode = phoneNumber.substring(1, 4);
		const firstPart = phoneNumber.substring(4, 7);
		const secondPart = phoneNumber.substring(7, 9);
		const thirdPart = phoneNumber.substring(9, 11);
		
		return `${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
	}
	
	React.useEffect(() =>{
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer testtoken");
		
		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			redirect: 'follow'
		};
		fetch(`https://api.skilla.ru/mango/getList?${(in_out !== null) ? `in_out=${in_out}` : ""}${(date.start !== '') ? `&date_start=${date.start}&date_end=${date.end !== '' ? date.end : getDateRange("сегодня")}`: ''} `  , requestOptions)
			.then(response => response.json())
			.then(result => {
				setCalls(result.results)
			})
			.catch(error => console.log('error', error));
	}, [date.start, date.end, in_out])
	return (
		<div className={styles.calls}>
			<Context.Provider value={{opened, setOpened, setDate, date}}>
			<div className={styles.container}>
				<div className={styles.sortPanel}>
					<div className={styles.sortPanel_one}>
						<div className={styles.sortPanel_one_balance}>
							<span>Баланс: <b>272 ₽</b> </span>
							<img src="/img/pages/calls/Balance_add.png" alt="add"/>
						</div>
						
						<Sort values={[{title: "3 дня"}, {title: "Неделя"}, {title: "Месяц"}, {title: "Год"} ]} date={true} onChange={getDateRange}/>
						
					
					</div>
				</div>
				
				<div className={styles.sortPanel_two}>
					<div className={styles.sortPanel_two_searchField}>
						<svg className={styles.sortPanel_two_searchField_img} width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z" fill="#2052AC"/>
						</svg>
						
						<div className={styles.input}>Поиск по звонкам</div>
						
						
					
					</div>
					
					<div className={styles.sortPanel_two_sortBy}>
						
							<Sort values={[{title: "Все типы"}, {title: "Исходящие"},{title: "Входящие"} ]} onChange={changeInOut}/>
							<Sort values={[{title: "Все сотрудники"} ]}/>
							<Sort values={[{title: "Все звонки"} ]}/>
							<Sort values={[{title: "Все источники"} ]}/>
							<Sort values={[{title: "Все оценки"} ]}/>
							<Sort values={[{title: "Все ошибки"} ]}/>
						
					</div>
				</div>
				
					<table className={styles.tableCalls}>
						<thead className={styles.tableCalls_header}>
						<tr className={styles.tableCalls_row}>
							<th className={`${styles.tableCalls_col} ${styles.radio}`} width={40} align="center"><input type="radio"/></th>
							<th className={styles.tableCalls_colHead}>Тип</th>
							<th className={styles.tableCalls_colHead}>Время</th>
							<th className={styles.tableCalls_colHead}>Сотрудник</th>
							<th className={styles.tableCalls_colHead}>Звонок</th>
							<th className={styles.tableCalls_colHead}>Источник</th>
							<th className={styles.tableCalls_colHead}>Оценка</th>
							<th className={styles.tableCalls_colHead}>Длительность</th>
						</tr>
						</thead>
						<tbody>
						{
							calls.length && calls?.map(item => (
								<tr className={styles.tableCalls_row} key={item.id}>
									<td className={`${styles.tableCalls_col} ${styles.radio}`} width={50} align="center"><input type="checkbox"/></td>
									<td className={styles.tableCalls_col} width={60} >
										{(item.in_out) === 0
											? (item.status === "Не дозвонился") ? <img src="/img/pages/calls/исходящийНедозвонился.png" alt="исходящийНедозвонился"/>: <img src="/img/pages/calls/исходящий.png" alt="исходящий"/>
											: (item.status === "Не дозвонился") ? <img src="/img/pages/calls/входящийНедозвонился.png" alt="входящийНедозвонился"/>: <img src="/img/pages/calls/входящий.png" alt="входящий"/>}
									</td>
									<td className={styles.tableCalls_col} width={100} >{item.date.split(' ')[1]}</td>
									<td className={styles.tableCalls_col} width={100} ><img width={32} height={32} src={item.person_avatar} alt=""/></td>
									<td className={styles.tableCalls_col} width={300} >{formatPhoneNumber(item.partner_data.phone)} {item.partner_data.name && <div className={styles.tableCalls_col_nameCompany}>{item.partner_data.name}</div>}</td>
									<td className={styles.tableCalls_col} width={150} >{item.source}</td>
									<td className={`${styles.tableCalls_col} ${styles.tableCalls_col_source}`} width={150} ></td>
									<td className={`${styles.tableCalls_col} ${styles.audio}`} width={410} >
										<div className={styles.time}>{parsingTime(item.time)}</div>
										
										{ (item.time > 0) &&
											<div className={styles.audio_player_container}>
												<div className={styles.audio_player}>
													<div className={styles.audio_player_time}>{parsingTime(item.time)}</div>
													<svg className={styles.audio_player_play} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="24" height="24" rx="12" fill="white"/>
														<path d="M9.28742 7.06938C9.3761 7.02316 9.47535 7 9.57475 7C9.67389 7 9.77311 7.02316 9.86218 7.06938L16.7125 11.5519C16.8901 11.6442 17 11.8152 17 12.0001C17 12.1849 16.8904 12.3559 16.7125 12.4481L9.86218 16.9308C9.68439 17.0231 9.46523 17.0231 9.28757 16.9308C9.10976 16.8382 9 16.6672 9 16.4825V7.51755C9 7.33278 9.10958 7.16182 9.28742 7.06938Z" fill="#002CFB"/>
													</svg>
													<div className={styles.audio_player_line}></div>
													<svg className={styles.audio_player_download} width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0 16H13V14.1176H0V16ZM13 5.64706H9.28571V0H3.71429V5.64706H0L6.5 12.2353L13 5.64706Z" fill="#ADBFDF"/>
													</svg>
													
													<svg className={styles.audio_player_delete} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#002CFB"/>
													</svg>
												
												</div>
											</div>
										}
									</td>
								</tr>
							))
						}
						</tbody>
					</table>
					
			</div>
			</Context.Provider>
		</div>
	);
};

export default Calls;