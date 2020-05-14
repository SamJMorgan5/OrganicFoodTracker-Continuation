pragma solidity ^0.4.20;

/*
* This smart contract handles retailers data and the products they have in their inventory.
* 
*/

contract Retailer {
    
     //Structure defining a product
    struct Product {
        uint productId;
        uint label; //customer will use the label to track their item
        uint weight; 
        uint8 allocated; //0 = not allocated, 1 = allocated
        address retailerAddress; //owner of product 
    }
    
    uint latestLabel = 0;
    mapping (uint => Product) products;  //all products stored here with label as index

    //Structure defining a retailer
    struct Retailer {
        address retailer;
        string name;
        uint8 allocated; //all products stored here with productId as index
    }
    
    mapping (address => Retailer) retailers; //all retailers stored here with address as index
    address[] retailersLUT; //array of retailer addresses
    
    event CreateRetailer(string name);
    event ProductRecieved(address _sender, address _reciever, uint indexed _label, uint weight, uint256 time);
    
    function createRetailer(string memory _name) public {
        require (retailers[msg.sender].allocated == 0, "Already exists");
        retailersLUT.push(msg.sender);  //add current address of message sender to the retailer look up table 
        retailers[msg.sender] = Retailer(msg.sender, _name, 1); //initalise retailer object and store in farmers array
        emit CreateRetailer(_name);
    }
    
    function recieveProduct(address _sender, uint _productId, uint _label, uint _weight) public {
        require (retailers[msg.sender].allocated == 1, "Retailer must exist");
        require (products[_label].allocated == 0, "Product already exists");
        products[_label] = Product(_productId, _label, _weight, 1, _sender); //crate new product object and store in products mapping
        latestLabel = _label;
        emit ProductRecieved(_sender, msg.sender, _label, _weight, block.timestamp);
    }
    
    //product getters --------------------------------------------------------------------------
    function getLatestLabel() external view returns (uint) {
        return latestLabel;    
    }
    
    function getProductWeight(uint _label) external view returns (uint) {
        return products[_label].weight;
    }
    
    function getAllocated(uint _label) external view returns (uint) {
        return products[_label].allocated;
    }
    
    function getProductRetailerAddress(uint _label) external view returns (address) {
        return products[_label].retailerAddress;
    }
    
    function getProductId(uint _label) external view returns (uint) {
        return products[_label].productId;
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
    //end retailer getters -------------------------------------------------------------------------
    
    
}