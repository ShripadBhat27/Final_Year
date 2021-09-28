import React ,  { useState, useEffect ,useRef } from 'react';
import styles from '../styles/Home.module.css';
import logo from '../public/apple-icon-180x180.png';
import { Button, Card,Segment } from 'semantic-ui-react';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';

export default function customer(){
	const router = useRouter();
	useEffect(() => {
		  const script = document.createElement('script');

		  script.src = "./qrReader.js";
		  script.async = true;

		  document.body.appendChild(script);

		  return () => {
		    document.body.removeChild(script);
		  }



	}, []);  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

	return(
		<div>
			<main className={styles.main}>
				<img height = '150px' width = '150px' style = {{marginTop : '15px'}} src = {logo.src} />
				<div className={styles.card}>
					<h4 style={{color:'black',fontSize:'25px'}}>
				         Upload your Qr Code
				    </h4>
					<input type="file" id="file" name="file"/><br/>
					<span id="content"></span>
				</div>
			  </main>
		    
	    </div>
	)
}