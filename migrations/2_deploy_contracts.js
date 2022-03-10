var TestGas = artifacts.require("./TestGas.sol");

module.exports = function (deployer) {
	deployer.deploy(TestGas);
};
