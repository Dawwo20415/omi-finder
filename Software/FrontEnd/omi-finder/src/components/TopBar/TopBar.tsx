import React from "react";
import styles from "./TopBar.module.scss";
import TopLink from "../TopLink/TopLink";
import { useLocation } from "react-router-dom";
import AuthenticatedUserBanner from "../AuthenticatedUserBanner/AuthenticatedUserBanner";

interface TopBarProps {
	authenticated: boolean;
	username: string;
}

const TopBar = (props: TopBarProps) => {
	const { pathname } = useLocation();

	let isHomeActive = false;
	let isMapActive = false;
	let isApiActive = false;
	let isLoginActive = false;

	if (pathname.startsWith("/map")) {
		isMapActive = true;
	} else if (pathname.startsWith("/api")) {
		isApiActive = true;
	} else if (
		pathname.startsWith("/login") ||
		pathname.startsWith("/register") ||
		pathname.startsWith("/forgot-password")
	) {
		isLoginActive = true;
	} else {
		isHomeActive = true;
	}

	if (props.authenticated) {
		return (
			<div className={styles.TopBar}>
				<TopLink text="Home" href="/home" isActive={isHomeActive} />
				<TopLink text="Map" href="/map" isActive={isMapActive} />
				<TopLink text="API" href="/api" isActive={isApiActive} />
				<AuthenticatedUserBanner username={props.username} />
			</div>
		);
	} else {
		return (
			<div className={styles.TopBar}>
				<TopLink text="Home" href="/home" isActive={isHomeActive} />
				<TopLink text="Map" href="/map" isActive={isMapActive} />
				<TopLink text="API" href="/api" isActive={isApiActive} />
				<TopLink text="Login" href="/login" isActive={isLoginActive} />
			</div>
		);
	}
};

export default TopBar;
