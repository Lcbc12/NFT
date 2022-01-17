import {React, Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Button from 'react-bootstrap/Button';

import * as raw from 'multiformats/codecs/raw'
import { CID } from 'multiformats/cid'
import { sha256 } from 'multiformats/hashes/sha2'

import { NFTStorage, File } from 'nft.storage'
import { pack } from 'ipfs-car/pack';

import {call, send} from './Utils';

class Upload extends Component {

    state = {file: null, data: null}

    onFileChange = async event => {
        this.setState({"data": event.base64});
        this.setState({"file": event.fileList[0]});
    }  

    async onFileUpload(file) { 
        const apiKey = localStorage.getItem("APIKey");
        const name = document.getElementById("txt_name").value;
        const description = document.getElementById("txt_description").value;
        if (file && apiKey != "" && name != "" && description != "") {
            const client = new NFTStorage({ token: apiKey });
            
            const metadata = await client.store({
                name: name,
                description: description,
                image: new File([ file ], this.state.file.name, { type: this.state.file.type })
            });

            await send(this.props.web3, this.props.contract_nft, this.props.address_nft, "mint", [this.props.account, metadata.url], this.props.account);
        }
    }

    async componentDidMount() {
    }

    fileData = () => { 
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
                                <td></td><td><button onClick={() => this.onFileUpload(this.state.file)}>Submit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    };

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
                {this.fileData()}
              </div>
          </div>
        ); 
    }
}

export default Upload;