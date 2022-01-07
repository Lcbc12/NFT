import {React, Component} from 'react';
import ReactFileReader from 'react-file-reader';

import * as raw from 'multiformats/codecs/raw'
import { CID } from 'multiformats/cid'
import { sha256 } from 'multiformats/hashes/sha2'

class Deposit extends Component {

    state = {fileName: null,  cid: null}

    onFileChange = async event => {
        const bytes = new TextEncoder().encode(event.target.files[0])
        const hash = await sha256.digest(raw.encode(bytes))
        const cid = CID.create(1, raw.code, hash)
        console.log(cid.toString());
        this.setState({"cid":cid.toString()});
        console.log(event.target.files[0].name);
        this.setState({"fileName": event.target.files[0].name});
    }

    async onFileUpload(fileName, cid) { 
        if (fileName && cid) {
            console.log("Send identifier in NFT smart contract");
            console.log("Upload image in NFT storage thanks to nft storage API");
        }
    }

    async componentDidMount() {
    }

    fileData = () => { 
        if (this.state.fileName && this.state.cid) {
            return ( 
                <div> 
                    <h3>Image details:</h3> 
                    <p>Name : {this.state.fileName}</p>
                    <p>CAR Identifier : {this.state.cid}</p>
                    <br/>
                    <button onClick={() => this.onFileUpload(this.state.file.name, this.state.cid)}>Submit</button>
                </div> 
            ); 
        }
    }; 

    render() { 
        return ( 
          <div>
              <h3> 
                Deposit you image :
              </h3>
              <div>
                <input type="file" name="file" onChange={this.onFileChange} />
                <ReactFileReader handleFiles={this.onFileChange} base64={true}>
                    <></>
                </ReactFileReader>
                <br/>
                {this.fileData()}
              </div>
          </div>
        ); 
    }
}

export default Deposit;