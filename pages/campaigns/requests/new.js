import React, { useState } from 'react';
import { Button, Form, Message, Input } from 'semantic-ui-react';

import Campaign from '../../../ethereum/campaign';
import web3 from "../../../ethereum/web3";
import { Link, Router } from '../../../routes';
import Layout from "../../../components/Layout";

const RequestNew = props => {

	const [description, updateDescription] = useState('');
	const [value, updateValue] = useState('');
	const [recipient, updateRecipient] = useState('');
	const [errorMessage, updateErrorMessage] = useState('');
	const [loading, updateLoading] = useState(false);

	const onSubmit = async e => {
		e.preventDefault();
		const campaign = Campaign(props.address);
		updateLoading(true);
		updateErrorMessage('');
		try {
			const accounts = await web3.eth.getAccounts();
			const amount = web3.utils.toWei(value, 'ether');
			await campaign.methods
				.createRequest(description, amount, recipient)
				.send({ from: accounts[0] });
			Router.pushRoute(`/campaigns/${props.address}/requests`);
		} catch (err) {
			updateErrorMessage(err.message);
		}
		updateLoading(false);
	}

	return (
		<Layout>
			<Link route={`/campaigns/${props.address}/requests`}>
				<a>Back</a>
			</Link>
			<h3>Create a Request</h3>
			<Form onSubmit={onSubmit} error={!!errorMessage}>
				<Form.Field>
					<label>Description</label>
					<Input value={description} onChange={e => updateDescription(e.target.value)} />
				</Form.Field>
				<Form.Field>
					<label>Value in Ether</label>
					<Input value={value} onChange={e => updateValue(e.target.value)} />
				</Form.Field>
				<Form.Field>
					<label>Recipient</label>
					<Input value={recipient} onChange={e => updateRecipient(e.target.value)}/>
				</Form.Field>
				<Message
					error
					header='Oops!'
					content={errorMessage}
				/>
				<Button primary loading={loading}>Create!</Button>
			</Form>
		</Layout>
	);
}

RequestNew.getInitialProps = props => {
	return { address: props.query.address };
}

export default RequestNew;
