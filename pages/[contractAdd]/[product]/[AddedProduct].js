import React , {useState , useEffect} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { route } from 'next/dist/server/router';
import styles from '../../../styles/Home.module.css';
import logo from '../../../public/apple-icon-180x180.png';
import web3 from '../../../ethereum/web3';
import Manufacturer from '../../../ethereum/manufacturer';
import { Button, Card,Segment , List, Container, Icon } from 'semantic-ui-react';
import LayoutAdmin from '../../../components/AdminLayout/LayoutAdmin'



export default function AddedProduct({productsList , manInfo}) {
	const router = useRouter();
	// console.log("router: "+JSON.stringify(router.query))
	// console.log(productsList)
	// console.log(manInfo)
	let i=router.query.AddedProduct;
	// console.log("i: "+i);
	const features=productsList[i][0].split(';');
	var name=features.shift();
	const amt=productsList[i][1];
	// console.log(features)


	//razorpay functions
	const loadScript=(src)=>{
        return new Promise((resolve) =>{
            const script=document.createElement('script')
            script.src=src

            script.onload=()=>{
                resolve(true)
            }

            script.omerror=()=>{
                resolve(false)
            }
            document.body.appendChild(script)
        })


    }


    const displayRazorpay = async() =>{
        const res= await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if(!res)
        {
            alert('You are offline..');
            return;
        }

        const options={
            key:"rzp_test_av6t1hoxffSiUW",
            currency:"INR",
            amount:1*100,
            name:"bestBuy",
            image: "https://live-server-818.wati.io/data/logo/theblingbag.myshopify.com.png?24655",

	        "handler": function(response){
	        	alert("Payment Successful!!")
	            alert("Payment id: " +response.razorpay_payment_id);
			    alert("Order id: "+response.razorpay_order_id);
			    alert("Signature: "+response.razorpay_signature);
	        },
	        "prefill":{
	            name:"bestBuy"
	        }
	    };
	    const paymentObject= new window.Razorpay(options)
	    paymentObject.open()
	    paymentObject.on('payment.failed', function (response){
	        alert(response.error.code);
	        alert(response.error.description);
	        alert(response.error.source);
	        alert(response.error.step);
	        alert(response.error.reason);
	        alert(response.error.metadata.order_id);
	        alert(response.error.metadata.payment_id);
		});

	}
	let items = []


	for(let i=0;i<features.length-1;i++)
	{
		items.push({
			header : <div> <b><Icon name="angle double right"/>  {features[i]} </b> </div>
		})
	}

    return (
		<LayoutAdmin>

			<Container >
				<main className={styles.main} style = {{ marginLeft : '25%' , marginRight : '25%' ,paddingTop : '0px' }}>
					<img height = '150px' width = '150px' style = {{marginTop : '15px'}} src = {logo.src} />
						<Card style = {{ "width" : "100%"}} >
							<Card.Content style = {{"wordWrap" : "break-word" }}>
								<Card.Header>
									{name}
								</Card.Header>
								<Card.Meta>
									<span >{manInfo.name}</span>
								</Card.Meta>
									<Card.Description >
										<p>
											Manufacturer Address :{ manInfo.companyAddress}
										</p>

										<List animated verticalAlign='middle' items={items} />
									</Card.Description>
								</Card.Content>
							<Card.Content extra>
							<a>
							<Button className={styles.payBtn} disabled={productsList[i][2]} onClick={() =>displayRazorpay()} primary>
								Pay
							</Button>
							</a>
							</Card.Content>
						</Card>
				</main>
			</Container>
		</LayoutAdmin>
    )
}

AddedProduct.getInitialProps = async(ctx)=>{
    console.log(ctx.query);
    let curMan = Manufacturer(ctx.query.contractAdd);
    let countProductsAddedInLaunch = await curMan.methods.countProductsAddedInLaunch(ctx.query.product).call();
    console.log(countProductsAddedInLaunch)

    let productsList = await Promise.all(
        Array(parseInt(countProductsAddedInLaunch)).fill().map((element , index)=>{
            return curMan.methods.listingProducts(ctx.query.product,index).call()
        })
    )

	let manInfo = await curMan.methods.thisCampany().call();
    return ({productsList , manInfo});

}
