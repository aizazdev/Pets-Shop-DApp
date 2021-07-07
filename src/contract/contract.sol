pragma solidity ^0.8.0;

contract AdoptPets {
    address[16] public adopters;
    
    function adopt(uint id) public returns(uint){
        require( id >= 0 && id <= 16 );
        adopters[id] = msg.sender;
        return id;
    }
    
    function getAdopters() public view returns(address[16] memory) {
        return adopters;
    }
}