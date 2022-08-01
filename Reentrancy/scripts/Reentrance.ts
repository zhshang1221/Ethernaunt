const hre = require("hardhat");
const { waffle } = require("hardhat");

import { Signer } from "ethers";

const ethers = hre.ethers;
const provider = waffle.provider;

async function main() {
    let user: Signer, hacker: Signer;
    let attacker, victim, Attacker, Victim;

    [user, hacker] = await ethers.getSigners();

    Victim = await ethers.getContractFactory("Victim", user);
    victim = await Victim.deploy();
    await victim.deployed();

    Attacker = await ethers.getContractFactory("Attacker", hacker);
    attacker = await Attacker.deploy({ value: ethers.utils.parseEther("2") });
    await attacker.deployed();

    const tx = {
        from: await user.getAddress(),
        to: victim.address,
        value: ethers.utils.parseEther("100")
    }
    await user.sendTransaction(tx);

    console.log('Before attack, balance info:')
    console.log('Victim balance is', await ethers.utils.formatEther(await provider.getBalance(victim.address)));
    console.log('Attacker balance is', await ethers.utils.formatEther(await provider.getBalance(attacker.address)));

    console.log("Ready for attack...");

    await attacker.connect(hacker).setVictim(victim.address);
    await attacker.connect(hacker).attack(ethers.utils.parseEther("2"));

    console.log('\nAfter attack, balance info:')
    console.log('Victim balance is', await ethers.utils.formatEther(await provider.getBalance(victim.address)));
    console.log('Attacker balance is', await ethers.utils.formatEther(await provider.getBalance(attacker.address)));
}

main().then(() => process.exit(0))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })