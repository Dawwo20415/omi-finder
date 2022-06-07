import React from "react";
import { isEmailValid, isPasswordValid, isUsernameValid, register } from "../authentication";
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

		if (!isUsernameValid(username)) {
			if (username.length <= 3) {
				toastSubject.next({
					hidden: false,
					text: "Username must be at least 3 characters long",
				});
			} else {
				toastSubject.next({
					hidden: false,
					text: "Username can only contain numbers, letters and underscores",
				});
			}
		} else if (!isEmailValid(email)) {
			toastSubject.next({
				hidden: false,
				text: "Email is invalid",
			});
		} else if (!isPasswordValid(password)) {
			if (password.length <= 8) {
				toastSubject.next({
					hidden: false,
					text: "Password must be at least 8 characters long",
				});
			} else {
				toastSubject.next({
					hidden: false,
					text: "Password cannot contain whitespaces",
				});
			}
		} else {
			const credentials = {
				email,
				username,
				password,
			};

			register(credentials, true)
				.then((result) => {
					if (result.code === 8) {
						// Update local storage with credentials
						setLocalStorageCredentials({
							email: result.email as string,
							username: result.username as string,
							passwordHash: result.password as string,
						});
						// Redirect to private area after registration
						window.history.pushState(null, "", "/private-area");
						window.location.reload();
					} else {
						toastSubject.next({ hidden: false, text: result.message });
					}
				})
				.catch(() => {
					toastSubject.next({
						hidden: false,
						text: "Something went wrong",
					});
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
