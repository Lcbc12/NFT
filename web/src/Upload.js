import {React, Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Button from 'react-bootstrap/Button';

import { NFTStorage, File } from 'nft.storage'

import {send} from './Utils';

/**
 * Contains functions to mint a NFT from an image. 
 */
class Upload extends Component {

    state = {file: null, data: null}

    /**
     * When uploading a new file on the site, stores all information in
     * the state
     */
    onFileChange = async event => {
        this.setState({"data": event.base64});
        this.setState({"file": event.fileList[0]});
    }  

    /**
     * When clicking the submit button, get the NFT storage API key, NFT name
     * and description before:
     *  1. uploads the image in NFT Storage. It returns the metadata JSON file;
     *  2. from the metadata file, get the URI and upload it in the blockchain.
     */
    async onFileUpload() {
        const file = this.state.file;
        if (this.props.connected && file) {
            const apiKey = localStorage.getItem("APIKey");
            const name = document.getElementById("txt_name").value;
            const description = document.getElementById("txt_description").value;
            if (file && apiKey !== "" && name !== "" && description !== "") {
                const client = new NFTStorage({ token: apiKey });
                
                // creates a file in NFT Storage
                const metadata = await client.store({
                    name: name,
                    description: description,
                    image: new File([ file ], file.name, { type: file.type })
                });

                // upload all generated elements in the blockchain
                await send(this.props.web3, this.props.contract_nft, this.props.address_nft, "mint", [this.props.account, metadata.url], this.props.account);
            }
        } else {
            alert("You're not connected to MetaMask!");
        }
    }

    /**
     * Nothing to load here, everything must be given by the user
     */
    async componentDidMount() {
    }

    /**
     * After the user uploaded the image, display the form to fill the
     * necessary fields.
     * Also display the button to submit her file.
     */
    diplayFileData = () => {
        // display the form only if a file is uploaded, nothing otherwise
        if (this.state.file && this.state.data) {
            return ( 
                <div className='content'> 
                    <h3>Image details:</h3>
                    <img src={this.state.data}/>
                    <br/>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>NFT name:</label></td>
                                <td><input id="txt_name" type="text"></input></td>
                            </tr>
                            <tr>
                                <td><label>Description:</label></td>
                                <td><input id="txt_description" type="text"></input></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button
                                        className="button"
                                        onClick={() => this.onFileUpload()}
                                        disabled={!this.props.connected}
                                    >
                                        Submit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    };

    /**
     * Display all necessary elements to mint a new NFT
     */
    render() { 
        return ( 
          <div>
              <h3> 
                Upload your image :
              </h3>
              <div>
                <ReactFileReader handleFiles={this.onFileChange} base64={true}>
                    <Button type="button" variant="primary" className="custom-btn">
                            Browse...
                    </Button>
                </ReactFileReader>
                <br/>
                {this.diplayFileData()}
              </div>
          </div>
        ); 
    }
}

export default Upload;