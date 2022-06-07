import React from "react";
import styles from "./LoginAndRegisterFormContainer.module.scss";

interface LoginAndRegisterFormContainerProps {
	children: React.ReactNode;
}

const LoginAndRegisterFormContainer = (props: LoginAndRegisterFormContainerProps) => {
	return <div className={styles.LoginAndRegisterFormContainer}>{props.children}</div>;
};

export default LoginAndRegisterFormContainer;
