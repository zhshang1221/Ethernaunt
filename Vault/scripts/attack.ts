const hre = require("hardhat");
const {waffle} = require("hardhat");

import { Signer } from "ethers";

import {getStorageAt} from "@nomicfoundation/hardhat-network-helpers";

const ethers = hre.ethers;
const provider = waffle.provider;

async function main(){
    let user: Signer, hacker: Signer;

    [user, hacker] = await ethers.getSigners();
    console.log('User address', await user.getAddress());
    console.log('Hacker address', await hacker.getAddress());

    const passwd = 'this is a strong password';
    const passwdBytes = await ethers.utils.formatBytes32String(passwd);
    console.log('Password is:', passwd);
    console.log('Password in bytes is:', passwdBytes);

    const Vault = await ethers.getContractFactory("Vault", user);
    const vault = await Vault.deploy(passwdBytes);
    await vault.deployed();

    const storage = await getStorageAt(vault.address, 1);
    const storePasswd = await ethers.utils.parseBytes32String(storage);
    console.log('Storage value is:', storage);
    console.log('Storage passwd is:', storePasswd);
}

main().then(()=>process.exit(0))
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
    