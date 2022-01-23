
const PlagiarismContract = artifacts.require("PlagiarismContract");
Array.prototype.equals = function (arr2) {
  return (
    this.length === arr2.length &&
    this.every((value, index) => value === arr2[index])
  );
};
contract("Test PlagiarismContract", async (accounts) => {
  it("should add and get new Code file", async () => {
    const docCID = "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR";
    const contract = await PlagiarismContract.deployed();

    const hashSet = [
      "47c4c1ab373a840d666dc61d9af1ff29",
      "e75cc2ca4058524c13fd6a1473325d00",
      "72801233251db633f619c753aa70d2f9",
      "87781147fa92daa2215037c8889087fe",
      "d4f1f58a5d87245566e409c243f2e2bf",
      "e2f7ea073f65fce7b124bf72dbb061ad",
      "f0ac921fc7013af6fafc53bf48c3c794",
      "2abae8e7927ce57a18b9477be91c5ed9",
      "08379bf03ad0003676e78313c60fb848",
      "afdee93594bcdad7ba401a0072193e0a",
      "018dd1e07a2de4a08e6612341bf2323e",
      "3f27e3cafa4ed5fcea61f7c24977a154",
      "89befd1102aeaead24cfe2b9fa9997f9",
    ];

    const codeFingerPrint =
      "45543f3768c51af8a42bb6c80acde97f5e7f653b50c1e4af3a4039bf4ef5405a";
    await contract.uploadFile(
      500,
      docCID,
      "Code file 1",
      "Testing the contract",
      codeFingerPrint,
      hashSet
    );

    const res1 = await contract.getFileByIndex(1);
    assert.equal(res1.fileIPFSHash, docCID);
    assert.equal(res1.codeFingerPrint, codeFingerPrint);

    // assert.equal(res1.hashSet, hashSet);
    // console.log(res1.hashSet.equals(hashSet));
    // console.log(res1);
  });

  it("should provide the right jaccarsd score", async () => {
    const contract = await PlagiarismContract.deployed();

    const hashSet1 = [
      "47c4c1ab373a840d666dc61d9af1ff29",
      "e75cc2ca4058524c13fd6a1473325d00",
      "72801233251db633f619c753aa70d2f9",
      "87781147fa92daa2215037c8889087fe",
      "d4f1f58a5d87245566e409c243f2e2bf",
      "e2f7ea073f65fce7b124bf72dbb061ad",
      "f0ac921fc7013af6fafc53bf48c3c794",
      "2abae8e7927ce57a18b9477be91c5ed9",
      "08379bf03ad0003676e78313c60fb848",
      "afdee93594bcdad7ba401a0072193e0a",
      "018dd1e07a2de4a08e6612341bf2323e",
      "3f27e3cafa4ed5fcea61f7c24977a154",
      "89befd1102aeaead24cfe2b9fa9997f9",
    ];

    const hashSet2 = [
      "47c4c1ab373a840d666dc61d9af1ff29",
      "e75cc2ca4058524c13fd6a1473325d00",
      "72801233251db633f619c753aa70d2f9",
      "87781147fa92daa2215037c8889087fe",
      "d4f1f58a5d87245566e409c243f2e2bf",
      "e2f7ea073f65fce7b124bf72dbb061ad",
      "f0ac921fc7013af6fafc53bf48c3c794",
      "2abae8e7927ce57a18b9477be91c5ed9",
      "08379bf03ad0003676e78313c60fb848",
      "afdee93594bcdad7ba401a0072193e0a",
      "018dd1e07a2de4a08e6612341bf2323e",
      "3f27e3cafa4ed5fcea61f7c24977a154",
      "89befd1102aeaead24cfe2b9fa9997f9",
    ];

    var narr = [
      "af80c20f941fd005cc973af2353c552c",
      "41f84f056ccf006e811a936b2e6eb264",
      "1cea955f1cd4be634dec24fbae82a385",
      "c9ddea9200675ecc424053ff502d8601",
      "563b2ec128392af892da6a02f41f8717",
      "c4ecea75ac08931e2831666cdec3edc8",
      "e51550f02f3501ceff18084bd7c4c078",
      "18de4beb01f6a17b6e1dfb9813ba6045",
      "331316d4efb44682092a006307b9ae3a",
      "21c5bba1dd6aed9ab48c2b34c1a0adde",
      "ffc3623d0670c1158467cb58b699d94d",
      "74d548bd66c564ce797c7e3b57b0be06",
      "59b7f34052ccd9c35e59439a5d2c1c18",
      "c9ddea9200675ecc424053ff502d8601",
      "e16f121aeb9234893af3053ca46b5d4a",
      "b20c98233c1e847c4682e89438e26306",
      "f86fb98c06b15cacb34c4a2d3448da1f",
      "022cb62ec7cbe889faddb81e7c4c2351",
      "e20dee8f7bc6e3801e90605f6e9bc3f0",
      "4c5554f526c5a75043dc8ee296806b47",
      "623b8954ac762fb7b881beec4a5bd367",
      "41de57ab08378f2242821fadf055128b",
      "310dcbbf4cce62f762a2aaa148d556bd",
      "b7ee0d0d4d5ef995aae0fc691e6d840d",
      "87f7ee4fdb57bdfd52179947211b7ebb",
      "2ce217d7731633423261c5a17249f180",
      "21c5bba1dd6aed9ab48c2b34c1a0adde",
      "a91af177d3016ca20e5fc949836a894a",
      "310dcbbf4cce62f762a2aaa148d556bd",
      "331316d4efb44682092a006307b9ae3a",
      "21c5bba1dd6aed9ab48c2b34c1a0adde",
      "a91af177d3016ca20e5fc949836a894a",
      "310dcbbf4cce62f762a2aaa148d556bd",
      "310dcbbf4cce62f762a2aaa148d556bd",
      "310dcbbf4cce62f762a2aaa148d556bd",
      "55ff3e8766bfb3f0f8174d957ad082d3",
      "bb5317feae88c8c5a60220c51a9b90a9",
      "c29fa5eea702f113600851595f86b0c9",
    ];

    

    

    let ans = await contract.calculateSimilarityScore(narr, narr);
    console.log(ans);
    

    
  });
});
