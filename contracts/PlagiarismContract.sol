// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

// import "@openzeppelin/contracts-ethereum-package/contracts/GSN/GSNRecipient.sol";


contract PlagiarismContract  {

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
  constructor() public {
  }

  function uploadFile(uint _fileSize, string memory _fileIPFSHash, string memory _fileName,string memory _fileDescription, string memory _codeFingerPrint, string [] memory _hashSet) public {
    require(bytes(_fileIPFSHash).length > 0, "CodeFile Hash is empty");

    require(bytes(_fileDescription).length > 0, "CodeFile description is empty");

    require(bytes(_fileName).length > 0, "CodeFile name is empty");

    require(_fileSize>0, "CodeFile size is 0");

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

    function checkIfPlagiarised( string [] memory _hashSet)private  returns(bool){
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
          if(similarity>maxSimilarity){
            maxSimilarity=similarity;
          }
        }
      }
      return maxSimilarity;
    }

    function testJaccards( string [] memory _hashSet1,string [] memory _hashSet2) public returns (uint){
      // JaccardsSimilarity js= new JaccardsSimilarity();
      // uint ans= calculateSimilarityScore(_hashSet1,_hashSet2);
      // return ans;
    }

    

// function increase() public {
//         value += 1;
//     }

//     function acceptRelayedCall(
//         address relay,
//         address from,
//         bytes calldata encodedFunction,
//         uint256 transactionFee,
//         uint256 gasPrice,
//         uint256 gasLimit,
//         uint256 nonce,
//         bytes calldata approvalData,
//         uint256 maxPossibleCharge
//     ) external view returns (uint256, bytes memory) {
//         return _approveRelayedCall();
//     }


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

        uint commonElementsCount = getCommonElementsCount(list1,list1,setLength1,setLength2);
        uint unionCount=setLength1+setLength2-commonElementsCount;        
        
        return commonElementsCount*100/unionCount;
    } 
}