Towards `Fallback.sol`, you need to 

1. Claim the ownership of the contract
2. Reduce its balance to 0

And we achieve this through `send ether` can call corresponding `fallback` function.