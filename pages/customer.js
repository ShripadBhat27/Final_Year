import React ,  { useState, useEffect ,useRef } from 'react';
import styles from '../styles/Home.module.css';
import logo from '../public/apple-icon-180x180.png';
import { Button, Card,Segment } from 'semantic-ui-react';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';


export default function customer(){
	const router = useRouter();
	const [result,setresult]=useState('');
	const QrReader = dynamic(() => import('react-qr-reader'), {
		ssr: false
		})
	const qrRef = useRef(null);

	// const handleErrorFile = (error) => {
	//     console.log("err=="+error);
	//   }
	//  const handleScanFile = (res) => {
	//  	 setresult(res);

 // 	}

  // const onScanFile = () => {
  //   qrRef.current.click();
  // }

	 const handleErrorWebCam = (error) => {
    console.log("err=="+error);
  }
  const handleScanWebCam = (res) => {
  	setresult(res);
  	//console.log(res)
  	if(res)
    {	
    	window.location.href=res;
    }
   }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

	return(
		<div>
			<main className={styles.main}>
				<img height = '150px' width = '150px' style = {{marginTop : '15px'}} src = {logo.src} />
				<div className={styles.card}>
					<h4 style={{color:'black',fontSize:'25px'}}>
				         Upload your Qr Code
				    </h4>
				</div>

				 <QrReader
                         delay={400}
                         style={{width: '30%',height:'30%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                     />
                    <h5>{result}</h5>
				
			  </main>
		    
	    </div>
	)
}