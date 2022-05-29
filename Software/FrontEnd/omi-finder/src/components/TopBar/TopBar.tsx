import React from "react";
import styles from "./TopBar.module.scss";
import TopLink from "../TopLink/TopLink";
import { useLocation } from "react-router-dom";

const TopBar = () => {
	const { pathname } = useLocation();
	let isHomeActive = false;
	let isMapActive = false;
	let isApiActive = false;
	let isLoginActive = false;
	if (pathname.startsWith("/map")) {
		isMapActive = true;
	} else if (pathname.startsWith("/api")) {
		isApiActive = true;
	} else if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
		isLoginActive = true;
	} else {
		isHomeActive = true;
	}

	return (
		<div className={styles.TopBar}>
			<TopLink text="Home" href="/home" isActive={isHomeActive} />
			<TopLink text="Map" href="/map" isActive={isMapActive} />
			<TopLink text="API" href="/api" isActive={isApiActive} />
			<TopLink text="Login" href="/login" isActive={isLoginActive} />
		</div>
	);
};

export default TopBar;
