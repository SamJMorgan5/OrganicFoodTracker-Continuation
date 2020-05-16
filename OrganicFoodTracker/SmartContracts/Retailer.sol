pragma solidity ^0.4.20;

/*
* This smart contract handles retailers data and the products they have in their inventory.
* 
*/

contract Retailer {
    
     //Structure defining a product
    struct Inventory {
        uint intermediateId;
        uint weight; 
        address retailerAddress; //owner of product 
    }
    
    uint latestLabel = 0;
    mapping (uint => Inventory) inventory;  //all products stored here with label as index

    //Structure defining a retailer
    struct Retailer {
        string name;
        uint8 allocated; //all products stored here with productId as index
        uint[] labelLUT; //look up table to js doesn't have to search through all the inventory
    }
    
    mapping (address => Retailer) retailers; //all retailers stored here with address as index
    address[] retailersLUT; //array of retailer addresses
    
    event CreateRetailer(string name);
    event ProductRecieved(address _sender, address _reciever, uint indexed _label, uint weight, uint256 time);
    
    function createRetailer(string memory _name) public {
        require (retailers[msg.sender].allocated == 0, "Already exists");
        retailersLUT.push(msg.sender);  //add current address of message sender to the retailer look up table 
        uint[] memory productsTMP; //initialise empty array of products 
        retailers[msg.sender] = Retailer(_name, 1, productsTMP); //initalise retailer object and store in farmers array
        emit CreateRetailer(_name);
    }
    
    function recieveProduct(address _sender, uint _intermediateId, uint _weight) public {
        require (retailers[msg.sender].allocated == 1, "Retailer must exist");
        latestLabel++;
        inventory[latestLabel] = Inventory(_intermediateId, _weight, _sender); //crate new product object and store in products mapping
        retailers[msg.sender].labelLUT.push(latestLabel);
        emit ProductRecieved(_sender, msg.sender, latestLabel, _weight, block.timestamp);
    }
    
    //product getters --------------------------------------------------------------------------
    function getLatestLabel() external view returns (uint) {
        return latestLabel;    
    }
    
    function getProductWeight(uint _label) external view returns (uint) {
        return inventory[_label].weight;
    }
    
    function getProductRetailerAddress(uint _label) external view returns (address) {
        return inventory[_label].retailerAddress;
    }
    
    function getIntermediateId(uint _label) external view returns (uint) {
        return inventory[_label].intermediateId;
    }
    //end product getters --------------------------------------------------------------------------
    
    
    //retailers getters -----------------------------------------------------------------------------
    function getRetailerName(address _address) external view returns (string memory) {
        return retailers[_address].name;
    }
    
    function getRetailerAllocated(address _address) external view returns (uint) {
        return retailers[_address].allocated;
    } 
    
    function getNumberOfRetailers() external view returns (uint) {
        return retailersLUT.length;
    }
    
    function getRetailerAddress(uint _count) external view returns (address) {
        return retailersLUT[_count];
    }
    
    function getLabelLUT(address _retailerAddress) external view returns (uint[]) {
        return retailers[_retailerAddress].labelLUT;
    }
    //end retailer getters -------------------------------------------------------------------------
    
    
}