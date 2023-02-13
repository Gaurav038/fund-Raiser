import React, { useEffect, useState } from 'react'
import { CustomButton } from '../components';
import {jumbo3} from '../assets/index'
import { useStateContext } from '../context';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { Community, Disaster,Education, Health,Environment } from '../assets';
import { DisplayCampaigns } from '../components'


function HomeOther() {

    const {address, contract, connect,getCampaigns, Rsltcounting} = useStateContext()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [campaigns, setCampaigns] = useState([])

    const fetchCampaign = async () => {
      setIsLoading(true)

      const data = await Rsltcounting()
      setData(data)

      const data1 = await getCampaigns()
      setCampaigns(data1)
      
      setIsLoading(false)
    }
  
    useEffect(() => {
      if(contract) fetchCampaign()
    }, [address, contract])


  return (
    <>
        <div className="space-y-4 col-span-full lg:col-span-2">
            <div className="flex flex-col-reverse  lg:flex-row items-center mt-16">
                <div className="text-center lg:text-left w-full">
                    <h1 className="text-white text-4xl md:text-[4rem] md:py-4 lg:text-[5rem] font-Raleway font-semibold w-full leading-[60px] md:leading-none">
                    Put a smile on someone's face
                    </h1>
                    <p className="md:text-xl mt-2 hidden sm:text-center md:text-left lg:block md:mt-3 text-lg text-white
                     w-10/12 ">
                    The most{' '}
                    <span className="text-blue-600 italic font-bold">Transparent</span>{' '}
                    fundraising platform of the giving layer of the internet. Donate in
                    cryptos and let us build a better world
                    </p>

                    {!address ? (
                    <div
                        onClick={() => { connect() } }
                    >
                        <CustomButton title={'Connect'} styles="bg-[#1dc071]"></CustomButton>
                    </div>
                    ) : (
                    <Link to={`/create-campaign`}>
                        <CustomButton title={'Create Campaign'} styles="bg-[#1dc071]"></CustomButton>
                    </Link>
                    )}
                </div>
                <div className="">
                    <img src={jumbo3} />
                </div>
            </div>
        </div>

        <div className="relative grid grid-cols-1 gap-9 md:flex md:flex-row md:justify-around p-4 px-10 bg-[#ffffff] rounded-2xl">
            <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-600 ">
                {data && data[0]}
                {'+'}
            </h1>
            <p className="text-2xl font-semibold">Fundarisers</p>
            </div>

            <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-600">
              {data && data[1]}
                {'+ '}
            </h1>
            <p className="text-2xl font-semibold">People donated</p>
            </div>

            <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-600">
              {data && data[2]}ETH+
            </h1>
            <p className="text-2xl font-semibold">Amount raised</p>
            </div>
        </div>

        <div className="relative flex flex-col space-y-1 ">
      <p className="text-white text-2xl py-4">Categories</p>

      <div class="flex overflow-x-scroll pb-10 hide-scroll-bar snap-x">
        <div className="flex flex-nowrap mt-5">
          <div class="inline-block px-3 w-6/12 snap-center">
            <Card
              name={'environment'}
              color={'bg-green-800'}
              icon={Environment}
            />
          </div>
          <div class="inline-block px-3 w-6/12 snap-center">
            <Card
              name={'education'}
              color={'bg-red-400'}
              icon={Education}
            />
          </div>
          <div class="inline-block px-3 snap-center">
            <Card
              name={'disaster'}
              color={'bg-yellow-400'}
              icon={Disaster}
            />
          </div>
          <div class="inline-block px-3 snap-center">
            <Card
              name={'health'}
              color={'bg-green-400'}
              icon={Health}
            />
          </div>
          <div class="inline-block px-3 snap-center">
            <Card
              name={'community'}
              color={'bg-pink-400'}
              icon={Community}
            />
          </div>
        </div>
      </div>

      <DisplayCampaigns 
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
    </>
  )
}

export default HomeOther