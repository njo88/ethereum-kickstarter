import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0xf9E7Dcf270270e8d31D88503593dB185022CA7Ac'
);

export default instance;
