// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Warranty is ERC721, ERC721URIStorage, Ownable {
    struct retailer {
        uint256 id;
        address madd;
        address radd;
    }
    struct manufacturer {
        uint256 id;
        address add;    
    }
    struct product_details {
        string title;
        uint256 id;
        string product_image;
        string desc;
        uint256 activate_time;
        uint256 expiry_time;
        address manufacturer;
        address retailer;
        address customer;
        product_status status;
        address[] history;
        address curr_owner;
    }
    enum product_status {
        Not_Dispatched,
        Shipped,
        Active,
        Expired
    }
    product_details[] public products;
    mapping(address => manufacturer) public manufacturers;
    mapping(address => retailer) public retailers;
    uint256 public cid;

    constructor() ERC721("NFTWarranty", "NFTW") {
        cid = 1;
    }

    function safeMint(
        string memory uri,
        uint256 tokenId
    ) public returns (uint256 tokenIdMinted) {
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        ERC721._burn(tokenId);
    }

    function burnNft(uint256 tokenId) public {
        ERC721._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function addManufacturer() public {
        manufacturers[msg.sender] = (manufacturer(cid++, msg.sender));
    }

    function addRetailer(address _radd) public {
        if (manufacturers[msg.sender].id != 0) {
            retailers[_radd] = (retailer(cid++, msg.sender, _radd));
        }
    }

    function addProduct(
        string memory _title,
        // uint256 _id,
        string memory _product_image,
        string memory _desc,
        uint256 _expiry_time
    ) public returns (uint256) {
        require(
            _expiry_time > 0,
            "Warranty period must be greater than 0 months"
        );
        require(
            manufacturers[msg.sender].add == msg.sender,
            "User is not a registered Manufaturer, can't create a product"
        );
        // require(_id == products.length, "wrond product ID");
        uint256 _id = products.length;
        uint256 tmp_expiry = 0 + _expiry_time;
        address[] memory emptyAddressList;
        products.push(
            product_details({
                title: _title,
                id: _id,
                product_image: _product_image,
                desc: _desc,
                activate_time: 0,
                expiry_time: tmp_expiry,
                manufacturer: msg.sender,
                retailer: address(0),
                customer: address(0),
                status: product_status.Not_Dispatched,
                history: emptyAddressList,
                curr_owner: msg.sender
            })
        );
        return _id;
    }

    function sellProduct(uint256 _id, address _customer) public {
        require(_id < products.length, "Product ID not found");
        require(
            retailers[msg.sender].madd == products[_id].manufacturer,
            "Retailer not verified to sell the product"
        );
        products[_id].activate_time = block.timestamp;
        products[_id].expiry_time =
            block.timestamp +
            products[_id].expiry_time *
            2629800000;
        products[_id].retailer = msg.sender;
        products[_id].customer = _customer;
        products[_id].status = product_status.Active;
        products[_id].history.push(_customer);
        products[_id].curr_owner=_customer;
    }

    function activateWarranty(uint256 _id) public {
        require(_id < products.length, "Product ID not found");
        require(
            products[_id].customer == msg.sender,
            "Customer not verified to claim the warranty"
        );
        require(
            block.timestamp < products[_id].expiry_time,
            "Warranty Expired"
        );
        products[_id].status = product_status.Active;
    }

    function resellProduct(uint256 _id, address to) public {
        require(_id < products.length, "Product ID not found");
        require(
            products[_id].curr_owner == msg.sender,
            "User is not a current owner of the product"
        );
        products[_id].customer = to;
        products[_id].history.push(to);
        products[_id].curr_owner = to;
    }

    function transferNFT(uint256 _id, address _to) public {
        _transfer(msg.sender, _to, _id);
    }

    // Read Functions

    function getProductDetails(
        uint256 _id
    ) external view returns (product_details memory) {
        require(_id < products.length, "Product ID not found");
        return products[_id];
    }

    function getProducts() external view returns (product_details[] memory) {
        return products;
    }

    function getProductId() external view returns (uint256) {
        return products.length;
    }

    function getExpiryTimeById(
        uint256 tokenId
    ) external view returns (uint256) {
        return products[tokenId].expiry_time;
    }

    function checkActiveStatus(uint256 tokenId) external view returns (bool) {
        return products[tokenId].status == product_status.Active;
    }

    function checkUser() external view returns (uint) {
        if (manufacturers[msg.sender].id != 0) {
            return 0;
        } else if (retailers[msg.sender].id != 0) {
            return 1;
        } else {
            return 2;
        }
    }
}
