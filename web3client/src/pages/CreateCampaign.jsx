import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {ethers} from 'ethers'
import {money} from '../assets'
import {CustomButton, FormField } from '../components'
import {checkIfImage} from '../utils'
import { useStateContext } from '../context'
import Loader from '../components/Loader'

function CreateCampaign() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {createCamp} = useStateContext()
  const [form, setForm] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
    category: 'environment'
  })

  const handleFormFieldChange = (fieldName, e) => {
    setForm({...form, [fieldName]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    checkIfImage(form.image, async(exists) => {
      if(exists){
        setIsLoading(true)
        await createCamp({
          ...form, target : ethers.utils.parseUnits(form.target, 18)
        })
        setIsLoading(false)
        navigate('/')
      }
      else{
        alert('Provide valid image URL')
        setForm({...form, image: ''})
      }
    })
  }
  const options = [
    {
      label: "Environment",
      value: "environment",
    },
    {
      label: "Education",
      value: "education",
    },
    {
      label: "Disaster",
      value: "disaster",
    },
    {
      label: "Health",
      value: "health",
    },
    {
      label: "Community",
      value: "community",
    },
  ];
console.log(form)
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]" >

          <FormField
            LabelName="Campaign Title"
            placeholder="write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => {handleFormFieldChange('title', e)}}
          />

        <FormField 
            LabelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            LabelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            LabelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
          <label className="flex-1 w-full flex flex-col">
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                Category
            </span>
            <select className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
              value={form.category} onChange={(e) => handleFormFieldChange('category', e)}>
              {options.map((option) => (
                <option key={option.value} className='rounded-[20px] bg-[#4B4747] font-epilogue text-white text-[18px]' value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>

          <FormField 
            LabelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>

    </div>
  )
}

export default CreateCampaign