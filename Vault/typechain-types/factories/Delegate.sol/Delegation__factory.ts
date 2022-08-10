/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  Delegation,
  DelegationInterface,
} from "../../Delegate.sol/Delegation";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_delegateAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "nonpayable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516103de3803806103de8339818101604052810190610032919061011c565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610149565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100e9826100be565b9050919050565b6100f9816100de565b811461010457600080fd5b50565b600081519050610116816100f0565b92915050565b600060208284031215610132576101316100b9565b5b600061014084828501610107565b91505092915050565b610286806101586000396000f3fe608060405234801561001057600080fd5b506004361061002f5760003560e01c80638da5cb5b1461010357610030565b5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003660405161007c929190610184565b600060405180830381855af49150503d80600081146100b7576040519150601f19603f3d011682016040523d82523d6000602084013e6100bc565b606091505b5050905080610100576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100f7906101d4565b60405180910390fd5b50005b61010b610121565b6040516101189190610235565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600081905092915050565b82818337600083830152505050565b600061016b8385610145565b9350610178838584610150565b82840190509392505050565b600061019182848661015f565b91508190509392505050565b600082825260208201905092915050565b50565b60006101be60008361019d565b91506101c9826101ae565b600082019050919050565b600060208201905081810360008301526101ed816101b1565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061021f826101f4565b9050919050565b61022f81610214565b82525050565b600060208201905061024a6000830184610226565b9291505056fea2646970667358221220063aafa2b0fe1153aa66e0283bbbeea2b554c9ffd141b3384e7b49c96ea2ca3264736f6c63430008090033";

type DelegationConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DelegationConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Delegation__factory extends ContractFactory {
  constructor(...args: DelegationConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _delegateAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Delegation> {
    return super.deploy(
      _delegateAddress,
      overrides || {}
    ) as Promise<Delegation>;
  }
  override getDeployTransaction(
    _delegateAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_delegateAddress, overrides || {});
  }
  override attach(address: string): Delegation {
    return super.attach(address) as Delegation;
  }
  override connect(signer: Signer): Delegation__factory {
    return super.connect(signer) as Delegation__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DelegationInterface {
    return new utils.Interface(_abi) as DelegationInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Delegation {
    return new Contract(address, _abi, signerOrProvider) as Delegation;
  }
}
