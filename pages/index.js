import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import factory from "../ethereum/factory";

const Index = props => {

	const items = props.campaigns.map(address => ({
		header: address,
		description: <a>View Campaign</a>,
		fluid: true
	}))

	return (
		<div>
			<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css" />
			<h3>Open Campaigns</h3>
			<Card.Group items={items} />
			<Button
				content='Create Campaign'
				icon='add circle'
				primary
			/>
		</div>
	);
};

Index.getInitialProps = async () => {
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	console.log(campaigns);
	return { campaigns };
};

export default Index;
