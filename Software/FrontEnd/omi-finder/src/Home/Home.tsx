import React from "react";
import styles from "./Home.module.scss";
import Logo from "../components/Logo/Logo";
import Geocode from "react-geocode";
import GenericField from "../components/GenericField/GenericField";
import LoginAndRegisterSubmitButton from "../components/LoginAndRegisterSubmitButton/LoginAndRegisterButton";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {findZona} from '../geolocation'
import comuni from './comuni'
import { toastSubject } from "../Toast/Toast";


interface HomeProps {
	
}

interface HomeState {
	coordinate: string;
}



class Home extends React.Component <HomeProps,HomeState> {
	constructor(props:{}) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.state = {
			coordinate: ''
		  };
	}

	 private async onFormSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		const comune= (e.currentTarget.elements[0] as HTMLInputElement).value;
		const via = (e.currentTarget.elements[4] as HTMLInputElement).value;


		Geocode.setApiKey("AIzaSyAU7rItCGeGSRrmTiIXnI0meX4-KgXSfsE");
		Geocode.setLanguage("en");
		Geocode.setRegion("it");

		const response = await Geocode.fromAddress(via+comune)
		const {lat, lng} = response.results[0].geometry.location;
		this.setState({ coordinate: `${lat} ${lng}`});
		
		findZona({ lat, lng })
		.then((valori) => {
			console.log(valori);
		})
		.catch(() => {
			// Non è stata trovata alcuna zona OMI
		});
	}

	public render(){
		

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
						sx={{ width: 350,backgroundColor: "#424242",input: { color: 'white' } }}
						renderInput={(params) => <TextField {...params} label="Comuni"/>}
					/>
					<GenericField name='via' description="Indirizzo"/>
					<LoginAndRegisterSubmitButton text="Cerca" />
				</form>
				<div className={styles.Result}>{this.state.coordinate}</div>
			</div>
		);
	}
	
}


export default Home;
