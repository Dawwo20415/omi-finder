import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Map from "../Map/Map";
import Api from "../Api/Api";
import TopBar from "../components/TopBar/TopBar";
import Login from "../Login/Login";
import Register from "../Register/Register";

const App = () => {
	return (
		<Router>
			<TopBar />
			<Routes>
				<Route path={"/map"} element={<Map />} />
				<Route path={"/api"} element={<Api />} />
				<Route path={"/login"} element={<Login />} />
				<Route path={"/register"} element={<Register />} />
				<Route path={"/home*"} element={<Home />} />
				<Route path={"/"} element={<Home />} />
				<Route path={"*"} element={<Home />} />
			</Routes>
		</Router>
	);
};

export default App;
