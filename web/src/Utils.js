/**
 * Generic function to call a smart contract from a specific network
 * @param {*} web3 gives the caracteristics of the network where the smart
 *                 contract is deployed
 * @param {*} contract_abi to know the function signature to call
 * @param {String} contract_address the address of the smart contract
 * @param {String} method the function to call
 * @param {Array} values the parameter of the function to call
 * @returns the function result
 */
export async function call(web3, contract_abi, contract_address, method, values) {
    // getting method signature (inputs, outputs)
    const functionAbi = contract_abi._jsonInterface.find(e => {
        return e.name === method;
    });

    // if values are given, they are encoded according to the inputs
    const functionArgs =
        values !== null
        ? web3.eth.abi.encodeParameters(functionAbi.inputs, values).slice(2)
        : null;

    // calling function from smart contract and get an encoded response
    const response = await web3.eth.call({
        to: contract_address,
        data:
            functionArgs !== null
            ? functionAbi.signature + functionArgs
            : functionAbi.signature
    });

    // response is decoded according to the outputs...
    const result = await web3.eth.abi.decodeParameters(functionAbi.outputs, response)[0];
    
    // ... and returned
    return result;
}

/**
 * Generic function to send a transaction thanks to MetaMask
 * @param {*} web3 gives the caracteristics of the network where the smart
 *                 contract is deployed
 * @param {*} contract_abi to know the function signature to call
 * @param {String} contract_address the address of the smart contract
 * @param {String} method the function to call
 * @param {Array} values the parameter of the function to call
 * @param {String} account the signing account
 */
export async function send(web3, contract_abi, contract_address, method, values, account) {
    // getting method signature (inputs, outputs)
    const functionAbi = contract_abi._jsonInterface.find(e => {
        return e.name === method;
    });
    
    // if values are given, they are encoded according to the inputs
    const functionArgs =
        values !== null
        ? web3.eth.abi.encodeParameters(functionAbi.inputs, values).slice(2)
        : null;

    // filling metamask calling options
    const metamask = {
        from: account,
        to: contract_address,
        data: functionArgs !== null ? functionAbi.signature + functionArgs : functionAbi.signature,
        gasPrice:0
    };
    
    // requesting metamask (so the user) to validate the transaction
    await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [metamask]
    })
    .then(() => {alert("Transaction sent!")}) // everything is fine
    .catch((error) => {alert("Error during transaction:" + error)}); // there were an error
}