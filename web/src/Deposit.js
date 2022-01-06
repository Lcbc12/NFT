import {React, Component} from 'react';

class Deposit extends Component {

	constructor(props) {
		super(props);

		this.state = {
            file: null,
            carIdentifier: null
		};
	}

    onFileChange = event => { 
        console.log(event.target.files);
        // upload image in state
        this.setState({ file: event.target.files[0] });
        this.setState({ carIdentifier: "stub" });
        console.log("Compute CAR identifier and upload it in state")
    }

    async onFileUpload(fileName, carIdentifier) { 
        if (fileName && carIdentifier) {
            console.log("Send identifier in NFT smart contract");
            console.log("Upload image in NFT storage thanks to nft storage API");
        }
    }

    componentDidMount() {
    }

    fileData = () => { 
        if (this.state.file && this.state.carIdentifier) {
            return ( 
                <div> 
                    <h3>Image details:</h3> 
                    <p>Name : {this.state.file.name}</p>
                    <p>CAR Identifier : {this.state.carIdentifier}</p>
                    <br/>
                    <button onClick={() => this.onFileUpload(this.state.file.name, this.state.carIdentifier)}>Submit</button>
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
                <br/>
                {this.fileData()}
              </div>
          </div>
        ); 
    }
}

export default Deposit;