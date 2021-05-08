import React from 'react';
import { Menu } from 'semantic-ui-react';

const Header = () => (
	<Menu style={{marginTop: '10px'}}>
		<Menu.Item name='logo' onClick={() => console.log('item clicked')}>CrowdCoin</Menu.Item>

		<Menu.Menu position="right">
			<Menu.Item name='campaigns' onClick={() => console.log('campaigns clicked')}>Campaigns</Menu.Item>
			<Menu.Item name='new' onClick={() => console.log('add new clicked')}>+</Menu.Item>
		</Menu.Menu>
	</Menu>
);

export default Header;
