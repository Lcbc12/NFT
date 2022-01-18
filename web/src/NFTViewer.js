import {React, Component} from 'react';
import {call, send} from './Utils';
import Button from 'react-bootstrap/Button';

class NFTViewer extends Component {

    state = { nft: null, nfts: null }

    async getImageUrlFromUri(ipfsURI) {
        const url = ipfsURI.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
        const resp = await fetch(url);
        const json = await resp.json();
        return json.image.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
    }

    async loadIds() {
        const ids = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "getIds", null);
        console.log(ids);
        var nfts = [];
        for(var id in ids) {
            const uri = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "getURI", [ids[id]]);
            const owner = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "ownerOf", [ids[id]]);
            const image_url = await this.getImageUrlFromUri(uri);
            nfts.push({"id":ids[id], "url":image_url, "owner": owner});
        }

        this.setState({"nfts": nfts});
    }

    componentDidMount() {
        this.loadIds();
    }

    async getTokenId() {
        //TODO check that the text from txt_tokenId is parsable
        const tokenId = parseInt(document.getElementById("txt_tokenId").value, 10);
        const uri = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "getURI", [tokenId]);
        const owner = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "ownerOf", [tokenId]);
        const image_url = await this.getImageUrlFromUri(uri);
        const nft = {"id":tokenId, "url":image_url, "owner":owner};
        this.setState({"nft": nft});
    }

    displayHeader() {
        return (
            <thead>
                <tr>
                    <th>Identifier</th>
                    <th>Image</th>
                    <th>Owner</th>
                </tr>
            </thead>
        );
    }

    displayNFT() {
        return this.state.nfts.map((nfts, index) => {
            const { id, url, owner} = nfts;
            return (
                <>
                    <tr>
                        <td>{id}</td>
                        <td><img src={url} /></td>
                        <td>{owner}</td>
                    </tr>
                </>
            );
        });
    }

    render() {
        return (
            <div className='content'>
                <h3>NFT Viewer</h3>
                <br/>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Enter NFT id to search:</label></td>
                            <td><input id="txt_tokenId" type="text"></input></td>
                            <td><Button onClick={() => this.getTokenId()}>Submit id</Button></td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                {this.state.nft && <img src={this.state.nft.url} />}
                <table>
                    {this.state.nfts && this.displayHeader()}
                    <tbody>
                        {this.state.nfts && this.displayNFT()}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default NFTViewer;