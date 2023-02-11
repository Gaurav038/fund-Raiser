import React, { createContext, useContext } from "react";
import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react'
import { ethers } from "ethers";

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const {contract} = useContract('0x05604222Dfd2D0fd692B13fE3CC8Dd05Fa25B092')
    const {mutateAsync : createCampaign} = useContractWrite(contract, 'createCampaign')

    const address = useAddress()
    const connect = useMetamask()

    const publishCampaign = async(form) => {
        try {
           const data = await createCampaign([
                address, //owner
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ]) 
            console.log("successFul", data)
        } catch (error) {
            console.log("Contract Failed", error)
        }
        
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCompaigns')
        
        const parsedCampaigns = campaigns.map((campaign, i) => (
            {
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toString(),
                amountCollected: ethers.utils.formatEther(campaign.amountColl.toString()),
                image: campaign.image,
                pId: i
            }
        ))

        console.log(parsedCampaigns)
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCamp: publishCampaign,
                getCampaigns 
            }}
        >
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)