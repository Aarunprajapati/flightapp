import {CheckCircleIcon} from 'lucide-react'


interface FormSuccessprop{
    message?: string;
}

 export const FormSuccess = ({
    message
 }:FormSuccessprop) => {
    if(!message) return null;
    return (
        <div className=' bg-emerald-500/15  text-emerald-500 p-3 rounded-md text-sm gap-x-2 flex items-center'>
            <CheckCircleIcon className='w-4 h-4'/>
            <p>{message}</p>
        </div>
    )
}

