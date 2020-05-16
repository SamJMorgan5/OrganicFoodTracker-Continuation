pragma solidity ^0.4.20;

/*
* This smart contract handles processors data and the products they have in their inventory.
* 
*/

contract Processor {
    
    //Structure defining a product
    struct Product {
        uint weight;
        uint8 allocated; //0 = not allocated, 1 = allocated
        address processorAddress; //owner of product 
    }
    
    mapping (uint => Product) products; //all products stored here with productId as index
    
    uint latestProductId = 0; 
    uint label = 0;
    
    //Structure defining a processor
    struct Processor {
        string name;
        uint8 allocated;
    }
    
    mapping (address => Processor) processors; //all processors stored here with address as index
    address[] processorsLUT; //array of processor addresses

    event CreateProcessor(string _name);
    event ProductRecieved(address _sender, address _reciever, uint indexed _productId, uint _weight, uint256 time);
    event ProductSent(address indexed _sender, address indexed _reciever, uint indexed _label, uint _productId, uint _weight, uint256 time);
    
    function createProcessor(string memory _name) public {
        require (processors[msg.sender].allocated == 0, "Already exists");
        processorsLUT.push(msg.sender); //add current address of message sender to the processors look up table 
        processors[msg.sender] = Processor(_name, 1); //initalise procesor object and store in farmers array
        emit CreateProcessor(_name);
    }
    
    function recieveProduct(address _sender, uint _productId, uint _weight) public {
        require (processors[msg.sender].allocated == 1, "Processor doesn't exist");
        //If product doesn't exist create new product otherwise add weight to already existing product
        if (products[_productId].allocated == 0) {
            products[_productId] = Product(_weight, 1, msg.sender);
            latestProductId = _productId;
        } else {
            products[_productId].weight = products[_productId].weight + _weight;
        }
        emit ProductRecieved(_sender, msg.sender, _productId, _weight, block.timestamp);
        
    }
    
    function sendProduct(address _reciever, uint _productId, uint _weight) public {
        require (processors[msg.sender].allocated == 1, "Processor doesn't exist");
        require (products[_productId].weight > 0, "Not in stock");
        products[_productId].weight = products[_productId].weight - _weight; //removes weight sent from current weight
        label = label + 1; //iterates the label so that eaxh label is unique
        emit ProductSent(msg.sender, _reciever, label, _productId, _weight, block.timestamp);
    }
    
    //Product Getters---------------------------------------------------------------------------
    function getProductProcessorName(address _processorAddress) external view returns (string memory) {
        return processors[_processorAddress].name;
    }
    
    function getLatestProductId()  external view returns (uint) {
        return latestProductId;    
    }
    
    function getLatestLabel()  external view returns (uint) {
        return label;    
    }
    
    function getProductProcessorAddress(uint _id) external view returns (address) {
        return products[_id].processorAddress;
    }
    
    function getProductWeight(uint _id) external view returns (uint) {
        return products[_id].weight;
    }
    
    function getAllocated(uint _id) external view returns (uint) {
        return products[_id].allocated;
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
    //End Processor Getters------------------------------------------------------------------
    
}