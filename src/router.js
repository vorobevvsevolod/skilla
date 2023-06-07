import {Route, Routes} from "react-router-dom";
import Calls from "./Pages/Calls";



const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Calls/>}/>
		</Routes>
	);
};

export default Router;