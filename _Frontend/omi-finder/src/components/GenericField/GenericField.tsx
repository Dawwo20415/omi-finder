import React from "react";
import styles from "./GenericField.module.scss";

interface GenericFieldProps {
	description: string;
}

interface GenericFieldState {
	value: string;
}

class GenericField extends React.Component<GenericFieldProps, GenericFieldState> {
	constructor(props: GenericFieldProps) {
		super(props);
		this.state = { value: "" };
		this.onInputChange = this.onInputChange.bind(this);
	}

	private onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({ value: e.currentTarget.value });
	}

	public render() {
		return (
			<div className={styles.GenericField}>
				<span className={styles.Description}>{this.props.description}</span>
				<input className={styles.Input} value={this.state.value} onChange={this.onInputChange} type="text" />
			</div>
		);
	}
}

export default GenericField;
