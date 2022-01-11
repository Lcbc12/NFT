import {React, Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Button from 'react-bootstrap/Button';

import * as raw from 'multiformats/codecs/raw'
import { CID } from 'multiformats/cid'
import { sha256 } from 'multiformats/hashes/sha2'

import { NFTStorage, File } from 'nft.storage'
import { pack } from 'ipfs-car/pack';

import {call, send} from './Utils';
import NFTViewer from './NFTViewer';

class Deposit extends Component {

    state = {file: null, data: null, url: null}

    onFileChange = async event => {
        this.setState({"data": event.base64});
        this.setState({"file": event.fileList[0]});
    }


    async fetchIPFSJSON(ipfsURI) {
        const url = ipfsURI.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
        console.log(url);
        const resp = await fetch(url);
        return resp.json();
    }
  

    async onFileUpload(file) { 
        if (file) {
            const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJDZTFBMkFEMzVDOWUwRTQ2YTUzRWRFNEFlNDliRDBDYTJiMzBGMDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MTQ4MzIyMjcxOSwibmFtZSI6InRlc3QifQ.3dAaYJQkvSAfzT7jveAe-DXXsGKfAKoOHlQ-flm4gDY'
            const client = new NFTStorage({ token: apiKey });
            const metadata = await client.store({
                name: this.state.file.name,
                description: 'test',
                image: new File([ file ], this.state.file.name, { type: this.state.file.type })
            });

            send(this.props.web3, this.props.contract_nft, this.props.address_nft, "mint", [this.props.account], this.props.account);
            const metadata_json = await this.fetchIPFSJSON(metadata.url);
            const url_image = metadata_json.image.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
            this.setState({"url": url_image});
        }
    }

    async componentDidMount() {
    }

    fileData = () => { 
        if (this.state.file && this.state.data) {
            return ( 
                <div> 
                    <h3>Image details:</h3> 
                    <p>Name: {this.state.file.name}</p>
                    <p>Type: {this.state.file.type} </p>
                    <img src={this.state.data}/>
                    <br/>
                    <button onClick={() => this.onFileUpload(this.state.file)}>Submit</button>
                </div>
            );
        }
    };

    displayViewer = () => {
        if (this.state.url) {
            return (
                <div>
                    <NFTViewer
                        url={this.state.url}
                    />
                </div>
            );
        }
    }

    render() { 
        return ( 
          <div>
              <h3> 
                Deposit you image :
              </h3>
              <div>
                <ReactFileReader handleFiles={this.onFileChange} base64={true}>
                    <Button type="button" variant="primary" className="custom-btn">
                            Browse...
                    </Button>
                </ReactFileReader>
                <br/>
                {this.fileData()}
                {this.displayViewer()}
              </div>
          </div>
        ); 
    }
}

export default Deposit;