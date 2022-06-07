import React from "react";
import Logo from "../Logo/Logo";
import styles from "./LoginAndRegisterDescription.module.scss";

const LoginAndRegisterDescription = () => {
	return (
		<div className={styles.LoginAndRegisterDescription}>
			<Logo size={60} />
			<span className={styles.Description}>
				If you want to get an API token you first need to register or log into OMI Finder
			</span>
		</div>
	);
};

export default LoginAndRegisterDescription;
