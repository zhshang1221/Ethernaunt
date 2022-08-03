/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Attacker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Attacker__factory>;
    getContractFactory(
      name: "Fallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Fallback__factory>;
    getContractFactory(
      name: "ITelephone",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ITelephone__factory>;
    getContractFactory(
      name: "Telephone",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Telephone__factory>;

    getContractAt(
      name: "Attacker",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Attacker>;
    getContractAt(
      name: "Fallback",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Fallback>;
    getContractAt(
      name: "ITelephone",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ITelephone>;
    getContractAt(
      name: "Telephone",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Telephone>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}