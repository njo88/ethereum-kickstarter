import React, { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import Campaign from '../ethereum/campaign';
import web3 from "../ethereum/web3";
import { Router } from '../routes';

const ContributeForm = props => {

	const [value, updateValue] = useState('');
	const [errorMessage, updateErrorMessage] = useState('');
	const [loading, updateLoading] = useState(false);

	const onSubmit = async e => {
		e.preventDefault();
		const campaign = Campaign(props.address);
		updateLoading(true);
		updateErrorMessage('');
		try {
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.contribute().send({
				from: accounts[0],
				value: web3.utils.toWei(value, 'ether')
			});
			Router.replaceRoute(`/campaigns/${props.address}`);
		} catch (err) {
			updateErrorMessage(err.message);
		}
		updateLoading(false);
		updateValue('');
	};

	return (
		<Form onSubmit={onSubmit} error={!!errorMessage}>
			<Form.Field>
				<label>Amount to Contribute</label>
				<Input
					label='ether'
					labelPosition='right'
					value={value}
					onChange={e => updateValue(e.target.value)}
				/>
			</Form.Field>
			<Message
				error
				header='Oops!'
				content={errorMessage}
			/>
			<Button primary type='submit' loading={loading}>Contribute!</Button>
		</Form>
	)
};

export default ContributeForm;
