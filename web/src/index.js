import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Web3 from 'web3';
import NFT from './contracts/NFT.json';

//TODO detect on where network we are
// We would be able to know which cryptowallet to call
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const contract_nft = new web3.eth.Contract(NFT.abi);
const address_nft = NFT.networks[2022].address;

ReactDOM.render(
  <React.StrictMode>
    <App 
      web3={web3}
      contract_nft={contract_nft}
      address_nft={address_nft}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
