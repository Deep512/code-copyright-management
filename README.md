# Blockchain Based Code Copyright Management System
A web application that allows users to upload code files for copyright protection.<br />

## Tools and Technologies Used:
```
- NodeJS (Backend)
- React (FrontEnd)
- Truffle
- Solidity
- Geth
```

## Running Instructions:
1. Clone the repository<br />
`git clone https://github.com/Deep512/code-copyright-management`<br />

2. Download ganache-cli(if not already installed) and run.<br />
`ganache-cli`<br />

3. Open another terminal to compile and migrate the smart contracts.<br />
```
- cd code-copyright-management
- truffle compile
- truffle migrate
```
<br /><br />
4. Start the preprocessing server on other terminal instance.<br />
`cd server`<br />
`node server.js`<br />
5. Start the react app on another terminal instance<br />
`cd client`<br />
`yarn install && yarn start`<br />
