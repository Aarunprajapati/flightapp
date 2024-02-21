import React from 'react'
import HeaderPage from './HeaderPage'
import { ArrowLeftRight } from 'lucide-react'
import NvavbarButton from '../NvavbarButton'
import SeacrhButton from '../CustomButton'
import CustomButton from '../CustomButton'
import { Input } from '@/components/ui/input'
import FilterSider from './FilterSider'
import SearchForm from './SearchForm'
 

const FlightPageContent = () => {
  return (
    <div className='w-full '>
        <div className=' flex mx-10 lg:mx-28 bg-white items-center gap-x-4 mb-10 border-b-2 border-gray-300'>
            <SearchForm/>
        </div>
       
    
    </div>
  )
}

export default FlightPageContent
