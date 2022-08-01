#### Remarks

* For **solidity version**, considering `Victim.sol` line 25, actually in version ^0.8.0, occuring of overflow may cause the transaction to fail with an exception, so we are using `uncheck{}` to avoid this. Otherwise, sufficient gas will be enough for all codes to run through, thus there will be a rollback and no assets can be stolen, or if gas is generally large enough to run through part of the reentrant code, it can still steal some of the ETH.

* For **gas**, in `hardhat.config.ts` -> `module.exports` -> `networks`, we can set `blockGasLimit` to customize our gasLimit. When gasLimit is relatively low, only a small amount of reentrant can happen, renderring the attacker to steal few ETH. If this happens during test, please make this variable to be greater.

#### Security Suggestions

* Use Reentrancy Guard, say some `lock` states, set to be false when entering the function, and checked for all later steps.

* Check -> Effect -> Transaction.

* Try using `transfer` instead of `call`, since former one has a built-in gas limit.

<br />

##### Reference: https://learnblockchain.cn/article/4166