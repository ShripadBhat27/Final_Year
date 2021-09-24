import React ,  { useState, useEffect } from 'react'
import Layout from '../components/Layout';
import { Card, Container } from 'semantic-ui-react';
import Admin from '../ethereum/admin';
import Manufacturer from '../ethereum/manufacturer';
import { useRouter } from 'next/router';
import web3 from '../ethereum/web3';
import { Redirect } from 'react-router';
import { Router } from 'react-router';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default function admin({manufacturers}) {

    const router = useRouter()
    let items = [];

    const [validated, setValidated] = useState('Not Set');
    const [Authorized , setAuthorized] = useState(false);

    useEffect(()=>{
        if(validated === 'Not Set') 
            getValidation();
    },[]);

    const getValidation = async()=>{
        let accounts = await web3.eth.getAccounts()
        let superHost = await Admin.methods.superHost().call();
        console.log(accounts[0] ," ",superHost)
        if(accounts[0] == superHost)   setAuthorized(true);
        setValidated('Set');
    }

    for(let i = 0; i < manufacturers.length ; i++){
        items.push({
            header:`${manufacturers[i].name}`,
            description:<p>Product Name : {manufacturers[i].product}<br/>
            Number of Launched Products : {manufacturers[i].productCount}<br/>
            Manufacturer Address : {manufacturers[i].manAddress}</p>,
            meta:`${manufacturers[i].tag}`,
            onClick :()=>{
                router.push(`/${manufacturers[i].contractAdd}`)
            },
            fluid : true
        })
    }
    
    if(Authorized){
        return (
        <Layout>
            <Card.Group items={items} />
        </Layout>
        )
    }
    else
    {
        return (
            <Container className = 'container'><h3 style = {{marginTop:'14px', marginBottom : '0px'}}>You are not a admin. Click here to go back</h3><br/>
                <Button onClick = {()=>{router.replace('/')}}  primary  size='small'>Click Here!</Button>
            </Container>
        )
    }
      
}



admin.getInitialProps = async (ctx)=>{
  
    let listOfManufacturers = await Admin.methods.getListOfManufacturers().call();
    let manufacturers = [];
    let accounts = await web3.eth.getAccounts()
    console.log(accounts)
  
    for(let i=0 ; i < listOfManufacturers.length ; i++)
    {
        let curMan = Manufacturer(listOfManufacturers[i]) ;
        let curManInfo = await curMan.methods.thisCampany().call();
        manufacturers.push({
            contractAdd : listOfManufacturers[i],
            manAddress : curManInfo.companyAddress,
            name : curManInfo.name,
            product : curManInfo.product,
            productCount : curManInfo.productCount,
            tag : curManInfo.tag,

        });
    }

   
    return {manufacturers};
}
