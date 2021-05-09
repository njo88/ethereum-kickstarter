import React from 'react';

import Layout from "../../components/layout";

const CampaignShow = props => {

	return (
		<Layout>
			<h3>Campaign Show</h3>
		</Layout>
	);
};

CampaignShow.getInitialProps = async props => {
	console.log(props.query.address);
	return {};
};

export default CampaignShow;
