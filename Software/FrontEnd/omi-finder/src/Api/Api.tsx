import React from "react";
import ApiHeader from "../components/ApiHeader/ApiHeader";
import ApiParagraph from "../components/ApiParagraph/ApiParagraph";
import ApiSectionItem from "../components/ApiSectionItem/ApiSectionItem";
import styles from "./Api.module.scss";

/*
Abbiamo 4 funzioni principali per le API che possono interagire con il database delle zone OMI:

Nella documentazione bisogna mettere la definizione dello schema in modo che le persone possano fare le loro query correttamente.

BIG NOTA: tutte le risposte sono contenute in un array, anche se è un solo oggetto, dato che ogni query può risultare in più documenti.

- /v2/getBy/:filter

Questo endpoint prende solo 1 campo nell'indirizzo, che è essenzialmente l'oggetto filtro da mettere nella funzione "find()", non serve fare l'escape di alcun carattere perchè all'interno della funzione c'è un JSON.parse() sul testo che lo fa in automatico, Questo campo filtro è uguale in tutti gli altri endpoint. Questo oggetto segue le regole delle richieste di mongodb, quindi se vuoi mettere un link alla pagina delle regole su come fare richieste a mongoDB copia questo [https://www.mongodb.com/docs/manual/tutorial/query-documents/], un nostro esempio potrebbe essere {"comune":"TRENTO"}. Non importa tanto se il filtro non è corretto perchè se è sbagliato la query ritorna un insieme vuoto dato che non trova corrispondenze.

Oltre al filtro nell'indirizzo questa chiamata come le altre prende 2 parametri, questi sono "values" e "limit". Limit ovviamente definisce il numero massimo di oggetti che la query può ritornare, mentre values definisce quali campi la query ritorna, per spiegarmi meglio se scrivi values=comune l'oggetto di ritorno conterrà solo i campi _id e comune, si può anche mettere un - davanti ad un nome per escludere quel campo, attenzione che ad eccezzione del campo id, le mappature positive e negative sono mutualmente esclusive, ovvero se metti -coordinate ovvero togliere le coordinate non puoi mettere anche comune senza meno perchè sono due statement ridondanti al eglio in conflitto al peggio, quindi sempre tutto più o tutto meno. Il campo _id fa a parte perchè mongoose lo aggiunge sempre a meno che non gli metti tu il -_id.

- /v2/getSettore/:settore/:filter

In questa chiamata filtro e argomenti funzionano allo stesso identico modo, si possono copiare ed incollare

L'indirizzo settore indica quale tra residenziale, commerciale e terziaria si vuole prendere, nel caso in cui l'utente scriva i nomi male oppure in modo sbagliato la funzione ritorna un array vuoto. Il filtro viene applicato normalmente prima di segmentare l'oggetto di ritorno, è come dire voglio "settore x" del documento che ha le condizioni "filter".

Ad esempio una risposta alla richiesta: /v2/getSettore/commerciale/%7B"comune":"TRENTO"%7D?limit=1

E': [{"_id":"629c1304f666bfc86924867f","valore":[{"semestre":"20212","commerciale":{"negozi":{"max":"3300","min":"2500"}}}]}]

- /v2/getTipo/:settore/:tipo/:filter

Questo comando funziona esattamente come quello di prima solo che invece che poter specificare solo il settore puoi specificare quale campo in quel settore vuoi, puoi praticamente copia incollare la descrizione del comando sopra.

Ad esempio una risposta alla richiesta: /v2/getTipo/residenziale/box/%7B"comune":"TRENTO"%7D?limit=1

E': [{"_id":"629c1304f666bfc86924867d","valore":[{"semestre":"20212","box":{"max":"1200","min":"1000"}}]}]

- /v2/getByCoordinate

Questo è l'unico comando diverso dagli altri, non prende nessuna variabile nell'indirizzo ma prende 2 argomenti: "longitude" e "latitude", essendo argomenti diretti possono essere inseriti in qualunque ordine ed andranno comunque nel punto giusto. Questa richiesta ritorna SOLO il campo "_id" del documento quale zona/e omi corrisponde alle coordinate, poi con quell'id possono cercare le altre informazioni. E' essenzialmente una risposta alla domanda "Quale zona è a queste coordinate?" e niente altro, in caso le coordinate non corrispondano a nessuna zona riorna un insieme vuoto.

Ad esempio una risposta alla richiesta: /v2/getByCoordinate?longitude=46.058040&latitude=11.121097

E': [{"_id":"629c1355f666bfc869248b12"}]  
*/

const Api = () => {
	return (
		<div className={styles.Api}>
			<div className={styles.LeftBar}>
				<ApiSectionItem href="lorem-ipsum1" text="" active={true} />
				<ApiSectionItem href="lorem-ipsum1" text="Lorem Ipsum 2" active={false} />
			</div>
			<div className={styles.ApiContent}>
				<ApiHeader id="lorem-ipsum1" text="Lorem Ipsum 1" />
				<ApiParagraph text="Magna irure do commodo velit quis est. Est veniam reprehenderit sint est ut sunt deserunt dolor dolor ea excepteur aliqua eu mollit. Incididunt dolore nisi sunt tempor dolore aute eiusmod. In do do sunt ut veniam cupidatat voluptate. Excepteur do elit ullamco id et nostrud qui ullamco proident veniam non do. Est velit qui sit laborum." />
			</div>
		</div>
	);
};

export default Api;
