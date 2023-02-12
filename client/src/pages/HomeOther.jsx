import React from 'react'
import { CustomButton } from '../components';
import {jumbo3} from '../assets/index'
import { useStateContext } from '../context';
import Card from '../components/Card';


function HomeOther() {

    const {address} = useStateContext()

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
                        onClick={() => {
                        !address ? "connect" : '';
                        }}
                    >
                        <CustomButton title={'New Donation'} styles="bg-[#1dc071]"></CustomButton>
                    </div>
                    ) : (
                    <Link href={`/fund`}>
                        <CustomButton title={'New Donation '} styles="bg-[#1dc071]"></CustomButton>
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
                {0}
                {'+'}
            </h1>
            <p className="text-xl ">Fundarisers</p>
            </div>

            <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-600">
                { 0}
                {'+ '}
            </h1>
            <p className="text-xl ">People donated</p>
            </div>

            <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-600">
                { 0}ETH+
            </h1>
            <p className="text-xl ">Amount raised</p>
            </div>
        </div>

        <div className="relative flex flex-col space-y-1 ">
      <p className="text-white text-2xl py-4">Categories</p>

      <div class="flex overflow-x-scroll pb-10 hide-scroll-bar snap-x">
        <div className="flex flex-nowrap mt-5">
          <div class="inline-block px-3 w-6/12 snap-center">
            <Card
              name={'Environment'}
              color={'bg-green-800'}
              icon={'leaf-outline'}
            />
          </div>
          <div class="inline-block px-3 w-6/12 snap-center">
            <Card
              name={'Education'}
              color={'bg-red-400'}
              icon={'book-outline'}
            />
          </div>
          <div class="inline-block px-3 snap-center">
            <Card
              name={'Disaster'}
              color={'bg-yellow-400'}
              icon={'flask-outline'}
            />
          </div>
          <div class="inline-block px-3 snap-center">
            <Card
              name={'Health'}
              color={'bg-green-400'}
              icon={'pulse-outline'}
            />
          </div>
          <div class="inline-block px-3 snap-center">
            <Card
              name={'Community'}
              color={'bg-pink-400'}
              icon={'people-outline'}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default HomeOther