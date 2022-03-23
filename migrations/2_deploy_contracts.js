var PlagiarismContract = artifacts.require("./PlagiarismContract.sol");

module.exports = function (deployer) {
	deployer.deploy(PlagiarismContract);
};
