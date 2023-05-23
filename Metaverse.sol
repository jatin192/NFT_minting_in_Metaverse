// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// Openzeppelin imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

contract Metaverse is ERC721,Ownable
{
    constructor() ERC721("NFT_NAME","SYMBOL")
    {

    }
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    uint public maxsupply =100;
    uint public cost_to_mint_NFT = 1 wei;
    struct item_struct
    {
        string  shape;
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;
    }

    mapping(address => item_struct[]) public map_;
    
    item_struct [] public arr;  // we make array so that we can know "kon kon se nft mint keja chuki hai"

    function get_all_items() public view returns(item_struct[] memory)
    {
        return arr;
    }

    function total_supply() public view returns(uint)
    {
        return supply.current();
    }

    function min_NFT(string memory _shape,int8 _h,int8 _w,int8 _d,int8 x,int8 y,int8 z) public payable
    {
        require(supply.current() <= maxsupply,"supply exceeds maximum");
        require(msg.value >= cost_to_mint_NFT,"sorry you can't mint NFT because of our less balance");

        supply.increment();
        _safeMint(msg.sender,supply.current());

        item_struct memory new_struct = item_struct(_shape,_h,_w,_d,x,y,z);
        arr.push(new_struct);
        map_[msg.sender].push(new_struct);
    }
 
    function withdraw_all_money_from_smartcontract() external payable onlyOwner
    {
        address payable adr = payable(owner());
        adr.transfer(address(this).balance);
    }   

    function show_all_item_of_owner() public view returns(item_struct[] memory)
    {
        return map_[msg.sender];
    }   

    function smart_contract_balance() public view returns(uint)
    {
        return address(this).balance;
    }
}   