import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import { Link } from '../../../routes';
import Layout from "../../../components/Layout";
import Campaign from '../../../ethereum/campaign';
import RequestRow from "../../../components/RequestRow";

const RequestIndex = props => {

	const { Header, Row, HeaderCell, Body } = Table;

	const renderRow = () => {
		return props.requests.map((request, index) => (
			<RequestRow
				key={index}
				id={index}
				request={request}
				address={props.address}
				approversCount={props.approversCount}
			/>
		));
	};

	return (
		<Layout>
			<h3>Request List</h3>
			<Link route={`/campaigns/${props.address}/requests/new`}>
				<a>
					<Button primary floated='right' style={{ marginBottom: '10px' }}>Add Request</Button>
				</a>
			</Link>
			<Table>
				<Header>
					<Row>
						<HeaderCell>ID</HeaderCell>
						<HeaderCell>Description</HeaderCell>
						<HeaderCell>Amount</HeaderCell>
						<HeaderCell>Recipient</HeaderCell>
						<HeaderCell>Approval Count</HeaderCell>
						<HeaderCell>Approve</HeaderCell>
						<HeaderCell>Finalize</HeaderCell>
					</Row>
				</Header>
				<Body>
					{renderRow()}
				</Body>
			</Table>
			<div>Found {props.requestCount} requests.</div>
		</Layout>
	);
}

RequestIndex.getInitialProps = async props => {
	const { address } = props.query;
	const campaign = Campaign(address);
	const requestCount = await campaign.methods.getRequestsCount().call();
	const requests = await Promise.all(
		Array(parseInt(requestCount, 10)).fill().map((el, index) => {
			return campaign.methods.requests(index).call();
		})
	);
	const approversCount = await campaign.methods.approversCount().call();

	return {
		address,
		requests,
		approversCount,
		requestCount
	};
};

export default RequestIndex;
