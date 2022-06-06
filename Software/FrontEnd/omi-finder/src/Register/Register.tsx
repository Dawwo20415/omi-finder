import { createBrowserHistory } from "history";
import React from "react";
import { useNavigate } from "react-router-dom";
import { isEmailValid, register } from "../authentication";
import GenericField from "../components/GenericField/GenericField";
import LoginAndRegisterDescription from "../components/LoginAndRegisterDescription/LoginAndRegisterDescription";
import LoginAndRegisterFormContainer from "../components/LoginAndRegisterFormContainer/LoginAndRegisterFormContainer";
import LoginAndRegisterSubmitButton from "../components/LoginAndRegisterSubmitButton/LoginAndRegisterButton";
import PasswordField from "../components/PasswordField/PasswordField";
import { setLocalStorageCredentials } from "../localStorage";
import { toastSubject } from "../Toast/Toast";
import styles from "./Register.module.scss";

class Register extends React.Component {
	constructor(props: {}) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	private onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const email = formData.get("email") as string;
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		if (username.length < 3) {
			toastSubject.next({
				hidden: false,
				text: "Username must have at least 3 characters",
			});
		} else if (!isEmailValid(email)) {
			toastSubject.next({
				hidden: false,
				text: "Email is invalid",
			});
		} else if (password.length < 8) {
			toastSubject.next({
				hidden: false,
				text: "Password must have at least 8 characters",
			});
		} else {
			const credentials = {
				email,
				username,
				password,
			};
			register(credentials)
				.then(() => {
					// TODO Sistemare password hash
					// Update local storage with credentials
					setLocalStorageCredentials({
						email,
						username,
						passwordHash: password,
					});
					// Redirect to private area after login
					window.history.pushState(null, "", "/private-area");
					window.location.reload();
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}

	public render() {
		return (
			<div className={styles.Register}>
				<LoginAndRegisterDescription />
				<LoginAndRegisterFormContainer>
					<form className={styles.Form} onSubmit={this.onFormSubmit}>
						<GenericField name="username" description="Username" />
						<GenericField name="email" description="Email address" />
						<PasswordField name="password" />
						<LoginAndRegisterSubmitButton text="Sign Up" />
					</form>
				</LoginAndRegisterFormContainer>
			</div>
		);
	}
}

export default Register;
