// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

interface IERC20 {
    function totalSupply() external view returns (uint256);

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
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

interface IERC721 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );

    function balanceOf(address owner) external view returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function mintNFT(string memory tokenURI, uint256 portalId)
        external
        returns (uint256 tokenId);

    function toggleSale(uint256 price, uint256 tokenId) external;

    function updateListingPrice(uint256 price, uint256 tokenId) external;

    function transferNFT(uint256 tokenId) external;

    function getNFTdetails(uint256 tokenId)
        external
        view
        returns (
            string memory tokenURI,
            uint256 portalId,
            address mintedBy,
            address currentOwner,
            address previosOwner,
            bool forSale,
            uint256 price
        );

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

contract TriggerProtocol {
    /* ========== Events ========== */
    event PortalCreated(
        string dbThreadID,
        uint256 appID,
        uint256 createdAt,
        address createdBy,
        uint256 portalId
    );

    event PortalJoined(uint256 portalId, address joiner);

    event PortalXPClaimed(uint256 portalId, address claimer, uint256 amount);

    event NFTminted(
        uint256 portalId,
        uint256 tokenId,
        string tokenURI,
        address mintedBy,
        address currentOwner,
        address previousOwner,
        bool forSale,
        uint256 price
    );

    event Staked(
        uint256 portalId,
        address staker,
        uint256 amount,
        uint256 timestamp
    );

    using Counters for Counters.Counter;
    Counters.Counter private _portalIds;
    IERC20 public triggerTokenFactory;
    IERC20 public triggerXpTokenFactory;
    IERC721 public triggerNFTtokenFactory;

    address private owner;

    uint256 LOCKIN_PEROID = 1 seconds; //change to 30 days
    uint256 REWARD_RATE = 1; //should be 0.01

    struct Portal {
        string dbThreadID;
        address createdBy;
        uint256 appID;
        uint256 createdAt;
    }
    struct StakingData {
        address staker;
        uint256 amount;
        uint256 timestamp;
    }
    mapping(address => string) private connectSteamID;
    mapping(uint256 => Portal) private portals;
    mapping(uint256 => mapping(address => bool)) private portalMembers;
    mapping(uint256 => uint256[]) private portalNFTS;
    mapping(uint256 => mapping(address => uint256)) private portalXpBalances;
    mapping(uint256 => StakingData[]) private stakers;
    mapping(uint256 => uint256) private totalStaked;

    constructor() {
        owner = msg.sender;
    }

    /* ========== Modifiers ========== */
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    modifier onlyJoined(uint256 _portalId) {
        require(
            portalMembers[_portalId][msg.sender] == true,
            "Portal not joined"
        );
        _;
    }

    /* ========== Internal Functions ========== */
    function checkPortalExists(uint256 _portalId) internal view returns (bool) {
        if (portals[_portalId].appID != 0) {
            return true;
        }
        return false;
    }

    /* ========== Public Functions ========== */
    function setFactoryAddresses(
        address _triggerTokenAddress,
        address _triggerXpTokenAddress,
        address _triggerNFTokenAddress
    ) public onlyOwner {
        triggerTokenFactory = IERC20(_triggerTokenAddress);
        triggerXpTokenFactory = IERC20(_triggerXpTokenAddress);
        triggerNFTtokenFactory = IERC721(_triggerNFTokenAddress);
    }

    function createPortal(string memory _dbThreadID, uint256 _appID) public {
        _portalIds.increment();
        uint256 newportalId = _portalIds.current();
        Portal memory portal = Portal(
            _dbThreadID,
            msg.sender,
            _appID,
            block.timestamp
        );
        portals[newportalId] = portal;

        emit PortalCreated(
            _dbThreadID,
            _appID,
            portal.createdAt,
            portal.createdBy,
            newportalId
        );
    }

    function joinPortal(uint256 _portalId) public {
        bool exists = checkPortalExists(_portalId);
        require(exists, "Portal doesnt exist");
        portalMembers[_portalId][msg.sender] = true;

        emit PortalJoined(_portalId, msg.sender);
    }

    function claimXpToken(uint256 _portalId, uint256 _amount)
        public
        onlyJoined(_portalId)
    {
        uint256 tokenBalance = triggerXpTokenFactory.balanceOf(address(this));
        uint256 portalTokenBalance = portalXpBalances[_portalId][msg.sender];
        require(_amount > 0, "Invalid Amount");
        require(portalTokenBalance <= 0, "XP Token already claimed");
        require(_amount <= tokenBalance, "Not enough tokens in the reserve");
        bool success = triggerXpTokenFactory.transfer(msg.sender, _amount);
        require(success, "Failed to transfer");
        portalXpBalances[_portalId][msg.sender] += _amount;

        emit PortalXPClaimed(_portalId, msg.sender, _amount);
    }

    function mintNFT(uint256 _portalId, string memory _tokenURI)
        public
        onlyJoined(_portalId)
    {
        uint256 tokenId = triggerNFTtokenFactory.mintNFT(
            _tokenURI,
            _portalId
        );

        portalNFTS[_portalId].push(tokenId);

        emit NFTminted(
            _portalId,
            tokenId,
            _tokenURI,
            msg.sender,
            msg.sender,
            msg.sender,
            false,
            0
        );
    }

    function toggleSale(uint256 price, uint256 tokenId) public {
        triggerNFTtokenFactory.toggleSale(price, tokenId);
    }

    function updateListingPrice(uint256 price, uint256 tokenId) public {
        triggerNFTtokenFactory.updateListingPrice(price, tokenId);
    }

    function buyNft(uint256 tokenId) public {
        (
            string memory tokenURI,
            uint256 portalId,
            address mintedBy,
            address currentOwner,
            address previosOwner,
            bool forSale,
            uint256 price
        ) = triggerNFTtokenFactory.getNFTdetails(tokenId);
        require(
            triggerTokenFactory.allowance(msg.sender, address(this)) >= price,
            "please approve token"
        );
        // uint256 totalRewardsAmount = REWARD_RATE * price;

        triggerNFTtokenFactory.transferNFT(tokenId);
        triggerTokenFactory.transferFrom(msg.sender, currentOwner, price);

        //send total rewardsAmount to contract
        // triggerTokenFactory.transferFrom(msg.sender, address(this), totalRewardsAmount);

        //distribute rewards and store in mapping for tht portal
        // rewardStakers(portalId, totalRewardsAmount);
    }

    function stake(uint256 _portalId, uint256 _amount)
        public
        onlyJoined(_portalId)
    {
        require(
            triggerXpTokenFactory.allowance(msg.sender, address(this)) >=
                _amount,
            "please approve token"
        );
        //change to triggerTokenFactory
        triggerXpTokenFactory.transferFrom(msg.sender, address(this), _amount);
        StakingData memory _stakeDet = StakingData(
            msg.sender,
            _amount,
            block.timestamp
        );
        stakers[_portalId].push(_stakeDet);
        totalStaked[_portalId] += _amount;
        emit Staked(_portalId, msg.sender, _amount, _stakeDet.timestamp);
    }

    function withdraw(uint256 _portalId) public onlyJoined(_portalId) {
        uint256 _amount = 0;
        uint256 _timestamp = 0;
        for (uint256 i = 0; i < stakers[_portalId].length; i++) {
            if (stakers[_portalId][i].staker == msg.sender) {
                _amount = stakers[_portalId][i].amount;
                _timestamp = stakers[_portalId][i].timestamp;
            }
        }
        require(_amount > 0, "No amount staked");

        require(
            block.timestamp > (_timestamp + LOCKIN_PEROID),
            "lockin period has not ended"
        );

        //change to triggerTokenFactory
        triggerXpTokenFactory.transfer(msg.sender, _amount);
        for (uint256 i = 0; i < stakers[_portalId].length; i++) {
            if (stakers[_portalId][i].staker == msg.sender) {
                delete stakers[_portalId][i];
            }
        }
        totalStaked[_portalId] -= _amount;

        emit Staked(_portalId, msg.sender, 0, 0);
    }

    function rewardStakers(uint256 _portalId, uint256 _totalRewardAmount)
        internal
    {
        //split rewards and store in mapping with portal id
    }

    function claimRewards(uint256 _portalId) public {
        //transfer tokens from contract to msg.sender if he has any claimable token
    }
}
