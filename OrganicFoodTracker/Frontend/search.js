/*
* Description: This js file interacts with both the html files and
* solidity smart contracts to present the path in which a product has taken through the supplychain.
*/

App = {
  contracts: {},

  load: async () => {
    await App.loadWeb3() //imports web3 into the file
    await App.loadAllContracts() //load all contracts from the blockchain
  },

  loadWeb3: async() => {
    if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
		} else {
			web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		}

  },

  loadAllContracts: async() => {
    await App.loadFarmerContract()
    await App.loadProcessorContract()
    await App.loadRetailerContract()
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
    const farmAddress = '0xBbA0131cb4b6200e8607EcC49f1C021b5EEdf916' //contract address
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
    const processorAddress = '0x11b804176f9769Bf1eB36444faB2e06C0df71F1F' //contract address
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
    const retailerAddress = '0x98F63470C593962db5C00746599367D40062A573' //contract address
    App.retailerContract = new web3.eth.Contract(retailerAbi, retailerAddress);
  },

  organicProperties: async() => {
    //gets label value inserted by a user
    var label = $('[name="label"]').val();
    var label_int = parseInt(label, 10);
    const allocated = await App.retailerContract.methods.getAllocated(label_int).call();
    //checks if product with the label that the user has inserted is in the label text box
    if (allocated == "0") {
      alert("Product does not exist");
    } else {
      //get all attributes related to the label inserted
      const product_id = await App.retailerContract.methods.getProductId(label_int).call();
      var product_id_int = parseInt(product_id, 10);
      const type = await App.farmContract.methods.getProductTypeStr(product_id_int).call();
      const name = await App.farmContract.methods.getProductName(product_id).call();
      const weight = await App.retailerContract.methods.getProductWeight(label_int).call();
      const farmer_address = await App.farmContract.methods.getProductFarmerAddress(product_id_int).call();
      const organic_certifications = await App.farmContract.methods.getCertificationArray(farmer_address).call();
      organic_certifications[0];
      const organicPropertiesTemplate = $('#organicProperties');
      //check the type which defines what will be output on the screen
      if (type == "Produce") {
        let pesticides_used = await App.farmContract.methods.getPesticidesUsed(product_id_int).call();
        let fertilisers_used = await App.farmContract.methods.getFertilisersUsed(product_id_int).call();
        //data to be output
        let output =
           `<h5> Product Name: `+ name + `</h5>
            <h5> Product Weight: `+ weight + `g</h5>
            <h5>Pesticides Used: `+ pesticides_used +`</h5>
            <h5>Fertilisers Used: `+ fertilisers_used +`</h5>
            </div>`;

        organicPropertiesTemplate.append(output);
      } else if (type == "Livestock") {
        const time_spent_outdoors = await App.farmContract.methods.getTimeSpentOutdoors(product_id_int).call();
        const feed_used = await App.farmContract.methods.getFeedUsed(product_id_int).call();
        const housing = await App.farmContract.methods.getHousing(product_id_int).call();
        //data to be output
        let output =
           `<h5> Proudct Name: `+ name + `</h5>
            <h5> Proudct Weight: `+ weight + `</h5>
            <h5>Time Spent Outdoors (Daily): `+ time_spent_outdoors +` minutes</h5>
            <h5>Feed Used: `+ feed_used +`</h5>
            <h5>Housing Of Livestock: `+ housing +`</h5>`;
        organicPropertiesTemplate.append(output);
      }

      const organic_certifications_template = $('#organicCertifications');
      organic_certifications_template.append(`<h5>Farmer Certifications:</h5>`);
      //loop through all organic certifications held by a farmer and output them to the screen
      for(var i = 0; i < organic_certifications.length; i++) {
        let certification_name = await App.farmContract.methods.getCertificateName(organic_certifications[i]).call();
        let output =
          `<h5>-`+ certification_name +`</h5>`;
        organic_certifications_template.append(output);
      }
    }
  },

  tracking: async() => {
    //gets label value inserted by a user
    var label = $('[name="label"]').val();
    var label_int = parseInt(label, 10);
    const product_id = await App.retailerContract.methods.getProductId(label_int).call();
    product_id_int = parseInt(product_id, 10);
    const allocated = await App.retailerContract.methods.getAllocated(label_int).call();
    //checks if product with the label that the user has inserted is in the label text box
    if (allocated == "0") {
      alert("Product does not exist");
    } else {
      //get all attributes for the product that are held in the retailer contract
      const retailer_address = await App.retailerContract.methods.getProductRetailerAddress(label_int).call();
      document.getElementById("retailer_address").innerHTML = retailer_address;
      const retailer_name = await App.retailerContract.methods.getRetailerName(retailer_address).call();
      document.getElementById("retailer_name").innerHTML = retailer_name;
      const retailer_weight = await App.retailerContract.methods.getProductWeight(label_int).call();
      document.getElementById("retailer_weight").innerHTML = retailer_weight;
      const retailerReceivedEvent = await App.retailerContract.getPastEvents('ProductRecieved', { filter: {_label: label_int}, fromBlock: 0, toBlock: 'latest'});
      document.getElementById("retailer_time_received").innerHTML = new Date(retailerReceivedEvent[0].returnValues.time*1000);

      //get all attributes for the product that are held in the processor contract
      const processorSendEvent = await App.processorContract.getPastEvents('ProductSent', { filter: {_label: label_int}, fromBlock: 0, toBlock: 'latest'});
      const processorRecievedEvent = await App.processorContract.getPastEvents('ProductRecieved', { filter: {_productId: product_id_int}, fromBlock: 0, toBlock: 'latest'});
      const processor_address = processorSendEvent[0].returnValues._sender;
      document.getElementById("processor_address").innerHTML = processor_address;
      const processor_name = await App.processorContract.methods.getProductProcessorName(processor_address).call();
      document.getElementById("processor_name").innerHTML = processor_name;
      document.getElementById("processor_weight_received").innerHTML = processorRecievedEvent[0].returnValues._weight;
      document.getElementById("processor_time_received").innerHTML = new Date(processorRecievedEvent[0].returnValues.time*1000);
      document.getElementById("processor_weight_sent").innerHTML = processorSendEvent[0].returnValues._weight;
      document.getElementById("processor_time_sent").innerHTML = new Date(processorSendEvent[0].returnValues.time*1000);

      //get all attributes for the product that are held in the farmer contract
      const farmSendEvent = await App.farmContract.getPastEvents('SendProduct', { filter: {_productId: product_id_int, _reciever: processor_address}, fromBlock: 0, toBlock: 'latest'});
      const farmHarvestEvent = await App.farmContract.getPastEvents('Harvest', { filter: {_productId: product_id_int}, fromBlock: 0, toBlock: 'latest'});
      const farmer_address = await App.farmContract.methods.getProductFarmerAddress(product_id_int).call();
      document.getElementById("farmer_address").innerHTML = farmer_address;
      const farmer_name = await App.farmContract.methods.getFarmerName(farmer_address).call();
      document.getElementById("farmer_name").innerHTML = farmer_name;
      document.getElementById("farmer_weight_harvest").innerHTML = farmHarvestEvent[0].returnValues.weight;
      document.getElementById("farmer_weight_sent").innerHTML = farmSendEvent[0].returnValues.weight;
      document.getElementById("farmer_time_harvest").innerHTML = new Date(farmHarvestEvent[0].returnValues.time*1000);
      document.getElementById("farmer_time_sent").innerHTML = new Date(farmSendEvent[0].returnValues.time*1000);
    }
  }
}



$(() => {
    App.load();
})
