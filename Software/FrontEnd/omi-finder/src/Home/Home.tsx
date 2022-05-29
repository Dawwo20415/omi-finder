import React from "react";
import styles from "./Home.module.scss";
import Logo from "../components/Logo/Logo";
import SearchBar from "../components/SearchBar/SearchBar";

const Home = () => {
	return (
		<div className={styles.Home}>
			<div className={styles.LogoContainer}>
				<Logo size={60} />
			</div>
			<div className={styles.SearchBarContainer}>
				<SearchBar />
				<span className={styles.SearchBarDescription}>Type here your address to find the OMI value in your area</span>
			</div>
		</div>
	);
};

export default Home;
