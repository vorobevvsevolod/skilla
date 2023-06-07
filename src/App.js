import styles from './App.module.scss'
import Router from "./router";
import Drawer from "./UI/Drawer";
import Header from "./UI/Headers";
import React from "react";

function App() {
	
  return (
    <div className={styles.container}>
	    <Drawer/>
	    
	    <div className={styles.main}>
		    <Header/>
		    <Router/>
	    </div>
    </div>
  );
}

export default App;
