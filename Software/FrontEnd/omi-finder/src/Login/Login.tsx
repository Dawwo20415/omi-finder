import React from "react";
import GenericField from "../components/GenericField/GenericField";
import GenericLink from "../components/GenericLink/GenericLink";
import LoginAndRegisterDescription from "../components/LoginAndRegisterDescription/LoginAndRegisterDescription";
import LoginAndRegisterFormContainer from "../components/LoginAndRegisterFormContainer/LoginAndRegisterFormContainer";
import LoginAndRegisterSubmitButton from "../components/LoginAndRegisterSubmitButton/LoginAndRegisterButton";
import PasswordField from "../components/PasswordField/PasswordField";
import styles from "./Login.module.scss";

class Login extends React.Component {
	constructor(props: {}) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	private onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
		// TODO Take data from form and perform login
	}

	public render() {
		return (
			<div className={styles.Login}>
				<LoginAndRegisterDescription />
				<LoginAndRegisterFormContainer>
					<form className={styles.Form} onSubmit={this.onFormSubmit}>
						<GenericField description="Email address or username" />
						<PasswordField />
						<LoginAndRegisterSubmitButton text="Log In" />
					</form>
					<div className={styles.LinksContainer}>
						<div className={styles.ForgotPasswordContainer}>
							<GenericLink text="Forgot password?" href="forgot-password" />
						</div>
						<span className={styles.CreateAccountDescription}>
							Don't have an account? Sign up <GenericLink text="here" href="register" />
						</span>
					</div>
				</LoginAndRegisterFormContainer>
			</div>
		);
	}
}

export default Login;
