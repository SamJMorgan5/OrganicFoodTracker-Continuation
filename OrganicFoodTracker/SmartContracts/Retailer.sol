pragma solidity ^0.4.20;

/*
* This smart contract handles retailers data and the products they have in their inventory.
*
*/

contract Retailer {

     //Structure defining a product owned by a retailer
    struct Inventory {
        uint intermediateId;
        uint weight;
        address processorAddress;
        address retailerAddress; //owner of product
        uint allocated; 
    }

    uint latestLabelId = 0;
    mapping (uint => Inventory) inventory;  //all products stored here with label as index
    
    struct Incoming {
        uint intermediateId;
        uint weight;
        uint256 time;
        address processorAddress;
        address retailerAddress;
    }
    
    mapping (uint => Incoming) incoming;
    
    uint latestIncomingId = 0;

    //Structure defining a retailer
    struct Retailer {
        string name;
        uint8 allocated; //all products stored here with productId as index
        uint[] labelLUT; //look up table so js doesn't have to search through all the inventory
        uint[] incomingLUT;
    }

    mapping (address => Retailer) retailers; //all retailers stored here with address as index
    address[] retailersLUT; //array of retailer addresses

    event CreateRetailer(string name);
    event ProductRecieved(address _sender, address _reciever, uint indexed _label, uint weight, uint256 time);

    function createRetailer(string memory _name) public {
        require (retailers[msg.sender].allocated == 0, "Already exists");
        retailersLUT.push(msg.sender);  //add current address of message sender to the retailer look up table
        uint[] memory productsTMP; //initialise empty array of products
        uint[] memory incomingLUT;
        retailers[msg.sender] = Retailer(_name, 1, productsTMP, incomingLUT); //initalise retailer object and store in farmers array
        emit CreateRetailer(_name);
    }
    
    function incomingProduct(uint _intermediateId, uint _weight, address _farmerAddress) public {
        latestIncomingId++;
        incoming[latestIncomingId] = Incoming(_intermediateId, _weight, block.timestamp, msg.sender, _farmerAddress);
        retailers[msg.sender].incomingLUT.push(latestIncomingId);
    }

    function recieveProduct(address _sender, uint _incomingId) public {
        require (retailers[msg.sender].allocated == 1, "Retailer must exist");
        latestLabelId++;
        uint intermediateId = incoming[_incomingId].intermediateId;
        uint weight = incoming[_incomingId].weight; 
        inventory[latestLabelId] = Inventory(intermediateId, weight, _sender, msg.sender, 1); //crate new product object and store in products mapping
        delete retailers[msg.sender].incomingLUT[findIndexIncoming(msg.sender, _incomingId)];
        retailers[msg.sender].labelLUT.push(latestLabelId);
        emit ProductRecieved(_sender, msg.sender, latestLabelId, weight, block.timestamp);
    }
    
    function findIndexIncoming(address _retailerAddress, uint _incomingId) internal view returns (uint) {
        for (uint i = 0; i < retailers[_retailerAddress].incomingLUT.length; i++) {
            if (_incomingId == retailers[_retailerAddress].incomingLUT[i]) {
                return i;
            }
        }
    }
    
    function findIndexLabelId(address _retailerAddress, uint _labelId) internal view returns (uint) {
        for (uint i = 0; i < retailers[_retailerAddress].labelLUT.length; i++) {
            if (_labelId == retailers[_retailerAddress].labelLUT[i]) {
                return i;
            }
        }
    }  
    
    //Incoming---------------------------------------------------------------------------------
    function getIncomingProductId(uint _id) external view returns (uint) {
        return incoming[_id].intermediateId;
    }
    
    function getIncomingWeight(uint _id) external view returns (uint) {
        return incoming[_id].weight;
    }
    
    function getIncomingTime(uint _id) external view returns (uint256) {
        return incoming[_id].time;
    }
    
    function getIncomingProcessorAddress(uint _id) external view returns (address) {
        return incoming[_id].processorAddress;
    }
    //End Incoming------------------------------------------------------------------------------
    

    //product getters --------------------------------------------------------------------------
    function getLatestLabel() external view returns (uint) {
        return latestLabelId;
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
    
    function getAllocated(uint _label) external view returns (uint) {
        return inventory[_label].allocated;
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

    function getIncomingLUT(address _retailerAddress) external view returns (uint[]) {
        return retailers[_retailerAddress].incomingLUT;
    }
    //end retailer getters -------------------------------------------------------------------------


}
