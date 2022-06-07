import React from "react";
import styles from "./ApiHeader.module.scss";

interface ApiHeaderProps {
	text: string;
	id: string;
}

const ApiHeader = (props: ApiHeaderProps) => {
	return (
		<a id={props.id} className={styles.ApiHeader}>
			{props.text}
		</a>
	);
};

export default ApiHeader;
