pragma solidity ^0.4.20;

/*
* This smart contract hndles farmer data and the products they have in their inventory.
* It also stores organic properties and governing bodies that distribute certificates.
*/

contract Farm {
    
    uint numberFarmers = 0;
    
    //Structure defining a product
    struct Product {
        string typeStr; //type is either Livestock or Produce
        string name;
        uint weight; //weight in grams 
        uint8 allocated; //0 = not allocated, 1 = allocated
        address farmerAddress; //owner of product
        
    }
    
    mapping (uint => Product) products; //all products stored here with productId as index
    Product[] productsArray;
    
    //Structure defining organic properties for produce
    struct OrganicPropertiesProduce { 
        string pesticideUsed;
        string fertilisersUsed;
    }
    
    mapping (uint => OrganicPropertiesProduce) organicPropertiesProduce; //organic properties for produce stored here indexed using a counter
    
    //Structure defining organic properties for Livestock
    struct OrganicPropertiesLivestock {
        uint timeSpentOutdoors; //measured in minutes
        string feedUsed;
        string housing;
    }
    
    mapping (uint => OrganicPropertiesLivestock) organicPropertiesLivestock; //organic properties for livestock stored here indexed using a counter
    
    uint numberOfProducts = 0; //number of products in the ecosystem
    
    //Structure defining a farmer 
    struct Farm {
        string name;
        uint[] certifications; //stores id of certifications that the farmer owns
        uint8 allocated; //0 = not allocated, 1 = allocated
        uint[] productLUT; //stores id of products owned by farmer
    }
    
    mapping (address => Farm) farmers; //farmers stored here indexed using the farmers address
    address[] farmersLUT; //array of farmer addresses
    
    //Defining governing body which is used to distribute certifications
    struct GoverningBody {
        string name;
        uint[] certificationIds;
        uint allocated; //0 = not allocated, 1 = allocated
    }
    
    mapping (address => GoverningBody) governingBodies; //governing bodies stored here indexed using address
    uint numberOfGoverningBodies = 0; 
    
    //Structure defining a certificate
    struct Certification {
        string name;
    }
    
    mapping (uint => Certification) certifications; //certifications stored here using a numberOfCertifications as a index
    
    uint numberOfCertifications = 0; 
   
    event CreateFarmer(string name);
    event Harvest(uint indexed _productId, string _name, uint weight, address indexed _farmerAddress, uint256 time);
    event SendProduct(address _farmerAddress, address _reciever, uint indexed _productId, uint weight, uint256 time);
    
    
    constructor() public {
        //Hard codes a Governing Body Quality Welsh Food Certification Ltd (GB-ORG-13)
        certifications[0] = Certification("FAWL");
        certifications[1] = Certification("Welsh Organic Scheme");
        certifications[2] = Certification("Dairy Assurance");
        uint[] memory certificationTMP;
        governingBodies[msg.sender] = GoverningBody("Quality Welsh Food Certification Ltd", certificationTMP, 1);
        governingBodies[msg.sender].certificationIds.push(0);
        governingBodies[msg.sender].certificationIds.push(1);
        governingBodies[msg.sender].certificationIds.push(2);
        
        numberOfGoverningBodies = numberOfGoverningBodies + 1;
    }
    
    function createFarmer(string memory _name) public {
        require (farmers[msg.sender].allocated == 0, "Already exists");
        uint[] memory certifications; 
        uint[] memory productsTMP; //initialise empty array of products 
        farmersLUT.push(msg.sender); //add current address of message sender to the farmers look up table 
        farmers[msg.sender] = Farm(_name, certifications, 1, productsTMP); //initalise farmer object and store in farmers array
        numberFarmers = numberFarmers + 1;
        emit CreateFarmer(_name);
    }
    
    
    //TODO deal with typestr (possibly userful for composite products)
    function harvestLivestock(string memory _typeStr, string memory _name, uint _weight, uint _timeSpentOutdoors, string _feedUsed, string _housing) public {
        require (farmers[msg.sender].allocated == 1, "Farmer doesn't exist");
        require (products[numberOfProducts].allocated == 0, "Product already exists");
        products[numberOfProducts] = Product(_typeStr, _name, _weight, 1, msg.sender); //initialise product object and store in products array 
        organicPropertiesLivestock[numberOfProducts] = OrganicPropertiesLivestock(_timeSpentOutdoors, _feedUsed, _housing); //initialise organic livesotock properties for the current product
        farmers[msg.sender].productLUT.push(numberOfProducts);
        numberOfProducts = numberOfProducts + 1;
        emit Harvest(numberOfProducts, _name, _weight, msg.sender, block.timestamp);
    }
    
    function harvestProduce(string memory _typeStr, string memory _name, uint _weight, string _pesticideUsed, string _fertiliserUsed) public {
        require (farmers[msg.sender].allocated == 1, "Farmer doesn't exist");
        require (products[numberOfProducts].allocated == 0, "Product already exists");
        products[numberOfProducts] = Product(_typeStr, _name, _weight, 1, msg.sender); //initialise product object and store in products array 
        organicPropertiesProduce[numberOfProducts] = OrganicPropertiesProduce(_pesticideUsed, _fertiliserUsed); //initialise organic produce properties for the current product
        farmers[msg.sender].productLUT.push(numberOfProducts);
        numberOfProducts = numberOfProducts + 1;
        emit Harvest(numberOfProducts, _name, _weight, msg.sender, block.timestamp);
    }
    
    function sendProduct(address _reciever, uint _productId, uint weight) public {
        require (farmers[msg.sender].allocated == 1, "Farmer doesn't exist");
        require (products[_productId].weight > 0, "Not in stock");
        require (weight <= products[_productId].weight, "This is not a valid weight"); 
        products[_productId].weight = products[_productId].weight - weight; //minus amount of weight being sent from current weight for specified product
        emit SendProduct(msg.sender, _reciever, _productId, weight, block.timestamp);
    }
    
    function setFarmCertification(address _farmerAddress, uint _certificationId) public {
        require (governingBodies[msg.sender].allocated == 1, "Not a governing body");
        bool owned = false;
        for (uint i = 0; i < governingBodies[msg.sender].certificationIds.length; i++) {
            if (_certificationId == governingBodies[msg.sender].certificationIds[i]) { //
                owned = true; //when the certificates that match are found owned is set to true 
            }
        }
        require (owned == true, "Governing body does not own this certification");
        farmers[_farmerAddress].certifications.push(_certificationId); //add certification to array of certifications
    }
    
    //farmer getters --------------------------------------------------------------------
    function getFarmerName(address _farmerAddress) external view returns (string memory) {
        return farmers[_farmerAddress].name;
    }
    
    function getFarmerAllocated(address _farmerAddress) external view returns (uint) {
        return farmers[_farmerAddress].allocated;
    }
    
    function getNumberOfFarmers() external view returns (uint) {
        return farmersLUT.length;
    }
    
    function getFarmerAddress(uint _count) external view returns (address) {
        return farmersLUT[_count];
    }
    
    function getCertificationArray(address _farmerAddress) external view returns (uint[]) {
        return farmers[_farmerAddress].certifications;
    }
    
    function getProductLUT(address _farmerAddress) external view returns (uint[]) {
        return farmers[_farmerAddress].productLUT;
    }
    //farmer getters end -------------------------------------------------------------------
    
    
    
    //product getters ---------------------------------------------------------------------
    function getProductTypeStr(uint _id) external view returns (string memory) {
        return products[_id].typeStr;
    }
    
    function getProductName(uint _id) external view returns (string memory) {
        return products[_id].name;
    }
    
    function getProductFarmerAddress(uint _id) external view returns (address) {
        return products[_id].farmerAddress;
    }
    
    function getProductWeight(uint _id) external view returns (uint) {
        return products[_id].weight;
    }
    
    function getAllocated(uint _id) external view returns (uint) {
        return products[_id].allocated;
    }
    
    function getNumberOfProducts()  external view returns (uint) {
        return numberOfProducts;    
    }
    //product getters end -----------------------------------------------------------------
    
    
    //organic properties getters 
    function getTimeSpentOutdoors(uint _id) external view returns (uint) {
        return organicPropertiesLivestock[_id].timeSpentOutdoors;
    }
    
    function getFeedUsed(uint _id) external view returns (string memory) {
        return organicPropertiesLivestock[_id].feedUsed;
    }
    
    function getHousing(uint _id) external view returns (string memory) {
        return organicPropertiesLivestock[_id].housing;
    }
    
    function getPesticidesUsed(uint _id) external view returns (string memeory) {
        return organicPropertiesProduce[_id].pesticideUsed;
    }
    
    function getFertilisersUsed(uint _id) external view returns (string memeory) {
        return organicPropertiesProduce[_id].fertilisersUsed;
    }
    //organic properites getters end -----------------------------------------------------
    
    //governing bodies getters ------------------------------------------------------------
    function getGoverningBodyName(address _governingBodyAddress) public view returns (string memory) {
        return governingBodies[_governingBodyAddress].name;    
    }
    
    function getCertificateName(uint _certificationId) public view returns (string memory) {
        return certifications[_certificationId].name;
    }
    
    function getGoverningBodiesCertificates(address _governingBodyAddress) public view returns (uint[]) {
        return governingBodies[_governingBodyAddress].certificationIds;
    }
    //governing bodies getters -------------------------------------------------------------
    
}