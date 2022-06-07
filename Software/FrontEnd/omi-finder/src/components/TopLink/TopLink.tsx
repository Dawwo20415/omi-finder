import React from "react";
import { Link } from "react-router-dom";
import styles from "./TopLink.module.scss";

interface TopLinkProps {
	text: string;
	href: string;
	isActive: boolean;
}

class TopLink extends React.Component<TopLinkProps> {
	constructor(props: TopLinkProps) {
		super(props);
		this.onAnchorClick = this.onAnchorClick.bind(this);
	}

	private onAnchorClick(e: React.MouseEvent): void {
		e.preventDefault();
	}

	public render() {
		return (
			<Link to={this.props.href} className={`${styles.TopLink} ${this.props.isActive ? styles.active : ""}`.trimEnd()}>
				{this.props.text}
			</Link>
		);
	}
}

export default TopLink;
