import React from "react";
import ApiHeader from "../components/ApiHeader/ApiHeader";
import ApiParagraph from "../components/ApiParagraph/ApiParagraph";
import ApiSectionItem from "../components/ApiSectionItem/ApiSectionItem";
import styles from "./Api.module.scss";

const Api = () => {
	return (
		<div className={styles.Api}>
			<div className={styles.LeftBar}>
				<ApiSectionItem text="Lorem Ipsum 1" active={true} />
				<ApiSectionItem text="Lorem Ipsum 2" active={false} />
			</div>
			<div className={styles.ApiContent}>
				<ApiHeader text="Lorem Ipsum 1" />
				<ApiParagraph text="Magna irure do commodo velit quis est. Est veniam reprehenderit sint est ut sunt deserunt dolor dolor ea excepteur aliqua eu mollit. Incididunt dolore nisi sunt tempor dolore aute eiusmod. In do do sunt ut veniam cupidatat voluptate. Excepteur do elit ullamco id et nostrud qui ullamco proident veniam non do. Est velit qui sit laborum." />
			</div>
		</div>
	);
};

export default Api;
