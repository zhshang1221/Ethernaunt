Towards `Force.sol`, you need to 

1. Send some ether to it

And we achieve this through `selfdestruct`, since `selfdestruct(address payable recipient)` will transfer current ETH balance to assigned address regardless of payable or not.
