import React from "react";
import styles from "./Home.module.scss";
import Logo from "../components/Logo/Logo";
import Geocode from "react-geocode";
import GenericField from "../components/GenericField/GenericField";
import LoginAndRegisterSubmitButton from "../components/LoginAndRegisterSubmitButton/LoginAndRegisterButton";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {findZona} from '../geolocation'

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
		const comuni=["Affi","Albaredo d'Adige","Angiari","Arcole","Badia Calavena","Bardolino","Belfiore","Bevilacqua","Bonavigo","Boschi Sant'Anna","Bosco Chiesanuova","Bovolone","Brentino Belluno",
		"Brenzone sul Garda","Bussolengo","Buttapietra","Caldiero","Caprino Veronese","Casaleone","Castagnaro","Castel d'Azzano","Castelnuovo del Garda","Cavaion Veronese",
		"Cazzano di Tramigna","Cerea","Cerro Veronese","Cologna Veneta","Colognola ai Colli","Concamarise","Costermano sul Garda","Dolcè","Erbè","Erbezzo","Ferrara di Monte Baldo",
		"Fumane","Garda","Gazzo Veronese","Grezzana","Illasi","Isola della Scala","Isola Rizza","Lavagno","Lazise","Legnago","Malcesine","Marano di Valpolicella","Mezzane di Sotto",
		"Minerbe","Montecchia di Crosara","Monteforte d'Alpone","Mozzecane","Negrar di Valpolicella","Nogara","Nogarole Rocca","Oppeano","Palù","Pastrengo","Pescantina",
		"Peschiera del Garda","Povegliano Veronese","Pressana","Rivoli Veronese","Roncà","Ronco all'Adige","Roverchiara","Roverè Veronese","Roveredo di Guà","Salizzole","San Bonifacio",
		"San Giovanni Ilarione","San Giovanni Lupatoto","San Martino Buon A.","San Mauro di Saline","San Pietro di Morubio","San Pietro in Cariano","San Zeno di Montagna","Sanguinetto",
		"Sant'Ambrogio di V.","Sant'Anna d'Alfaedo","Selva di Progno","Soave","Sommacampagna","Sona","Sorgà","Terrazzo","Torri del Benaco","Tregnago","Trevenzuolo","Valeggio sul Mincio",
		"Velo Veronese","Verona","Veronella","Vestenanova","Vigasio","Villa Bartolomea","Villafranca di Verona","Zevio","Zimella","Ala","Albiano","Aldeno","Altavalle","Altopiano della V.",
		"Amblar-Don","Andalo","Arco","Avio","Baselga di Pinè","Bedollo","Besenello","Bieno","Bleggio Superiore","Bocenago","Bondone","Borgo Chiese","Borgo d'Anaunia","Borgo Lares",
		"Borgo Valsugana","Brentonico","Bresimo","Caderzone Terme","Calceranica al Lago","Caldes","Caldonazzo","Calliano","Campitello di Fassa","Campodenno","Canal San Bovo","Canazei",
		"Capriana","Carisolo","Carzano","Castel Condino","Castel Ivano","Castello Tesino","Castello-Molina di F.","Castelnuovo","Cavalese","Cavareno","Cavedago","Cavedine","Cavizzana",
		"Cembra Lisignago","Cimone","Cinte Tesino","Cis","Civezzano","Cles","Comano Terme","Commezzadura","Contà","Croviana","Dambel","Denno","Dimaro Folgarida","Drena","Dro",
		"Fai della Paganella","Fiavè","Fierozzo","Folgaria","Fornace","Frassilongo","Garniga Terme","Giovo","Giustino","Grigno","Imer","Isera","Lavarone","Lavis","Ledro","Levico Terme",
		"Livo","Lona-Lases","Luserna","Madruzzo","Malé","Massimeno","Mazzin","Mezzana","Mezzano","Mezzocorona","Mezzolombardo","Moena","Molveno","Mori","Nago-Torbole","Nogaredo",
		"Nomi","Novaledo","Novella","Ospedaletto","Ossana","Palù del Fersina","Panchià","Peio","Pellizzano","Pelugo","Pergine Valsugana","Pieve di Bono-Prezzo","Pieve Tesino",
		"Pinzolo","Pomarolo","Porte di Rendena","Predaia","Predazzo","Primiero SMdC","Rabbi","Riva del Garda","Romeno","Roncegno Terme","Ronchi Valsugana","Ronzo-Chienis","Ronzone",
		"Roverè della Luna","Rovereto","Ruffrè-Mendola","Rumo","Sagron Mis","Samone","San Giovanni di Fassa","San Lorenzo Dorsino","San Michele all'Adige","Sant'Orsola Terme","Sanzeno",
		"Sarnonico","Scurelle","Segonzano","Sella Giudicarie","Sfruz","Soraga di Fassa","Sover","Spiazzo","Spormaggiore","Sporminore","Stenico","Storo","Strembo","Telve","Telve di Sopra",
		"Tenna","Tenno","Terragnolo","Terre d'Adige","Terzolas","Tesero","Tione di Trento","Ton","Torcegno","Trambileno","Tre Ville","Trento","Valdaone","Valfloriana","Vallarsa",
		"Vallelaghi","Vermiglio","Vignola-Falesina","Villa Lagarina","Ville d'Anaunia","Ville di Fiemme","Volano","Ziano di Fiemme","Acceglio","Aisone","Alba","Albaretto della Torre",
		"Alto","Argentera","Arguello","Bagnasco","Bagnolo Piemonte","Baldissero d'Alba","Barbaresco","Barge","Barolo","Bastia Mondovì","Battifollo","Beinette","Bellino","Belvedere Langhe",
		"Bene Vagienna","Benevello","Bergolo","Bernezzo","Bonvicino","Borgo San Dalmazzo","Borgomale","Bosia","Bossolasco","Boves","Bra","Briaglia","Briga Alta","Brondello","Brossasco",
		"Busca","Camerana","Canale","Canosio","Caprauna","Caraglio","Caramagna Piemonte","Cardè","Carrù","Cartignano","Casalgrasso","Castagnito","Casteldelfino","Castelletto Stura",
		"Castelletto Uzzone","Castellinaldo d'Alba","Castellino Tanaro","Castelmagno","Castelnuovo di Ceva","Castiglione Falletto","Castiglione Tinella","Castino","Cavallerleone",
		"Cavallermaggiore","Celle di Macra","Centallo","Ceresole Alba","Cerretto Langhe","Cervasca","Cervere","Ceva","Cherasco","Chiusa di Pesio","Cigliè","Cissone","Clavesana",
		"Corneliano d'Alba","Cortemilia","Cossano Belbo","Costigliole Saluzzo","Cravanzana","Crissolo","Cuneo","Demonte","Diano d'Alba","Dogliani","Dronero","Elva","Entracque",
		"Envie","Farigliano","Faule","Feisoglio","Fossano","Frabosa Soprana","Frabosa Sottana","Frassino","Gaiola","Gambasca","Garessio","Genola","Gorzegno","Gottasecca","Govone",
		"Grinzane Cavour","Guarene","Igliano","Isasca","La Morra","Lagnasco","Lequio Berria","Lequio Tanaro","Lesegno","Levice","Limone Piemonte","Lisio","Macra","Magliano Alfieri",
		"Magliano Alpi","Mango","Manta","Marene","Margarita","Marmora","Marsaglia","Martiniana Po","Melle","Moiola","Mombarcaro","Mombasiglio","Monastero di Vasco","Monasterolo Casotto",
		"Monasterolo di S.","Monchiero","Mondovì","Monesiglio","Monforte d'Alba","Montà","Montaldo di Mondovì","Montaldo Roero","Montanera","Montelupo Albese","Montemale di Cuneo",
		"Monterosso Grana","Monteu Roero","Montezemolo","Monticello d'Alba","Moretta","Morozzo","Murazzano","Murello","Narzole","Neive","Neviglie","Niella Belbo","Niella Tanaro",
		"Novello","Nucetto","Oncino","Ormea","Ostana","Paesana","Pagno","Pamparato","Paroldo","Perletto","Perlo","Peveragno","Pezzolo Valle Uzzone","Pianfei","Piasco","Pietraporzio",
		"Piobesi d'Alba","Piozzo","Pocapaglia","Polonghera","Pontechianale","Pradleves","Prazzo","Priero","Priocca","Priola","Prunetto","Racconigi","Revello","Rifreddo","Rittana",
		"Roaschia","Roascio","Robilante","Roburent","Rocca Cigliè","Rocca de' Baldi","Roccabruna","Roccaforte Mondovì","Roccasparvera","Roccavione","Rocchetta Belbo","Roddi","Roddino",
		"Rodello","Rossana","Ruffia","Sale delle Langhe","Sale San Giovanni","Saliceto","Salmour","Saluzzo","Sambuco","Sampeyre","San Benedetto Belbo","San Damiano Macra",
		"San Michele Mondovì","Sanfrè","Sanfront","Sant'Albano Stura","Santa Vittoria d'Alba","Santo Stefano Belbo","Santo Stefano Roero","Savigliano","Scagnello","Scarnafigi",
		"Serralunga d'Alba","Serravalle Langhe","Sinio","Somano","Sommariva del Bosco","Sommariva Perno","Stroppo","Tarantasca","Torre Bormida","Torre Mondovì","Torre San Giorgio",
		"Torresina","Treiso","Trezzo Tinella","Trinità","Valdieri","Valgrana","Valloriate","Venasca","Verduno","Vernante","Verzuolo","Vezza d'Alba","Vicoforte","Vignolo",
		"Villafalletto","Villanova Mondovì","Villanova Solaro","Villar San Costanzo","Vinadio","Viola","Vottignasco"];

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
