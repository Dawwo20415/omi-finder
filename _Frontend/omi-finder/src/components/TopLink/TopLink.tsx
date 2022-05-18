import React from "react";
import styles from "./TopLink.module.scss";

interface TopLinkProps {
	text: string;
	href: string;
	isActive: boolean;
}

const TopLink = (props: TopLinkProps) => {
	return (
		<a
			draggable="false"
			href={props.href}
			className={`${styles.TopLink} ${props.isActive ? styles.active : ""}`.trimEnd()}
		>
			{props.text}
		</a>
	);
};

export default TopLink;
