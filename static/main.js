import { edu_coin_abi } from './contract.js';
import { edu_coin_addr } from './contract_addr.js';

import { tokenURIs } from './tokenURI.js';
import { methodSend } from './send.js';

class Helper {
    static gas_mulptiplier = 1.2;
    static gasPay(gas) {
        return Math.ceil(gas * Helper.gas_mulptiplier);
    }
}

// const web3 = new Web3('ws://localhost:7545');    // Localhost: Ganache
// const web3 = new Web3('https://ropsten.infura.io/v3/9af14ffee7c948a9a8b635fe2f43ad5e');  //
// const web3 = null;  // Metamask
let enabledMM = false;
if (window.ethereum) {
    window.web3 = new Web3(window.web3.currentProvider);
    const web3 = window.web3;
    window.ethereum.enable();
    enabledMM = true;
}

const contract_instance = new web3.eth.Contract(edu_coin_abi.abi, edu_coin_addr, {});


const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
console.log(accounts);

function createAccount() {
    account_info = web3.eth.accounts.create();
}

function importAccount(account_private_key) {
    return web3.eth.accounts.wallet.add('0x' + account_private_key);
}

var app = new Vue({
    el: '#app',
    data: {

        email: "EduChaintion@outlook.com",
        socials: [
            { placeholder: "reddit", icon: "fa-brands:reddit-alien", link: "#" },
            { placeholder: "twitter", icon: "bi:twitter", link: "#" },
            { placeholder: "linkein", icon: "akar-icons:linkedin-fill", link: "#" },
            { placeholder: "blog", icon: "fa-solid:blog", link: "#" }
        ],
        account_info: null,
        account_private_key: '',

        isUserRegistered: false,

        verifyInstitutionParams: { name: "" },

        createNftParams: { 
            image: "", description: "",
            graduate: "",
            certification_title: "", date: "" },

        yourNFTs: [],
        statusMsg: "",

        nft_description: { name: "", symbol: "" },
        eth_price: 0,

        proofOfConceptData: {
            level: ["Bachelor", "Master", "Doctoral", "Diploma", "Certification"],
            subject: ["Engineering", "Art & Design", "Medicine & Health", "Business", "Science", "Computer Science", "Commerce", "Law"],
            description: ["Hereby awards this certification for excellency", "The university has granted you with this award", "Sufficiently completed all accredit courses"]
        },
    },
    mounted: async function () {
        this.onload();
    },
    methods: {
        onload: async function () {
            this.enabledMM = enabledMM;
            if (enabledMM) {
                // console.log(await web3MM.eth.getAccounts());
                this.account_info = { address: accounts[0] }

                console.log(this.account_info);
                this.isUserRegistered = true;
            }
            // if(this.account_private_key) { this.onImportAccount(); }
            // this.nft_description.name = await contract_instance.methods.name().call();
            // this.nft_description.symbol = await contract_instance.methods.symbol().call();
            let json = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').then(response => response.json())
            this.eth_price = json.ethereum.usd;
            this.yourNFTs = await this.getAllCertification();
        },
        onImportAccount: async function () {
            this.account_info = importAccount(this.account_private_key);
            this.isUserRegistered = true;
            console.log("Login Success!");
        },
        onCreateAccount: function () {
            createAccount();
            // this.account_info = account_info.address;
        },
        createNFT: async function () {
            if(!web3.utils.isAddress(this.createNftParams.graduate)) { this.statusMsg = "Invalid Address"; return; }
            
            // this.createNftParams.institution = this.account_info.address;
            this.createNftParams.date = Date.now();

            let _args = [
                this.createNftParams.graduate,
                this.createNftParams.image,
                this.createNftParams.certification_title,
                this.createNftParams.description,
                this.createNftParams.date,
            ]
            console.log(_args);
            this.statusMsg = await methodSend(web3, this.account_info, contract_instance, 'send', 'mintNFT', _args);

            // console.log(this.statusMsg);
        },
        generateNFT: async function () {
            var type = this.proofOfConceptData.level[Math.floor(Math.random()*this.proofOfConceptData.level.length)];
            var title = this.proofOfConceptData.subject[Math.floor(Math.random()*this.proofOfConceptData.subject.length)];
            this.createNftParams.certification_title = `${type} of ${title}`;
            this.createNftParams.description = this.proofOfConceptData.description[Math.floor(Math.random()*this.proofOfConceptData.description.length)];
            this.createNftParams.graduate = (this.account_info) ? `${this.account_info.address}` : "An ethereum address" ;
            this.createNftParams.image = 'https://dummyimage.com/640x360/fff/aaa';
            console.log(web3.eth.getAccounts[0]);

        },
        verifyInstitution: async function () {
            try {
                this.statusMsg = "Processing to blockchain ...";
                this.statusMsg = await methodSend(web3, this.account_info, contract_instance, 'send', 'verifyInstitution', [this.verifyInstitutionParams.name]);
            } catch (error) {
                this.statusMsg = error;
            }
            console.log(this.statusMsg);
        },
        emailForEnquiry: async function() {
            console.log("Sending Email");
        },
        getAllCertification: async function() {
            let ret = await methodSend(web3, this.account_info, contract_instance, 'call', 'getAllCertification', []);

            let nfts = [];
            let tokenIds = ret[0];
            let images = ret[1];
            let institutions = ret[2];
            let certTitles = ret[3];
            let descs = ret[4];
            let dates = ret[5];

            for(let i in tokenIds) {
                nfts.push({
                    tokenId: tokenIds[i],
                    image: images[i],
                    institution: institutions[i],
                    certification_title: certTitles[i],
                    description: descs[i],
                    date: parseInt(dates[i])
                });
            }

            console.log(nfts);
            return nfts;
        }
    },
    watch: {
        tokenId: async function (value) {
            console.log(value);
        },

    },
})