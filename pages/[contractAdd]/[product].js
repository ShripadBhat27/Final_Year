import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { Button  ,Card, Grid, Image} from 'semantic-ui-react';
import Manufacturer from '../../ethereum/manufacturer';
import { route } from 'next/dist/server/router';




export default function product({productsList}) {
    const router = useRouter();

    let items = [];
    console.log(router.query)

    for(let i=0;i<productsList.length;i++){
        items.push({
            header : productsList[i].feature,
            meta : <div>{productsList[i].price} Rs</div> ,
            description :   <div>
                                <strong>Retailer : </strong> {productsList[i].retailer}<br/>
                                <strong>Customer : </strong> {productsList[i].customer}
                                <div style = {{marginTop : '15px'}} >
                                    <Button color={productsList[i].sold ? 'green':'red'}>
                                        {productsList[i].sold ? 'Sold' :  'Not Sold Yet'}
                                    </Button>
                                </div>
                            </div>,
            onClick : ()=>{
                router.push(`/${router.query.contractAdd}/${router.query.product}/${i}`)
            },
            style : { overflowWrap : 'break-word' }
        });
    }


    console.log(productsList);
    return (
        <Layout>
            <Grid style = {{marginTop : "50px"}}>
                <Grid.Row >
                    <Grid.Column width = {13}>
                        <Card.Group items = {items} />
                    </Grid.Column>
                    <Grid.Column width = {3}>
                        <Button primary onClick = {()=>{
                            router.push(`/${router.query.contractAdd}/${router.query.product}/addProduct`)
                        }}>Add Products!!</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}


product.getInitialProps = async(ctx)=>{
    console.log(ctx.query);
    let curMan = Manufacturer(ctx.query.contractAdd);
    let countProductsAddedInLaunch = await curMan.methods.countProductsAddedInLaunch(ctx.query.product).call();
    console.log(countProductsAddedInLaunch)

    let productsList = await Promise.all(
        Array(parseInt(countProductsAddedInLaunch)).fill().map((element , index)=>{
            return curMan.methods.listingProducts(ctx.query.product,index).call()
        })
    )
    return ({productsList});

}


