## Overview

### Installation
**Requirement**
- NodeJS, NPM
- MetaMask if using *Testnet*

### With MetaMask (Recommend)
```
npm install
npx tsc
```

### With Local Blockchain (Ganache) (Not Fully Implemented)
- Ensure that the `web3` is changed to your respected RPC server addr in `main.js`
- Ensure to change `edu_coin_addr` in `contract_addr.js`
- Ensure to change `edu_coin_abi` in `contract.js`

```
npm install
npx tsc
```

Note you will need to enter private key for the local blockchain accounts.

### Run server
```
node build/index.js
```