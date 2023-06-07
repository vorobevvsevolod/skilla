import React from 'react';
import styles from './style.module.scss'
const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.header_container}>
				<div className={styles.header_left}>
					<div className={styles.header_left_date}>Среда, 13 окт</div>
					
					<div className={styles.header_left_callAnalytics}>
						<div className={styles.header_left_callAnalytics_item}>
							<div className={styles.header_left_callAnalytics_item_title}>
								Новые звонки <span style={{color: '#00A775'}}>20 из 30 шт</span>
							</div>
							<div className={styles.header_left_callAnalytics_item_bar}>
								<div className={styles.header_left_callAnalytics_item_bar_value} style={{backgroundColor: "#28A879", width: "68px"}}></div>
							</div>
						</div>
						
						<div className={styles.header_left_callAnalytics_item}>
							<div className={styles.header_left_callAnalytics_item_title}>
								Качество разговоров  <span style={{color: '#FFB800'}}>40%</span>
							</div>
							<div className={styles.header_left_callAnalytics_item_bar}>
								<div className={styles.header_left_callAnalytics_item_bar_value} style={{backgroundColor: "#FFD500", width: "67px"}}></div>
							</div>
						</div>
						
						<div className={styles.header_left_callAnalytics_item}>
							<div className={styles.header_left_callAnalytics_item_title}>
								Конверсия в заказ   <span style={{color: '#EA1A4F'}}>67%</span>
							</div>
							<div className={styles.header_left_callAnalytics_item_bar}>
								<div className={styles.header_left_callAnalytics_item_bar_value} style={{backgroundColor: "#EA1A4F", width: "78px"}}></div>
							</div>
						</div>
					
					</div>
				</div>
				<div className={styles.header_right}>
					<img className={styles.header_right_search} src="/img/header/search.png" alt="search"/>
					
					<div className={styles.header_right_nameCompany}>
						<span>ИП Сидорова Александра Михайловна</span>
						<img className={styles.header_right_arrowDown} src="/img/header/arrow_down.png" alt="arrow_down"/>
					</div>
					
					<div className={styles.header_right_avatar}>
						<img src="/img/header/avatar.png" alt=""/>
						<img className={styles.header_right_arrowDown} src="/img/header/arrow_down.png" alt="arrow_down"/>
					</div>
				</div>
				
			</div>
		
		</header>
	);
};

export default Header;