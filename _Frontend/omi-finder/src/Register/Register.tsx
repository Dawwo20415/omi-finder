import React from "react";
import GenericField from "../components/GenericField/GenericField";
import LoginAndRegisterDescription from "../components/LoginAndRegisterDescription/LoginAndRegisterDescription";
import LoginAndRegisterFormContainer from "../components/LoginAndRegisterFormContainer/LoginAndRegisterFormContainer";
import LoginAndRegisterSubmitButton from "../components/LoginAndRegisterSubmitButton/LoginAndRegisterButton";
import PasswordField from "../components/PasswordField/PasswordField";
import styles from "./Register.module.scss";

class Register extends React.Component {
	constructor(props: {}) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	private onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
		// TODO Take data from form and perform registration
	}

	public render() {
		return (
			<div className={styles.Register}>
				<LoginAndRegisterDescription />
				<LoginAndRegisterFormContainer>
					<form className={styles.Form} onSubmit={this.onFormSubmit}>
						<GenericField description="Username" />
						<GenericField description="Email address" />
						<PasswordField />
						<LoginAndRegisterSubmitButton text="Sign Up" />
					</form>
				</LoginAndRegisterFormContainer>
			</div>
		);
	}
}

export default Register;
