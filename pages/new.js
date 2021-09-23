import React from 'react'
import Layout from '../components/Layout'
import { Button, Form } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Message from '../components/Message'
import web3 from '../ethereum/web3'
import Admin from '../ethereum/admin'
import assert from 'assert'


export default function New() {
    const router = useRouter()

    const [cname, setCname] = useState('')
    const [ctag, setCtag] = useState('')
    const [cproduct, setCproduct] = useState('')
    const [loading, setLoading] = useState(false)
    const [Mess, setMess] = useState(null)

    const handleChangeName = (event)=>{
        event.preventDefault()
        setCname(event.target.value);
    }
    const handleChangeTag = (event)=>{
        event.preventDefault()
        setCtag(event.target.value);
    }
    const handleChangeProduct = (event)=>{
        event.preventDefault()
        setCproduct(event.target.value);
    }

    const onSubmit = async()=>{
        let accounts = await web3.eth.getAccounts();
        setLoading(true)
        try {
            assert(cname != '' && cproduct != '' && ctag != '')
            await Admin.methods.addManufacturer(cname , cproduct , ctag ).send({from:accounts[0]});
            setLoading(false)

            let contractId = await Admin.methods.getContractId(accounts[0]).call();
            router.replace(`/${contractId}`);
        } catch (error) {
            console.log(error);

            setInterval(() => {
                setMess(null)
            }, 2000);

            setMess({
                type:'failure',
                header : 'Error',
                content : error.message
            })
            setLoading(false);
        }
            
    }
    return (
        <Layout>
            <Message Mess = {Mess} />
            <Form onSubmit = {onSubmit}>
                <Form.Field>
                    <label>Enter Company Name</label>
                    <input value = {cname} onChange = {handleChangeName}/>
                </Form.Field>
                <Form.Field>
                    <label>Enter Tag Line</label>
                    <input value = {ctag} onChange = {handleChangeTag} />
                </Form.Field>
                <Form.Field>
                    <label>Enter Product Name</label>
                    <input value = {cproduct} onChange = {handleChangeProduct} />
                </Form.Field>
                <Button loading = {loading} type='submit' primary>Sign Up!</Button>
            </Form>
        </Layout>
    )
}
