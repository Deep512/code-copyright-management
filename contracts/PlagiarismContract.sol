// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
// import "./usingOraclize.sol";
// import "./provableAPI.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
// import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";


contract PlagiarismContract is ChainlinkClient {

  using Chainlink for Chainlink.Request;

  address private oracle;
    bytes32 private jobId;
    uint256 private fee;

  struct CodeFile{
    uint fileId;
    uint fileSize;
    string fileIPFSHash;
    string fileName;
    string fileDescription;
    address codeAuthor;
    uint timeUploaded;    
    string codeFingerPrint;
    string [] hashSet;
  }

  uint public fileCount = 0;
  mapping(uint=>CodeFile) public filesMap;


  event CodeFileUploadEvent(
    uint fileId,
    uint fileSize,
    string fileIPFSHash,
    string fileName,
    string fileDescription,
    address codeAuthor,
    uint timeUploaded ,
    string codeFingerPrint,
    string [] hashSet
  ) ;

  event PlagiarismResult(
    bool plagiarisedResult
  );

  event LogNewProvableQuery(string _res);

  constructor() {
    setPublicChainlinkToken();
        oracle = 0x19f7f3bF88CB208B0C422CC2b8E2bd23ee461DD1;
        jobId = "9b32442f55d74362b26c608c6e9bb80c";
        fee = 0.0001 * 10 ** 18; // (Varies by network and job)
  }

  // function TestOraclizeCall() { 
  //   OAR= OraclizeAddrResolverI(0x71d61a4c458d43f6834da6217e7fd00e3101421f);
  // }
  // function __callback(bytes32 _myid, string _result) {
  //   require (msg.sender == oraclize_cbAddress());
  //   Log(_result);
  //   price = parseInt(_result, 2);
  // }
  // function update() payable {
  //   oraclize_query("URL","json(https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD).USD");
  // }

  uint256 public volume;
  function Test() public returns (bytes32 requestId){
    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        
        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        request.add("path", "RAW.ETH.USD.VOLUME24HOUR");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
  }
  function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }

  function uploadFile(uint _fileSize, string memory _fileIPFSHash, string memory _fileName,string memory _fileDescription, string memory _codeFingerPrint, string [] memory _hashSet) public {
    require(bytes(_fileIPFSHash).length > 0, "CodeFile Hash is empty");

    require(bytes(_fileDescription).length > 0, "CodeFile description is empty");

    require(bytes(_fileName).length > 0, "CodeFile name is empty");

    require(_fileSize>0, "CodeFile size is 0");

    // if (provable_getPrice("computation") > address(this).balance) {
    //   emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
    // } else {
      // emit LogNewProvableQuery("Provable query was sent, standing by for the answer…");
      // provable_query("URL", "json(http://localhost:8000/hashset)",'{"codeFingerprint":_codeFingerPrint}');
      // emit LogNewProvableQuery(m);
    // }

    if(checkIfPlagiarised(_hashSet)){
      emit PlagiarismResult(true);
    }
    else{
      fileCount++;

      filesMap[fileCount] = CodeFile(fileCount,_fileSize,_fileIPFSHash, _fileName, _fileDescription,msg.sender,block.timestamp,_codeFingerPrint,_hashSet);

      emit CodeFileUploadEvent(fileCount,_fileSize,_fileIPFSHash, _fileName, _fileDescription,msg.sender,block.timestamp,_codeFingerPrint,_hashSet);
    }
  }

    function getFileByIndex(uint _fileIndex)
        public
        view
        returns (CodeFile memory records)
    {
        return filesMap[_fileIndex];
    }

    function getFileHashSet(uint _fileIndex) private
        view
        returns (string [] memory )
    {
        return filesMap[_fileIndex].hashSet;
    }

    function checkIfPlagiarised( string [] memory _hashSet)private view returns(bool){
      uint similarityScore = getMaximumSimilarityScore(_hashSet);
      
      uint thresholdSimilarity=0;
      if(similarityScore>thresholdSimilarity)
        return true;
      else
        return false;
    }

    function getMaximumSimilarityScore( string [] memory _hashSet) private view returns (uint){
      uint maxSimilarity=0;
      uint similarity=0;
      for(uint i=1;i<=fileCount;i++){
        string [] memory existingFilehashSet=getFileHashSet(i);
        for(uint j=1;j<=existingFilehashSet.length;j++){
          //TODO
          // uint similarity=getSimilarity();
          similarity=calculateSimilarityScore(existingFilehashSet,_hashSet);
          if(similarity>maxSimilarity){
            maxSimilarity=similarity;
          }
        }
      }
      return maxSimilarity;
    }

function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
    function getCommonElementsCount(string[] memory list1, string[] memory list2,uint setLength1,uint setLength2) public pure returns (uint){

        uint commonElementsCount=0;
        for(uint i=0;i< setLength1;i++){
            for(uint j=0;j<setLength2;j++){
                if(compareStrings(list1[i],list2[j])){
                    commonElementsCount++;
                    break;
                }
            }
        }
        return commonElementsCount;
    }

    function isPresent(string[] memory l1,string memory ele)private pure returns (bool){
        for(uint i=0;i<l1.length;i++){
          if(compareStrings(l1[i],ele)){
            return true;
          }
        }
        return false;
    }
    function calculateSimilarityScore(string[] memory l1, string[] memory l2) public pure returns(uint){


      string[] memory list1 = new string[](l1.length);   
      string[] memory list2 = new string[](l2.length);   

      uint setLength1=0;
      uint setLength2=0;

        for(uint i=0;i<l1.length;i++){
            if (!isPresent(list1,l1[i])) {
              list1[setLength1]=l1[i];
              setLength1++;
            }
        } 
  
        for(uint i=0;i<l2.length;i++){
            if (!isPresent(list2,l2[i])) {
              list2[setLength2]=l2[i];
              setLength2++;
            }
        } 

        uint commonElementsCount = getCommonElementsCount(list1,list2,setLength1,setLength2);
        uint unionCount=setLength1+setLength2-commonElementsCount;        
        
        return commonElementsCount*100/unionCount;
    } 
}