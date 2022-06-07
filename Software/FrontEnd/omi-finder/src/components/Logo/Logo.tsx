import React from "react";
import styles from "./Logo.module.scss";

interface LogoProps {
	size: number;
}

const Logo = (props: LogoProps) => {
	return (
		<span className={styles.Logo} style={{ fontSize: `${props.size}px` }}>
			OMI Finder
		</span>
	);
};

export default Logo;
