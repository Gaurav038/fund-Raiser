import React, { useEffect, useState } from 'react'
import { DisplayCampaigns } from '../components'
import { useStateContext } from '../context'

function Profile() {

  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const {address, contract, getUserCampaigns} = useStateContext()

  const fetchCampaign = async () => {
    setIsLoading(true)
    const data = await getUserCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if(contract) fetchCampaign()
  }, [address, contract])
  

  return (
    <DisplayCampaigns 
      title="User Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile