import React from "react";
import styles from "./ApiHeader.module.scss";

interface ApiHeaderProps {
	text: string;
}

const ApiHeader = (props: ApiHeaderProps) => {
	return <h1 className={styles.ApiHeader}>{props.text}</h1>;
};

export default ApiHeader;
