import React from "react";
import styles from "./Map.module.scss";

/*
    Best approach to use Google Maps with React seems this one:
    https://www.npmjs.com/package/@googlemaps/react-wrapper
    otherwise check out the official documentation:
    https://developers.google.com/maps/documentation/javascript
*/

class Map extends React.Component {
	private mapRef?: React.RefObject<HTMLDivElement>;

	public render() {
		return <div className={styles.Map} ref={this.mapRef}></div>;
	}
}

export default Map;
