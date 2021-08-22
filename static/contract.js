export const edu_coin_abi = {
	abi: [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "approvedInstitutions",
			"outputs": [
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "bool",
					"name": "verified",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "burn",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "certificationNFTs",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "image",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "graduate",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "institution",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "certificationTitle",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "description",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "date",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getAllCertification",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "",
					"type": "uint256[]"
				},
				{
					"internalType": "string[]",
					"name": "",
					"type": "string[]"
				},
				{
					"internalType": "address[]",
					"name": "",
					"type": "address[]"
				},
				{
					"internalType": "string[]",
					"name": "",
					"type": "string[]"
				},
				{
					"internalType": "string[]",
					"name": "",
					"type": "string[]"
				},
				{
					"internalType": "uint256[]",
					"name": "",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "graduateCertifications",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "length",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "img",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "certTitle",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "desc",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "date",
					"type": "uint256"
				}
			],
			"name": "mintNFT",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "tokenCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				}
			],
			"name": "verifyInstitution",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
}