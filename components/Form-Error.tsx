import {AlertTriangle} from 'lucide-react'


interface FormErrorProp{
    message?: string;
}

 export const FormError = ({
    message
 }:FormErrorProp) => {

    if(!message) return null;
    return (
        <div className=' bg-destructive/15 text-destructive-500 p-3 rounded-md text-sm gap-x-2 flex items-center'>
            <AlertTriangle className='w-4 h-4'/>
            <p>{message}</p>
        </div>
    )
}

