// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "@openzeppelin/contracts/utils/Counters.sol";

contract Warranty is ERC721, ERC721URIStorage, Ownable {
    // using Counters for Counters.Counter;

    // Counters.Counter private _tokenIdCounter;
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
    }
    enum product_status {
        Pending,
        Sold,
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
        address to,
        string memory uri,
        uint256 tokenId
    ) public returns (uint256 tokenIdMinted) {
        // uint256 tokenId = _tokenIdCounter.current();
        // _tokenIdCounter.increment();
        // require(products[tokenId].status==product_status.Sold, "NFT status not valid");
        _safeMint(to, tokenId);
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

    // function burn(
    //     uint256 tokenId
    // ) public {
    //     super._burn(tokenId);
    // }

    // function getCurrentTokenId()
    //     external
    //     view
    //     returns (uint256 tokenIdCurrent)
    // {
    //     return _tokenIdCounter.current();
    // }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function addManufacturer() public {
        manufacturers[msg.sender] = (manufacturer(cid++, msg.sender));
    }

    function addRetailer(address _radd) public {
        require(
            manufacturers[msg.sender].add != address(0),
            "Manufacturer not registered"
        );
        retailers[_radd] = (retailer(cid++, msg.sender, _radd));
    }

    function addProduct(
        string memory _title,
        uint256 _id,
        string memory _product_image,
        string memory _desc,
        // uint256 _activate_time,
        uint256 _expiry_time
    ) public // address _manufacturer,
    // address _customer
    {
        // bytes memory templink = bytes(_ipfsLink);
        // require(templink.length > 0, "IPFS Link can't be empty");
        // require(_title.length > 0, "Title can't be empty");
        require(
            _expiry_time > 0,
            "Warranty period must be greater than 0 months"
        );
        // require(retailers[msg.sender].madd==_manufacturer, "Retailer not verified to sell the product");
        require(
            manufacturers[msg.sender].add == msg.sender,
            "User is not a registered Manufaturer, can't create a product"
        );
        require(_id == products.length, "wrond product ID");
        uint256 tmp_expiry = 0 + _expiry_time;
        address[] memory emptyAddressList;
        // address manufacadd = payable(_manufacturer);
        // address retailadd = payable(msg.sender);
        // address custadd = payable(_customer);
        products.push(
            product_details({
                title: _title,
                id: _id,
                product_image: _product_image,
                desc: _desc,
                // _activate_time;
                activate_time: 0,
                // _expiry_time;
                expiry_time: tmp_expiry,
                manufacturer: msg.sender,
                retailer: address(0),
                customer: address(0),
                status: product_status.Pending,
                history: emptyAddressList
            })
        );
    }

    function sellProduct(uint256 _id, address _customer) public {
        // bytes memory templink = bytes(_ipfsLink);
        // require(templink.length > 0, "IPFS Link can't be empty");
        require(_id < products.length, "Product ID not found");
        require(
            retailers[msg.sender].madd == products[_id].manufacturer,
            "Retailer not verified to sell the product"
        );
        // product_details memory tmp = products[_id];
        products[_id].activate_time = block.timestamp;
        products[_id].expiry_time =
            block.timestamp +
            products[_id].expiry_time *
            2629800000;
        products[_id].retailer = msg.sender;
        products[_id].customer = _customer;
        products[_id].status = product_status.Sold;
        products[_id].history.push(_customer);
        // products[_id] = tmp;
    }

    function activateWarranty(uint256 _id) public {
        // bytes memory templink = bytes(_ipfsLink);
        // require(templink.length > 0, "IPFS Link can't be empty");
        require(_id < products.length, "Product ID not found");
        require(
            products[_id].customer == msg.sender,
            "Customer not verified to claim the warranty"
        );
        require(
            block.timestamp < products[_id].expiry_time,
            "Warranty Expired"
        );
        //  _safeMint(msg.sender, _id);
        // _setTokenURI(_id, uri);
        products[_id].status = product_status.Active;
    }

    function resellProduct(uint256 _id, address to) public {
        require(_id < products.length, "Product ID not found");
        require(
            products[_id].customer == msg.sender,
            "Customer not verified to claim the warranty"
        );
        // product_details memory tmp = products[_id];
        // tmp.customer = to;
        products[_id].customer = to;
        products[_id].history.push(to);
    }

    function transferNFT(uint256 _id, address _to) public {
        // require(_id < products.length, "Product ID not found");
        // require(products[_id].customer==msg.sender, "Product can't be sold, seller is not the owner");
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
