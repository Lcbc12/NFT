import {React, Component} from 'react';
import {call, send} from './Utils';
import Button from 'react-bootstrap/Button';

class NFTViewer extends Component {

    state = { image_url: null }

    async fetchIPFSJSON(ipfsURI) {
        const url = ipfsURI.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
        const resp = await fetch(url);
        return resp.json();
    }

    componentDidMount() {
    }

    async getTokenId() {
        //TODO check that the text from txt_tokenId is parsable
        const tokenId = parseInt(document.getElementById("txt_tokenId").value, 10);
        const uri = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "getURI", [tokenId]);
        const metadataJSON = await this.fetchIPFSJSON(uri);
        const image_url = metadataJSON.image.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
        console.log(image_url);
        this.setState({"image_url": image_url});
    }

    render() {
        return (
            <div>
                <h3>NFT Viewer:</h3>
                <br/>
                <input id="txt_tokenId" type="text"></input>
                <Button onClick={() => this.getTokenId()}>Submit Token ID</Button>
                <br/>
                {this.state.image_url && <img src={this.state.image_url} />}
            </div>
        );
    }

}

export default NFTViewer;