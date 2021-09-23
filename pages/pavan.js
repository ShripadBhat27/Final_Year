import React , {useEffect} from 'react'
import link from 'next/link'
import { useRouter } from 'next/router'

export default function pavan() {
    const router = useRouter();
    let x = 5;

    if(x == 5)
    {
        useEffect(()=>{
        
            router.push('/');
            
        },[]);
        return (
            <div></div>
        )
    }
    else
    {
        return (
            <div>
                Pavan
            </div>
        )
    }
    
}
