import React from "react";
import styles from "./Home.module.scss";
import Logo from "../components/Logo/Logo";
import Geocode from "react-geocode";
import SearchBar from "../components/SearchBar/SearchBar";
import { toastSubject } from "../Toast/Toast";

class Home extends React.Component {
	constructor(props: {}) {
		super(props);
		this.onSearch = this.onSearch.bind(this);
		this.state = {
			coordinate: "",
		};
	}

	private onSearch(address: string): void {
		Geocode.setApiKey("AIzaSyAU7rItCGeGSRrmTiIXnI0meX4-KgXSfsE");
		Geocode.setLanguage("en");
		Geocode.setRegion("it");

		Geocode.fromAddress(address)
			.then((value) => {
				const { lng: longitude, lat: latitude } = value.results[0].geometry.location;
				console.log(longitude, latitude);
			})
			.catch(() => {
				toastSubject.next({
					hidden: false,
					text: "Invalid address",
				});
			});
	}

	public render() {
		return (
			<div className={styles.Home}>
				<div className={styles.LogoContainer}>
					<Logo size={60} />
				</div>
				<div className={styles.SearchBarContainer}>
					<SearchBar name="address" onSearch={this.onSearch} />
					<span className={styles.SearchBarDescription}>Type here your address to find the OMI value in your area</span>
				</div>
			</div>
		);
	}
}

export default Home;
