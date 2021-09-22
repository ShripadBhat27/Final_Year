import { useRouter } from 'next/router';
import React , { useState }from 'react'
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Admin from '../ethereum/admin'
import Manufacturer from '../ethereum/manufacturer';
import web3 from '../ethereum/web3';
import Message from '../components/Message';
import { route } from 'next/dist/server/router';


export default function index({manufacturers}) {

    const router = useRouter();
    let items = [];
    const [selected, setSelected] = useState('');
    const [Mess, setMess] = useState(null);

    const handleAdminClick = async()=>{
        let accounts = await web3.eth.getAccounts();
        let superHost = await Admin.methods.superHost().call();
        if(accounts[0] === superHost){

            
            
            setSelected('admin');
            router.push('/admin');
            
            console.log(items);
        }
        else{
            setInterval(() => {
                setMess(null)
            }, 2000);
            setMess({
                type : 'negative',
                header : 'Error',
                content : "You are not admin"
            })
        }
    }
    const handleManClick = async()=>{
        let accounts = await web3.eth.getAccounts();
        let isManufacturer = await Admin.methods.isManufacturer(accounts[0]).call();

        if(isManufacturer){
            let getContractId = await Admin.methods.getContractId(accounts[0]).call();
            setSelected('manufacturer');
            router.replace(`/${getContractId}`)
        }
        else{
            router.replace('/new');
        }
    }


   
    if(selected === 'admin'){
        return (
            <Layout>
                <Card.Group items={items} />
            </Layout>
        )
    }
    else if(selected === 'manufacturer'){
        return(
            <Layout>
                
            </Layout>
        )
    }
    else{
        return(
            <Layout>
                <Message Mess = {Mess}/>
                <h3>Sign in as</h3>
                <Button onClick = {handleAdminClick}>Admin</Button>
                <Button onClick = {handleManClick}>Manufacturer</Button>
            </Layout>
        )
    }
    
}


index.getInitialProps = async (ctx)=>{
  
    let listOfManufacturers = await Admin.methods.getListOfManufacturers().call();
    let manufacturers = [];
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

