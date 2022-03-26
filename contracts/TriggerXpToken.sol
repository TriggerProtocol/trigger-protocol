// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TriggerXpToken is ERC20 {
    constructor(uint256 _initialSupply, address _triggerContract)
        ERC20("TriggerXpToken", "xTGR")
    {
        _mint(_triggerContract, _initialSupply);
    }
}
