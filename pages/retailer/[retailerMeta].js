import React from 'react'
import web3 from '../../ethereum/web3'
import { useState , useEffect } from 'react'
import { connectToDatabase } from '../../lib/mongodb'
import { useRouter } from 'next/router'
import { Container , Button } from 'semantic-ui-react'
import LayoutRetailer from '../../components/RetailerLayout/LayoutAdmin'


export default  function retailer({curRetailer}) {
    const router = useRouter()

    console.log(curRetailer)


    const [validated, setValidated] = useState('Not Set');
    const [accounts , setAccounts] = useState([]);

    useEffect(()=>{
        if(validated === 'Not Set') 
            getValidation();
    },[]);

    const getValidation = async()=>{
        let accountsList = await web3.eth.getAccounts()
        setAccounts(accountsList)
        setValidated('Set');
    }

    if(accounts[0] == router.query.retailerMeta)
    {
        return (
            <LayoutRetailer>
                <Container>
                    id : {curRetailer._id} <br/>
                    Name : {curRetailer.name} <br/>
                    address : {curRetailer.address} <br/>
                    mobile : {curRetailer.mobile}<br/>
                    metamaskId : {curRetailer.metamaskId}
        
                </Container>
            </LayoutRetailer>
        )
    }
    return (
        <Container className = 'container'><h3 style = {{marginTop:'14px', marginBottom : '0px'}}>You are not authorized to access this page. Click here to go back</h3><br/>
            <Button onClick = {()=>{router.replace('/')}}  primary  size='small'>Click Here!</Button>
        </Container>
    )
    
}
export async function getServerSideProps(ctx){
    let accounts = ctx.query.retailerMeta 

    const { db } = await connectToDatabase()
    const data = await db.collection('notes').findOne({metamaskId : accounts});
    const curRetailer = JSON.parse(JSON.stringify(data))


    return {
        props : {
            curRetailer : curRetailer
        }
    }
}