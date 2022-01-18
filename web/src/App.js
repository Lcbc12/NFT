import './App.css';

import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

import logo_information from "./img/logo_information.png";

import Upload from './Upload';
import NFTViewer from './NFTViewer';

class App extends Component {

	state = { screen: "upload"}

	componentDidMount() {

		window.ethereum.on('accountsChanged', function (accounts) {
			console.log("Accounts Changed");
			localStorage.setItem("selectedAddress", accounts[0]);
			window.location.reload();
		});

		window.ethereum.on('disconnect', function() {
			localStorage.setItem("selectedAddress", null);
		});
	}

    connectMetamask = () => {
        const {ethereum} = window;
		if (ethereum) {
			console.log("connectMetamask");
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
		//<Button onClick={() => this.copyToClipBoard()} title={localStorage.getItem("APIKey")}>i</Button>
		if (localStorage.getItem("APIKey")) {
			return (
				<div>
					<p>
						Your NFT Storage API Key is set.
						<img className='information' onClick={() => this.copyToClipBoard()} src={logo_information} title={localStorage.getItem("APIKey")}/>
					</p>
					<table>
						<tbody>
							<tr>
								<td><label>Please set your NFT Storage API key:</label></td>
								<td><input id="txt_api_key" type="text"></input></td>
								<td><Button onClick={() => this.setAPIKey()}>Set API Key</Button></td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		} else {
			return(
				<div>
					<table>
						<tbody>
							<tr>
								<td><label>Please set your NFT Storage API key:</label></td>
								<td><input id="txt_api_key" type="text"></input></td>
								<td><Button onClick={() => this.setAPIKey()}>Set API Key</Button></td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}
	}

	displayConnection() {
		if (localStorage.getItem("selectedAddress") !== "undefined") {
			return(
				<div className="Connection">
					<p>You're connected with Metamask with account {localStorage.getItem("selectedAddress")}</p>
					{this.displayAPIKey()}
				</div>
			);
		} else {
			return(
				<div className="Connection">
					<p>You're not connected with Metamask. Please connect to mint NFT!</p>
					<p><Button onClick={this.connectMetamask}>Connect to MetaMask</Button></p>
				</div>
			);
		}
	}

	upload = () => {
		this.setState({"screen":"upload"});
	}

	myNFT = () => {
		this.setState({"screen":"allNFT"});
	}

	connection = () => {
		this.setState({"screen":"connection"});
	}

	copyToClipBoard = () => {
		navigator.clipboard.writeText(localStorage.getItem("APIKey"));
	}
	
	render() {
		return (
			<div className='App'>
				<div className='container'>
					<div className="title"><h1>NFT Minter</h1></div>

					<table className="bandeau">
						<tbody>
							<tr>
								<td><Button type="button" variant="primary" className="menu" onClick={this.upload}>Upload NFT</Button></td>
								<td><Button type="button" variant="primary" className="menu" onClick={this.myNFT}>All NFT</Button></td>
								<td><Button type="button" variant="primary" className="menu" onClick={this.connection}>Wallet & NFT Storage</Button></td>
							</tr>
						</tbody>
					</table>

					<div className='content'>

						{this.state.screen==="connection" && this.displayConnection()}
						{
							this.state.screen==="upload" &&
							<Upload
								web3={this.props.web3}
								contract_nft={this.props.contract_nft}
								address_nft={this.props.address_nft}
								account={localStorage.getItem("selectedAddress")}
								connected={localStorage.getItem("selectedAddress") !== "undefined"}
							/>
						}
						{
							this.state.screen === "allNFT" &&
							<NFTViewer 
								web3={this.props.web3}
								contract_nft={this.props.contract_nft}
								address_nft={this.props.address_nft}
								account={localStorage.getItem("selectedAddress")}
							/>
						}
					</div>
				</div>
			</div>
		);
    }
}

export default App;

/**
 * <ul>
						TODO:
						<li>Image upload form. See Upload.js</li>
						<li>Transaction to smart contract. See Utils.js to generic functions</li>
						<li>
							<ul>
							Connection to NFT Storage
									<li>Use ipfs-car to make an identifier of file to upload : https://github.com/web3-storage/ipfs-car</li>
									<li>Learn nft storage API : https://nftstorage.github.io/nft.storage/client/ & https://nft.storage/api-docs/</li>
							</ul>
						</li>
						<li>Better connection management with Metamask</li>
						<li>CSS</li>
					</ul>

					<ol>
						Process:
						<li>Connection to, at least, one wallet. v1: just MetaMask</li>
						<li>Upload image we want as a NFT</li>
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