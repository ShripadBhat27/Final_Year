import { useRouter } from 'next/router';
import React from 'react'
import { Card , Icon ,Grid , Image  ,Button} from 'semantic-ui-react';
import Layout from '../components/Layout'
import Manufacturer from '../ethereum/manufacturer'

let manufacturer;

export default function ContractAdd({productNames , manInfo}) {
    const router = useRouter();
    manufacturer = Manufacturer(router.query.contractAdd);


    let items = []
    for(let i = 0; i < productNames.length ; i++){
        items.push({
            header:`${productNames[i].name}`,
            // href :`/${router.query.contractAdd}/${productNames[i].index}` ,
            onClick : ()=>{
                router.push(`/${router.query.contractAdd}/${productNames[i].index}`)
            },
            fluid : true
        })
    }

    // console.log(manInfo)
    return (
        <Layout >
            

            <Grid >
                <Grid.Row>
                <Grid.Column width={10}>
                    <Card style = {{ "width" : "100%"}} >
                        <Card.Content style = {{"wordWrap" : "break-word" }}>
                            <Card.Header>
                                {manInfo.name}
                            </Card.Header>
                            <Card.Meta>
                                <span >{manInfo.tag}</span>
                            </Card.Meta>
                                <Card.Description >
                                    <p>
                                        <b>Product Name : {manInfo.product}</b><br/>
                                        Manufacturer Address : {manInfo.companyAddress}
                                    </p>
                                </Card.Description>
                            </Card.Content>
                        <Card.Content extra>
                        <a>
                            <Icon name='product hunt' />
                            Products Launched {manInfo.productCount}
                        </a>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button style = {{marginTop : "45px"}} floated = "right" size='big' primary onClick = {
                        ()=>{
                            router.push(`/${router.query. contractAdd}/launch`)
                        }
                    }
                        >Launch New Product!!</Button>
                </Grid.Column>
                </Grid.Row>
            </Grid>

           <Card.Group items={items} />
        </Layout>
    )

}


ContractAdd.getInitialProps = async(ctx)=>{
    manufacturer = Manufacturer(ctx.query.contractAdd);
    let countLaunchedProducts = await manufacturer.methods.countLaunchedProducts().call();

    let productNames = [];

    for(let i = 0;i<countLaunchedProducts;i++)
    {
        let newProduct = await manufacturer.methods.productNames(i).call();
        productNames.push({
            index : i,
            name : newProduct
        })
    }
    let manInfo = await manufacturer.methods.thisCampany().call();
    return { productNames , manInfo }
}


