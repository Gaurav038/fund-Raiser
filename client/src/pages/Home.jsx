import React, { useEffect, useState } from 'react'
import { DisplayCampaigns } from '../components'
import { useStateContext } from '../context'

function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const {address, contract, getCampaigns} = useStateContext()

  const fetchCampaign = async () => {
    setIsLoading(true)
    const data = await getCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if(contract) fetchCampaign()
  }, [address, contract])
  

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home