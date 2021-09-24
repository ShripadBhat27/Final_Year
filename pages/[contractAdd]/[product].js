import React , {useState , useEffect} from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { Button  ,Card, Grid, Image , Container} from 'semantic-ui-react';
import Manufacturer from '../../ethereum/manufacturer';
import { route } from 'next/dist/server/router';
import Admin from '../../ethereum/admin'
import web3 from '../../ethereum/web3';




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


    
    const [validated, setValidated] = useState('Not Set');
    const [Authorized , setAuthorized] = useState(false);

    useEffect(()=>{
        if(validated === 'Not Set') 
            getValidation();
    },[]);

    const getValidation = async()=>{
        let accounts = await web3.eth.getAccounts()
        let superHost = await Admin.methods.superHost().call();

        let getContractId = await Admin.methods.getContractId(accounts[0]).call()

        if(accounts[0] == superHost || getContractId == router.query.contractAdd)   setAuthorized(true);
        setValidated('Set');
    }


    if(Authorized){
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
    else{
        return (
            <Container className = 'container'><h3 style = {{marginTop:'14px', marginBottom : '0px'}}>You are not authorized to access this page. Click here to go back</h3><br/>
                <Button onClick = {()=>{router.replace('/')}}  primary  size='small'>Click Here!</Button>
            </Container>
        )
    }
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


