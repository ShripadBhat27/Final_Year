import React , {useState , useEffect} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { route } from 'next/dist/server/router';
import styles from '../../../styles/Home.module.css';
import logo from '../../../public/apple-icon-180x180.png';
import web3 from '../../../ethereum/web3';
import Manufacturer from '../../../ethereum/manufacturer';
import { Button, Card,Segment , List, Container, Icon,Input } from 'semantic-ui-react';
import LayoutAdmin from '../../../components/AdminLayout/LayoutAdmin';



export default function AddedProduct({productsList , manInfo}) {

	useEffect (() => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        script.id = 'razorpay-script'
        document.head.appendChild(script)
        return () => {
            const script = document.getElementById('razorpay-script')
            const rContainer = document.querySelector('.razorpay-container')
            console.log('script2', rContainer)
            rContainer && rContainer.remove()
            script && script.remove()
        };
    }, []);
	
	const [loading,setLoading]=useState(false);
	const router = useRouter();
	const [RetMobile,setRetMobile]=useState('');
	const [RetKey,setRetKey]=useState('');

	const [isSuccess,setSuccess]=useState(false);
	// console.log("router: "+JSON.stringify(router.query))
	console.log(productsList)
	// console.log(manInfo)
	let i=router.query.AddedProduct;
	const features=productsList[i][0].split(';');
	var name=features.shift();
	const amt=productsList[i][1];

 	const confirmPayment= async(val)=>{
 			 let accounts = await web3.eth.getAccounts();
	        let curMan = Manufacturer(router.query.contractAdd);
	        //console.log("customer== "+accounts[0]);
	        setLoading(true);
	        console.log("val"+val)
 			
	        // console.log(router.query.product)
	        // console.log(router.query.AddedProduct)
	        // console.log(Retailer);
	        // console.log(accounts[0].toString());
	        try{
	            await curMan.methods.updateProductSell(router.query.product,router.query.AddedProduct,val,accounts[0]).send({
	            	from:accounts[0]
	            });
	            setLoading(false);
	            window.location.href="/";
	            
	        } catch (err) {
		            console.log(err);
		            setLoading(false);
		        }
 	}


    const displayRazorpay = async() =>{
        //const res= await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        console.log("moblie== ",RetMobile);
        console.log("key== ",RetKey);
        const options={
            key:RetKey,
            currency:"INR",
            amount:1*100,
            name:"bestBuy",
            image: "https://live-server-818.wati.io/data/logo/theblingbag.myshopify.com.png?24655",

	        "handler": function(response){
		         fetch(`http://localhost:3000/api/properties?mobile=${RetMobile}`)
		        .then((response)=>{
		                response.json().then((data)=>{
		                //console.log("data.add=== "+JSON.stringify(data))
		                //console.log("hret"+data[0].metamaskId);
		                alert("Payment successful");
			    		confirmPayment(data[0].metamaskId);
		                //console.log("hret"+Retailer);

		            })
		        })
		        

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

	const handleRetKey=(event)=>{
		setRetKey(event.target.value);
	}
	const handleRetMobile=(event)=>{
		setRetMobile(event.target.value);
	}

    return (


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
										<p>
											<b>Price : {productsList[i][1]} Rs</b>
										</p>

										<List animated verticalAlign='middle' items={items} />
									</Card.Description>
								</Card.Content>
								<p>Retailer Mobile Number</p>
							<Input  value={RetMobile} onChange={handleRetMobile}/><br/>
								<p>Retailer Razorpay Key</p>
							<Input type='Password' value={RetKey} onChange={handleRetKey}/>
							<Card.Content extra>
							<a>
							<Button loading = {loading} className={styles.payBtn} disabled={productsList[i][2]} onClick={() =>displayRazorpay()} primary>
								Pay
							</Button>
							</a>
							</Card.Content>
						</Card>
				</main>
			</Container>
    )
}

AddedProduct.getInitialProps = async(ctx)=>{
    //console.log(ctx.query);
    let curMan = Manufacturer(ctx.query.contractAdd);
    let countProductsAddedInLaunch = await curMan.methods.countProductsAddedInLaunch(ctx.query.product).call();
    //console.log(countProductsAddedInLaunch)

    let productsList = await Promise.all(
        Array(parseInt(countProductsAddedInLaunch)).fill().map((element , index)=>{
            return curMan.methods.listingProducts(ctx.query.product,index).call()
        })
    )

	let manInfo = await curMan.methods.thisCampany().call();
    return ({productsList , manInfo});

}
