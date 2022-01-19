import './App.css';

import {Component} from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

import logo_information from "./img/logo_information.png";

import Upload from './Upload';
import NFTViewer from './NFTViewer';

/**
 * Contains necessary functions and screens to use this NFT site
 */
class App extends Component {

	state = { screen: "upload"}

	/**
	 * Subscribe to metamask disconnecting or changing accounts.
	 * When disconnecting the last connected account, variable "accounts"
	 * is an empty array. Hence, the value of "disconnected" account wwill be
	 * "undefined". We will use this value for testing the connection.
	 */
	componentDidMount() {
		const {ethereum} = window;

		// Metamask installed?
		if (ethereum) {
			ethereum.on('accountsChanged', function (accounts) {
				// when changing metamask account, we change the selected
				// address of the site
				localStorage.setItem("selectedAddress", accounts[0]);
				window.location.reload();
			});
	
			ethereum.on('disconnect', function() {
				localStorage.setItem("selectedAddress", "undefined");
			});
		} else {
			console.log("MetaMask is not installed");
		}
	}

	/**
	 * Ask the user to connect one of her metamask account to the site
	 */
    connectMetamask = () => {
        const {ethereum} = window;
		if (ethereum) {
			ethereum.request({ method: 'eth_requestAccounts' });
			localStorage.setItem("selectedAddress", ethereum.selectedAddress);
		} else {
			alert("Please install Metamask in your browser");
		}
    }

	/**
	 * Get the value of the key written in "txt_api_key"
	 * This key comes from NFT Storage
	 */
	setAPIKey() {
		const api_key = document.getElementById("txt_api_key").value;
		if (api_key != "") {
			localStorage.setItem("APIKey", api_key);
		}
	}

	/**
	 * Display the form to set a new key.
	 * If a key is already set, display an image with its value
	 */
	displayAPIKey() {
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

	/**
	 * If connected, display the account connected
	 * If not, display the button to connect a metamask account to the site
	 */
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

	/**
	 * When clicking a menu button, set the value of what to display in the
	 * state.
	 * Here, user clicked the upload button.
	 */
	upload = () => {
		this.setState({"screen":"upload"});
	}

	/**
	 * When clicking a menu button, set the value of what to display in the
	 * state.
	 * Here, user clicked the viewer button.
	 */
	myNFT = () => {
		this.setState({"screen":"viewer"});
	}

	/**
	 * When clicking a menu button, set the value of what to display in the
	 * state.
	 * Here, user clicked the connection button.
	 */
	connection = () => {
		this.setState({"screen":"connection"});
	}

	/**
	 * Copy the API key from NFT storage to the clipboard
	 */
	copyToClipBoard = () => {
		navigator.clipboard.writeText(localStorage.getItem("APIKey"));
		alert("Copied to clipboard!");
	}
	
	/**
	 * Display all the site
	 */
	render() {
		return (
			<div className='App'>
				<div className='container'>
					<div className="title"><h1>NFT Minter</h1></div>

					<table className="banner">
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
							this.state.screen === "viewer" &&
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