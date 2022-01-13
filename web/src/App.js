import './App.css';
import logo_metamask from './img/logo_metamask.png';

import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

import Deposit from './Deposit';
import NFTViewer from './NFTViewer';

class App extends Component {

    async loadBlockChain() {
		const {ethereum} = window;
		if (ethereum) {
			ethereum.request({ method: 'eth_requestAccounts' });
			localStorage.setItem("selectedAddress", ethereum.selectedAddress);
		}
	}

	componentDidMount() {
		window.ethereum.on('accountsChanged', function (accounts) {
			console.log(accounts);
			localStorage.setItem("selectedAddress", accounts[0]);
			window.location.reload();
		});

		window.ethereum.on('connect', function(accounts) {
			localStorage.setItem("selectedADdress", accounts[0]);
		});

		window.ethereum.on('disconnect', function() {
			localStorage.setItem("selectedAddress", null);
		});
	}

    connectMetamask = () => {
        const {ethereum} = window;
		if (ethereum) {
			ethereum.request({ method: 'eth_requestAccounts' });
			localStorage.setItem("selectedAddress", ethereum.selectedAddress);
		} else {
			alert("Please install Metamask in your browser");
		}
    }

	setAPIKey() {
		const api_key = document.getElementById("txt_api_key").value;
		if (api_key != "") {
			localStorage.setItem("APIKey", api_key);
		}
	}

	displayAPIKey() {
		if (localStorage.getItem("APIKey")) {
			return (
				<div>
					<p>Your NFT Storage API Key is: {localStorage.getItem("APIKey")}</p>
				</div>
			);
		} else {
			return(
				<div>
					<label>Please set your NFT Storage API key:</label>
					<input id="txt_api_key" type="text"></input>
					<Button onClick={() => this.setAPIKey()}>Set API Key</Button>
				</div>
			);
		}
	}
	
	render() {
		const selectedAddress = localStorage.getItem("selectedAddress");
		console.log(selectedAddress);
        if (selectedAddress !== "undefined") {
			return (
				<div className="Connection">
					<p>You're connected with Metamask with account {selectedAddress}</p>
					{this.displayAPIKey()}
                    <Deposit
      					web3={this.props.web3}
						contract_nft={this.props.contract_nft}
						address_nft={this.props.address_nft}
						account={selectedAddress}
					/>
					<NFTViewer 
      					web3={this.props.web3}
						contract_nft={this.props.contract_nft}
						address_nft={this.props.address_nft}
						account={selectedAddress}
					/>
				</div>
			);
		} else {
			return (
				<p>
					<Button onClick={this.connectMetamask}>Connect to MetaMask</Button>
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