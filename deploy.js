const {Web3} = require('web3');
const {abi,evm} = require('./compile');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider(
    'field rose iron drip leader fault valve cloud pulse october pool trade',
    'https://sepolia.infura.io/v3/8057c9b391954b3594b84a8f308b5133'
)
const web3 = new Web3(provider);
const deploy = async()=>{
    let accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    let inbox = await new web3.eth.Contract(abi)
    .deploy({
        data: evm.bytecode.object,
        arguments : ['Hi There!']
    })
    .send({
        from: accounts[0],
        gas : '1000000'
    })
    console.log("Contract deployed to : ", inbox.options.address);
}
deploy();