import {React, Component} from 'react';

class NFTViewer extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h3>NFT Viewer uploaded:</h3>
                <br/>
                <img src={this.props.url} />
                <p>TODO: retrieve all uri from smart contract</p>
            </div>
        );
    }

}

export default NFTViewer;