
/*
* Description: This js file interacts with both the html files and
* solidity smart contracts to pass data through the supply chain.
* Displays all certifications beloniging to a governing body allowing them
* to be distrubuted to farmers.
*/
App = {
  contracts: {},

  load: async () => {
    await App.loadWeb3() //imports web3 into the file
    await App.loadAccount() //sets default account
    await App.loadFarmerContract() //load farmer contract
    await App.getCertifications()
    document.getElementById("current_address").innerHTML = App.account; //parses current address to html
  },

  loadWeb3: async() => {
    if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
		} else {
			web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		}
  },

  loadAccount: async() => {
      const accounts = await web3.eth.getAccounts(); //returns array of accounts
      App.account = accounts[1]; //select a singular array
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
		"type": "event"
	}
] //defines functions within farm contract
    const farmAddress = '0x7dDd4C7c9C73b6d36F29a336b3CD617AB5671de2' //contract address
    App.farmContract = new web3.eth.Contract(farmAbi, farmAddress);
  },

  getCertifications: async () => {
    const certficiationsTemplate = $('#certifications'); //template that will hold all certificates belonging to a governing body
    const governing_body_certificates = await App.farmContract.methods.getGoverningBodiesCertificates(App.account).call();
    for (var i = 0; i < governing_body_certificates.length; i++) {
      var i_int = parseInt(i, 10);
      const certificate_id = governing_body_certificates[i_int];
      var certificate_id_int = parseInt(certificate_id, 10);
      const certificate_name = await App.farmContract.methods.getCertificateName(certificate_id_int).call();
      //certificate values to be output to the screen
      let output =
          `<a href="#" class="list-group-item list-group-item-action" data-toggle="list" role="tab">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1" name="product_id">ID: `+ governing_body_certificates[i_int] +`</h5>
              </div>
                <p class="mb-1" name="product_id">Name: `+ certificate_name +`</p>
           </a>`;

      certficiationsTemplate.append(output);

    }
  },

  sendCertification: async () => {
    var items = document.getElementsByClassName("list-group-item active"); //get currently activated list item in governing_body_homepage.html
    var certificate_id = items[0].firstChild.nextElementSibling.innerText.slice(4); //slice first 4 characters giving the certificateId
    var certificate_id_int = parseInt(certificate_id, 10);
    //read reciever inputted by user in the governing_body_homepage.html form
    let reciever = $('[name="reciever"]').val();
    //validates input
    if (reciever == "") {
      alert('insufficient values');
    } else {
      const allocated = await App.farmContract.methods.getFarmerAllocated(reciever).call();
      if (allocated == '0') {
        alert('not allocated');
      } else if (allocated == '1') {
        const current_farmer_certifications = await App.farmContract.methods.getCertificationArray(reciever).call();
        var exists = 0;
        //checks if the reciever (farmer) already has the certificate
        for (var i = 0; i < current_farmer_certifications.length; i++) {
          if (current_farmer_certifications[i] == certificate_id_int) {
            var exists = 1;
          }
        }
        if (exists == 0) {
          await App.farmContract.methods.setFarmCertification(reciever, certificate_id).send({from: App.account, gasLimit: 4712388});
          alert('sent');
        } else {
          alert ('farmer already has this certification');
        }

      }
    }
  }
}


$(() => {
    App.load();
})
