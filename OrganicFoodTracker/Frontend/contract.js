/*
* Description: This js file interacts with both the html files and
* solidity smart contracts to pass data through the supply chain.
*/
App = {
  contracts: {},

  load: async () => {
    await App.loadWeb3() //imports web3 into the file
    await App.loadAccount() //sets default account
    await App.loadAllContracts() //load all contracts from the blockchain
    document.getElementById("current_address").innerHTML = App.account; //parses current address to html
  },

  loadWeb3: async() => {
    if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
		} else {
			web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
		}

  },

  loadAccount: async() => {
      const accounts = await web3.eth.getAccounts(); //returns array of accounts
      App.account = accounts[2];
  },

  loadAllContracts: async() => {
    await App.loadFarmerContract()
    await App.loadProcessorContract()
    await App.loadRetailerContract()
  },

  loadFarmerContract: async() => {
    const farmAbi = [
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
		"type": "event"
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	}
] //defines functions within farm contract
    const farmAddress = '0xB79101129aF97Fba7A287e1c8B31e5c03fE2A42d' //contract address
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
		"constant": false,
		"inputs": [
			{
				"name": "_reciever",
				"type": "address"
			},
			{
				"name": "_intermediateId",
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
				"name": "_processorAddress",
				"type": "address"
			}
		],
		"name": "getIntermediateLUT",
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
				"name": "_processorAddress",
				"type": "address"
			}
		],
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
		"constant": true,
		"inputs": [
			{
				"name": "_id",
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
	}
]//defines functions within processor contract
    const processorAddress = '0x31Dc56Dc75240CAE42dCBB8067882177165C623C' //contract address
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
		"constant": false,
		"inputs": [
			{
				"name": "_sender",
				"type": "address"
			},
			{
				"name": "_intermediateId",
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
				"name": "_label",
				"type": "uint256"
			}
		],
		"name": "getIntermediateId",
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
				"name": "_retailerAddress",
				"type": "address"
			}
		],
		"name": "getLabelLUT",
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
		"type": "function"
	}
]//defines functions within retailer contract
    const retailerAddress = '0x9B0A68535B0B51422E0fFe5A4e06f93E5A5D0795' //contract address
    App.retailerContract = new web3.eth.Contract(retailerAbi, retailerAddress);
  },

  createFarmer: async (data) => {
    let name = $('[name="farmer_name"]').val();
    const allocated = await App.farmContract.methods.getFarmerAllocated(App.account).call();
    if (name == "") {
      alert('name field can not be empty');
    } else {
      //if farmrer isn't currently allocated create new farmer otherise throw alert
      if (allocated == "0") {
        await App.farmContract.methods.createFarmer(name).send({from: App.account, gasLimit: 4712388});
        alert('created farmer');
      } else {
        alert('farmer already exists');
      }
    }
  },

  createProcessor: async (data) => {
    let name = $('[name="processor_name"]').val();
    const allocated = await App.processorContract.methods.getProcessorAllocated(App.account).call();
    if (name == "") {
      alert('name field can not be empty');
    } else {
      //if processor isn't currently allocated create new farmer otherise throw alert
      if (allocated == "0") {
        await App.processorContract.methods.createProcessor(name).send({from: App.account, gasLimit: 4712388});
        alert('created processor');
      } else {
        alert('processor already exists');
      }
    }
  },

  createRetailer: async (data) => {
    let name = $('[name="retailer_name"]').val();
    const allocated = await App.retailerContract.methods.getRetailerAllocated(App.account).call();
    if (name == "") {
      alert('name field can not be empty');
    } else {
    //if retailer isn't currently allocated create new farmer otherise throw alert
      if (allocated == "0") {
        await App.retailerContract.methods.createRetailer(name).send({from: App.account, gasLimit: 4712388});
        alert('created retailer');
      } else {
        alert('retailer already exists');
      }
    }
  },

  harvestProduce: async (data) => {
    //read all values inputted by user in the farmer_homepage.html form
    let name = $('[name="produce_name"]').val();
    let weight = $('[name="produce_weight"]').val();
    let pesticides_used = $('[name="pesticides_used"]').val();
    let fertilisers_used = $('[name="fertilisers_used"]').val();
    var weight_int = parseInt(weight, 10);
    //check if input is valid, if input is valid add product to farmer inventory
    if (name == "" || weight == "") {
      alert('weight or name is empty');
    } else if (isNaN(weight_int)) {
      alert('weight is not a int');
    } else {
      await App.farmContract.methods.harvestProduce('Produce', name, weight_int, pesticides_used, fertilisers_used).send({from: App.account, gasLimit: 4712388});
      alert('harvested');
    }

  },

  harvestLivestock: async (data) => {
    //read all values inputted by user in the farmer_homepage.html form
    let name = $('[name="livestock_name"]').val();
    let weight = $('[name="livestock_weight"]').val();
    let time_spent_outdoors = $('[name="time_spent_outdoors"]').val();
    let feed_used = $('[name="feed_used"]').val();
    let housing = $('[name="housing"]').val();
    var weight_int = parseInt(weight, 10);
    var time_spent_outdoors_int = parseInt(time_spent_outdoors, 10);
    //check if input is valid, if input is valid add product to farmer inventory
    if (name == "" || weight == "") {
      alert('weight or name is empty');
    } else if (isNaN(weight_int)) {
      alert('Please insert a integer in the weight field');
    } else if (isNaN(time_spent_outdoors_int)) {
      alert('Please insert a integer in the time spent ourdoors field');
    } else {
      await App.farmContract.methods.harvestLivestock('Livestock', name, weight_int, time_spent_outdoors_int, feed_used, housing).send({from: App.account, gasLimit: 4712388});
      alert('harvested');
    }
  },

  sendProductFarm: async (data) => {
    var items = document.getElementsByClassName("list-group-item active"); //get currently activated list item in farmer_homepage.html
    var product_id = items[0].firstChild.nextElementSibling.innerText.slice(4); //slice first 4 characters giving the product_id
    var product_id_int = parseInt(product_id, 10);
    //read all values inputted by user in the farmer_homepage.html form
    let reciever = $('[name="reciever"]').val();
    let weight = $('[name="send_weight"]').val();
    var weight_int = parseInt(weight, 10);
    //check if input is valid, if input is valid send desired amount of selected product to the reciever
    if ((reciever == ""|| weight == "") || isNaN(weight_int)) {
      alert('insufficient values');
    } else {
      const allocated = await App.processorContract.methods.getProcessorAllocated(reciever).call();
      const inventory_weight = await App.farmContract.methods.getProductWeight(product_id_int).call();
      var inventory_weight_int = parseInt(inventory_weight);
      if (inventory_weight_int < weight_int) {
        alert('insert valid weight');
      } else {
        if (allocated == '0') {
          alert('not allocated');
        } else if (allocated == '1') {
          await App.farmContract.methods.sendProduct(reciever, product_id_int, weight_int).send({from: App.account, gasLimit: 4712388});
          alert('sent');
        }
      }
    }
  },



  getHarvestedProducts: async (data) => {
    $('#currently_harvested').empty(); //removes all products currently on screen
    //$( ".currentlyHarvested" ).remove();s
    const numberOfProducts = await App.farmContract.methods.getNumberOfProducts().call(); //number of products in the ecosystem
    const currentlyHarvestedTemplate = $('#currently_harvested'); //template that will hold individual harvested products

    //iterate over all products and getting those that have a weight greater than 0 and belong to the current farmer
    for (var i = 0; i < numberOfProducts; i++) {
      var i_int = parseInt(i, 10);
      //get current product info
      const product_weight = await App.farmContract.methods.getProductWeight(i_int).call();
      const product_allocated = await App.farmContract.methods.getAllocated(i_int).call();
      const farmer_address = await App.farmContract.methods.getProductFarmerAddress(i_int).call();

      var product_weight_int = parseInt(product_weight, 10);
      var product_allocated_int = parseInt(product_allocated, 10);
      if (product_weight_int > 0 && farmer_address == App.account) {
        let product_id = i_int;
        let name = await App.farmContract.methods.getProductName(i_int).call();
        let weight = product_weight_int;
        //product values to be output to the screen
        let output =
            `<a href="#" class="list-group-item list-group-item-action" data-toggle="list" role="tab">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1" name="product_id">ID: `+ product_id +`</h5>
                </div>
                  <p class="mb-1" name="product_id">Name: `+ name +`</p>
                  <p class="mb-1">Weight: `+ weight +`g</p>
              </a>`;

          currentlyHarvestedTemplate.append(output);

      }
    }
 },

 recieveProductProcessor: async (data) => {
   //read all values inputted by user in the processor_homepage.html form
   let product_id = $('[name="product_id"]').val();
   let weight = $('[name="processor_weight"]').val();
   var product_id_int = parseInt(product_id, 10);
   var weight_int = parseInt(weight, 10);
   if ((product_id == ""|| weight == "") || isNaN(weight_int) || isNaN(product_id_int)){
     alert('invalid input');
   } else {
     let sender = await App.farmContract.methods.getProductFarmerAddress(product_id_int).call(); //get sender address
     await App.processorContract.methods.recieveProduct(sender, product_id_int, weight_int).send({from: App.account, gasLimit: 4712388});
     alert('received');
   }
 },

 sendProductProcessor: async (data) => {
   var items = document.getElementsByClassName("list-group-item active"); //get currently activated list item in processor_homepage.html
   var product_id = items[0].firstChild.nextElementSibling.innerText.slice(17); //slice first 4 characters giving the product_id
   var product_id_int = parseInt(product_id, 10);

   //read all values inputted by user in the processor_homepage.html form
   let reciever = $('[name="reciever"]').val();
   let weight = $('[name="send_weight"]').val();
   var weight_int = parseInt(weight, 10);
   //check if input is valid, if input is valid send desired amount of selected product to the reciever
   if ((reciever == ""|| weight == "") || isNaN(weight_int)) {
     alert('insufficient values');
   } else {
     const allocated = await App.retailerContract.methods.getRetailerAllocated(reciever).call();
     const inventory_weight = await App.processorContract.methods.getProductWeight(product_id_int).call();
     var inventory_weight_int = parseInt(inventory_weight);
     if (inventory_weight_int < weight_int) {
       alert('insert valid weight');
     } else {
       if (allocated == '0') {
         alert('not allocated');
       } else if (allocated == '1') {
         await App.processorContract.methods.sendProduct(reciever, product_id_int, weight_int).send({from: App.account, gasLimit: 4712388});
         const latestProductId = await App.processorContract.methods.getLatestLabel().call();
         alert('sent to label is ' + latestProductId);
       }
      }
    }
 },

 getProcessorInventory: async (data) => {
   $('#processor_inventory').empty(); //removes all products currently on screen
   const currentlyInInventoryTemplate = $('#processor_inventory'); //template that will hold inventory
   var all_products = await App.processorContract.methods.getIntermediateLUT(App.account).call();
   //iterate over all products and getting those that have a weight greater than 0 and belong to the current processor
   for (var i = 0; i < all_products.length; i++) {
     var intermediate_id = all_products[i];
     //get current product info
     const product_id = await App.processorContract.methods.getProductId(intermediate_id).call();
     const product_weight = await App.processorContract.methods.getProductWeight(intermediate_id).call();
     const processor_address = await App.processorContract.methods.getProductProcessorAddress(intermediate_id).call();

     var product_weight_int = parseInt(product_weight, 10);
     if (product_weight_int > 0 && processor_address == App.account) {
       let name = await App.farmContract.methods.getProductName(product_id).call();
       let farmer = await App.farmContract.methods.getProductFarmerAddress(product_id).call();
       let weight = product_weight_int;
       //product values to be output to the screen
       let output =
           `<a href="#" class="list-group-item list-group-item-action" data-toggle="list" role="tab">
               <div class="d-flex w-100 justify-content-between">
                 <h5 class="mb-1" name="product_id">Intermediate ID: `+ intermediate_id +`</h5>
               </div>
                 <p class="mb-1" name="name">Name: `+ name +`</p>
                 <p class="mb-1" name="product_id">Product ID: `+ product_id +`</p>
                 <p class="mb-1">Weight: `+ weight +`g</p>
                 <p class="mb-1">Sender: `+ farmer +`g</p>
             </a>`;

         currentlyInInventoryTemplate.append(output);

     }
   }
 },

 recieveProductRetailer: async (data) => {
   //read all values inputted by user in the retailer_homepage.html form
   let intermediate_id = $('[name="intermediate_id"]').val();
   let weight = $('[name="retailer_weight"]').val();
   var weight_int = parseInt(weight, 10);
   var intermediate_id_int = parseInt(intermediate_id);
   if ((intermediate_id == ""|| weight == "") || isNaN(weight_int) || isNaN(intermediate_id_int)) {
     alert('invalid input');
   } else {
     let sender = await App.processorContract.methods.getProductProcessorAddress(intermediate_id_int).call(); //get sender address
     await App.retailerContract.methods.recieveProduct(sender, intermediate_id, weight_int).send({from: App.account, gasLimit: 4712388});
     alert('recieved');
   }
 },

 getRetailerInventory: async (data) => {
   $('#retailer_inventory').empty(); //removes all products currently on screen
   const numberOfProducts = await App.retailerContract.methods.getLatestLabel().call(); //number of products in the ecosystem
   const currentlyInInventoryTemplate = $('#retailer_inventory'); //template that will hold inventory
   var all_products = await App.retailerContract.methods.getLabelLUT(App.account).call();
   //iterate over all products and getting those that have a weight greater than 0 and belong to the current retailer
   for (var i = 0; i < all_products.length; i++) {
     var label_id = all_products[i];
     //get current product info
     const product_weight = await App.retailerContract.methods.getProductWeight(label_id).call();
     const intermediate_id = await App.retailerContract.methods.getIntermediateId(label_id).call();
     const retailer_address = await App.retailerContract.methods.getProductRetailerAddress(label_id).call();
     var intermediate_id_int = parseInt(intermediate_id, 10);
     var product_weight_int = parseInt(product_weight, 10);
     var i_int = parseInt(i, 10);
     if (product_weight_int > 0 && retailer_address == App.account) {
       let product_id = await App.processorContract.methods.getProductId(intermediate_id_int).call();
       let name = await App.farmContract.methods.getProductName(product_id).call();
       let weight = product_weight_int;
       //product values to be output to the screen
       let output =
           `<a href="#" class="list-group-item list-group-item-action" data-toggle="list" role="tab">
               <div class="d-flex w-100 justify-content-between">
                 <h5 class="mb-1" name="product_id">Label ID: `+ label_id +`</h5>
               </div>
                 <p class="mb-1">Name: `+ name +`</p>
                 <p class="mb-1" name="product_id">Weight: `+ weight +`</p>
                 <p class="mb-1">Weight: `+ weight +`g</p>
             </a>`;

         currentlyInInventoryTemplate.append(output);

     }
   }
 }
}


$(() => {
    App.load();
})
