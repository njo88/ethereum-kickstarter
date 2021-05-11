import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import { Link } from '../routes';
import factory from "../ethereum/factory";
import Layout from "../components/Layout";

const Index = props => {

	const items = props.campaigns.map(address => ({
		header: address,
		description: <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>,
		fluid: true
	}))

	return (
		<Layout>
			<div>
				<h3>Open Campaigns</h3>
				<Link route='/campaigns/new'>
					<a>
						<Button
							content='Create Campaign'
							icon='add circle'
							primary
							floated='right'
						/>
					</a>
				</Link>
				<Card.Group items={items} />
			</div>
		</Layout>
	);
};

Index.getInitialProps = async () => {
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	return { campaigns };
};

export default Index;
