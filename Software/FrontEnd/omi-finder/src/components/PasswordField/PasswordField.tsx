import React from "react";
import Eye from "../Eye/Eye";
import EyeSlash from "../EyeSlash/EyeSlash";
import styles from "./PasswordField.module.scss";

interface PasswordFieldState {
	value: string;
	hidden: boolean;
}
class PasswordField extends React.Component<{}, PasswordFieldState> {
	constructor(props: {}) {
		super(props);
		this.state = { value: "", hidden: false };
		this.onInputChange = this.onInputChange.bind(this);
		this.onButtonClick = this.onButtonClick.bind(this);
	}

	private onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({ value: e.currentTarget.value });
	}

	private onButtonClick(e: React.MouseEvent<HTMLButtonElement>): void {
		this.setState({ hidden: !this.state.hidden });
	}

	public render() {
		let buttonIcon: React.ReactNode;
		let inputType: "text" | "password";

		if (this.state.hidden) {
			buttonIcon = <EyeSlash />;
			inputType = "text";
		} else {
			buttonIcon = <Eye />;
			inputType = "password";
		}

		// button type="button" is there because otherwise it would fire a
		// SubmitEvent on the form that contains the password field
		return (
			<div className={styles.PasswordField}>
				<span className={styles.Description}>Password</span>
				<div className={styles.InputContainer}>
					<input className={styles.Input} value={this.state.value} onChange={this.onInputChange} type={inputType} />
					<button className={styles.HiddenButton} onClick={this.onButtonClick} type="button">
						{buttonIcon}
					</button>
				</div>
			</div>
		);
	}
}

export default PasswordField;
