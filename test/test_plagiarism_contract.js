const PlagiarismContract = artifacts.require("PlagiarismContract");
Array.prototype.equals = function (arr2) {
	return (
		this.length === arr2.length &&
		this.every((value, index) => value === arr2[index])
	);
};

const hashSet = [
	"0x47c4c1ab373a840d666dc61d9af1ff29",
	"0xe75cc2ca4058524c13fd6a1473325d00",
	"0x72801233251db633f619c753aa70d2f9",
	"0x87781147fa92daa2215037c8889087fe",
	"0xd4f1f58a5d87245566e409c243f2e2bf",
	"0xe2f7ea073f65fce7b124bf72dbb061ad",
	"0xf0ac921fc7013af6fafc53bf48c3c794",
	"0x2abae8e7927ce57a18b9477be91c5ed9",
	"0x08379bf03ad0003676e78313c60fb848",
	"0xafdee93594bcdad7ba401a0072193e0a",
	"0x018dd1e07a2de4a08e6612341bf2323e",
	"0x3f27e3cafa4ed5fcea61f7c24977a154",
	"0x89befd1102aeaead24cfe2b9fa9997f9",
	"0x47c4c1ab37aa840d666dc61d9af1ff29",
	"0xe75cc2ca40a8524c13fd6a1473325d00",
	"0x72801233251ab633f619c753aa70d2f9",
	"0x87781147fa92da2aa15037c8889087fe",
	"0xd4f1f58a5d8724556ae409c243f2e2bf",
	"0xe2f7ea073f65fce7a124bf72dbb061ad",
	"0xf0ac921fc7013af6aafc53bf48c3c794",
	"0x2abae8e7927ce57aa8b9477be91c5ed9",
	"0x08379bf03ad00036a6e78313c60fb848",
	"0xafdee93594bcdad7aa401a0072193e0a",
	"0x018dd1e07a2de4a0ae6612341bf2323e",
	"0x3f27e3cafa4ed5fcaa61f7c24977a154",
	"0x89befd1102aeaeada4cfe2b9fa9997f9",
	"0x47c4c1ab373a840da66dc61d9af1ff29",
	"0xe75cc2ca4058524ca3fd6a1473325d00",
	"0x72801233251db633a619c753aa70d2f9",
	"0x87781147fa92daa2a15037c8889087fe",
	"0xd4f1f58a5d872455a6e409c243f2e2bf",
	"0xe2f7ea073f65fce7b124bf72dbb061ad",
	"0xf0ac921fc7013af6fafc53bf48c3c794",
	"0x2abae8e7927ce57a18b9477be91c5ed9",
	"0x08379bf03ad0003676e78313c60fb848",
	"0xafdee93594bcdad7ba401a0072193e0a",
	"0x018dd1e07a2de4a08e6612341bf2323e",
	"0x3f27e3cafa4ed5fcea61f7c24977a154",
	"0x89befd1102aeaead24cfe2b9fa9997f9",
	"0x47c4c1ab373a840d666dc61d9af1ff29",
	"0xe75cc2ca4058524c13fd6a1473325d00",
	"0x72801233251db633f619c753aa70d2f9",
	"0x87781147fa92daa2215037c8889087fe",
	"0xd4f1f58a5d87245566e409c243f2e2bf",
	"0xe2f7ea073f65fce7b124bf72dbb061ad",
	"0xf0ac921fc7013af6fafc53bf48c3c794",
	"0x2abae8e7927ce57a18b9477be91c5ed9",
	"0x08379bf03ad0003676e78313c60fb848",
	"0xafdee93594bcdad7ba401a0072193e0a",
	"0x018dd1e07a2de4a08e6612341bf2323e",
	"0x3f27e3cafa4ed5fcea61f7c24977a154",
	"0x89befd1102aeaead24cfe2b9fa9997f9",
	"0x47c4c1ab373a840d666dc61d9af1ff29",
	"0xe75cc2ca4058524c13fd6a1473325d00",
	"0x72801233251db633f619c753aa70d2f9",
	"0x87781147fa92daa2215037c8889087fe",
	"0xd4f1f58a5d87245566e409c243f2e2bf",
	"0xe2f7ea073f65fce7b124bf72dbb061ad",
	"0xf0ac921fc7013af6fafc53bf48c3c794",
	"0x2abae8e7927ce57a18b9477be91c5ed9",
	"0x08379bf03ad0003676e78313c60fb848",
	"0x018dd1e07a2de4a08e6612341bf2323e",
	"0x3f27e3cafa4ed5fcea61f7c24977a154",
	"0x89befd1102aeaead24cfe2b9fa9997f9",
	"0x47c4c1ab373a840d666dc61d9af1ff29",
	"0xe75cc2ca4058524c13fd6a1473325d00",
	"0x72801233251db633f619c753aa70d2f9",
	"0x87781147fa92daa2215037c8889087fe",
	"0xd4f1f58a5d87245566e409c243f2e2bf",
	"0xe2f7ea073f65fce7b124bf72dbb061ad",
	"0xf0ac921fc7013af6fafc53bf48c3c794",
	"0x2abae8e7927ce57a18b9477be91c5ed9",
	"0x08379bf03ad0003676e78313c60fb848",
	"0xafdee93594bcdad7ba401a0072193e0a",
	"0x018dd1e07a2de4a08e6612341bf2323e",
	"0x3f27e3cafa4ed5fcea61f7c24977a154",
	"0x89befd1102aeaead24cfe2b9fa9997f9",
	"0x47c4c1ab373a840d666dc61d9af1ff29",
	"0xe75cc2ca4058524c13fd6a1473325a00",
	"0x72801233251db633f619c753aa70daf9",
	"0x87781147fa92daa2215037c88890a7fe",
	"0xd4f1f58a5d87245566e409c243fae2bf",
	"0xe2f7ea073f65fce7b124bf72dba061ad",
	"0xf0ac921fc7013af6fafc53bf4ac3c794",
	"0x2abae8e7927ce57a18b9477bec1c5ed9",
	"0x08379bf03ad0003676e78313cc0fb848",
	"0xafdee93594bcdad7ba401a007c193e0a",
	"0x018dd1e07a2de4a08e6612341cf2323e",
	"0x3f27e3cafa4ed5fcea61f7c2c977a154",
	"0x89befd1102aeaead24cfe2bcfa9997f9",
	"0x47c4c1ab373a840d666bbb1d9af1ff29",
	"0xe75cc2ca4058524c13bd6a1473325d00",
	"0x72801233251db633f6b9c753aa70d2f9",
	"0x87781147fa92daa22b5037c8889087fe",
	"0xd4f1f58a5d8724556be409c243f2e2bf",
	"0xe2f7ea073f65fce7bb24bf72dbb061ad",
	"0xf0ac921fc7013af6bafc53bf48c3c794",
	"0x2abae8e7927ce57ab8b9477be91c5ed9",
	"0x08379bf03ad00036b6e78313c60fb848",
	"0xafdee93594bcdad7ba401a0072193e0a",
	"0x018dd1e07a2de4a0be6612341bf2323e",
	"0x3f27e3cafa4ed5fcba61f7c24977a154",
	"0x89befd1102aeaeadb4cfe2b9fa9997f9",
];

