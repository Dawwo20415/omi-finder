import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../authentication";
import GenericField from "../components/GenericField/GenericField";
import GenericLink from "../components/GenericLink/GenericLink";
import LoginAndRegisterDescription from "../components/LoginAndRegisterDescription/LoginAndRegisterDescription";
import LoginAndRegisterFormContainer from "../components/LoginAndRegisterFormContainer/LoginAndRegisterFormContainer";
import LoginAndRegisterSubmitButton from "../components/LoginAndRegisterSubmitButton/LoginAndRegisterButton";
import PasswordField from "../components/PasswordField/PasswordField";
import { setLocalStorageCredentials } from "../localStorage";
import { toastSubject } from "../Toast/Toast";
import styles from "./Login.module.scss";

class Login extends React.Component {
	constructor(props: {}) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	private onFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const credentials = {
			emailOrUsername: formData.get("emailOrUsername") as string,
			password: formData.get("password") as string,
		};

		login(credentials, true)
			.then((result) => {
				if (result.code === 4) {
					// Update local storage with credentials
					setLocalStorageCredentials({
						email: result.email as string,
						username: result.username as string,
						passwordHash: result.password as string,
					});
					// Redirect to private area after login
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

	public render() {
		return (
			<div className={styles.Login}>
				<LoginAndRegisterDescription />
				<LoginAndRegisterFormContainer>
					<form className={styles.Form} onSubmit={this.onFormSubmit}>
						<GenericField name="emailOrUsername" description="Email address or username" />
						<PasswordField name="password" />
						<LoginAndRegisterSubmitButton text="Log In" />
					</form>
					<div className={styles.LinksContainer}>
						<div className={styles.ForgotPasswordContainer}>
							<GenericLink text="Forgot password?" href="/forgot-password" />
						</div>
						<span className={styles.CreateAccountDescription}>
							Don't have an account? Sign up <GenericLink text="here" href="/register" />
						</span>
					</div>
				</LoginAndRegisterFormContainer>
			</div>
		);
	}
}

export default Login;
