import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import factory from "../ethereum/factory";
import Layout from "../components/layout";

const Index = props => {

	const items = props.campaigns.map(address => ({
		header: address,
		description: <a>View Campaign</a>,
		fluid: true
	}))

	return (
		<Layout>
			<div>
				<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css" />
				<h3>Open Campaigns</h3>
				<Button
					content='Create Campaign'
					icon='add circle'
					primary
					floated='right'
				/>
				<Card.Group items={items} />
			</div>
		</Layout>
	);
};

Index.getInitialProps = async () => {
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	console.log(campaigns);
	return { campaigns };
};

export default Index;
