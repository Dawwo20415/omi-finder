import React from "react";
import { Subject, Subscription } from "rxjs";
import styles from "./Toast.module.scss";

interface ToastState {
	hidden: boolean;
	text: string;
}

export const toastSubject = new Subject<ToastState>();

class Toast extends React.Component<{}, ToastState> {
	private toastSubscription?: Subscription;

	constructor(props: {}) {
		super(props);

		this.state = {
			hidden: true,
			text: "",
		};

		this.onWindowKeyDown = this.onWindowKeyDown.bind(this);
		this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
	}

	public componentDidMount(): void {
		this.toastSubscription = toastSubject.subscribe((value) => {
			this.setState(value);
		});
		window.addEventListener("keydown", this.onWindowKeyDown);
	}

	public componentWillUnmount(): void {
		this.toastSubscription!.unsubscribe();
		window.removeEventListener("keydown", this.onWindowKeyDown);
	}

	private onWindowKeyDown(e: KeyboardEvent): void {
		if (e.key === "Escape" || e.key === "Delete") {
			this.setState({
				hidden: true,
				text: "",
			});
		}
	}

	private onCloseButtonClick(): void {
		this.setState({
			hidden: true,
			text: "",
		});
	}

	public render() {
		if (this.state.hidden) {
			return null;
		}

		return (
			<div className={styles.Toast}>
				<span className={styles.Text}>{this.state.text}</span>
				<button className={styles.CloseButton} onClick={this.onCloseButtonClick}>
					<svg viewBox="0 0 100 100">
						<path d="M20 20 L 80 80 M 80 20 L 20 80" />
					</svg>
				</button>
			</div>
		);
	}
}

export default Toast;
