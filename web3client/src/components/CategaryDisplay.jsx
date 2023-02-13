import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context'
import { useNavigate,useLocation } from 'react-router-dom'
import FundCard from './FundCard'
import Loader from '../components/Loader'

function CategaryDisplay() {

    const location = useLocation()
    const str = location.pathname.split("/");

    const category = str[str.length - 1]
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const {address, contract, getCampaigns} = useStateContext()

  const fetchCampaign = async () => {
    setIsLoading(true)
    const data = await getCampaigns()

    const filteredCampaign = data.filter((campaign) => 
            campaign.category === category
    )
    setCampaigns(filteredCampaign)
    setIsLoading(false)
  }

    const navigate = useNavigate()

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, {state: campaign})
    }

  useEffect(() => {
    if(contract) fetchCampaign()
  }, [address, contract])
  
  return (
    <div>
    <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">Categary - {category} ({campaigns.length})</h1>

    <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
            <Loader />
        )}

        {!isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            These categary not created any campigns yet
            </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => 
            <FundCard 
               key={campaign.id}
               {...campaign}
               handleClick={() => handleNavigate(campaign)}
            />)
        }
    </div>
</div>
  )
}

export default CategaryDisplay