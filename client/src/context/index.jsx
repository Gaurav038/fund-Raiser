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
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountColl.toString()),
                image: campaign.image,
                pId: i
            }
        ))

        return parsedCampaigns
    }

    const getUserCampaigns = async() => {
        const allCampaign = await getCampaigns()
        const filteredCampaign = allCampaign.filter((campaign) => 
            campaign.owner === address
        )

        return filteredCampaign
    }

    const donate = async(pId, amount) => {
        const data = await contract.call('donateToCampaign', pId, {value:ethers.utils.parseEther(amount) })
        return data
    }

    const getDonations = async(pId) => {
        const donations = await contract.call('getDonators', pId)
        const noOfDonations = donations[0].length

        const parsedDonations = []
        for(let i = 0; i<noOfDonations; i++){
            parsedDonations.push({
                donator: donations[0][i],
                amount: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCamp: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations
            }}
        >
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)