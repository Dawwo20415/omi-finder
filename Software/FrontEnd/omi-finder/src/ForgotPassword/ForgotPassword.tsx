import React from "react";
import GenericField from "../components/GenericField/GenericField";
import LoginAndRegisterDescription from "../components/LoginAndRegisterDescription/LoginAndRegisterDescription";
import LoginAndRegisterFormContainer from "../components/LoginAndRegisterFormContainer/LoginAndRegisterFormContainer";
import LoginAndRegisterSubmitButton from "../components/LoginAndRegisterSubmitButton/LoginAndRegisterButton";
import Logo from "../components/Logo/Logo";
import styles from "./ForgotPassword.module.scss";

class ForgotPassword extends React.Component {
	constructor(props: {}) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	private onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		// TODO Take data from form and perform login
	}

	public render() {
		return (
			<div className={styles.ForgotPassword}>
				<div className={styles.LogoContainer}>
					<Logo size={60} />
				</div>
				<LoginAndRegisterFormContainer>
					<div className={styles.ForgotPasswordTextContainer}>
						<span className={styles.Title}>You forgot your password?</span>
						<span className={styles.Description}>No worries! Enter your email and we will send you a reset link.</span>
					</div>
					<form className={styles.Form} onSubmit={this.onFormSubmit}>
						<GenericField name="email" description="Email address" />
						<LoginAndRegisterSubmitButton text="Reset Password" />
					</form>
				</LoginAndRegisterFormContainer>
			</div>
		);
	}
}

export default ForgotPassword;
