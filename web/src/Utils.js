export async function call(web3, contract_abi, contract_address, method, values) {
    const functionAbi = contract_abi._jsonInterface.find(e => {
        return e.name === method;
    });

    const functionArgs =
        values !== null
        ? web3.eth.abi.encodeParameters(functionAbi.inputs, values).slice(2)
        : null;

    const optionCall = await web3.eth.call({
        to: contract_address,
        data:
            functionArgs !== null
            ? functionAbi.signature + functionArgs
            : functionAbi.signature
    });

    const result = await web3.eth.abi.decodeParameters(functionAbi.outputs, optionCall)[0];
    return result;
}

export async function send(web3, contract_abi, contract_address, method, values, account) {
    const functionAbi = contract_abi._jsonInterface.find(e => {
        return e.name === method;
    });
    
    const functionArgs =
        values !== null
        ? web3.eth.abi.encodeParameters(functionAbi.inputs, values).slice(2)
        : null;

    const metamask = {
        from: account,
        to: contract_address,
        data: functionArgs !== null ? functionAbi.signature + functionArgs : functionAbi.signature,
        gasPrice:0
    };
    
    await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [metamask]
    });
}