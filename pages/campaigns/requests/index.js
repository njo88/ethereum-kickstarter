import React from 'react';
import { Button } from 'semantic-ui-react';

import { Link } from '../../../routes';
import Layout from "../../../components/Layout";

const RequestIndex = props => {

	return (
		<Layout>
			<h3>Request List</h3>
			<Link route={`/campaigns/${props.address}/requests/new`}>
				<a>
					<Button primary>Add Request</Button>
				</a>
			</Link>
		</Layout>
	);
}

RequestIndex.getInitialProps = props => {
	return {
		address: props.query.address
	}
};

export default RequestIndex;
