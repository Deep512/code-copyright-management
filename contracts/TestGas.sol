// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "@opengsn/contracts/src/BaseRelayRecipient.sol";




contract TestGas// is BaseRelayRecipient 
{

    // function versionRecipient() external override view returns (bytes16 memory) {
    //     return "2.0.0";
    // }

  struct CodeFile{
    uint fileId;
    uint fileSize;
    string fileIPFSHash;
    string fileName;
    string fileDescription;
    address codeAuthor;
    uint timeUploaded;    
    string codeFingerPrint;
    bytes16 [] hashSet;
    uint hashSetLength;
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
    bytes16 [] hashSet,
    uint hashSetLength
  ) ;

  event PlagiarismResult(
    bool plagiarisedResult
  );

    // function acceptRelayedCall(
    //     address relay,
    //     address from,
    //     bytes calldata encodedFunction,
    //     uint256 transactionFee,
    //     uint256 gasPrice,
    //     uint256 gasLimit,
    //     uint256 nonce,
    //     bytes calldata approvalData,
    //     uint256 maxPossibleCharge
    // ) external view returns (uint256, bytes memory) {
    //     return _approveRelayedCall();
    // }

    
  function uploadFile(uint _fileSize, string memory  _fileIPFSHash, string memory  _fileName,string memory  _fileDescription, string memory  _codeFingerPrint, bytes16 [] memory _hashSet, uint hashSetLength) public {

    if(checkIfPlagiarised(_hashSet,hashSetLength)){
      emit PlagiarismResult(true);
    }
    else{
      fileCount++;

      filesMap[fileCount] = CodeFile(fileCount,_fileSize,_fileIPFSHash, _fileName, _fileDescription,msg.sender/*_msgSender()*/,block.timestamp,_codeFingerPrint,_hashSet,hashSetLength);

      emit CodeFileUploadEvent(fileCount,_fileSize,_fileIPFSHash, _fileName, _fileDescription,msg.sender/*_msgSender()*/,block.timestamp,_codeFingerPrint,_hashSet,hashSetLength);
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
        returns (bytes16 [] memory )
    {
        return filesMap[_fileIndex].hashSet;
    }

    function getFileHashSetLength(uint _fileIndex) private
        view
        returns (uint )
    {
        return filesMap[_fileIndex].hashSetLength;
    }
    function checkIfPlagiarised( bytes16 [] memory _hashSet, uint hashSetLength)public view returns(bool){
      uint similarityScore = getMaximumSimilarityScore(_hashSet,hashSetLength);

      uint thresholdSimilarity=20;
      if(similarityScore>thresholdSimilarity)
        return true;
      else
        return false;
    }

    function getMaximumSimilarityScore( bytes16 [] memory _hashSet, uint oriHashSetLength) private view returns (uint){
      uint maxSimilarity=0;
      uint similarity=0;
      // similarity=calculateSimilarityScore(_hashSet,_hashSet);

      for(uint i=1;i<=fileCount;i++){
        bytes16 [] memory existingFilehashSet=getFileHashSet(i);
        uint existingFilehashSetLength=getFileHashSetLength(i);
        // for(uint j=1;j<=existingFilehashSet.length;j++){
          similarity=calculateSimilarityScore(_hashSet,existingFilehashSet,oriHashSetLength,existingFilehashSetLength);
          if(similarity>maxSimilarity){
            maxSimilarity=similarity;
          }
        // }
      }
      return maxSimilarity;
    }

 
    
function comparebytes16s(bytes16  a, bytes16  b) private pure returns (bool) {
      return a==b;
        // return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
    function getCommonElementsCount(bytes16[] memory list1, bytes16[] memory list2,uint setLength1,uint setLength2) public pure returns (uint){

        uint commonElementsCount=0;
        for(uint i=0;i< setLength1;i++){
            for(uint j=0;j<setLength2;j++){
                if(comparebytes16s(list1[i],list2[j])){
                    commonElementsCount++;
                    break;
                }
            }
        }
        return commonElementsCount;
    }

    function isPresent(bytes16[] memory l1,bytes16 ele)private pure returns (bool){
        for(uint i=0;i<l1.length;i++){
          if(comparebytes16s(l1[i],ele)){
            return true;
          }
        }
        return false;
    }
    function calculateSimilarityScore(bytes16[] memory l1, bytes16[] memory l2, uint l1OriLength, uint l2OriLength) public pure returns(uint){


      // bytes16[] memory list1 = new bytes16[](l1.length);   
      // bytes16[] memory list2 = new bytes16[](l2.length);   

      // uint setLength1=0;
      // uint setLength2=0;

      //   for(uint i=0;i<l1.length;i++){
      //       if (!isPresent(list1,l1[i])) {
      //         list1[setLength1]=l1[i];
      //         setLength1++;
      //       }
      //   } 
  
      //   for(uint i=0;i<l2.length;i++){
      //       if (!isPresent(list2,l2[i])) {
      //         list2[setLength2]=l2[i];
      //         setLength2++;
      //       }
      //   } 

        // uint commonElementsCount = getCommonElementsCount(list1,list1,setLength1,setLength2);
        uint commonElementsCount = getCommonElementsCount(l1,l2,l1.length,l2.length);
        uint unionCount=l1OriLength+l2OriLength-commonElementsCount;        
        
        return commonElementsCount*100/unionCount;
    } 
}