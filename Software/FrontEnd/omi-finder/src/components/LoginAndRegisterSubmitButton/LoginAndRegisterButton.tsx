import React from "react";
import styles from "./LoginAndRegisterButton.module.scss";

interface LoginAndRegisterSubmitButtonProps {
	text: string;
}

const LoginAndRegisterSubmitButton = (props: LoginAndRegisterSubmitButtonProps) => {
	return <input className={styles.LoginAndRegisterSubmitButton} type="submit" value={props.text} />;
};

export default LoginAndRegisterSubmitButton;