contract("Test PlagiarismContract", async (accounts) => {
	it("Checking if Upload is successfull", async () => {
		const docCID = "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR";
		const contract = await PlagiarismContract.deployed();

		const codeFingerPrint =
			"45543f3768c51af8a42bb6c80acde97f5e7f653b50c1e4af3a4039bf4ef5405a";

		const res1 = await contract.uploadFile(
			500,
			docCID,
			"_fileName",
			"_fileDescription",
			codeFingerPrint,
			hashSet,
			hashSet.length,
			0
		);
	});

	it("Checking if duplicate upload is not allowed", async () => {
		const docCID = "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR";
		const contract = await PlagiarismContract.deployed();

		const codeFingerPrint =
			"45543f3768c51af8a42bb6c80acde97f5e7f653b50c1e4af3a4039bf4ef5405a";

		const res1 = await contract.uploadFile(
			500,
			docCID,
			"_fileName",
			"_fileDescription",
			codeFingerPrint,
			hashSet,
			hashSet.length,
			0
		);

		const res2 = await contract.uploadFile(
			500,
			docCID,
			"_fileName",
			"_fileDescription",
			codeFingerPrint,
			hashSet,
			hashSet.length,
			0
		);
		console.log(res2);
	});

	it("Get files uploaded by user", async () => {
		const docCID1 = "QabWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR";
		const docCID2 = "QbbWqxBEKC3P8tasKc98xmWNzrzDtRLMiMPL8wBuTGsMnR";
		const docCID3 = "QcbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR";
		const docCID4 = "QdbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR";

		const contract = await PlagiarismContract.deployed();

		const codeFingerPrint =
			"45543f3768c51af8a42bb6c80acde97f5e7f653b50c1e4af3a4039bf4ef5405a";

		const res1 = await contract.uploadFile(
			500,
			docCID1,
			"_fileName",
			"_fileDescription",
			codeFingerPrint,
			["0x3f27e3cafa4ed5fcea61f7c24977a154"],
			1,
			0
		);
		console.log("**************** Res 1 **********************");
		console.log(res1);
		const res2 = await contract.uploadFile(
			500,
			docCID2,
			"_fileName",
			"_fileDescription",
			codeFingerPrint,
			["0x3214e3cafa4ed5fcea61f7c24977a154"],
			1,
			0
		);
		console.log("**************** Res 1 **********************");
		console.log(res2);
		const res3 = await contract.uploadFile(
			500,
			docCID3,
			"_fileName",
			"_fileDescription",
			codeFingerPrint,
			["0x9527e3cafa4ed5fcea61f7c24977a154"],
			1,
			1
		);
		console.log("**************** Res 1 **********************");
		console.log(res3);
		const res4 = await contract.uploadFile(
			500,
			docCID4,
			"_fileName",
			"_fileDescription",
			codeFingerPrint,
			["0x3627e3cafa4ed5fcea61f7c24977a154"],
			1,
			2
		);
		console.log("**************** Res 4 **********************");
		console.log(res4);
		const files = await contract.getFilesUploadedByUser();
		const filesCount = await contract.totalFileCount();

		console.log(
			"------------------------------- Files ---------------------------------"
		);
		console.log(files);
		console.log(
			"------------------------------------------------------------------------"
		);
		console.log(filesCount);
	});
});
