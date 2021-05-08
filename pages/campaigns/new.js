import React, { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import Layout from "../../components/layout";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";

const New = () => {

	const [minimumContribution, updateMinimumContribution] = useState('');
	const [errorMessage, updateErrorMessage] = useState('');

	const onSubmit = async e => {
		e.preventDefault();
		const accounts = await web3.eth.getAccounts();
		try {
			await factory.methods
			.createCampaign(minimumContribution)
			.send({
				from: accounts[0]
			});
		} catch (e) {
			updateErrorMessage(e.message);
		}
	};

	return (
		<Layout>
			<h3>Create a Campaign</h3>
			<Form onSubmit={onSubmit} error={!!errorMessage}>
				<Form.Field>
					<label>Minimum Contribution</label>
					<Input
						label='wei'
						labelPosition='right'
						value={minimumContribution}
						onChange={e => updateMinimumContribution(e.target.value)}
					/>
				</Form.Field>
				<Message
					error
					header='Oops!'
					content={errorMessage}
				/>
				<Button primary type='submit'>Create!</Button>
			</Form>
		</Layout>
	)
}

export default New;
