# Blockchain Based Code Copyright Management System
A web application that allows users to upload code files for copyright protection.<br />

## Tools and Technologies Used:
```
- NodeJS (Backend)
- React (FrontEnd)
- Truffle
- Solidity
- Geth
- Go-IPFS
```

## Running Instructions:
1. Clone the repository<br />
`- git clone https://github.com/Deep512/code-copyright-management`<br />

2. Download and setup geth(if not already installed). Geth should be running on http://localhost:8545<br />

3. Download and setup go-ipfs(if not already installed). Replace the connection info in "client/src/ipfs.js" with your go-ipfs api details.

4. Open another terminal to compile and migrate the smart contracts.<br />
```
- cd code-copyright-management
- truffle compile
- truffle migrate
```

5. Start the preprocessing server on other terminal instance.<br />
```
- cd server
- yarn run dev
```

6. Start the react app on another terminal instance.<br />
```
- cd client
- yarn install && yarn start
```
<br />
