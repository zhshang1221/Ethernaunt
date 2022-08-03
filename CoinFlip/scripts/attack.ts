const hre = require("hardhat");
const {waffle} = require("hardhat");

const ethers = hre.ethers;
const provider = waffle.provider;

import { Signer } from "ethers";

const main = async () => {
    let user: Signer, hacker: Signer;

    [user, hacker] = await ethers.getSigners();

    const CoinFlip = await ethers.getContractFactory("CoinFlip", user);
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();

    console.log("CoinFlip contract get successfully deployed");

    const Attacker = await ethers.getContractFactory("Attacker", hacker);
    const attacker = await Attacker.deploy(coinFlip.address);
    await attacker.deployed();

    await attacker.connect(hacker).guess();

    await attacker.connect(hacker).guess();



    
}

main().then(() => process.exit(0))
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })