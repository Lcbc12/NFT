import logo_metamask from './img/logo_metamask.png';
import {React, Component} from 'react';
import './App.css';

import Deposit from './Deposit';

// TODO
// Bouton de connexion à metamask
// Dépôt de métadonnée d'une image dans la blockchain (smart contract)
// Voir connexion avec système de stockage NFT là
class App extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			this: this,
			selectedAddress: null
		};

		this.connectMetamask = this.connectMetamask.bind(this);
	}

	async componentDidMount() {
		const {ethereum} = window;
		if (ethereum) {
			const account = await ethereum.selectedAddress;
			this.setState({selectedAddress:account});
		}
	}
	
	connectMetamask = async () => {
		const {ethereum} = window;
		if (ethereum) {
			ethereum.request({ method: 'eth_requestAccounts' });
			const account = await ethereum.selectedAddress;
			this.setState({selectedAddress:account});
		} else {
			alert("Please install Metamask in your browser");
		}
	}

	displayConnection() {
		if (this.state.selectedAddress) {
			return (
				<>
					<p>You're connected with Metamask with account {this.state.selectedAddress}</p>
					<Deposit
						account={this.state.selectedAddress}
					/>
				</>
			);
		} else {
			return (
				<p>
					<img className='logo' src={logo_metamask} onClick={this.connectMetamask}/>
					<br/>
					Click here to connect with Metamask
				</p>
			);
		}
	}

	render() {
		return (
				<div className="App">
					<div className="Connection">
						{this.displayConnection()}
					</div>
					<ul>
						TODO:
						<li>Image deposit form. See Deposit.js</li>
						<li>Transaction to smart contract. See Utils.js to generic functions</li>
						<li>
							<ul>
							Connection to NFT Storage
									<li>Use ipfs-car to make an identifier of file to deposit : https://github.com/web3-storage/ipfs-car</li>
									<li>Learn nft storage API : https://nftstorage.github.io/nft.storage/client/ & https://nft.storage/api-docs/</li>
							</ul>
						</li>
						<li>Better connection management with Metamask</li>
						<li>CSS</li>
					</ul>

					<ol>
						Process:
						<li>Connection to, at least, one wallet. v1: just MetaMask</li>
						<li>Deposit image we want as a NFT</li>
						<li>Use ipfs-car to get the corresponding identifier</li>
						<li>Add identifier to the NFT smart contract</li>
						<li>Upload the image in NFT Storage</li>
					</ol>

					<ol>
						Possible future features:
						<li>List of NFT pocessed by the connected account</li>
						<li>Transfer NFT between accounts</li>
					</ol>
				</div>
		);
	}
}

export default App;
