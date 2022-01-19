import {React, Component} from 'react';
import {call} from './Utils';
import Button from 'react-bootstrap/Button';

/**
 * Contains functions to view all NFT minted in the local blockchain
 */
class NFTViewer extends Component {

    state = { nft: null, nfts: null }

    /**
     * Get the image URL from the Uniform Resource Identifier given in
     * parameter
     * URI gives access to Metadata JSON file
     * Metadata JSON file gives access to image URL
     * @param {*} ipfsURI URI to the metadata JSON file
     * @returns image URL
     */
    async getImageUrlFromUri(ipfsURI) {
        const url = ipfsURI.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
        const resp = await fetch(url);
        const json = await resp.json();
        return json.image.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
    }

    /**
     * Loads the NFT which identifier is equals to the one given in
     * "txt_tokenId" text field.
     */
     async loadNFT() {
        //TODO check that the text from txt_tokenId is parsable
        const tokenId = parseInt(document.getElementById("txt_tokenId").value, 10);
        const uri = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "getURI", [tokenId]);
        const owner = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "ownerOf", [tokenId]);
        const image_url = await this.getImageUrlFromUri(uri);
        const nft = {"id":tokenId, "url":image_url, "owner":owner};
        this.setState({"nft": nft});
    }

    /**
     * Loads all ids stored in the blockchain and puts every NFT data
     * in the state. NFT data are:
     *  - unique identifier;
     *  - image URL;
     *  - NFT owner.
     */
    async loadNFTs() {
        const ids = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "getIds", null);
        var nfts = [];
        for(var id in ids) {
            const uri = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "getURI", [ids[id]]);
            const owner = await call(this.props.web3, this.props.contract_nft, this.props.address_nft, "ownerOf", [ids[id]]);
            const image_url = await this.getImageUrlFromUri(uri);
            nfts.push({"id":ids[id], "url":image_url, "owner": owner});
        }

        this.setState({"nfts": nfts});
    }

    /**
     * In order to display all NFT, we load all NFT when the component did
     * mount.
     */
    componentDidMount() {
        this.loadNFTs();
    }

    /**
     * Display the header of NFT table
     */
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

    /**
     * Display all NFT data:
     *  - Identifier;
     *  - Image;
     *  - Owner.
     */
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

    /**
     * Display every form and data concerning NFT
     */
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
                            <td><Button onClick={() => this.loadNFT()}>Submit id</Button></td>
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