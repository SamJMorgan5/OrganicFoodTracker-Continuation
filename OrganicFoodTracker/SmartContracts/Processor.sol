pragma solidity ^0.4.20;

/*
* This smart contract handles processors data and the products they have in their inventory.
* 
*/

contract Processor {
    
    //Structure defining a product indexed ny intermediateId
    struct Inventory {
        uint productId;
        uint weight;
        address farmerAddress;//sender of product
        address processorAddress; //owner of product 
    }
    
    mapping (uint => Inventory) inventory; //all products stored here with productId as index
    
    uint latestIntermediateId = 0;
    
    struct Incoming {
        uint productId;
        uint weight; 
        uint256 time;
        address farmerAddress;
        address processorAddress;
    }
    
    mapping (uint => Incoming) incoming;
    
    uint latestIncomingId = 0;
    
    //Structure defining a processor
    struct Processor {
        string name;
        uint8 allocated;
        uint[] intermediateLUT; //look up table to js doesn't have to search through all the inventory
        uint[] incomingLUT;
    }
    
    mapping (address => Processor) processors; //all processors stored here with address as index
    address[] processorsLUT; //array of processor addresses

    event CreateProcessor(string _name);
    event ProductRecieved(address _sender, address _reciever, uint indexed _productId, uint _weight, uint256 time);
    event ProductSent(address indexed _sender, address indexed _reciever, uint _productId, uint _weight, uint256 time);
    
    function createProcessor(string memory _name) public {
        require (processors[msg.sender].allocated == 0, "Already exists");
        processorsLUT.push(msg.sender); //add current address of message sender to the processors look up table 
        uint[] memory productsTMP; //initialise empty array of products 
        uint[] memory incomingLUT;
        processors[msg.sender] = Processor(_name, 1, productsTMP, incomingLUT); //initalise procesor object and store in farmers array
        emit CreateProcessor(_name);
    }
    
    function recieveProduct(address _sender, uint _incomingId) public {
        require (processors[msg.sender].allocated == 1, "Processor doesn't exist");
        //If product doesn't exist create new product otherwise add weight to already existing product
        latestIntermediateId++;
        uint productId = incoming[_incomingId].productId;
        uint weight = incoming[_incomingId].weight; 
        inventory[latestIntermediateId] = Inventory(productId, weight, _sender, msg.sender);
        delete processors[msg.sender].incomingLUT[findIndexIncoming(msg.sender, _incomingId)];
        processors[msg.sender].intermediateLUT.push(latestIntermediateId);
        emit ProductRecieved(_sender, msg.sender, productId, weight, block.timestamp);
        
    }
    
    function sendProduct(address _reciever, uint _intermediateId, uint _weight) public {
        require (processors[msg.sender].allocated == 1, "Processor doesn't exist");
        require(inventory[_intermediateId].processorAddress == msg.sender, "You do not own this product");
        require (inventory[_intermediateId].weight > 0, "Not in stock");
        inventory[_intermediateId].weight = inventory[_intermediateId].weight - _weight; //removes weight sent from current weight
        delete processors[msg.sender].intermediateLUT[findIndexIntermediate(msg.sender, _intermediateId)];
        emit ProductSent(msg.sender, _reciever, _intermediateId, _weight, block.timestamp);
    }
    
    function incomingProduct(uint _productId, uint _weight, address _processorAddress) public {
        latestIncomingId++;
        incoming[latestIncomingId] = Incoming(_productId, _weight, block.timestamp, _processorAddress, msg.sender);
        processors[msg.sender].incomingLUT.push(latestIncomingId);
    }
    
    function findIndexIncoming(address _processorAddress, uint _incomingId) internal view returns (uint) {
        for (uint i = 0; i < processors[_processorAddress].incomingLUT.length; i++) {
            if (_incomingId == processors[_processorAddress].incomingLUT[i]) {
                return i;
            }
        }
    }
    
    function findIndexIntermediate(address _processorAddress, uint _intermediateId) internal view returns (uint) {
        for (uint i = 0; i < processors[_processorAddress].intermediateLUT.length; i++) {
            if (_intermediateId == processors[_processorAddress].intermediateLUT[i]) {
                return i;
            }
        }
    }  
    
    //Incoming---------------------------------------------------------------------------------
    function getIncomingProductId(uint _id) external view returns (uint) {
        return incoming[_id].productId;
    }
    
    function getIncomingWeight(uint _id) external view returns (uint) {
        return incoming[_id].weight;
    }
    
    function getIncomingTime(uint _id) external view returns (uint256) {
        return incoming[_id].time;
    }
    
    function getIncomingFarmerAddress(uint _id) external view returns (address) {
        return incoming[_id].farmerAddress;
    }
    //End Incoming------------------------------------------------------------------------------
    
    //Product Getters---------------------------------------------------------------------------
    function getProductProcessorName(address _processorAddress) external view returns (string memory) {
        return processors[_processorAddress].name;
    }
    
    function getProductProcessorAddress(uint _id) external view returns (address) {
        return inventory[_id].processorAddress;
    }
    
    function getProductWeight(uint _id) external view returns (uint) {
        return inventory[_id].weight;
    }
    
    function getNumberOfProducts(address _processorAddress) external view returns (uint) {
        return processors[_processorAddress].intermediateLUT.length;
    }
    
    function getProductId(uint _id) external view returns (uint) {
        return inventory[_id].productId;
    }
    //End Product Getters----------------------------------------------------------------------
    
    
    //Processor Getterss----------------------------------------------------------------------
    function getProcessorAllocated(address _address) external view returns (uint) {
        return processors[_address].allocated;
    }
    
    function getNumberOfProcessors() external view returns (uint) {
        return processorsLUT.length;
    }
    
    function getProcessorAddress(uint _count) external view returns (address) {
        return processorsLUT[_count];
    }
    
    function getProcessorName(address _processorAddress) external view returns (string) {
        return processors[_processorAddress].name;
    }
    
    function getIntermediateLUT(address _processorAddress) external view returns (uint[]) {
        return processors[_processorAddress].intermediateLUT;
    }
    
    function getIncomingLUT(address _processorAddress) external view returns (uint[]) {
        return processors[_processorAddress].incomingLUT;
    }
    //End Processor Getters------------------------------------------------------------------
    
}