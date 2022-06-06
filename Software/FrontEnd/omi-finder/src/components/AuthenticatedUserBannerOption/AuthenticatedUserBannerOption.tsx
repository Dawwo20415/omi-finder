import React from "react";
import styles from "./AuthenticatedUserBannerOption.module.scss";

interface AuthenticatedUserBannerOptionProps {
	text: string;
	onClick: (e: React.MouseEvent) => void;
}

// Opzione visualizzata all'interno di un dropdown menu quando un
// utente è registrato da AuthenticatedUserBanner
class AuthenticatedUserBannerOption extends React.Component<AuthenticatedUserBannerOptionProps> {
	constructor(props: AuthenticatedUserBannerOptionProps) {
		super(props);
		this.onAuthenticatedUserBannerOptionClick = this.onAuthenticatedUserBannerOptionClick.bind(this);
	}

	private onAuthenticatedUserBannerOptionClick(e: React.MouseEvent): void {
		this.props.onClick(e);
	}

	public render() {
		return (
			<button className={styles.AuthenticatedUserBannerOption} onClick={this.onAuthenticatedUserBannerOptionClick}>
				{this.props.text}
			</button>
		);
	}
}

export default AuthenticatedUserBannerOption;
