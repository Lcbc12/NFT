import './App.css';
import logo_metamask from './img/logo_metamask.png';

import {Component} from 'react';
import './App.css';

import Deposit from './Deposit';

class App extends Component {

	state = {selectedAddress: null}

    componentDidMount() {
		if (this.selectedAddress==null && localStorage.getItem("selectedAddress") == null) {
			const {ethereum} = window;
			if (ethereum) {
				const account = ethereum.selectedAddress;
				this.setState({selectedAddress:account});
				localStorage.setItem("selectedAddress", account);
			}
		}
    }

    connectMetamask = () => {
        const {ethereum} = window;
		if (ethereum) {
			ethereum.request({ method: 'eth_requestAccounts' });
			const account = ethereum.selectedAddress;
			this.setState({selectedAddress:account});
			localStorage.setItem("selectedAddress", account);
		} else {
			alert("Please install Metamask in your browser");
		}
    }

    render() {
		console.log(this.state.selectedAddress);
        if (this.state.selectedAddress) {
			return (
				<div className="Connection">
					<p>You're connected with Metamask with account {this.state.selectedAddress}</p>
                    <Deposit/>
				</div>
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
}

export default App;

/**
 * <ul>
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
 */