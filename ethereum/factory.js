import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0xcFd7c86E8574805541aFF469943A00785687056e'
);

export default instance;
