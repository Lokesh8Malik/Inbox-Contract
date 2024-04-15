const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
 
const { abi, evm } = require('../compile');
 
let accounts;
let inbox;
 
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Hi there!'],
    })
    .send({ from: accounts[0], gas: '1000000' });
});
 
describe('Inbox', () => {
    it('unlocked accounts',()=>{
        console.log(accounts);
    })
    it('deploys a contract', () => {
      assert.ok(inbox.options.address);
    });
    it('has a default messgae',async()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi there!')
    })
    it('message we can set',async()=>{
        await inbox.methods.setMessage('Bye').send({
            from: accounts[0]
        })
        const message = await inbox.methods.message().call();
        assert.equal(message,'Bye')
    })
})