import {DeployFunction, ProxyOptions} from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { readAddressList, readProxyAdmin, storeAddressList, storeProxyAdmin } from "../scripts/contractAddress";

// Deploy Victim
// It is a non-proxy deployment
// Contract:
//      - Victim
// Tags:
//      _ Victim

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment){
    const {deployments, getNamedAccounts, network} = hre;
    const {deploy, save, getArtifact} = deployments;

    network.name = network.name == "hardhat" ? "localhost" : network.name;

    const {deployer} = await getNamedAccounts();
    const addressList = readAddressList();

    const victim = await deploy("Victim", {
        contract: "Victim",
        from: deployer,
        args: [],
        log: true
    });
    addressList[network.name].Victim = victim.address;

    console.log('Victim get deployed');

    // Store the address list after deployment
    storeAddressList(addressList);
}

func.tags = ['Victim'];
export default func;