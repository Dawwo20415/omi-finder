import React from "react";
import styles from "./Home.module.scss";
import Logo from "../components/Logo/Logo";
import Geocode from "react-geocode";
import GenericField from "../components/GenericField/GenericField";
import LoginAndRegisterSubmitButton from "../components/LoginAndRegisterSubmitButton/LoginAndRegisterButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { findZona } from "../geolocation";
import comuni from "./comuni";
import { toastSubject } from "../Toast/Toast";

interface HomeState {
	coordinate: string;
}

class Home extends React.Component<{}, HomeState> {
	constructor(props: {}) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.state = {
			coordinate: "",
		};
	}

	private async onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const city = formData.get("city");
		const address = formData.get("address");

		Geocode.setApiKey("AIzaSyAU7rItCGeGSRrmTiIXnI0meX4-KgXSfsE");
		Geocode.setLanguage("en");
		Geocode.setRegion("it");

		Geocode.fromAddress(`${city}, ${address}`)
			.then((value) => {
				const { lng, lat } = value.results[0].geometry.location;
				this.setState({ coordinate: `${lng} ${lat}` });
				findZona({ lng, lat }).then((valori) => {
					if (Object.keys(valori).length === 0) {
						// Non è stata trovata alcuna zona OMI
						toastSubject.next({
							hidden: false,
							text: "Zona OMI non trovata",
						});
					} else {
						console.log(valori);
					}
				});
			})
			.catch(() => {
				toastSubject.next({
					hidden: false,
					text: "Location not found",
				});
			});
	}

	public render() {
		return (
			<div className={styles.Home}>
				<div className={styles.LogoContainer}>
					<Logo size={60} />
				</div>
				<form className={styles.SearchBarContainer} onSubmit={this.onFormSubmit}>
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={comuni}
						sx={{ width: 350, backgroundColor: "#424242", input: { color: "white" } }}
						renderInput={(params) => <TextField {...params} name="city" label="Comuni" />}
					/>
					<GenericField name="address" description="Indirizzo" />
					<LoginAndRegisterSubmitButton text="Cerca" />
				</form>
				<div className={styles.Result}>{this.state.coordinate}</div>
			</div>
		);
	}
}

export default Home;
