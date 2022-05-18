import React from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarState {
	search: string;
}

class SearchBar extends React.Component<{}, SearchBarState> {
	constructor(props: {}) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
		this.onInputKeyDown = this.onInputKeyDown.bind(this);
		this.onButtonClick = this.onButtonClick.bind(this);
		this.state = {
			search: "", // String showed in the search bar
		};
	}

	private onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			search: e.currentTarget.value,
		});
	}

	private onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
		switch (e.key) {
			case "Esc":
				e.preventDefault(); // If this is not here then the seach input gets deleted
				return;
			case "Enter":
				// TODO Go to map section and show address (this.state.search)
				return;
		}
	}

	private onButtonClick(e: React.MouseEvent<HTMLButtonElement>): void {
		// TODO Go to map section and show address (this.state.search)
	}

	public render() {
		return (
			<div className={styles.SearchBar}>
				<input
					className={styles.SearchBarInput}
					value={this.state.search}
					onChange={this.onInputChange}
					onKeyDown={this.onInputKeyDown}
					type="search"
					placeholder="Search..."
				/>
				<button className={styles.SearchBarButton} onClick={this.onButtonClick}>
					<svg viewBox="-25 -25 150 150">
						<path d="M35 25L65 50L35 75" />
					</svg>
				</button>
			</div>
		);
	}
}

export default SearchBar;
