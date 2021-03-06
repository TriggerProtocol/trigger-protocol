// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TriggerNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct PortalNft {
        uint256 tokenId;
        uint256 portalId;
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

    function mintNFT(string memory tokenURI, uint256 _portalId,uint256 _price)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        PortalNft memory pNft = PortalNft(
            newTokenId,
            _portalId,
            tokenURI,
            msg.sender,
            msg.sender,
            msg.sender,
            true,
            _price
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
        require(_portalNfts[_tokenId].forSale, "Nft not for sale");
        _portalNfts[_tokenId].price = _price;
    }

    function transferNFT(uint256 _tokenId) public {
        address currentOwner = _portalNfts[_tokenId].currentOwner;
        require(_portalNfts[_tokenId].forSale, "Nft not for sale");
        _transfer(currentOwner, msg.sender, _tokenId);
        _portalNfts[_tokenId].previousOwner = currentOwner;
        _portalNfts[_tokenId].currentOwner = msg.sender;
        _portalNfts[_tokenId].forSale = false;
    }

    function getNFTdetails(uint256 _tokenId)
        public
        view
        returns (
            string memory,
            uint256,
            address,
            address,
            address,
            bool,
            uint256
        )
    {
        PortalNft memory pnft = _portalNfts[_tokenId];

        return (
            pnft.tokenURI,
            pnft.portalId,
            pnft.mintedBy,
            pnft.currentOwner,
            pnft.previousOwner,
            pnft.forSale,
            pnft.price
        );
    }
}
