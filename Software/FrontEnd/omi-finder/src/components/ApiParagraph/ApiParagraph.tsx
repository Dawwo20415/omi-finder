import React from "react";
import styles from "./ApiParagraph.module.scss";

interface ApiParagraphProps {
	text: string;
}

const ApiParagraph = (props: ApiParagraphProps) => {
	return <p className={styles.ApiParagraph}>{props.text}</p>;
};

export default ApiParagraph;
