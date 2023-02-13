import React, { createContext, useContext } from "react";
import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react'
import { ethers } from "ethers";

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const {contract} = useContract('0x2B7C56e1b33105267c58B59463adBfA7F6A94AC9')
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
                form.image,
                form.category
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
                category: campaign.category,
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

    const Rsltcounting = async() => {
        const rslt = [];
        const campaigns = await contract.call('numberOfCampaigns')
        const donations = await contract.call('numberOfDonations')
        const Amount = await contract.call('totalAmountRaised')

        rslt.push(campaigns.toString());
        rslt.push(donations.toString());
        rslt.push(ethers.utils.formatEther(Amount.toString() ));

        return rslt;
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
                getDonations,
                Rsltcounting
            }}
        >
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)