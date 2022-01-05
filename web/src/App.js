import logo_metamask from './img/logo_metamask.png';
import {React, Component} from 'react';
import './App.css';

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
				<p>You're connected with Metamask with account {this.state.selectedAddress}</p>
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
						<li>Image deposit form</li>
						<li>Transaction to smart contract</li>
						<li>Connection to NFT Storage</li>
						<li>Better connection management with Metamask</li>
						<li>CSS</li>
					</ul>
				</div>
		);
	}
}

export default App;
