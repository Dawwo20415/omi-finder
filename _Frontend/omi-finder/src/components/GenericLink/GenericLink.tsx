import React from "react";
import styles from "./GenericLink.module.scss";

interface GenericLinkProps {
	text: string;
	href: string;
}

const GenericLink = (props: GenericLinkProps) => {
	return (
		<a className={styles.GenericLink} href={props.href}>
			{props.text}
		</a>
	);
};

export default GenericLink;
