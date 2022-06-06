import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Map from "../Map/Map";
import Api from "../Api/Api";
import TopBar from "../components/TopBar/TopBar";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import PrivateArea from "../PrivateArea/PrivateArea";
import { readLocalStorageCredentials } from "../localStorage";

interface AppState {
	authenticated: boolean;
	username: string;
	email: string;
	passwordHash: string;
}

class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);
		const { email, username, passwordHash } = readLocalStorageCredentials();
		const authenticated = email !== "" && username !== "" && passwordHash !== "";
		this.state = { authenticated, email, username, passwordHash };
	}

	public render() {
		return (
			<Router>
				<TopBar authenticated={this.state.authenticated} username={this.state.username} />
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/map" element={<Map />} />
					<Route path="/api" element={<Api />} />
					{this.state.authenticated ? (
						<Route path="/private-area" element={<PrivateArea />}></Route>
					) : (
						<React.Fragment>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
						</React.Fragment>
					)}
					<Route path="*" element={<Navigate to="/home" />}></Route>
				</Routes>
			</Router>
		);
	}
}

export default App;
