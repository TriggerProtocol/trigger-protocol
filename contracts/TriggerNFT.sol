// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface IERC20 {

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract TriggerNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct PortalNft {
        uint256 tokenId;
        string tokenURI;
        address mintedBy;
        address currentOwner;
        address previousOwner;
        bool forSale;
        uint256 price;
    }
    mapping(uint256 => PortalNft) private _portalNfts;

    constructor() ERC721("Trigger Protocol NFT", "NTRG") {}

    modifier onlyOwner(uint256 _tokenId) {
        address owner = ownerOf(_tokenId);
        require(owner == msg.sender, "Not owner of Nft");
        _;
    }

    function mintToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        PortalNft memory pNft = PortalNft(
            newTokenId,
            tokenURI,
            msg.sender,
            msg.sender,
            msg.sender,
            false,
            0
        );
        _portalNfts[newTokenId] = pNft;
        return newTokenId;
    }

    function toggleSale(uint256 _price, uint256 _tokenId)
        public
        onlyOwner(_tokenId)
    {
        require(_price > 0, "Price must be at least 1 wei");
        require(_portalNfts[_tokenId].forSale == false, "Nft already for sale");
        _portalNfts[_tokenId].forSale = true;
        _portalNfts[_tokenId].price = _price;
        _approve(address(this), _tokenId);
    }

    function updateListingPrice(uint256 _price, uint256 _tokenId)
        public
        onlyOwner(_tokenId)
    {
        require(_price > 0, "Price must be at least 1 wei");
        require(_portalNfts[_tokenId].forSale == true, "Nft not for sale");
        _portalNfts[_tokenId].price = _price;
    }

    function buyNft(uint256 _tokenId, IERC20 _triggerToken) public {
        address currentOwner = _portalNfts[_tokenId].currentOwner;
        uint256 price = _portalNfts[_tokenId].price;
        require(
            _triggerToken.balanceOf(msg.sender) >= price,
            "Insufficient balance"
        );
        _transfer(currentOwner, msg.sender, _tokenId);
        _triggerToken.approve(address(this), price);
        _triggerToken.transferFrom(msg.sender, currentOwner, price);
        _portalNfts[_tokenId].previousOwner = currentOwner;
        _portalNfts[_tokenId].currentOwner = msg.sender;
        _portalNfts[_tokenId].forSale = false;
    }
}
