import React from "react";
import styles from "./ApiSectionItem.module.scss";

interface ApiSectionItemProps {
	text: string;
	active: boolean;
}

const ApiSectionItem = (props: ApiSectionItemProps) => {
	return (
		<div className={`${styles.ApiSectionItem} ${props.active ? styles.active : ""}`.trimEnd()}>
			<svg viewBox="0 0 50 100">
				<circle className={styles.Dot} r="12" cx="25" cy="50"></circle>
			</svg>
			<span className={styles.Text}>{props.text}</span>
		</div>
	);
};

export default ApiSectionItem;
