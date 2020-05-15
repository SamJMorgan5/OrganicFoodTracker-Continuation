/*
* Description: This js file interacts with both the html files and
* solidity smart contracts to present all entities withing the supplychain.
*/

App = {
  contracts: {},

  load: async () => {
    await App.loadWeb3() //imports web3 into the file
    await App.loadAccount() //sets default account
    await App.loadAllContracts() //load all contracts from the blockchain
    await App.loadAllEntities() //calls all methods
  },

  loadWeb3: async() => {
    if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
		} else {
			web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
		}

  },

  loadAccount: async() => {
      const accounts = await web3.eth.getAccounts();
      App.account = accounts[2];
  },

  loadAllContracts: async() => {
    await App.loadFarmerContract()
    await App.loadProcessorContract()
    await App.loadRetailerContract()
  },

  loadAllEntities: async() => {
    await App.getAllFarmers()
    await App.getAllRetailers()
    await App.getAllProcessors()
  },

  loadFarmerContract: async() => {
    const farmAbi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfFarmers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_typeStr",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_weight",
				"type": "uint256"
			},
			{
				"name": "_timeSpentOutdoors",
				"type": "uint256"
			},
			{
				"name": "_feedUsed",
				"type": "string"
			},
			{
				"name": "_housing",
				"type": "string"
			}
		],
		"name": "harvestLivestock",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_farmerAddress",
				"type": "address"
			},
			{
				"name": "_certificationId",
				"type": "uint256"
			}
		],
		"name": "setFarmCertification",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfProducts",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_reciever",
				"type": "address"
			},
			{
				"name": "_productId",
				"type": "uint256"
			},
			{
				"name": "weight",
				"type": "uint256"
			}
		],
		"name": "sendProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_typeStr",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_weight",
				"type": "uint256"
			},
			{
				"name": "_pesticideUsed",
				"type": "string"
			},
			{
				"name": "_fertiliserUsed",
				"type": "string"
			}
		],
		"name": "harvestProduce",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_count",
				"type": "uint256"
			}
		],
		"name": "getFarmerAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getAllocated",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createFarmer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getFeedUsed",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getProductWeight",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getTimeSpentOutdoors",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_governingBodyAddress",
				"type": "address"
			}
		],
		"name": "getGoverningBodiesCertificates",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getProductName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getProductTypeStr",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getFertilisersUsed",
		"outputs": [
			{
				"name": "memeory",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_governingBodyAddress",
				"type": "address"
			}
		],
		"name": "getGoverningBodyName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_certificationId",
				"type": "uint256"
			}
		],
		"name": "getCertificateName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_farmerAddress",
				"type": "address"
			}
		],
		"name": "getFarmerAllocated",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getProductFarmerAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_farmerAddress",
				"type": "address"
			}
		],
		"name": "getCertificationArray",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getHousing",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getPesticidesUsed",
		"outputs": [
			{
				"name": "memeory",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_farmerAddress",
				"type": "address"
			}
		],
		"name": "getFarmerName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "CreateFarmer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_productId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "weight",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "_farmerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "Harvest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_farmerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_reciever",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_productId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "weight",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "SendProduct",
		"type": "event"}] //defines functions within farm contract
    const farmAddress = '0xE048141BaBB9c0853BF426859A57146aB7EE60e0' //contract address
    App.farmContract = new web3.eth.Contract(farmAbi, farmAddress);
  },

  loadProcessorContract: async() => {
    const processorAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createProcessor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLatestProductId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLatestLabel",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_reciever",
				"type": "address"
			},
			{
				"name": "_productId",
				"type": "uint256"
			},
			{
				"name": "_weight",
				"type": "uint256"
			}
		],
		"name": "sendProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getProcessorAllocated",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_processorAddress",
				"type": "address"
			}
		],
		"name": "getProductProcessorName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getAllocated",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfProcessors",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getProductProcessorAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sender",
				"type": "address"
			},
			{
				"name": "_productId",
				"type": "uint256"
			},
			{
				"name": "_weight",
				"type": "uint256"
			}
		],
		"name": "recieveProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getProductWeight",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_count",
				"type": "uint256"
			}
		],
		"name": "getProcessorAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_processorAddress",
				"type": "address"
			}
		],
		"name": "getProcessorName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_name",
				"type": "string"
			}
		],
		"name": "CreateProcessor",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_reciever",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_productId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_weight",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "ProductRecieved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_reciever",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_label",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_productId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_weight",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "ProductSent",
		"type": "event"
	}] //defines functions within processor contract
    const processorAddress = '0x373BeA6a73F5c13C23EA3E916da9D10eFAe4EA59' //contract address
    App.processorContract = new web3.eth.Contract(processorAbi, processorAddress);
  },

  loadRetailerContract: async() => {
    const retailerAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createRetailer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sender",
				"type": "address"
			},
			{
				"name": "_productId",
				"type": "uint256"
			},
			{
				"name": "_label",
				"type": "uint256"
			},
			{
				"name": "_weight",
				"type": "uint256"
			}
		],
		"name": "recieveProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "CreateRetailer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_reciever",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_label",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "weight",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "ProductRecieved",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_label",
				"type": "uint256"
			}
		],
		"name": "getAllocated",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLatestLabel",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfRetailers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_label",
				"type": "uint256"
			}
		],
		"name": "getProductId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_label",
				"type": "uint256"
			}
		],
		"name": "getProductRetailerAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_label",
				"type": "uint256"
			}
		],
		"name": "getProductWeight",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_count",
				"type": "uint256"
			}
		],
		"name": "getRetailerAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getRetailerAllocated",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getRetailerName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"}] //defines functions within retailer contract
    const retailerAddress = '0xE1bFE4a075a5EBaC558B54079Cd8dAbAf25dc067' //contract address
    App.retailerContract = new web3.eth.Contract(retailerAbi, retailerAddress);
  },

 getAllFarmers: async () => {
   const number_of_farmers = await App.farmContract.methods.getNumberOfFarmers().call();
   const all_farmers_template = $('#all_farmers'); //template that will hold individual farmers
   //iterates over all farmers within a look up table in the farm smart contract and appends them to all_farmers_template
   for(var i = 0; i < number_of_farmers; i++) {
     const farmer_address = await App.farmContract.methods.getFarmerAddress(i).call();
     const farmer_name = await App.farmContract.methods.getFarmerName(farmer_address).call();
     let output =
        `<p>` + farmer_name + `: ` + farmer_address + `</p>`;
      all_farmers_template.append(output);
   }
 },

 getAllProcessors: async () => {
   const number_of_processors = await App.processorContract.methods.getNumberOfProcessors().call();
   const all_processors_template = $('#all_processors'); //template that will hold individual processors
   //iterates over all processors within a look up table in the farm smart contract and appends them to all_processors_template
   for(var i = 0; i < number_of_processors; i++) {
     const processor_address = await App.processorContract.methods.getProcessorAddress(i).call();
     const processor_name = await App.processorContract.methods.getProcessorName(processor_address).call();
     let output =
        `<p>` + processor_name + `: ` + processor_address + `</p>`;
      all_processors_template.append(output);
   }
 },

 getAllRetailers: async () => {
   const number_of_retailers = await App.retailerContract.methods.getNumberOfRetailers().call();
   const all_retailers_template = $('#all_retailers');//template that will hold individual retailers
   //iterates over all retailers within a look up table in the farm smart contract and appends them to all_retailers_template
   for(var i = 0; i < number_of_retailers; i++) {
     const retailer_address = await App.retailerContract.methods.getRetailerAddress(i).call();
     const retailer_name = await App.retailerContract.methods.getRetailerName(retailer_address).call();
     let output =
        `<p>` + retailer_name + `: ` + retailer_address + `</p>`;
      all_retailers_template.append(output);
   }
 }
}

$(() => {
    App.load();

})
