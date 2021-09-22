import React from 'react'
import Layout from '../components/Layout';
import { Card } from 'semantic-ui-react';
import Admin from '../ethereum/admin';
import Manufacturer from '../ethereum/manufacturer';
import { useRouter } from 'next/router';

export default function admin({manufacturers}) {
    const router = useRouter()
    let items = [];
  
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
    console.log(items)
    return (
        <Layout>
            <Card.Group items={items} />
        </Layout>
    )
}



admin.getInitialProps = async (ctx)=>{
  
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
