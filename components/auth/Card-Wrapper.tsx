'use client'
import React from 'react'
import { 
    Card,
    CardHeader,
    CardContent,
    CardFooter 
} from '../ui/card'
import Cardheader from './Cardheader'
import Social from './Social'
import BackButton from './BackButton'



interface CardWrapperProps{
    children: React.ReactNode,
    headerLabel:string,
    backButtonLabel:string,
    backButtonHref:string,
    showSocial?:boolean
}


const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}:CardWrapperProps) => {
  return (
    <Card className='w-[500px] '>
        <CardHeader>
            <Cardheader label={headerLabel}/>
        </CardHeader>
        <CardContent> 
            {children}
        </CardContent>
        {showSocial && (<CardFooter>
            <Social/>
        </CardFooter>
        )}
        <CardFooter>
            <BackButton
                label={backButtonLabel}
                href={backButtonHref}
            />
        </CardFooter>
    </Card>
  )
}

export default CardWrapper
