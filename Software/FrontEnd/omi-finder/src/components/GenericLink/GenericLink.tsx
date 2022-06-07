import React from "react";
import { Link } from "react-router-dom";
import styles from "./GenericLink.module.scss";

interface GenericLinkProps {
	text: string;
	href: string;
}

class GenericLink extends React.Component<GenericLinkProps> {
	constructor(props: GenericLinkProps) {
		super(props);
		this.onAnchorClick = this.onAnchorClick.bind(this);
	}

	private onAnchorClick(e: React.MouseEvent): void {
		e.preventDefault();
	}

	public render(): React.ReactNode {
		return (
			<Link to={this.props.href} className={styles.GenericLink}>
				{this.props.text}
			</Link>
		);
	}
}

export default GenericLink;
