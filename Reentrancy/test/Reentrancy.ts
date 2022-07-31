import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { solidity } from "ethereum-waffle";
import chai from "chai";
chai.use(solidity);
const { expect } = chai;

const { ethers } = require("hardhat");

import {
    Attacker,
    Attacker__factory,
    Victim,
    Victim__factory
} from "../typechain";

import {
    formatTokenAmount
} from "./utils"

describe("Reentrancy", function(){
    let victim: Victim, attacker: Attacker;

    let initialValue;
    let dev: SignerWithAddress, user: SignerWithAddress;

    beforeEach(async()=>{
        [dev, user] = await ethers.getSigners();

        victim = await new Victim__factory(user).deploy();
        await victim.deployed();

        console.log("victim address", victim.address)

        attacker = await new Attacker__factory(dev).deploy(victim.address);
        await attacker.deployed();

        await victim.connect(user).deposit({
            value: ethers.utils.parseEther("100")
        })

        initialValue = await victim.getBalance();
        console.log("Before attack, balance of victim is", formatTokenAmount(initialValue.toString()));
    })

    it("should be able to deposit and withdraw", async()=> {
        await victim.connect(dev).deposit(
            {value: ethers.utils.parseEther("1")}
        );
        
        console.log('dev deposit', formatTokenAmount((await victim.deposits(dev.address)).toString()));

        let secondValue = await victim.getBalance();
        console.log("After deposit, balance of victim is", formatTokenAmount(secondValue.toString()));

        // await dev.sendTransaction({
        //     to: attacker.address,
        //     value: ethers.utils.parseEther("2")
        // })
        
        // await attacker.attack();
        // await attacker.deposit();
        await victim.connect(dev).update();

        let finalValue = await victim.getBalance();
        console.log("Finally, balance of victim is", formatTokenAmount(finalValue.toString()));
        
    })
})