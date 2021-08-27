let hasMetaMask = false;
function loadMetaMask() {
    let hasMetaMask = false;
    if (window.ethereum) {
        window.web3 = new Web3(window.web3.currentProvider);
        // const web3 = window.web3;
        window.ethereum.enable();
        hasMetaMask = true;
    }
    return [window.web3, hasMetaMask];
}

const ret = loadMetaMask();
const web3 = ret[0];
hasMetaMask = ret[1];

let contract_instance;
if(hasMetaMask) {
    contract_instance = new web3.eth.Contract(edu_coin_abi.abi, edu_coin_addr, {}); // Load contract
}

function importAccount(account_private_key) {
    return web3.eth.accounts.wallet.add('0x' + account_private_key);
}

var app = new Vue({
    el: '#app',
    data: {
        // Account Info
        isUserLogged: false,
        account_info: null,
        account_private_key: '',
        hasMetaMask: false,

        primaryColor: '#2a71d0',
        ethPrice: 0,
        nftInfo: { name: "", symbol: "" },

        // EduChaintion Info
        email: "EduChaintion@outlook.com",
        socials: [
            { placeholder: "reddit", icon: "fa-brands:reddit-alien", link: "#" },
            { placeholder: "twitter", icon: "bi:twitter", link: "#" },
            { placeholder: "linkein", icon: "akar-icons:linkedin-fill", link: "#" },
            { placeholder: "blog", icon: "fa-solid:blog", link: "#" }
        ],
        features: [
            { icon: "eos-icons:blockchain", title: "Decentralisation", text: "Open, Free for everyone with a valid Ethereum address. How blockchain should be built for" },
            { icon: "fluent:certificate-20-regular", title: "NFT certification", text: "Legititize your degree and qualification with valuable NFTs stored secure and immutable on Ethereum" },
            { icon: "la:wallet", title: "Secure Wallet Setup", text: "Connect to Metamask to secure transactions and NFTs" },
            { icon: "ri:coin-line", title: "Simple and Inexpensive", text: "Reduce processing time, complexity and save on fees and other cost" },
        ],
        steps: [
            { step: 1, text: "Finish a course on EduChaintion, online, or in person" },
            { step: 2, text: "The respected academic institution will have the ability to mint a NFT if qualified" },
            { step: 3, text: "NFT is sent to you to keep and accessible through API or our App" },
        ],

        // Data
        verifyInstitutionParams: { name: "" },
        createNftParams: { 
            image: "", description: "",
            graduate: "",
            certification_title: "", date: "" },

        yourNFTs: [],
        statusMsg: "",

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
            if (hasMetaMask) {
                this.hasMetaMask = hasMetaMask;
                await this.loadMetaMaskAccount();
                // console.log(`User Account: ${this.account_info}`);
                this.isUserLogged = true;
            }
            // if(this.account_private_key) { this.onImportAccount(); }
            // this.nftInfo.name = await contract_instance.methods.name().call();
            // this.nftInfo.symbol = await contract_instance.methods.symbol().call();

            await this.loadEthereumPrice();
            await this.loadUserCertification();
        },
        onImportAccount: async function () {
            this.account_info = importAccount(this.account_private_key);
            this.isUserLogged = true;
            console.log("Login Success!");
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
        },
        generateNFT: async function () {
            var type = this.proofOfConceptData.level[Math.floor(Math.random()*this.proofOfConceptData.level.length)];
            var title = this.proofOfConceptData.subject[Math.floor(Math.random()*this.proofOfConceptData.subject.length)];
            this.createNftParams.certification_title = `${type} of ${title}`;
            this.createNftParams.description = this.proofOfConceptData.description[Math.floor(Math.random()*this.proofOfConceptData.description.length)];
            this.createNftParams.graduate = (this.account_info) ? `${this.account_info.address}` : "An ethereum address" ;
            this.createNftParams.image = 'https://dummyimage.com/640x360/fff/aaa';
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
        loadMetaMaskAccount: async function () {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.account_info = { address: accounts[0] }
            this.isUserLogged = true;
        },
        loadUserCertification: async function() {
            let ret = await methodSend(web3, this.account_info, contract_instance, 'call', 'getAllCertification', []);

            this.yourNFTs = [];
            let tokenIds = ret[0]; let images = ret[1]; let institutions = ret[2]; 
            let certTitles = ret[3]; let descs = ret[4]; let dates = ret[5];

            for(let i in tokenIds) {
                this.yourNFTs.push({
                    tokenId: tokenIds[i], image: images[i], institution: institutions[i],
                    certification_title: certTitles[i], description: descs[i], date: parseInt(dates[i])
                });
            }
        },
        loadEthereumPrice: async function () {
            let json = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').then(response => response.json())
            this.ethPrice = json.ethereum.usd;
        }
    },
    watch: {
        tokenId: async function (value) {
            console.log(value);
        },

    },
})