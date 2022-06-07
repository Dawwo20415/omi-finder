import React from "react";
import { deleteLocalStorageCredentials } from "../../localStorage";
import AuthenticatedUserBannerOption from "../AuthenticatedUserBannerOption/AuthenticatedUserBannerOption";
import styles from "./AuthenticatedUserBanner.module.scss";

interface AuthenticatedUserBannerProps {
	username: string;
}

interface AuthenticatedUserBannerState {
	open: boolean;
}

class AuthenticatedUserBanner extends React.Component<AuthenticatedUserBannerProps, AuthenticatedUserBannerState> {
	private clickedOnBanner: boolean = false;

	constructor(props: AuthenticatedUserBannerProps) {
		super(props);
		this.onWindowClick = this.onWindowClick.bind(this);
		this.onBannerClick = this.onBannerClick.bind(this);
		this.onUsernameClick = this.onUsernameClick.bind(this);
		this.onPrivateAreaClick = this.onPrivateAreaClick.bind(this);
		this.onLogoutClick = this.onLogoutClick.bind(this);
		this.state = { open: false };
	}

	public componentDidMount(): void {
		window.addEventListener("click", this.onWindowClick);
	}

	public componentWillUnmount(): void {
		window.removeEventListener("click", this.onWindowClick);
	}

	private onWindowClick(): void {
		if (this.clickedOnBanner) {
			this.clickedOnBanner = false;
		} else if (this.state.open) {
			this.setState({ open: false });
		}
	}

	private onBannerClick(): void {
		this.clickedOnBanner = true;
		console.log("onBannerClick");
	}

	private onUsernameClick(): void {
		this.setState({ open: !this.state.open });
		console.log("onUsernameClick");
	}

	private onPrivateAreaClick(): void {
		this.setState({ open: false });
		// Redirect to private area
		window.history.pushState(null, "", "/private-area");
		window.location.reload();
	}

	private onLogoutClick(): void {
		this.setState({ open: false });
		deleteLocalStorageCredentials();
		// After logout redirect to home
		window.history.pushState(null, "", "/home");
		window.location.reload();
	}

	public render() {
		return (
			<div className={styles.AuthenticatedUserBanner} onClick={this.onBannerClick}>
				<button className={styles.Username} onClick={this.onUsernameClick}>
					{this.props.username}
				</button>
				{this.state.open && (
					<div className={styles.BannerOptionsContainer}>
						<AuthenticatedUserBannerOption text="Private Area" onClick={this.onPrivateAreaClick} />
						<AuthenticatedUserBannerOption text="Logout" onClick={this.onLogoutClick} />
					</div>
				)}
			</div>
		);
	}
}

export default AuthenticatedUserBanner;
