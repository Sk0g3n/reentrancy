const Reentrance = artifacts.require("Reentrance");
const Hackrent = artifacts.require("Hackrent");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Reentrance).then(() => deployer.deploy(Hackrent, Reentrance.address, {from: accounts[1]} ));
};
