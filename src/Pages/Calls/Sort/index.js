import React from 'react';
import styles from './styles.module.scss';
import {Context} from "../index";
import DateInterval from "../DateInterval";
const Sort = (props) => {
	const {opened, setOpened} = React.useContext(Context);
	const [open, setOpen] = React.useState(false)
	const [dateInterval, setDateInterval] = React.useState(false)
	const [active, setActive] = React.useState("")
	const [mass, setMass] = React.useState([])
	const { date} = React.useContext(Context)
	function onClickItem (itemTitle, dateBool) {
		if(!dateBool){
			setActive(itemTitle);
			setDateInterval(false);
			props.onChange(itemTitle);
		}
	}
	
	
	React.useEffect(() =>{
		if(open){
			setOpened(active);
		}
	}, [open])
	
	React.useEffect(()=>{
		if(dateInterval) setActive(`${date.start} - ${date.end}`)
	},[date])
	
	React.useEffect(() =>{
		if(opened !== active){
			setOpen(false)
		}
	}, [opened])
	
	React.useEffect(() =>{
		if(active === "")setActive(props.values[0]?.title)
		setMass(props.values)
	}, [props.values])
	
	if(props.date)
		return (
			<div className={styles.popup_date}>
				<svg className={styles.popup_date_arrow} width="7" height="10" viewBox="0 0 7 10" fill="none" >
					<path d="M6.175 8.825L2.35833 5L6.175 1.175L5 0L0 5L5 10L6.175 8.825Z" fill="#ADBFDF"/>
				</svg>
				
				<div className={styles.popup_date_content} onClick={() => setOpen(!open)}>
					<svg className={styles.popup_date_content_calendar} width="16" height="18" viewBox="0 0 16 18" fill="none" >
						<path d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z" fill="#ADBFDF"/>
					</svg>
					
					<span>{active}</span>
				</div>
				
				<svg className={styles.popup_date_arrow} width="7" height="10" viewBox="0 0 7 10" fill="none" >
					<path d="M0.589844 8.825L4.40651 5L0.589844 1.175L1.76484 0L6.76484 5L1.76484 10L0.589844 8.825Z" fill="#ADBFDF"/>
				</svg>
				
				{
					(open
						&& <div className={styles.popup}>
							{
								mass.map(item =>(
									<div key={item.title} className={`${styles.popup_item} ${item.title === active ? styles.popup_item_active : ''}`} onClick={() => {onClickItem(item.title); setOpen(!open);}} >{item.title}</div>
								))
							}
							<div key={"интервал"} className={`${styles.popup_item} `} onClick={() => {onClickItem("", true); setDateInterval(true)}} ><DateInterval/></div>
							
						</div>
					)
				}
			
			</div>
	)
	
	return (
		<div className={styles.sort} >
			
			<div className={`${styles.popup_title} ${active !== props.values[0].title ? styles.popup_item_active : ""}`} onClick={() => setOpen(!open)}>
				<div>{active}</div>
				<svg className={`${styles.arrowDown} ${open && styles.popup_item_open }`} width="10" height="6" viewBox="0 0 10 6" fill="none">
					<path d="M9.90008 0.601167L9.39911 0.100235C9.33236 0.0333416 9.25546 0 9.16853 0C9.08181 0 9.00495 0.0333416 8.93819 0.100235L5.00005 4.03816L1.06209 0.100341C0.995301 0.033447 0.918439 0.000105232 0.831611 0.000105232C0.744747 0.000105232 0.667886 0.033447 0.601132 0.100341L0.100235 0.601308C0.0333416 0.668061 0 0.744922 0 0.831786C0 0.91858 0.0334469 0.995441 0.100235 1.06219L4.76957 5.73164C4.83633 5.79843 4.91322 5.8318 5.00005 5.8318C5.08688 5.8318 5.16364 5.79843 5.23036 5.73164L9.90008 1.06219C9.96683 0.995406 10 0.918545 10 0.831786C10 0.744922 9.96683 0.668061 9.90008 0.601167Z" fill="#ADBFDF"/>
				</svg>
			</div>
			
			{
				(open
					&& <div className={styles.popup}>
						{
							mass.map(item =>(
								<div key={item.title} className={`${styles.popup_item} ${item.title === active ? styles.popup_item_active : ''}`} onClick={() => {onClickItem(item.title, false); setOpen(!open)}} >{item.title}</div>
							))
						}
					</div>
				)
			}
			
		</div>
	);
};

export default Sort;